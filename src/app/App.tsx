import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Calendar, MapPin, ChevronDown, ArrowRight, Mail, ExternalLink } from 'lucide-react';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { GeometricBackground } from './components/GeometricBackground';
import { SectionConnector } from './components/SectionConnector';
import { TypewriterText } from './components/TypewriterText';
import { Countdown } from './components/Countdown';
import { EventLogo } from './components/EventLogo';
import { LanguageToggle } from './components/LanguageToggle';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';


function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AppContent() {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  // Smooth scroll
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const importantDates = [
    { label: t('dates.registration'), date: "July 3, 2026" },
    { label: t('dates.submission'), date: "July 10, 2026" },
    { label: t('dates.notification'), date: "August 3, 2026" },
    { label: t('dates.camera'), date: "August 10, 2026" },
    { label: t('dates.workshop'), date: "September 8, 2026" }
  ];

  const committeeCoordination = [
    { name: "Patrícia D. L. Machado", institution: "UFCG" },
    { name: "Leandro Balby Marinho", institution: "UFCG" },
    { name: "Everton Leandro Galdino Alves", institution: "UFCG" }
  ];

  const committeeProgram = [
    { name: "Alessandro Garcia", institution: "PUC-Rio" },
    { name: "Anderson Uchôa", institution: "UFC" },
    { name: "André Carvalho", institution: "UFAM" },
    { name: "André Hora", institution: "UFMG" },
    { name: "Awdren Fontão", institution: "UFMS" },
    { name: "Baldoíno Fonseca", institution: "UFAL" },
    { name: "Carlos Caminha", institution: "UFC" },
    { name: "Everton Alves", institution: "UFCG" },
    { name: "Eliane Araújo", institution: "UFCG" },
    { name: "Francisco Gomes", institution: "University of Gothenburg, SE" },
    { name: "Guilherme Avelino", institution: "UFPI" },
    { name: "João Eduardo Montandon", institution: "UFMG" },
    { name: "Leandro Marinho", institution: "UFCG" },
    { name: "Marcelo D'Amorim", institution: "UFPE" },
    { name: "Mário Ribeiro", institution: "UFAL" },
    { name: "Patrícia Machado", institution: "UFCG" },
    { name: "Vânia Neves", institution: "UFF" }
  ];

  const committeeOrganization = [
    { name: "Débora Souza", institution: "UFCG" },
    { name: "Caíque Calazans", institution: "UFCG" },
    { name: "Beatriz Furtado", institution: "UFCG" },
    { name: "Gabriella Araujo", institution: "UFCG" },
    { name: "Matheus Hensley", institution: "UFCG" }
  ];

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-slate-200 z-40"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-16 h-12 flex items-center justify-center">
                <img 
                  src="logo-se4as.svg" 
                  alt="SE4AS Logo" 
                  className="w-full h-full object-contain scale-175"
                />
              </div>
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              {(['overview', 'topics', 'keynotes', 'dates', 'submission', 'committee'] as const).map((item) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-200 capitalize text-sm font-medium"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t(`nav.${item}`)}
                </motion.a>
              ))}
              <LanguageToggle />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Dark Theme */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center px-6 pt-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      >
        <GeometricBackground isDark={true} />

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Badge className="mb-6 bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700">
                  {t('hero.colocated')}
                </Badge>
              </motion.div>

              <motion.h1
                className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                SE4AS 2026
              </motion.h1>

              <motion.div
                className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed h-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <TypewriterText
                  key={language}
                  text={t('hero.title')}
                  delay={1000}
                  speed={50}
                />
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 text-slate-300 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm px-5 py-3 rounded-lg border border-slate-700">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-sm">{t('hero.date')}</span>
                </div>
                
                <motion.a 
                    href="https://www.google.com/maps/search/?api=1&query=IME-USP+Sao+Paulo+SP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm px-5 py-3 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MapPin className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                    <span className="text-sm">{t('hero.location')}</span>
                  </motion.a>
                  
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2 }}
              >
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    className="bg-slate-100 hover:bg-white text-slate-900 transition-all duration-300 px-8 py-6 shadow-lg"
                    onClick={() => {
                      document.getElementById('submission')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {t('hero.submit')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    className="bg-slate-100 hover:bg-white text-slate-900 transition-all duration-300 px-8 py-6 shadow-lg"
                    onClick={() => window.open('https://cbsoft.sbc.org.br/2026/pt/cbsoft/', '_blank')}
                  >
                    {t('hero.cbsoft')}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Countdown />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </motion.div>
      </motion.section>

      {/* Transition to Light */}
      <div className="text-slate-100">
        <SectionConnector />
      </div>

      {/* Overview Section - Light Theme */}
      <section id="overview" className="relative py-24 px-6 bg-white">
        <GeometricBackground isDark={false} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-1 bg-slate-800" />
              <h2 className="text-5xl font-bold text-slate-900">
                {t('overview.title')}
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-16">
            <AnimatedSection delay={0.2}>
              <div className="space-y-6">
                <p className="text-slate-700 leading-relaxed text-lg">
                  {t('overview.p1')}
                </p>
                <p className="text-slate-700 leading-relaxed text-lg">
                  {t('overview.p2')}
                </p>
                <p className="text-slate-700 leading-relaxed text-lg">
                  {t('overview.p3')}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="bg-slate-50 rounded-2xl p-10 border border-slate-200 shadow-sm">
                <h3 className="text-2xl font-semibold text-slate-900 mb-6">
                  {t('overview.goals')}
                </h3>
                <p className="text-slate-700 mb-8 leading-relaxed">
                  {t('overview.goalsText')}
                </p>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((num, index) => (
                    <motion.div
                      key={num}
                      className="flex gap-3 items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-800 mt-2 flex-shrink-0" />
                      <span className="text-slate-700">{t(`overview.goal${num}` as any)}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section id="topics" className="relative py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-1 bg-slate-800" />
              <h2 className="text-5xl font-bold text-slate-900">
                {t('topics.title')}
              </h2>
            </div>
            <p className="text-slate-600 mb-12 text-lg ml-16">{t('topics.subtitle')}</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((num, index) => (
              <AnimatedSection key={num} delay={index * 0.03}>
                <motion.div
                  className="bg-white p-6 rounded-lg border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all duration-300 h-full"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-slate-800 mt-2 flex-shrink-0" />
                    <p className="text-slate-700 leading-relaxed text-sm">
                      {t(`topics.${num}` as any)}
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Keynotes Section */}
      <section id="keynotes" className="relative py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-1 bg-slate-800" />
              <h2 className="text-5xl font-bold text-slate-900">
                {t('keynotes.title')}
              </h2>
            </div>
            <p className="text-slate-600 mb-16 text-lg ml-16">{t('keynotes.subtitle')}</p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Single Keynote Placeholder */}
            <AnimatedSection delay={0.1}>
              <motion.div
                className="group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-500 relative"
                whileHover={{ y: -8 }}
              >
                {/* Blurred Placeholder Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-300 to-slate-400 blur-xl" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-slate-500 text-center p-6">
                      <div className="w-20 h-20 rounded-full bg-slate-300 mx-auto mb-4" />
                      <div className="h-4 bg-slate-300 rounded mb-2 w-3/4 mx-auto" />
                      <div className="h-3 bg-slate-300 rounded w-1/2 mx-auto" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 bg-slate-50">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">{t('keynotes.topic')}</p>
                      <div className="h-3 bg-slate-200 rounded w-full mb-2" />
                      <div className="h-3 bg-slate-200 rounded w-3/4" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">{t('keynotes.abstract')}</p>
                      <div className="h-2 bg-slate-200 rounded w-full mb-1" />
                      <div className="h-2 bg-slate-200 rounded w-full mb-1" />
                      <div className="h-2 bg-slate-200 rounded w-2/3" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 italic mt-4 text-center">{t('keynotes.tba')}</p>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section id="dates" className="relative py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-16">
              <div className="w-12 h-1 bg-slate-800" />
              <h2 className="text-5xl font-bold text-slate-900">
                {t('dates.title')}
              </h2>
            </div>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              {importantDates.map((item, index) => (
                <AnimatedSection key={index} delay={index * 0.08}>
                  <motion.div
                    className="group py-6 px-8 border-b border-slate-200 last:border-b-0 hover:bg-slate-50 transition-all duration-300"
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 group-hover:text-slate-900 transition-colors duration-300">
                        {item.label}
                      </span>
                      <span className="font-semibold text-slate-900 text-lg">
                        {item.date}
                      </span>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
            
            <AnimatedSection delay={0.5}>
              <p className="mt-8 text-slate-500 italic text-center">
                {t('dates.aoe')}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Submission Guidelines */}
      <section id="submission" className="relative py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-16">
              <div className="w-12 h-1 bg-slate-800" />
              <h2 className="text-5xl font-bold text-slate-900">
                {t('submission.title')}
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-slate-50 rounded-2xl p-10 border border-slate-200 space-y-8 mb-16">
              <div>
                <p className="text-slate-700 leading-relaxed mb-6">
                  {t('submission.p1')}
                </p>
                <p className="text-slate-700 leading-relaxed mb-6">
                  {t('submission.p2')}{' '}
                  <a 
                    href="https://www.overleaf.com/read/cyhpwwkngcwk#baf5f5" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-900 font-semibold underline hover:text-slate-600 transition-colors"
                  >
                    {t('submission.template')}
                  </a>
                  {' '}(
                  <a 
                    href="https://cbsoft.sbc.org.br/2026/Template_para_eventos_do_CBSoft.zip" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-900 font-semibold underline hover:text-slate-600 transition-colors"
                  >
                    {t('submission.download')}
                  </a>
                  ).
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mb-4">{t('submission.types')}</h3>
                <ul className="space-y-2 text-slate-700 mb-6">
                  <li className="flex gap-3">
                    <span>-</span>
                    <span>{t('submission.type1')}</span>
                  </li>
                  <li className="flex gap-3">
                    <span>-</span>
                    <span>{t('submission.type2')}</span>
                  </li>
                  <li className="flex gap-3">
                    <span>-</span>
                    <span>{t('submission.type3')}</span>
                  </li>
                  <li className="flex gap-3">
                    <span>-</span>
                    <span>{t('submission.type4')}</span>
                  </li>
                </ul>

                <p className="text-slate-700 leading-relaxed mb-6">
                  {t('submission.p3')}{' '}
                  <a 
                    href="https://jems3.sbc.org.br/?returnUrl=%2Fse4fp2026%2F" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-900 font-semibold underline hover:text-slate-600 transition-colors"
                  >
                    JEMS 3
                  </a>
                  {' '}{t('submission.p3').includes('sistema') ? 'sistema' : 'system'}.
                </p>

                <p className="text-slate-700 leading-relaxed mb-6">
                  {t('submission.p4')}
                </p>

                <p className="text-slate-700 leading-relaxed mb-6">
                  {t('submission.p5')}
                </p>

                <p className="text-slate-700 leading-relaxed mb-6">
                  {t('submission.p6')}{' '}
                  <a 
                    href="https://sol.sbc.org.br/index.php/indice/conduta" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-900 font-semibold underline hover:text-slate-600 transition-colors"
                  >
                    {t('submission.conduct')}
                  </a>
                  .
                </p>

                <p className="text-slate-700 leading-relaxed mb-6">
                  {t('submission.p7')}{' '}
                  <a 
                    href="https://cbsoft.sbc.org.br/2026/pt/symposiums/sbes/pesquisa/call/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-900 font-semibold underline hover:text-slate-600 transition-colors"
                  >
                    CBSoft/SBES
                  </a>
                  {t('submission.p8')}
                </p>

                <motion.div
                  className="bg-amber-50 border border-amber-200 rounded-xl p-6"
                  whileHover={{ scale: 1.01 }}
                >
                  <p className="text-amber-900">
                    <strong className="font-semibold">{t('submission.note')}</strong> {t('submission.noteText')}
                  </p>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Committee Section */}
      <section id="committee" className="relative py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-16">
              <div className="w-12 h-1 bg-slate-800" />
              <h2 className="text-5xl font-bold text-slate-900">
                {t('committee.title')}
              </h2>
            </div>
          </AnimatedSection>

          {/* Coordination Committee */}
          <AnimatedSection delay={0.2}>
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-slate-900 mb-8">{t('committee.coordination')}</h3>
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {committeeCoordination.map((member, index) => (
                    <motion.div
                      key={index}
                      className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <p className="font-semibold text-slate-900">{member.name}</p>
                      <p className="text-slate-600 text-sm">{member.institution}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Program Committee */}
          <AnimatedSection delay={0.3}>
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">{t('committee.program')}</h3>
              <p className="text-slate-600 mb-8 italic">{t('committee.programIntro')}</p>
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {committeeProgram.map((member, index) => (
                    <motion.div
                      key={index}
                      className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: (index % 12) * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <p className="font-semibold text-slate-900 text-sm">{member.name}</p>
                      <p className="text-slate-600 text-xs">{member.institution}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Organization Committee */}
          <AnimatedSection delay={0.4}>
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-8">{t('committee.organization')}</h3>
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {committeeOrganization.map((member, index) => (
                    <motion.div
                      key={index}
                      className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <p className="font-semibold text-slate-900">{member.name}</p>
                      <p className="text-slate-600 text-sm">{member.institution}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          {/* Sponsor Section */}
          <div className="mb-12 pb-12 border-b border-slate-800">
            <h3 className="font-semibold mb-6 text-xl text-center">{t('footer.sponsors')}</h3>
            <div className="flex justify-center">
              <div className="bg-white rounded-xl p-8 w-64 flex items-center justify-center">
                <img
                  src="kunumi-agents4good.png"
                  alt="Sponsor"
                  className="max-h-full w-auto"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
              <img 
                src="logo-se4as.svg" 
                alt="SE4AS Logo" 
                className="w-full h-full object-contain"
              />
              </div>
              <p className="text-slate-400 text-sm">
                {t('hero.title')}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">{t('footer.quickLinks')}</h3>
              <div className="flex flex-col gap-2">
                {(['overview', 'topics', 'keynotes', 'dates', 'submission', 'committee'] as const).map((link) => (
                  <a
                    key={link}
                    href={`#${link}`}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm capitalize"
                  >
                   {t(`nav.${link}`)}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">{t('footer.contact')}</h3>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=IME-USP+Sao+Paulo+SP"
                className="text-slate-400 hover:text-white transition-colors text-sm block mb-4 group"
              >
                <div className="flex flex-col">
                  <span>{t('footer.colocated')}</span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
                    {t('hero.location')}
                  </span>
                </div>
              </a>
              <a 
                href="mailto:workshop.se4as@gmail.com" 
                className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                workshop.se4as@gmail.com
              </a>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">{t('footer.followUs')}</h3>
              <div className="flex gap-4">
              {/* Instagram (SVG Manual) */}
              <motion.a
                href="https://www.instagram.com/se4asworkshop/"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg 
                  className="w-5 h-5 fill-current" 
                  role="img" 
                  viewBox="0 0 448 512" 
                  aria-hidden="true"
                >
                  <path d="M194.4 211.7a53.3 53.3 0 1 0 59.2 88.6 53.3 53.3 0 1 0 -59.2-88.6zm142.3-68.4c-5.2-5.2-11.5-9.3-18.4-12-18.1-7.1-57.6-6.8-83.1-6.5-4.1 0-7.9 .1-11.2 .1s-7.2 0-11.4-.1c-25.5-.3-64.8-.7-82.9 6.5-6.9 2.7-13.1 6.8-18.4 12s-9.3 11.5-12 18.4c-7.1 18.1-6.7 57.7-6.5 83.2 0 4.1 .1 7.9 .1 11.1s0 7-.1 11.1c-.2 25.5-.6 65.1 6.5 83.2 2.7 6.9 6.8 13.1 12 18.4s11.5 9.3 18.4 12c18.1 7.1 57.6 6.8 83.1 6.5 4.1 0 7.9-.1 11.2-.1s7.2 0 11.4 .1c25.5 .3 64.8 .7 82.9-6.5 6.9-2.7 13.1-6.8 18.4-12s09.3-11.5 12-18.4c7.2-18 6.8-57.4 6.5-83 0-4.2-.1-8.1-.1-11.4s0-7.1 .1-11.4c.3-25.5 .7-64.9-6.5-83-2.7-6.9-6.8-13.1-12-18.4l0 .2zm-67.1 44.5c18.1 12.1 30.6 30.9 34.9 52.2s-.2 43.5-12.3 61.6c-6 9-13.7 16.6-22.6 22.6s-19 10.1-29.6 12.2c-21.3 4.2-43.5-.2-61.6-12.3s-30.6-30.9-34.9-52.2 .2-43.5 12.2-61.6 30.9-30.6 52.2-34.9 43.5 .2 61.6 12.2l.1 0zm29.2-1.3c-3.1-2.1-5.6-5.1-7.1-8.6s-1.8-7.3-1.1-11.1 2.6-7.1 5.2-9.8 6.1-4.5 9.8-5.2 7.6-.4 11.1 1.1 6.5 3.9 8.6 7 3.2 6.8 3.2 10.6c0 2.5-.5 5-1.4 7.3s-2.4 4.4-4.1 6.2-3.9 3.2-6.2 4.2-4.8 1.5-7.3 1.5c-3.8 0-7.5-1.1-10.6-3.2l-.1 0zM448 96c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320zM357 389c-18.7 18.7-41.4 24.6-67 25.9-26.4 1.5-105.6 1.5-132 0-25.6-1.3-48.3-7.2-67-25.9s-24.6-41.4-25.8-67c-1.5-26.4-1.5-105.6 0-132 1.3-25.6 7.1-48.3 25.8-67s41.5-24.6 67-25.8c26.4-1.5 105.6-1.5 132 0 25.6 1.3 48.3 7.1 67 25.8s24.6 41.4 25.8 67c1.5 26.3 1.5 105.4 0 131.9-1.3 25.6-7.1 48.3-25.8 67l0 .1z"></path>
                </svg>
              </motion.a>

              {/* X / Twitter (SVG Manual) */}
              <motion.a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg 
                  className="w-5 h-5 fill-current" 
                  role="img" 
                  viewBox="0 0 448 512" 
                  aria-hidden="true"
                >
                  <path d="M357.2 48L427.8 48 273.6 224.2 455 464 313 464 201.7 318.6 74.5 464 3.8 464 168.7 275.5-5.2 48 140.4 48 240.9 180.9 357.2 48zM332.4 421.8l39.1 0-252.4-333.8-42 0 255.3 333.8z"></path>
                </svg>
              </motion.a>

              {/* Linkedin (SVG Manual) */}
              <motion.a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg 
                  className="w-5 h-5 fill-current" 
                  role="img" 
                  viewBox="0 0 448 512" 
                  aria-hidden="true"
                >
                  <path d="M416 32L31.9 32C14.3 32 0 46.5 0 64.3L0 447.7C0 465.5 14.3 480 31.9 480L416 480c17.6 0 32-14.5 32-32.3l0-383.4C448 46.5 433.6 32 416 32zM135.4 416l-66.4 0 0-213.8 66.5 0 0 213.8-.1 0zM102.2 96a38.5 38.5 0 1 1 0 77 38.5 38.5 0 1 1 0-77zM384.3 416l-66.4 0 0-104c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9l0 105.8-66.4 0 0-213.8 63.7 0 0 29.2 .9 0c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9l0 117.2z"></path>
                </svg>
              </motion.a>
            </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            <p>{t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
