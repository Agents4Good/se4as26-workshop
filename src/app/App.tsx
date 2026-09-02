import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, ChevronDown, ArrowRight, Mail, ExternalLink, Menu, X, Clock, Users, FileText, Building2, Globe2 } from 'lucide-react';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { GeometricBackground } from './components/GeometricBackground';
import { SectionConnector } from './components/SectionConnector';
import { TypewriterText } from './components/TypewriterText';
import { Countdown } from './components/Countdown';
import { AuthorsMap, type StateAuthorData, type InternationalAuthor } from './components/Authorsmap';

// Componente de Seção Animada
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDoneTyping, setIsDoneTyping] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<typeof keynotesData[0] | null>(null);
  const [selectedPaper, setSelectedPaper] = useState<typeof papersData[0] | null>(null);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    document.documentElement.style.scrollBehavior = 'smooth';

    window.scrollTo(0, 0);

    if (window.location.hash) {
      window.history.replaceState("", document.title, window.location.pathname);
    }

    const timer = setTimeout(() => {
      setIsDoneTyping(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.documentElement.style.scrollBehavior = 'auto';
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
    };
  }, []);

  const navItems = ['overview', 'topics', 'keynotes', 'dates', 'submission', 'papers', 'program', 'committee'];

  const topics = [
    "Software engineering techniques and methodologies for agentic systems",
    "Requirements engineering for agentic systems",
    "Architectures for agentic systems (e.g., single-agent, multi-agent, hierarchical)",
    "Evaluation and benchmarking of agentic systems",
    "Testing, validation, and verification of agentic systems",
    "Observability, monitoring, and debugging of agentic systems",
    "Tool use and integration in agent workflows",
    "Memory, planning, and reasoning mechanisms",
    "Coordination, communication, and collaboration in agentic systems",
    "Human-in-the-loop and hybrid agentic systems",
    "Safety, ethics, and governance of agentic systems",
    "Empirical studies and industrial experiences with agentic systems",
    "Applications of agentic systems in a range of areas, including data science, education, healthcare, and defense"
  ];

  type KeynoteSpeaker = {
  id: number;
  isPlaceholder?: boolean;
  name?: string;
  institution?: string;
  image?: string;
  topic?: string;
  abstract?: string;
  bio?: React.ReactNode;
  };

  const keynotesData: KeynoteSpeaker[] = [
  {
    id: 1,
    name: "Marcos Kalinowski",
    //institution: "PUC-Rio, Brazil",
    image: "marcos-kalinowski.jpg",
    topic: "A Research Agenda on Agents and Software Engineering",
    abstract: `Agentic systems are moving software engineering beyond applications that merely invoke LLMs toward systems that can act, coordinate,\
     adapt, use tools, maintain state, and make decisions in dynamic environments. This shift creates major opportunities for automation, \
     productivity, and new forms of human-AI collaboration, but also raises new challenges for requirements, architecture, orchestration, quality, \
     governance, sustainability, and human oversight. This keynote discusses how software engineering must evolve to support the responsible development \
     of agentic systems, while also exploring how agents can transform software engineering itself. The talk will delineate a research agenda on agents \
     and software engineering, arguing that agentic systems should not be treated as isolated AI components or experimental prototypes, but as complex \
     software-intensive systems that require robust engineering foundations, shared methods, reusable patterns, evaluation approaches, and trustworthy practices.`,
    bio: `Marcos Kalinowski is a Professor of Software Engineering at PUC-Rio, Brazil, where he leads the Software & AI Engineering Lab (SAIL), \
    supervises doctoral research, and conducts R&D projects in collaboration with industry partners. His research focuses on AI Engineering, \
    AI-Augmented Software Engineering, Empirical Software Engineering, and Human Aspects of Software Engineering, resulting in industry-adopted solutions, \
    patents, and more than 200 scientific articles, mostly published in top-tier venues. 

    This body of work has achieved significant international visibility, positioning him as the most cited software engineering scientist in Latin America in 2024, \
    2025, and 2026. Throughout his career he received over 20 distinguished paper awards, including ACM Distinguished Paper Awards at ICSE, CAIN, and CHASE. \
    He holds a research productivity fellowship from the Brazilian Research Council (CNPq), a "Scientist of the State" distinction from the Rio de Janeiro state (FAPERJ), \
    and is a fellow of the Kunumi Institute. 

    Marcos has held several prominent leadership roles in the international software engineering research community, including the roles of PC chair of ESEM, \
    Chair of the ISERN, and General Chair of ICSE. He serves the research community as an Associate Editor of IEEE Software, IEEE Transactions on Software Engineering, \
    Empirical Software Engineering, and the Journal of Systems and Software. He is an active member of ACM, IEEE, ISERN, and the Brazilian Computer Society.
    `
  },
  {
    id: 2,
    name: "Andrews Medina",
    //institution: "AI Researcher",
    image: "andrews-medina.jpeg",
    topic: "Scaling Software Development with AI: Practices, Challenges, and Open Questions",
    abstract: `The use of AI in software development is advancing rapidly, from assistants that support individual tasks to agents capable of taking on increasingly \
    complex and autonomous activities. As we try to scale this use, however, challenges arise that go beyond the models' ability to generate code and that, often, \
    resemble those we already face when scaling engineering teams: how to divide and coordinate work, share context, review results, and maintain quality.

    In the talk, Andrews Medina will bring an industry perspective on the current state of software development with AI, discussing practices that are emerging, \
    the challenges encountered in the adoption and use of agents at scale, and the questions that still remain open. More than presenting a definitive model, \
    the talk seeks to share what we are learning in practice while this new way of developing software is still being built.`,
    bio: (
      <>
        Andrews Medina has spent his career building and leading engineering teams behind large-scale systems. 
        His work combines leadership and hands-on experience—from writing code to deploying systems that serve millions of users. 
        He held leadership engineering positions at Globo.com, Jusbrasil, and Indaband, where he built and scaled teams and infrastructure to operate at high volume. 
        He is the co-creator of the open-source projects{' '}
        <a 
          href="https://tsuru.io/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="font-semibold text-slate-900 underline hover:text-slate-700 transition-colors"
        >
          tsuru.io
        </a>{' '}
        and Splinter. More recently, his focus has shifted to researching sustainable and scalable ways to build AI agents. 
        When he's not architecting distributed systems, he can be found reading or playing guitar.
      </>
    )
  }
  ];

  const importantDates = [
    { label: "Paper registration", date: "July 10, 2026" },
    { label: "Paper submission", date: "July 10, 2026" },
    { label: "Author notification", date: "August 3, 2026" },
    { label: "Camera-ready", date: "August 10, 2026" },
    { label: "Workshop date", date: "September 8, 2026" }
  ];

  type Author = { name: string; affiliation: string };
  type Paper = {
    id: string;
    title: string;
    track: string;
    session: string;
    time: string;
    authors: Author[];
  };

  function parseAuthors(raw: string): Author[] {
    return raw.split(';').map((chunk) => {
      const entry = chunk.trim();
      const match = entry.match(/^(.*)\s\(([^)]+)\)$/);
      return match
        ? { name: match[1].trim(), affiliation: match[2].trim() }
        : { name: entry, affiliation: '' };
    });
  }

  const rawPapers: { id: string; time: string; session: string; track: string; title: string; authors: string }[] = [
    {
      id: 'paper-1', time: '12:10-12:18', session: 'Technical Session 1', track: 'Position and Vision Papers',
      title: 'Humans in Control: A Methodological Framework for Quality Assurance in Agentic Software Engineering (Vision Paper)',
      authors: 'Matheus Silveira (USP, Brazil); Paulo Meirelles (USP, Brazil); Igor Steinmacher (NAU, United States of America); Fabio Kon (USP, Brazil)'
    },
    {
      id: 'paper-2', time: '12:18-12:26', session: 'Technical Session 1', track: 'Position and Vision Papers',
      title: 'Accountability in Agentic Secure Software Development Life Cycles: Challenges, Degradation Scenarios, and Governance Principles',
      authors: 'Rubens Abraão da Silva Sousa (UECE, Brazil); Gabriel Pinheiro (UECE, Brazil); Igor Ramsés Temóteo dos Santos (UECE, Brazil); Sávio Freire (Federal Institute of Ceará, Brazil); Ismayle Santos (UECE, Brazil); Paulo Maia (UECE, Brazil)'
    },
    {
      id: 'paper-3', time: '14:00-14:08', session: 'Technical Session 2', track: 'Position and Vision Papers',
      title: 'Beyond Task Completion: Product and Human-Agent Process Quality in Agentic Software Engineering',
      authors: 'Rubens Abraão da Silva Sousa (UECE, Brazil); Gabriel Pinheiro (UECE, Brazil); Evellin Moura (UECE, Brazil); Ismayle Santos (UECE, Brazil); Sávio Freire (Federal Institute of Ceará, Brazil); Paulo Maia (UECE, Brazil)'
    },
    {
      id: 'paper-4', time: '14:08-14:18', session: 'Technical Session 2', track: 'Short Papers',
      title: 'System Prompts as Specifications: Assessing the Verifiability of Claude Code Sub-Agent Behavioral Claims',
      authors: 'Débora Souza (Federal University of Campina Grande, Brazil); Pedro Lima (UFCG, Brazil)'
    },
    {
      id: 'paper-5', time: '14:18-14:26', session: 'Technical Session 2', track: 'Position and Vision Papers',
      title: 'Measure the Right Thing, at the Right Grain: Three Measurement Traps in Evaluating Code-Repair Agents',
      authors: 'João Wieland (COPPE/UFRJ, Brazil); Diego Castro (CEFET/RJ, Brazil); Claudia Werner (COPPE/UFRJ, Brazil)'
    },
    {
      id: 'paper-6', time: '14:26-14:36', session: 'Technical Session 2', track: 'Short Papers',
      title: 'Benchmarking Agentic Frameworks for Incremental Software Evolution',
      authors: 'Vitor Linhares (UECE, Brazil); Anderson Gomes (UECE, Brazil); Ingrid Vieira (UECE, Brazil); Paulo Maia (UECE, Brazil)'
    },
    {
      id: 'paper-7', time: '14:36-14:46', session: 'Technical Session 2', track: 'Short Papers',
      title: 'Fairness Risk Triage in Pull Requests Using an LLM-Based Reviewer: An Experiment on Prompting Strategies',
      authors: 'Gabriel Fernandes de Oliveira Caitano (UFMS, Brazil); Arthur Cacciatore (UFMS, Brazil); Awdren de Lima Fontão (Federal University of Mato Grosso do Sul, Brazil)'
    },
    {
      id: 'paper-8', time: '15:10-15:20', session: 'Technical Session 3', track: 'Short Papers',
      title: 'Agentes de Codificação de IA como Prática Colaborativa: Implicações para Equipes de Desenvolvimento de Software',
      authors: 'Lucas Feksa Hickmann (UFRGS, Brazil); Barbara de Jesus Hoch (UFRGS, Brazil); Rafael Parizi (IFFar, Brazil); Leticia Machado (UFRGS, Brazil)'
    },
    {
      id: 'paper-9', time: '15:20-15:28', session: 'Technical Session 3', track: 'Position and Vision Papers',
      title: 'Agile Management for Foundation Model Based Agentic Systems: A Vision',
      authors: 'Lucas Romão (PUC-Rio, Brazil); Yasmin Sandes (PUC-Rio, Brazil); Gabriel Mariquito (PUC-Rio, Brazil); José Matheus Boaro (PUC-Rio, Brazil); Marcos Antonio Alves (UFMG, Brazil); Marcos Kalinowski (PUC-Rio, Brazil)'
    },
    {
      id: 'paper-10', time: '15:28-15:38', session: 'Technical Session 3', track: 'Short Papers',
      title: 'From Meeting Audio to Requirements: A Generative-AI Multi-Agent Pipeline',
      authors: 'Gabriel Silva (INF/UFG, Brazil); Jacson Rodrigues Barbosa (UFG, Brazil); Paulo Marcos Soares Rodrigues (Goiás State Government); Heitor Rodrigues (UFG, Brazil)'
    },
    {
      id: 'paper-11', time: '15:38-15:46', session: 'Technical Session 3', track: 'Position and Vision Papers',
      title: 'Towards a Perspective-Based Multi-Agent Architecture for Requirements Engineering of ML-Enabled Systems',
      authors: 'José Matheus Boaro (PUC-Rio, Brazil); Matheus Soranço (PUC-Rio, Brazil); Marcos Kalinowski (PUC-Rio, Brazil)'
    },
    {
      id: 'paper-12', time: '17:30-17:40', session: 'Technical Session 4', track: 'Short Papers',
      title: 'Towards an Agentic MAPE-K Architecture for Self-Adaptive Robotic Arm Systems',
      authors: 'Joaquim Ribeiro (State University of Ceara, Brazil); Beatriz Andrade (UECE, Brazil); Suyane Freitas (UECE, Brazil); Lucas Vieira Alves (State University of Ceara, Brazil); Paulo Maia (UECE, Brazil)'
    },
    {
      id: 'paper-13', time: '17:40-17:48', session: 'Technical Session 4', track: 'Position and Vision Papers',
      title: 'Towards Agentic Research Problem Engineering: A Vision for Human-AI Collaboration in Software Engineering Research',
      authors: 'Anrafel Fernandes Pereira (PUC-Rio, Brazil); Rafael Tomaz (PUC-Rio, Brazil); Paloma Guenes Costa (PUC-Rio, Brazil); Eduardo Almentero (UFRRJ, Brazil); Allysson Allex Araújo (Universidade Federal do Cariri, Brazil); Marcos Kalinowski (PUC-Rio, Brazil)'
    },
    {
      id: 'paper-14', time: '17:48-17:58', session: 'Technical Session 4', track: 'Industrial Experience Reports',
      title: 'HemaChat: Lessons Learned from Developing a Multi-Agent Healthcare Chatbot for Sickle Cell Disease Care',
      authors: 'David Pereira (UFCG, Brazil); Herman Martins Gomes (UFCG, Brazil); Cláudio Elízio Calazans Campelo (UFCG, Brazil); Eliane Araújo (UFCG, Brazil)'
    },
    {
      id: 'paper-15', time: '17:58-18:12', session: 'Technical Session 4', track: 'Short Papers',
      title: 'Improving Agentic AI Opportunity Identification Through GORE Driven Prompt Engineering',
      authors: 'Edson Andrade de Moraes (PUC-Rio, Brazil); Marcos Kalinowski (PUC-Rio, Brazil)'
    }
  ];

  type ScheduleItem = {
    time: string;
    type: 'opening' | 'keynote' | 'session' | 'paper' | 'qa' | 'break' | 'closing';
    title?: string;
    speaker?: string;
    paperId?: string;
  };
  
  const programSchedule: ScheduleItem[] = [
    { time: '11:00', type: 'opening', title: 'Opening Remarks' },
    { time: '11:10', type: 'keynote', title: 'A Research Agenda on Agents and Software Engineering', speaker: 'Marcos Kalinowski' },
    
    { time: '12:10', type: 'session', title: 'Technical Session 1' },
    { time: '12:10', type: 'paper', paperId: 'paper-1' },
    { time: '12:18', type: 'paper', paperId: 'paper-2' },
    { time: '12:26', type: 'qa', title: 'Q&A Session (Technical Session 1)' },
    
    { time: '12:30', type: 'break', title: 'Lunch' },
    
    { time: '14:00', type: 'session', title: 'Technical Session 2' },
    { time: '14:00', type: 'paper', paperId: 'paper-3' },
    { time: '14:08', type: 'paper', paperId: 'paper-4' },
    { time: '14:18', type: 'paper', paperId: 'paper-5' },
    { time: '14:26', type: 'paper', paperId: 'paper-6' },
    { time: '14:36', type: 'paper', paperId: 'paper-7' },
    { time: '14:46', type: 'qa', title: 'Q&A Session (Technical Session 2)' },
  
    { time: '15:10', type: 'session', title: 'Technical Session 3' },
    { time: '15:10', type: 'paper', paperId: 'paper-8' },
    { time: '15:20', type: 'paper', paperId: 'paper-9' },
    { time: '15:28', type: 'paper', paperId: 'paper-10' },
    { time: '15:38', type: 'paper', paperId: 'paper-11' },
    { time: '15:46', type: 'qa', title: 'Q&A Session (Technical Session 3)' },
  
    { time: '16:00', type: 'break', title: 'Coffee Break' },
    { time: '16:30', type: 'keynote', title: 'Scaling Software Development with AI: Practices, Challenges, and Open Questions', speaker: 'Andrews Medina' },
  
    { time: '17:30', type: 'session', title: 'Technical Session 4' },
    { time: '17:30', type: 'paper', paperId: 'paper-12' },
    { time: '17:40', type: 'paper', paperId: 'paper-13' },
    { time: '17:48', type: 'paper', paperId: 'paper-14' },
    { time: '17:58', type: 'paper', paperId: 'paper-15' },
    { time: '18:12', type: 'qa', title: 'Q&A Session (Technical Session 4)' },
  
    { time: '18:20', type: 'closing', title: 'Closing Remarks and Awards' }
  ];

  const papersData: Paper[] = rawPapers.map((p) => ({
    id: p.id,
    title: p.title,
    track: p.track,
    session: p.session,
    time: p.time,
    authors: parseAuthors(p.authors)
  }));

  const trackStyles: Record<string, string> = {
    'Position and Vision Papers': 'bg-violet-50 text-violet-700 border-violet-200',
    'Short Papers': 'bg-sky-50 text-sky-700 border-sky-200',
    'Industrial Experience Reports': 'bg-emerald-50 text-emerald-700 border-emerald-200'
  };

  const trackCounts = papersData.reduce((acc, paper) => {
    acc[paper.track] = (acc[paper.track] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const trackOrder = ['Position and Vision Papers', 'Short Papers', 'Industrial Experience Reports'];

  // Some institutions appear under more than one name in the raw affiliations
  // (acronym vs. full name), so they're normalized here to avoid double counting.
  const institutionAliases: Record<string, string> = {
    'Federal University of Campina Grande': 'UFCG',
    'State University of Ceara': 'UECE',
    'INF/UFG': 'UFG',
    'Federal University of Mato Grosso do Sul': 'UFMS'
  };

  const institutionMap = new Map<string, Set<string>>();
  papersData.forEach((paper) => {
    const uniqueInstitutions = new Set(
      paper.authors
        .map((a) => a.affiliation.split(',')[0].trim())
        .filter(Boolean)
        .map((inst) => institutionAliases[inst] ?? inst)
    );
    uniqueInstitutions.forEach((inst) => {
      if (!institutionMap.has(inst)) institutionMap.set(inst, new Set());
      institutionMap.get(inst)!.add(paper.id);
    });
  });
  const institutionStats = Array.from(institutionMap.entries())
    .map(([name, ids]) => ({ name, count: ids.size }))
    .sort((a, b) => b.count - a.count);

  const totalInstitutions = institutionMap.size;
  const totalAuthors = new Set(papersData.flatMap((p) => p.authors.map((a) => a.name))).size;
  const isInternational = (affiliation: string) => affiliation.includes('United States');
  const internationalPapers = papersData.filter((p) => p.authors.some((a) => isInternational(a.affiliation))).length;

  const institutionLocations: Record<string, { state: string | null; country: string }> = {
    'UFCG': { state: 'pb', country: 'Brazil' },
    'UECE': { state: 'ce', country: 'Brazil' },
    'Federal Institute of Ceará': { state: 'ce', country: 'Brazil' },
    'Universidade Federal do Cariri': { state: 'ce', country: 'Brazil' },
    'USP': { state: 'sp', country: 'Brazil' },
    'PUC-Rio': { state: 'rj', country: 'Brazil' },
    'COPPE/UFRJ': { state: 'rj', country: 'Brazil' },
    'CEFET/RJ': { state: 'rj', country: 'Brazil' },
    'UFRRJ': { state: 'rj', country: 'Brazil' },
    'UFMG': { state: 'mg', country: 'Brazil' },
    'UFRGS': { state: 'rs', country: 'Brazil' },
    'IFFar': { state: 'rs', country: 'Brazil' },
    'UFG': { state: 'go', country: 'Brazil' },
    'Goiás State Government': { state: 'go', country: 'Brazil' },
    'UFMS': { state: 'ms', country: 'Brazil' },
    'NAU': { state: null, country: 'United States' }
  };

  const stateMap = new Map<string, { authors: Set<string>; institutions: Set<string> }>();
  const internationalAuthorsMap = new Map<string, { institution: string; country: string }>();

  papersData.forEach((paper) => {
    paper.authors.forEach((author) => {
      const rawInst = author.affiliation.split(',')[0].trim();
      if (!rawInst) return;
      const inst = institutionAliases[rawInst] ?? rawInst;
      const location = institutionLocations[inst];
      if (!location) return;

      if (location.state) {
        if (!stateMap.has(location.state)) {
          stateMap.set(location.state, { authors: new Set(), institutions: new Set() });
        }
        const entry = stateMap.get(location.state)!;
        entry.authors.add(author.name);
        entry.institutions.add(inst);
      } else {
        internationalAuthorsMap.set(author.name, { institution: inst, country: location.country });
      }
    });
  });

  const authorsMapData: StateAuthorData[] = Array.from(stateMap.entries()).map(([stateId, entry]) => ({
    stateId,
    count: entry.authors.size,
    institutions: Array.from(entry.institutions)
  }));

  const internationalAuthorsList: InternationalAuthor[] = Array.from(internationalAuthorsMap.entries())
    .map(([name, { institution, country }]) => ({ name, institution, country }));

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
    { name: "João Brunet", institution: "UFCG" },
    { name: "João Eduardo Montandon", institution: "UFMG" },
    { name: "Leandro Marinho", institution: "UFCG" },
    { name: "Marcelo D'Amorim", institution: "UFPE" },
    { name: "Marcelo Maia", institution: "UFU" },
    { name: "Mário Ribeiro", institution: "UFAL" },
    { name: "Patrícia Machado", institution: "UFCG" },
    { name: "Paulo Maia", institution: "UECE" },
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
            <motion.div className="flex items-center gap-3 pl-2 sm:pl-0" whileHover={{ scale: 1.02 }}>
              <div className="w-16 h-12 flex items-center justify-center">
                <img src="logo-se4as.svg" alt="SE4AS Logo" className="w-full h-full object-contain scale-175" />
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              {navItems.map((item) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-200 capitalize text-sm font-medium"
                  whileHover={{ y: -1 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-600 hover:text-slate-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className="text-slate-600 text-lg font-medium capitalize"
                    onClick={(e) => {
                      e.preventDefault();
                    
                      setIsMenuOpen(false);
                    
                      setTimeout(() => {
                        const section = document.getElementById(item);
                        if (section) {
                          section.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 300);
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 md:pt-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      >
        <GeometricBackground isDark={true} />

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start gap-7">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Badge className="mb-6 bg-slate-800 text-slate-200 border-slate-700">
                    Co-located with CBSoft 2026
                  </Badge>
                </motion.div>

                <motion.img
                  src="logo-branca.svg"
                  alt="SE4AS 2026 Logo"
                  className="h-10 md:h-18 w-auto mb-6 object-contain mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />

                <motion.div
                  className={`text-lg md:text-2xl text-slate-300 mb-12 leading-relaxed min-h-[6rem] md:min-h-[4rem] ${!isDoneTyping ? 'notranslate' : ''}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <TypewriterText 
                    text="I Workshop on Software Engineering for Agentic Systems" 
                    delay={1000} 
                    speed={50} 
                  />
                </motion.div>
              </div>
              <motion.div
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 text-slate-300 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                <div className="flex items-center justify-center gap-3 bg-slate-800/50 backdrop-blur-sm px-5 py-3 rounded-lg border border-slate-700">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium">September 8, 2026</span>
                </div>
                
                <motion.a 
                  href="https://www.google.com/maps/search/?api=1&query=IME-USP+Sao+Paulo+SP"
                  target="_blank"
                  className="flex items-center justify-center gap-3 bg-slate-800/50 backdrop-blur-sm px-5 py-3 rounded-lg border border-slate-700 text-slate-300 hover:text-white transition-all group"
                  whileHover={{ scale: 1.02 }}
                >
                  <MapPin className="w-4 h-4 text-slate-400 group-hover:text-white" />
                  <span className="text-sm font-medium">IME - USP, São Paulo, SP</span>
                </motion.a>
              </motion.div>

              <motion.div
                className="flex flex-wrap justify-center lg:justify-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2 }}
              >
                <Button 
                  className="bg-slate-100 hover:bg-white text-slate-900 px-8 py-6 w-full sm:w-auto"
                  onClick={() => document.getElementById('submission')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Submit Your Paper <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  className="bg-slate-100 hover:bg-white text-slate-900 px-8 py-6 w-full sm:w-auto"
                  onClick={() => window.open('https://cbsoft.sbc.org.br/2026/pt/cbsoft/', '_blank')}
                >
                  CBSoft 2026 <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex justify-center items-center"
            >
              <Countdown />
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </motion.div>
      </motion.section>

      {/* Transition to Light */}
      <div className="text-slate-100">
        <SectionConnector />
      </div>

      {/* Overview Section - Light Theme */}
      <section id="overview" className="scroll-mt-24 relative py-24 px-6 bg-white">
        <GeometricBackground isDark={false} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-1 bg-slate-800" />
              <h2 className="text-5xl font-bold text-slate-900">
                Overview
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-16">
            <AnimatedSection delay={0.2}>
              <div className="space-y-6">
                <p className="text-slate-700 leading-relaxed text-lg">
                  In recent years, advances in foundation models, Large Language Models (LLMs), 
                  and autonomous systems have driven the emergence of Agentic Systems—systems composed of agents capable of perception, 
                  planning, decision-making, and continuous action in dynamic and uncertain environments.
                </p>
                <p className="text-slate-700 leading-relaxed text-lg">
                  These systems introduce challenges that differ from traditional LLM-based applications, as they maintain state, 
                  interact with external tools, coordinate multiple entities, and operate in an iterative, goal-oriented manner.
                </p>
                <p className="text-slate-700 leading-relaxed text-lg">
                  Despite their rapid growth, there are still methodological, architectural, and software engineering gaps that hinder the robust, 
                  reliable, and responsible development of these systems.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="bg-slate-50 rounded-2xl p-10 border border-slate-200 shadow-sm">
                <h3 className="text-2xl font-semibold text-slate-900 mb-6">
                  Workshop Goals
                </h3>
                <p className="text-slate-700 mb-8 leading-relaxed">
                  SE4AS aims to consolidate a scientific and technical agenda by bringing together 
                  researchers and industry practitioners interested in Software Engineering for Agentic Systems. 
                  The workshop seeks to promote a structured exchange of experiences, challenges, and solutions, contributing to:
                </p>
                <div className="space-y-4">
                  {[
                    "Identification of open research challenges",
                    "Consolidation of a common vocabulary in Agentic Engineering",
                    "Discussion of architectural and methodological approaches",
                    "Encouragement of inter-institutional collaborations",
                    "Development of a research agenda for the coming years"
                  ].map((goal, index) => (
                    <motion.div
                      key={index}
                      className="flex gap-3 items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-800 mt-2 flex-shrink-0" />
                      <span className="text-slate-700">{goal}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section id="topics" className="scroll-mt-24 relative py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-1 bg-slate-800" />
              <h2 className="text-5xl font-bold text-slate-900">
                Topics of Interest
              </h2>
            </div> 
            <p className="text-slate-600 mb-12 text-lg ml-16">Topics of interest include, but are not limited to:</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {topics.map((topic, index) => (
              <AnimatedSection key={index} delay={index * 0.03}>
                <motion.div
                  className="bg-white p-6 rounded-lg border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all duration-300 h-full"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-slate-800 mt-2 flex-shrink-0" />
                    <p className="text-slate-700 leading-relaxed text-sm">
                      {topic}
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Keynotes Section */}
      <section id="keynotes" className="scroll-mt-24 relative py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-1 bg-slate-800" />
              <h2 className="text-5xl font-bold text-slate-900">
                Keynote Speakers
              </h2>
            </div>
            <p className="text-slate-600 mb-16 text-lg ml-16">Leading experts in agentic systems and software engineering</p>
          </AnimatedSection>

          {/* Grid de Cards Dinâmicos */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {keynotesData.map((speaker) => {
              if (speaker.isPlaceholder) {
                return (
                  <AnimatedSection key={speaker.id} delay={0.2}>
                    <motion.div
                    className="group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-500 relative flex flex-col h-full cursor-pointer"
                    whileHover={{ y: -8 }}
                    >
                      <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden relative flex flex-col h-full opacity-75 select-none pointer-events-none">
                        {/* To be announced */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 flex items-center justify-center">
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 blur-xl" />
                          <div className="relative w-20 h-20 rounded-full bg-slate-300/80 animate-pulse border-2 border-white/40" />
                        </div>

                        <div className="p-6 flex flex-col flex-1 justify-between bg-white border-t border-slate-100">
                          <div className="space-y-4">
                            <div>
                              <div className="h-5 bg-slate-200 rounded w-2/3 mb-2 animate-pulse" />
                              <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse" />
                            </div>
                            
                            <div className="pt-2">
                              <p className="text-xs uppercase tracking-wider font-bold text-slate-300 mb-2">Topic</p>
                              <div className="space-y-2">
                                <div className="h-3.5 bg-slate-100 rounded w-full animate-pulse" />
                                <div className="h-3.5 bg-slate-100 rounded w-4/5 animate-pulse" />
                              </div>
                            </div>
                          </div>

                          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-center text-sm text-slate-400 font-medium italic">
                            <span>To be announced</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatedSection>
                );
              }

              const isAnnounced = speaker.topic && speaker.topic.trim() !== "";

              return (
                <AnimatedSection key={speaker.id} delay={0.1}>
                  <motion.div
                    className="group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-500 relative flex flex-col h-full cursor-pointer"
                    whileHover={{ y: -8 }}
                    onClick={() => setSelectedSpeaker(speaker)}
                  >
                    {/* Imagem do Palestrante */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <img 
                        src={speaker.image} 
                        alt={speaker.name} 
                        className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <span className="text-white text-sm font-medium flex items-center gap-2">
                          View profile & details <ArrowRight size={16} />
                        </span>
                      </div>
                    </div>

                    {/* Informações Básicas do Card */}
                    <div className="p-6 flex flex-col flex-1 justify-between bg-white border-t border-slate-100">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-0.5">{speaker.name}</h3>
                        <p className="text-sm text-slate-500 mb-4">{speaker.institution}</p>
                        
                        <p className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1">Topic</p>
                        {isAnnounced ? (
                          <p className="text-slate-700 font-medium text-sm line-clamp-2 leading-snug">
                            {speaker.topic}
                          </p>
                        ) : (
                          <p className="text-slate-400 italic text-sm">To be announced</p>
                        )}
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-600 font-medium group-hover:text-slate-900 transition-colors">
                        <span>Read Full Details</span>
                        <ChevronDown size={18} className="rotate-270 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>

        {/* Painel do Drawer Lateral */}
        <AnimatePresence>
          {selectedSpeaker && (
            <>
              {/* Fundo Escurecido (Backdrop) */}
              <motion.div 
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedSpeaker(null)}
              />

              {/* Corpo Lateral */}
              <motion.div 
                className="fixed right-0 top-0 bottom-0 w-full md:max-w-xl lg:max-w-2xl xl:max-w-3xl bg-white shadow-2xl z-50 p-8 md:p-10 overflow-y-auto flex flex-col"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 32, stiffness: 260 }}
              >
                <button 
                  onClick={() => setSelectedSpeaker(null)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="space-y-6 mt-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <img 
                      src={selectedSpeaker.image} 
                      alt={selectedSpeaker.name} 
                      className="w-24 h-24 rounded-2xl object-cover object-top border border-slate-200 shadow-sm" 
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{selectedSpeaker.name}</h3>
                      <p className="text-base text-slate-500 font-medium">{selectedSpeaker.institution}</p>
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {selectedSpeaker.topic ? (
                    <>
                      <div className="space-y-1">
                        <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400">Topic</h4>
                        <p className="text-lg font-bold text-slate-900 leading-snug">{selectedSpeaker.topic}</p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400">Abstract</h4>
                        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
                          {selectedSpeaker.abstract}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-100 border-dashed">
                      <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400">Talk Information</h4>
                      <p className="text-slate-500 italic text-sm">Topic and abstract will be announced soon.</p>
                    </div>
                  )}

                  {selectedSpeaker.bio && (
                    <div className="space-y-2">
                      <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400">Biography</h4>
                      <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                        {selectedSpeaker.bio}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </section>

      {/* Important Dates */}
      <section id="dates" className="scroll-mt-24 relative py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-16">
              <div className="w-12 h-1 bg-slate-800" />
              <h2 className="text-5xl font-bold text-slate-900">
                Important Dates
              </h2>
            </div>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              {importantDates.map((item, index) => {
                const isPaperRegistration = item.label.toLowerCase().includes("paper registration");

                return (
                  <AnimatedSection key={index} delay={index * 0.08}>
                    <motion.div
                      className={`group py-6 px-8 border-b border-slate-200 last:border-b-0 transition-all duration-300
                        ${isPaperRegistration ? 'bg-amber-50/50 hover:bg-amber-50' : 'hover:bg-slate-50'}`}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className={`text-slate-700 group-hover:text-slate-900 transition-colors duration-300
                            ${isPaperRegistration ? 'font-medium text-slate-900' : ''}`}>
                            {item.label}
                          </span>
                          
                          {isPaperRegistration && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                              New Date
                            </span>
                          )}
                        </div>

                        <span className={`font-semibold text-lg transition-colors duration-300
                          ${isPaperRegistration ? 'text-amber-700' : 'text-slate-900'}`}>
                          {item.date}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatedSection>
                );
              })}
            </div>
            
            <AnimatedSection delay={0.5}>
              <p className="mt-8 text-slate-500 italic text-center">
                All deadlines are 23:59 AoE (Anywhere on Earth)
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Submission Guidelines */}
      <section id="submission" className="scroll-mt-24 relative py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-16">
              <div className="w-12 h-1 bg-slate-800" />
              <h2 className="text-5xl font-bold text-slate-900">
                Submission Guidelines
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-slate-50 rounded-2xl p-10 border border-slate-200 space-y-8 mb-16">
              <div>
                <p className="text-slate-700 leading-relaxed mb-6">
                  Authors must submit original work that has not been published elsewhere and is not currently under review. Papers may be written in Portuguese or English.
                </p>
                <p className="text-slate-700 leading-relaxed mb-6">
                  Submissions must be in Adobe Portable Document Format (PDF) and must strictly be formatted according to the{' '}
                  <a 
                    href="https://www.overleaf.com/read/cyhpwwkngcwk#baf5f5" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-900 font-semibold underline hover:text-slate-600 transition-colors"
                  >
                    CBSoft template
                  </a>
                  {' '}(
                  <a 
                    href="https://cbsoft.sbc.org.br/2026/Template_para_eventos_do_CBSoft.zip" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-900 font-semibold underline hover:text-slate-600 transition-colors"
                  >
                    download
                  </a>
                  ).
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mb-4">We invite the following types of submissions:</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
                  <li>Short papers (6 pages, including all figures, tables, acknowledgments, and references)</li>
                  <li>Position and vision papers (4 pages, including all figures, tables, acknowledgments, and references)</li>
                  <li>Industrial experience reports (4 pages, including all figures, tables, acknowledgments, and references)</li>
                  <li>Tool, framework, or benchmark proposals (2 pages, including all figures, tables, acknowledgments, and references)</li>
                </ul>

                <p className="text-slate-700 leading-relaxed mb-6">
                  Papers must be registered and submitted through the{' '}
                  <a 
                    href="https://jems3.sbc.org.br/se4as2026" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-900 font-semibold underline hover:text-slate-600 transition-colors"
                  >
                    JEMS 3
                  </a>
                  {' '}system.
                </p>

                <p className="text-slate-700 leading-relaxed mb-6">
                During submission registration, authors must provide the title, authors, abstract, topics of interest, and the language of the paper.
                </p>

                <p className="text-slate-700 leading-relaxed mb-6">
                SE4AS adopts a double-anonymous review process. Submission documents must omit the names and affiliations of the authors. 
                Authors should follow standard anonymization practices; for reference, please consult the anonymization guidelines from the{' '}
                  <a 
                    href="https://cbsoft.sbc.org.br/2026/pt/symposiums/sbes/pesquisa/call/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-900 font-semibold underline hover:text-slate-600 transition-colors"
                  >
                    SBES Call for Papers
                  </a>
                  {' '}.
                </p>

                <p className="text-slate-700 leading-relaxed mb-6">
                Submitted papers will be evaluated based on their relevance to the workshop, clarity, originality, and potential to stimulate discussion, considering the exploratory and interdisciplinary nature of the event.
                </p>

                <p className="text-slate-700 leading-relaxed mb-6">
                  The publication of accepted papers requires that{' '}
                  <strong className="font-semibold">
                    at least one of the authors register for SE4AS/CBSoft 2026
                  </strong>
                  , in accordance with the registration policies of the event, and present the paper in person at the workshop. 
                  Papers that are not presented will not be included in the SE4AS proceedings.
                </p>

                <p className="text-slate-700 leading-relaxed mb-6">
                  All submitted papers must comply with the{' '}
                  <a 
                    href="https://sol.sbc.org.br/index.php/indice/conduta" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-900 font-semibold underline hover:text-slate-600 transition-colors"
                  >
                    Code of Conduct for Authors in Publications of the Brazilian Computer Society (SBC)
                  </a>
                  .
                </p>

                <p className="text-slate-700 leading-relaxed mb-6">
                  Regarding the Use of AI or AI-Assisted Technologies, by submitting a paper, authors acknowledge compliance with the generative AI policies adopted by{' '}
                  <a 
                    href="https://cbsoft.sbc.org.br/2026/pt/symposiums/sbes/pesquisa/call/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-900 font-semibold underline hover:text-slate-600 transition-colors"
                  >
                    CBSoft/SBES
                  </a>
                  , IEEE, ACM, and Springer.
                </p>

                <motion.div
                  className="bg-amber-50 border border-amber-200 rounded-xl p-6"
                  whileHover={{ scale: 1.01 }}
                >
                  <p className="text-amber-900">
                    <strong className="font-semibold">Note:</strong> Papers that fall outside the scope of the workshop or that do not comply with the required formatting and policies will be desk-rejected without undergoing the review process.
                  </p>
                </motion.div>
                <div className="border-t border-slate-200 mt-6 pt-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Distinguished Paper Award</h3>
                  <p className="text-slate-700 leading-relaxed mb-2">
                  A Distinguished Paper Award will be presented to the best paper selected by the Program  Committee.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Accepted Papers Section */}
      <section id="papers" className="scroll-mt-24 relative py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-1 bg-slate-800" />
              <h2 className="text-5xl font-bold text-slate-900">
                Accepted Papers
              </h2>
            </div>
            <p className="text-slate-600 mb-16 text-lg ml-16">
              15 papers accepted, spanning position &amp; vision papers, short papers, and industrial experience reports
            </p>
          </AnimatedSection>

          {/* Papers Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {papersData.map((paper, index) => (
              <motion.div
                key={paper.id}
                className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 h-full flex flex-col cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 6) * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedPaper(paper)}
              >
                <span className={`inline-flex self-start items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border mb-4 ${trackStyles[paper.track] ?? 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                  {paper.track}
                </span>
                <p className="text-slate-900 font-semibold text-sm leading-snug mb-4 flex-1">
                  {paper.title}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium group-hover:text-slate-900 transition-colors">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    {paper.authors.length} author{paper.authors.length > 1 ? 's' : ''}
                  </span>
                  <span className="flex items-center gap-1">
                    Details <ChevronDown size={14} className="rotate-270" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Infographics: By the Numbers */}
          <AnimatedSection delay={0.1}>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-1 bg-slate-800" />
              <h3 className="text-3xl font-bold text-slate-900">By the Numbers</h3>
            </div>
          </AnimatedSection>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Accepted Papers', value: papersData.length, icon: FileText },
              { label: 'Contributing Institutions', value: totalInstitutions, icon: Building2 },
              { label: 'Authors Involved', value: totalAuthors, icon: Users },
              { label: 'International Collaborations', value: internationalPapers, icon: Globe2 }
            ].map((stat, index) => (
              <AnimatedSection key={stat.label} delay={0.1 + index * 0.05}>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full">
                  <stat.icon className="w-5 h-5 text-slate-400 mb-3" />
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Left column: Track distribution + Contributing Institutions, stacked */}
            <div className="flex flex-col gap-8">
              {/* Track Distribution */}
              <AnimatedSection delay={0.2}>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                  <h4 className="text-lg font-semibold text-slate-900 mb-8">Papers by Track</h4>
                  <div className="space-y-6">
                    {trackOrder.map((track, index) => {
                      const count = trackCounts[track] || 0;
                      const percent = Math.round((count / papersData.length) * 100);
                      const barColor =
                        track === 'Position and Vision Papers' ? 'bg-violet-500' :
                        track === 'Short Papers' ? 'bg-sky-500' : 'bg-emerald-500';
                      return (
                        <div key={track}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-700">{track}</span>
                            <span className="text-sm text-slate-500">{count} paper{count !== 1 ? 's' : ''}</span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full ${barColor} rounded-full`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${percent}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AnimatedSection>

              {/* Institutions Cloud */}
              <AnimatedSection delay={0.3}>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                  <h4 className="text-lg font-semibold text-slate-900 mb-1">Papers by Institution</h4>
                  <p className="text-slate-500 text-sm mb-8">
                  Number of accepted papers co-authored by each institution, with each paper counted for all participating institutions
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {institutionStats.map((inst, index) => {
                      const ratio = inst.count / institutionStats[0].count;
                      const fontSize = 0.8 + ratio * 0.7;
                      const tier =
                        ratio > 0.75 ? 'bg-slate-900 text-white border-slate-900' :
                        ratio > 0.5 ? 'bg-slate-700 text-white border-slate-700' :
                        ratio > 0.25 ? 'bg-slate-200 text-slate-800 border-slate-300' :
                        'bg-slate-50 text-slate-600 border-slate-200';
                      return (
                        <motion.div
                          key={inst.name}
                          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 border font-medium leading-none ${tier}`}
                          style={{ fontSize: `${fontSize}rem` }}
                          initial={{ opacity: 0, scale: 0.85 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: index * 0.03 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.06 }}
                        >
                          <span>{inst.name}</span>
                          <span className="opacity-70 text-xs">{inst.count}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right column: Authors Map, matching the stacked column's height */}
            <AnimatedSection delay={0.35} className="lg:h-full">
              <AuthorsMap
                data={authorsMapData}
                internationalAuthors={internationalAuthorsList}
                title="Where Authors Are From"
                subtitle="Hover a highlighted state to see its institutions"
              />
            </AnimatedSection>
          </div>

        </div>

        {/* Paper Details Drawer */}
        <AnimatePresence>
          {selectedPaper && (
            <>
              <motion.div
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPaper(null)}
              />

              <motion.div
                className="fixed right-0 top-0 bottom-0 w-full md:max-w-xl lg:max-w-2xl xl:max-w-3xl bg-white shadow-2xl z-50 p-8 md:p-10 overflow-y-auto flex flex-col"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 32, stiffness: 260 }}
              >
                <button
                  onClick={() => setSelectedPaper(null)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="space-y-6 mt-6">
                  <div className="space-y-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${trackStyles[selectedPaper.track] ?? 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                      {selectedPaper.track}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 leading-snug">{selectedPaper.title}</h3>
                  </div>

                  <hr className="border-slate-100" />

                  <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400">
                      Authors & Affiliations
                    </h4>
                    <div className="space-y-2">
                      {selectedPaper.authors.map((author, i) => (
                        <div key={i} className="flex items-start justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <span className="font-medium text-slate-900 text-sm">{author.name}</span>
                          {author.affiliation && (
                            <span className="text-slate-500 text-sm text-right flex-shrink-0">{author.affiliation}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </section>

      {/* Program Section */}
      <section id="program" className="scroll-mt-24 relative py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-1 bg-slate-800" />
              <h2 className="text-5xl font-bold text-slate-900">
                Program Schedule
              </h2>
            </div>
            <p className="text-slate-600 mb-12 text-lg ml-16">
            Full schedule for September 8, 2026. All times are local (BRT).
            </p>
          </AnimatedSection>

          <div className="max-w-full mx-auto space-y-4">
            {programSchedule.map((item, index) => {
              // Item do tipo Artigo
              if (item.type === 'paper') {
                const paper = papersData.find((p) => p.id === item.paperId);
                if (!paper) return null;

                return (
                  <AnimatedSection key={index} delay={0.02}>
                    <motion.div
                      onClick={() => setSelectedPaper(paper)}
                      whileHover={{ x: 4 }}
                      className="p-5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start gap-2.5 flex-1">
                          <span className="shrink-0 whitespace-nowrap flex items-center gap-1 text-xs font-mono font-bold px-2 py-0.5 bg-slate-200 text-slate-800 rounded mt-0.5">
                            <Clock className="w-3 h-3 text-slate-500" />
                            {item.time}
                          </span>
                          <div className="space-y-1 flex-1">
                            <h4 className="font-semibold text-slate-900 text-base leading-snug group-hover:text-slate-800">
                              {paper.title}
                            </h4>
                            <p className="text-xs text-slate-500">
                              {paper.authors.map(a => a.name).join(', ')}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-xs font-medium text-slate-400 group-hover:text-slate-900 transition-colors self-end sm:self-center">
                        Details <ChevronDown size={14} className="rotate-270 ml-1" />
                      </div>
                    </motion.div>
                  </AnimatedSection>
                );
              }

              // Item do tipo Keynote
              if (item.type === 'keynote') {
                const speakerObj = keynotesData.find(k => k.name && item.speaker?.includes(k.name));
                return (
                  <AnimatedSection key={index} delay={0.02}>
                    <motion.div
                      onClick={() => speakerObj && setSelectedSpeaker(speakerObj)}
                      whileHover={{ scale: 1.01 }}
                      className="p-5 bg-slate-900 text-white rounded-xl shadow-md cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1.5 text-xs font-mono font-bold px-2 py-0.5 bg-slate-800 text-slate-200 rounded border border-slate-700">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {item.time}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Keynote Talk
                          </span>
                        </div>
                        <h4 className="font-bold text-lg text-white">{item.title}</h4>
                        <p className="text-sm text-slate-300">{item.speaker}</p>
                      </div>
                      <span className="text-xs font-medium text-slate-300 group-hover:text-white flex items-center gap-1 self-end sm:self-center">
                        Speaker Profile <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </motion.div>
                  </AnimatedSection>
                );
              }

              // Cabeçalho de Sessão Técnica (Com divisor nativo da página)
              if (item.type === 'session') {
                return (
                  <AnimatedSection key={index} delay={0.02}>
                    <div className="pt-10 pb-4 flex items-center justify-between border-b border-slate-200 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-1 bg-slate-800" />
                        <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
                      </div>
                      <span className="flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md border border-slate-200">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {item.time}
                      </span>
                    </div>
                  </AnimatedSection>
                );
              }

              // Breaks (Coffee / Lunch)
              if (item.type === 'break') {
                return (
                  <AnimatedSection key={index} delay={0.02}>
                    <div className="p-3.5 bg-amber-50/60 border border-amber-200/60 rounded-xl flex items-center justify-between text-amber-900">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-xs font-mono font-bold px-2 py-0.5 bg-amber-100 text-amber-900 rounded">
                          <Clock className="w-3 h-3 text-amber-700" />
                          {item.time}
                        </span>
                        <span className="text-sm font-semibold">{item.title}</span>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              }

              // Q&A / Abertura / Encerramento
              return (
                <AnimatedSection key={index} delay={0.02}>
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-slate-700">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5 text-xs font-mono font-bold px-2 py-0.5 bg-slate-200/80 text-slate-800 rounded">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {item.time}
                      </span>
                      <span className="text-sm font-semibold text-slate-800">
                        {item.type === 'qa'}
                        {item.title}
                      </span>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Committee Section */}
      <section id="committee" className="scroll-mt-24 relative py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-16">
              <div className="w-12 h-1 bg-slate-800" />
              <h2 className="text-5xl font-bold text-slate-900">
              Committee
              </h2>
            </div>
          </AnimatedSection>

          {/* Coordination Committee */}
          <AnimatedSection delay={0.2}>
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-slate-900 mb-8">Program Chairs</h3>
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
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Program Committee</h3>
              <p className="text-slate-600 mb-8 italic">The program committee is being formed, but already has the support of the following researchers:</p>
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
              <h3 className="text-2xl font-semibold text-slate-900 mb-8">Organization Committee</h3>
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
            <h3 className="font-semibold mb-6 text-xl text-center">Sponsored By</h3>
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
              I Workshop sobre Engenharia de Software para Sistemas Agentes
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
              <div className="flex flex-col gap-2">
                {(['overview', 'topics', 'keynotes', 'dates', 'submission', 'papers', 'program', 'committee'] as const).map((link) => (
                  <a
                    key={link}
                    href={`#${link}`}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm capitalize"
                  >
                   {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Contact</h3>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=IME-USP+Sao+Paulo+SP"
                className="text-slate-400 hover:text-white transition-colors text-sm block mb-4 group"
              >
                <div className="flex flex-col">
                  <span>Co-located with CBSoft 2026</span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
                    IME - USP, São Paulo, SP
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
              <h3 className="font-semibold mb-4 text-lg">Follow Us</h3>
              <div className="flex gap-4">
              {/* Instagram */}
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

              {/* X */}
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

              {/* Linkedin */}
              <motion.a
                href="https://www.linkedin.com/showcase/se4as-workshop/"
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
            <p>© 2026 SE4AS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
      <AppContent />
  );
}