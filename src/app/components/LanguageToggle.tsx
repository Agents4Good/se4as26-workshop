import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-slate-600" />
      <div className="flex bg-slate-100 rounded-lg p-1">
        <motion.button
          onClick={() => setLanguage('pt')}
          className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
            language === 'pt'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          PT
        </motion.button>
        <motion.button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
            language === 'en'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          EN
        </motion.button>
      </div>
    </div>
  );
}
