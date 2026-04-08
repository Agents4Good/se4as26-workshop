export function EventLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hexagon Background */}
      <path
        d="M60 10L100 32.5V77.5L60 100L20 77.5V32.5L60 10Z"
        fill="currentColor"
        opacity="0.1"
      />
      
      {/* Network Nodes */}
      <circle cx="60" cy="40" r="6" fill="currentColor" opacity="0.8" />
      <circle cx="40" cy="60" r="6" fill="currentColor" opacity="0.8" />
      <circle cx="80" cy="60" r="6" fill="currentColor" opacity="0.8" />
      <circle cx="60" cy="80" r="6" fill="currentColor" opacity="0.8" />
      
      {/* Connections */}
      <line x1="60" y1="40" x2="40" y2="60" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      <line x1="60" y1="40" x2="80" y2="60" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      <line x1="40" y1="60" x2="60" y2="80" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      <line x1="80" y1="60" x2="60" y2="80" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      
      {/* Central Node */}
      <circle cx="60" cy="60" r="8" fill="currentColor" />
      
      {/* Outer Ring */}
      <circle cx="60" cy="60" r="35" stroke="currentColor" strokeWidth="2" opacity="0.3" fill="none" />
    </svg>
  );
}
