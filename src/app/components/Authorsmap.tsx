import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe2, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { brazilStates, centroidOverrides } from './Brazilstates ';

export type StateAuthorData = {
  stateId: string; // lowercase 2-letter state id, matching brazilStates ids (e.g. 'pb', 'ce', 'sp')
  count: number; // number of distinct authors based in this state
  institutions: string[]; // institution names based in this state
};

export type InternationalAuthor = {
  name: string;
  institution: string;
  country: string;
};

interface AuthorsMapProps {
  data: StateAuthorData[];
  internationalAuthors?: InternationalAuthor[];
  title?: string;
  subtitle?: string;
}

// Real aspect ratio of the source map (613 x 639), so the card fills edge-to-edge
// with zero letterboxing and no state ever gets cropped out.
const DEFAULT_VIEWBOX = { x: 0, y: 0, w: 613, h: 639 };
const MIN_W = 90; // most zoomed in
const MAX_W = DEFAULT_VIEWBOX.w; // fully zoomed out
const ASPECT = DEFAULT_VIEWBOX.h / DEFAULT_VIEWBOX.w;

export function AuthorsMap({ data, internationalAuthors = [], title, subtitle }: AuthorsMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [hoveredIntl, setHoveredIntl] = useState(false);
  const [viewBox, setViewBox] = useState(DEFAULT_VIEWBOX);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const draggingRef = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const dataById = new Map(data.map((d) => [d.stateId, d]));
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  const fillFor = (stateId: string) => {
    const entry = dataById.get(stateId);
    if (!entry) return '#f1f5f9'; // slate-100, inactive state
    const ratio = entry.count / maxCount;
    if (ratio > 0.75) return '#0f172a'; // slate-900
    if (ratio > 0.5) return '#334155'; // slate-700
    if (ratio > 0.25) return '#94a3b8'; // slate-400
    return '#cbd5e1'; // slate-300
  };

  const clampViewBox = (box: typeof DEFAULT_VIEWBOX) => {
    const w = Math.min(MAX_W, Math.max(MIN_W, box.w));
    const h = w * ASPECT;
    const x = Math.min(Math.max(box.x, 0), DEFAULT_VIEWBOX.w - w);
    const y = Math.min(Math.max(box.y, 0), DEFAULT_VIEWBOX.h - h);
    return { x, y, w, h };
  };

  const zoomAt = (clientX: number, clientY: number, factor: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setViewBox((prev) => {
      const scaleX = prev.w / rect.width;
      const scaleY = prev.h / rect.height;
      const px = prev.x + (clientX - rect.left) * scaleX;
      const py = prev.y + (clientY - rect.top) * scaleY;
      const newW = Math.min(MAX_W, Math.max(MIN_W, prev.w * factor));
      const newH = newW * ASPECT;
      const newX = px - (px - prev.x) * (newW / prev.w);
      const newY = py - (py - prev.y) * (newH / prev.h);
      return clampViewBox({ x: newX, y: newY, w: newW, h: newH });
    });
  };

  const zoomButton = (factor: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, factor);
  };

  const resetView = () => setViewBox(DEFAULT_VIEWBOX);

  // Native (non-passive) wheel listener so preventDefault works reliably
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = e.deltaY > 0 ? 1.15 : 0.87;
      zoomAt(e.clientX, e.clientY, factor);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewBox.w]);

  const handlePointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const svg = svgRef.current;
    if (!svg) return;
    const dxScreen = e.clientX - lastPos.current.x;
    const dyScreen = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    const rect = svg.getBoundingClientRect();
    setViewBox((prev) => {
      const scaleX = prev.w / rect.width;
      const scaleY = prev.h / rect.height;
      return clampViewBox({
        ...prev,
        x: prev.x - dxScreen * scaleX,
        y: prev.y - dyScreen * scaleY
      });
    });
  };

  const handlePointerUp = () => {
    draggingRef.current = false;
  };

  const isZoomed = viewBox.w < DEFAULT_VIEWBOX.w - 1;
  const hoveredEntry = hovered ? dataById.get(hovered) : null;
  const hoveredState = hovered ? brazilStates.find((s) => s.id === hovered) : null;

  return (
    <div className="relative w-full h-full min-h-[420px] rounded-2xl border border-slate-200 shadow-sm overflow-hidden bg-slate-50">
      {/* Map fills the entire card, edge-to-edge */}
      <div
        ref={containerRef}
        className="absolute inset-0 select-none"
        style={{ touchAction: 'none' }}
      >
        <svg
          ref={svgRef}
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
          className="w-full h-full block cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {brazilStates.map((state) => {
            const isActive = dataById.has(state.id);
            return (
              <motion.path
                key={state.id}
                d={state.d}
                fill={fillFor(state.id)}
                stroke="#ffffff"
                strokeWidth={1.5}
                strokeLinejoin="round"
                className={isActive ? 'cursor-pointer' : ''}
                onMouseEnter={() => isActive && !draggingRef.current && setHovered(state.id)}
                onMouseLeave={() => isActive && setHovered(null)}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              />
            );
          })}

          {/* Markers */}
          {data.map((entry, index) => {
            const state = brazilStates.find((s) => s.id === entry.stateId);
            if (!state) return null;
            const { cx, cy } = centroidOverrides[entry.stateId] ?? state;
            const radius = 6 + (entry.count / maxCount) * 10;

            return (
              <g
                key={entry.stateId}
                onMouseEnter={() => !draggingRef.current && setHovered(entry.stateId)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer"
              >
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill="#f59e0b"
                  fillOpacity={0.18}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.15, ease: 'easeInOut' }}
                  viewport={{ once: true }}
                />
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={5}
                  fill="#f59e0b"
                  stroke="#ffffff"
                  strokeWidth={1.5}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  viewport={{ once: true }}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Header overlay */}
      {(title || subtitle) && (
        <div className="absolute top-0 left-0 p-4 md:p-6 z-20 pointer-events-none max-w-[75%]">
          <div className="inline-block pointer-events-auto bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 border border-slate-200 shadow-sm">
            {title && <h4 className="text-base md:text-lg font-semibold text-slate-900">{title}</h4>}
            {subtitle && <p className="text-slate-500 text-xs md:text-sm mt-0.5">{subtitle}</p>}
          </div>
        </div>
      )}

      {/* International collaboration pin (fixed corner, not tied to real coordinates) */}
      {internationalAuthors.length > 0 && (
        <div
          className="absolute top-4 md:top-6 right-4 md:right-6 z-20 cursor-pointer"
          onMouseEnter={() => setHoveredIntl(true)}
          onMouseLeave={() => setHoveredIntl(false)}
        >
          <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full pl-2 pr-3 py-1.5 border border-slate-200 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
            </span>
            <Globe2 className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs font-medium text-slate-700">
              +{internationalAuthors.length} abroad
            </span>
          </div>

          <AnimatePresence>
            {hoveredIntl && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-64 pointer-events-none z-10"
              >
                <div className="bg-slate-900 text-white rounded-xl px-4 py-3 shadow-xl text-sm">
                  <p className="font-semibold mb-1">International Collaboration</p>
                  {internationalAuthors.map((a) => (
                    <p key={a.name} className="text-slate-300 text-xs">
                      {a.institution}, {a.country}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Zoom Controls */}
      <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 z-20 flex flex-col gap-1 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <button
          onClick={() => zoomButton(0.8)}
          className="p-2 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors border-b border-slate-200"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => zoomButton(1.25)}
          className="p-2 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors border-b border-slate-200"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={resetView}
          className={`p-2 hover:bg-slate-50 transition-colors ${isZoomed ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300'}`}
          aria-label="Reset view"
          disabled={!isZoomed}
        >
          <Maximize className="w-4 h-4" />
        </button>
      </div>

      {/* Legend + hint overlay */}
      <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 z-20 pointer-events-none max-w-[55%]">
        <div className="pointer-events-auto bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-slate-200 shadow-sm flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-500 whitespace-nowrap">Fewer</span>
            <div className="flex">
              {['#cbd5e1', '#94a3b8', '#334155', '#0f172a'].map((c) => (
                <div key={c} className="w-4 h-2" style={{ backgroundColor: c }} />
              ))}
            </div>
            <span className="text-[11px] text-slate-500 whitespace-nowrap">More authors</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block flex-shrink-0" />
            <span>Author location · scroll to zoom, drag to pan</span>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredEntry && hoveredState && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-20 md:bottom-24 pointer-events-none z-30 w-64"
          >
            <div className="bg-slate-900 text-white rounded-xl px-4 py-3 shadow-xl text-sm">
              <p className="font-semibold">{hoveredState.name}</p>
              <p className="text-slate-300 text-xs mt-0.5">
                {hoveredEntry.count} author{hoveredEntry.count !== 1 ? 's' : ''} · {hoveredEntry.institutions.join(', ')}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}