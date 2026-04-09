import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // September 8, 2026 - São Paulo timezone (UTC-3)
    const targetDate = new Date('2026-09-08T00:00:00-03:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const addToGoogleCalendar = () => {
    const event = {
      text: 'I Workshop on Software Engineering for Agentic Systems (SE4AS)',
      dates: '20260908/20260908',
      details: 'I Workshop on Software Engineering for Agentic Systems (SE4AS)',
      location: 'IME - USP, São Paulo, SP, Brazil',
      ctz: 'America/Sao_Paulo'
    };

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.text)}&dates=${event.dates}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}&ctz=${event.ctz}`;
    
    window.open(url, '_blank');
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
      <h3 className="text-white text-xl font-semibold mb-6 text-center">Countdown to SE4AS 2026</h3>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { value: timeLeft.days, label: 'Days' },
          { value: timeLeft.hours, label: 'Hours' },
          { value: timeLeft.minutes, label: 'Minutes' },
          { value: timeLeft.seconds, label: 'Seconds' }
        ].map((item, index) => (
          <motion.div
            key={item.label}
            className="bg-slate-900/50 rounded-lg p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-3xl font-bold text-white mb-1">
              {String(item.value).padStart(2, '0')}
            </div>
            <div className="text-slate-400 text-xs uppercase tracking-wider">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={addToGoogleCalendar}
        className="w-full bg-white hover:bg-slate-100 text-slate-900 px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>
        Add to Google Calendar
      </button>
    </div>
  );
}
