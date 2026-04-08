import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

// 1. Extraímos o tipo das chaves disponíveis nas traduções
type TranslationKeys = keyof typeof translations.pt;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  // 2. Tipamos a chave para ser uma das TranslationKeys em vez de string genérica
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  pt: {
    // Navigation
    'nav.overview': 'Visão Geral',
    'nav.topics': 'Tópicos',
    'nav.keynotes': 'Palestras',
    'nav.dates': 'Datas',
    'nav.submission': 'Submissão',
    'nav.committee': 'Comitê',
    
    // Hero
    'hero.colocated': 'Co-localizado com CBSoft 2026',
    'hero.title': 'I Workshop sobre Engenharia de Software para Sistemas Agentes',
    'hero.date': '8 de Setembro, 2026',
    'hero.location': 'IME - USP, São Paulo, SP',
    'hero.submit': 'Submeta seu Artigo',
    'hero.cbsoft': 'Informações CBSoft 2026',
    'hero.countdown': 'Contagem Regressiva para SE4AS 2026',
    'hero.days': 'Dias',
    'hero.hours': 'Horas',
    'hero.minutes': 'Minutos',
    'hero.seconds': 'Segundos',
    'hero.addCalendar': 'Adicionar ao Google Calendar',
    
    // Overview
    'overview.title': 'Visão Geral',
    'overview.p1': 'Nos últimos anos, avanços em modelos de fundação, Large Language Models (LLMs) e sistemas autônomos têm impulsionado o surgimento de Sistemas Agênticos—sistemas compostos por agentes capazes de percepção, planejamento, tomada de decisão e ação contínua em ambientes dinâmicos e incertos.',
    'overview.p2': 'Estes sistemas introduzem desafios que diferem das aplicações tradicionais baseadas em LLMs, pois mantêm estado, interagem com ferramentas externas, coordenam múltiplas entidades e operam de maneira iterativa e orientada a objetivos.',
    'overview.p3': 'Apesar de seu rápido crescimento, ainda existem lacunas metodológicas, arquiteturais e de engenharia de software que dificultam o desenvolvimento robusto, confiável e responsável desses sistemas.',
    'overview.goals': 'Objetivos do Workshop',
    'overview.goalsText': 'O SE4AS visa consolidar uma agenda científica e técnica reunindo pesquisadores e profissionais da indústria interessados em Engenharia de Software para Sistemas Agênticos.',
    'overview.goal1': 'Identificação de desafios de pesquisa em aberto',
    'overview.goal2': 'Consolidação de um vocabulário comum em Engenharia Agêntica',
    'overview.goal3': 'Discussão de abordagens arquiteturais e metodológicas',
    'overview.goal4': 'Incentivo a colaborações inter-institucionais',
    'overview.goal5': 'Desenvolvimento de uma agenda de pesquisa para os próximos anos',
    
    // Topics
    'topics.title': 'Tópicos de Interesse',
    'topics.subtitle': 'Os tópicos incluem, mas não se limitam a:',
    'topics.1': 'Técnicas e metodologias de engenharia de software para sistemas agênticos',
    'topics.2': 'Engenharia de requisitos para sistemas agênticos',
    'topics.3': 'Arquiteturas para sistemas agênticos (ex: single-agent, multi-agent, hierárquico)',
    'topics.4': 'Avaliação e benchmarking de sistemas agênticos',
    'topics.5': 'Testes, validação e verificação de sistemas agênticos',
    'topics.6': 'Observabilidade, monitoramento e debugging de sistemas agênticos',
    'topics.7': 'Uso de ferramentas e integração em workflows de agentes',
    'topics.8': 'Mecanismos de memória, planejamento e raciocínio',
    'topics.9': 'Coordenação, comunicação e colaboração em sistemas agênticos',
    'topics.10': 'Sistemas agênticos humano-no-loop e híbridos',
    'topics.11': 'Segurança, ética e governança de sistemas agênticos',
    'topics.12': 'Estudos empíricos e experiências industriais com sistemas agênticos',
    'topics.13': 'Aplicações de sistemas agênticos em software, ciência de dados, educação, saúde e defesa',
    
    // Keynotes
    'keynotes.title': 'Palestras',
    'keynotes.subtitle': 'Especialistas líderes em sistemas agênticos e engenharia de software',
    'keynotes.tba': 'A ser anunciado',
    'keynotes.topic': 'Tema',
    'keynotes.abstract': 'Resumo',
    
    // Dates
    'dates.title': 'Datas Importantes',
    'dates.registration': 'Registro de artigos',
    'dates.submission': 'Submissão de artigos',
    'dates.notification': 'Notificação aos autores',
    'dates.camera': 'Versão final',
    'dates.workshop': 'Data do workshop',
    'dates.aoe': 'Todos os prazos são 23:59 (horário de Brasília)',
    
    // Submission
    'submission.title': 'Diretrizes de Submissão',
    'submission.p1': 'Autores devem submeter trabalhos originais que não foram publicados anteriormente e não estão sob revisão. Os artigos podem ser escritos em Português ou Inglês.',
    'submission.p2': 'As submissões devem estar em formato Adobe Portable Document Format (PDF) e devem ser rigorosamente formatadas de acordo com o',
    'submission.template': 'template do CBSoft',
    'submission.download': 'download',
    'submission.types': 'Convidamos os seguintes tipos de submissão:',
    'submission.type1': 'Artigos curtos (6 páginas, incluindo todas as figuras, tabelas e agradecimentos)',
    'submission.type2': 'Artigos de posicionamento e visão (4 páginas, incluindo todas as figuras, tabelas e agradecimentos)',
    'submission.type3': 'Relatos de experiência industrial (4 páginas, incluindo todas as figuras, tabelas e agradecimentos)',
    'submission.type4': 'Propostas de ferramentas, frameworks ou benchmarks (2 páginas, incluindo todas as figuras, tabelas e agradecimentos)',
    'submission.p3': 'Até 1 página adicional é permitida para referências. Os artigos devem ser registrados e submetidos através do sistema',
    'submission.p4': 'Durante o registro da submissão, os autores devem fornecer o título, autores, resumo, tópicos de interesse e o idioma do artigo.',
    'submission.p5': 'A publicação de artigos aceitos requer que pelo menos um dos autores se registre no SE4AS/CBSoft 2026, de acordo com as políticas de registro do evento, e apresente o artigo presencialmente no workshop. Artigos não apresentados não serão incluídos nos anais do SE4AS.',
    'submission.p6': 'Todos os artigos submetidos devem estar em conformidade com o',
    'submission.conduct': 'Código de Conduta para Autores em Publicações da Sociedade Brasileira de Computação (SBC)',
    'submission.p7': 'Quanto ao Uso de IA ou Tecnologias Assistidas por IA, ao submeter um artigo, os autores reconhecem conformidade com as políticas de IA generativa adotadas por',
    'submission.p8': ', IEEE, ACM e Springer.',
    'submission.note': 'Nota:',
    'submission.noteText': 'Artigos que estejam fora do escopo do workshop ou que não estejam em conformidade com a formatação e políticas exigidas serão rejeitados sem passar pelo processo de revisão.',
    
    // Committee
    'committee.title': 'Comitê',
    'committee.coordination': 'Comitê de Coordenação',
    'committee.program': 'Comitê de Programa',
    'committee.programIntro': 'O comitê de programa encontra-se em formação, mas já conta com o apoio dos seguintes pesquisadores:',
    'committee.organization': 'Comitê de Organização',
    
    // Footer
    'footer.quickLinks': 'Links Rápidos',
    'footer.contact': 'Contato',
    'footer.colocated': 'Co-localizado com CBSoft 2026',
    'footer.followUs': 'Siga-nos',
    'footer.rights': '© 2026 SE4AS. Todos os direitos reservados.',
    'footer.sponsors': 'Patrocinadores',
  },
  en: {
    // Navigation
    'nav.overview': 'Overview',
    'nav.topics': 'Topics',
    'nav.keynotes': 'Keynotes',
    'nav.dates': 'Dates',
    'nav.submission': 'Submission',
    'nav.committee': 'Committee',
    
    // Hero
    'hero.colocated': 'Co-located with CBSoft 2026',
    'hero.title': 'I Workshop on Software Engineering for Agentic Systems',
    'hero.date': 'September 8, 2026',
    'hero.location': 'IME - USP, São Paulo, SP',
    'hero.submit': 'Submit Your Paper',
    'hero.cbsoft': 'CBSoft 2026 Information',
    'hero.countdown': 'Countdown to SE4AS 2026',
    'hero.days': 'Days',
    'hero.hours': 'Hours',
    'hero.minutes': 'Minutes',
    'hero.seconds': 'Seconds',
    'hero.addCalendar': 'Add to Google Calendar',
    
    // Overview
    'overview.title': 'Overview',
    'overview.p1': 'In recent years, advances in foundation models, Large Language Models (LLMs), and autonomous systems have driven the emergence of Agentic Systems—systems composed of agents capable of perception, planning, decision-making, and continuous action in dynamic and uncertain environments.',
    'overview.p2': 'These systems introduce challenges that differ from traditional LLM-based applications, as they maintain state, interact with external tools, coordinate multiple entities, and operate in an iterative, goal-oriented manner.',
    'overview.p3': 'Despite their rapid growth, there are still methodological, architectural, and software engineering gaps that hinder the robust, reliable, and responsible development of these systems.',
    'overview.goals': 'Workshop Goals',
    'overview.goalsText': 'SE4AS aims to consolidate a scientific and technical agenda by bringing together researchers and industry practitioners interested in Software Engineering for Agentic Systems.',
    'overview.goal1': 'Identification of open research challenges',
    'overview.goal2': 'Consolidation of a common vocabulary in Agentic Engineering',
    'overview.goal3': 'Discussion of architectural and methodological approaches',
    'overview.goal4': 'Encouragement of inter-institutional collaborations',
    'overview.goal5': 'Development of a research agenda for the coming years',
    
    // Topics
    'topics.title': 'Topics of Interest',
    'topics.subtitle': 'Topics include, but are not limited to:',
    'topics.1': 'Software engineering techniques and methodologies for agentic systems',
    'topics.2': 'Requirements engineering for agentic systems',
    'topics.3': 'Architectures for agentic systems (e.g., single-agent, multi-agent, hierarchical)',
    'topics.4': 'Evaluation and benchmarking of agentic systems',
    'topics.5': 'Testing, validation, and verification of agentic systems',
    'topics.6': 'Observability, monitoring, and debugging of agentic systems',
    'topics.7': 'Tool use and integration in agent workflows',
    'topics.8': 'Memory, planning, and reasoning mechanisms',
    'topics.9': 'Coordination, communication, and collaboration in agentic systems',
    'topics.10': 'Human-in-the-loop and hybrid agentic systems',
    'topics.11': 'Safety, ethics, and governance of agentic systems',
    'topics.12': 'Empirical studies and industrial experiences with agentic systems',
    'topics.13': 'Applications of agentic systems in software, data science, education, healthcare, and defense',
    
    // Keynotes
    'keynotes.title': 'Keynote Speakers',
    'keynotes.subtitle': 'Leading experts in agentic systems and software engineering',
    'keynotes.tba': 'To be announced',
    'keynotes.topic': 'Topic',
    'keynotes.abstract': 'Abstract',
    
    // Dates
    'dates.title': 'Important Dates',
    'dates.registration': 'Paper registration',
    'dates.submission': 'Paper submission',
    'dates.notification': 'Author notification',
    'dates.camera': 'Camera-ready',
    'dates.workshop': 'Workshop date',
    'dates.aoe': 'All deadlines are 23:59 AoE (Anywhere on Earth)',
    
    // Submission
    'submission.title': 'Submission Guidelines',
    'submission.p1': 'Authors must submit original work that has not been published elsewhere and is not currently under review. Papers may be written in Portuguese or English.',
    'submission.p2': 'Submissions must be in Adobe Portable Document Format (PDF) and must strictly be formatted according to the',
    'submission.template': 'CBSoft template',
    'submission.download': 'download',
    'submission.types': 'We invite the following types of submissions:',
    'submission.type1': 'Short papers (6 pages, including all figures, tables, and acknowledgments)',
    'submission.type2': 'Position and vision papers (4 pages, including all figures, tables, and acknowledgments)',
    'submission.type3': 'Industrial experience reports (4 pages, including all figures, tables, and acknowledgments)',
    'submission.type4': 'Tool, framework, or benchmark proposals (2 pages, including all figures, tables, and acknowledgments)',
    'submission.p3': 'Up to 1 additional page is allowed for references. Papers must be registered and submitted through the',
    'submission.p4': 'During submission registration, authors must provide the title, authors, abstract, topics of interest, and the language of the paper.',
    'submission.p5': 'The publication of accepted papers requires that at least one of the authors register for SE4AS/CBSoft 2026, in accordance with the registration policies of the event, and present the paper in person at the workshop. Papers that are not presented will not be included in the SE4AS proceedings.',
    'submission.p6': 'All submitted papers must comply with the',
    'submission.conduct': 'Code of Conduct for Authors in Publications of the Brazilian Computer Society (SBC)',
    'submission.p7': 'Regarding the Use of AI or AI-Assisted Technologies, by submitting a paper, authors acknowledge compliance with the generative AI policies adopted by',
    'submission.p8': ', IEEE, ACM, and Springer.',
    'submission.note': 'Note:',
    'submission.noteText': 'Papers that fall outside the scope of the workshop or that do not comply with the required formatting and policies will be desk-rejected without undergoing the review process.',
    
    // Committee
    'committee.title': 'Committee',
    'committee.coordination': 'Coordination Committee',
    'committee.program': 'Program Committee',
    'committee.programIntro': 'The program committee is being formed, but already has the support of the following researchers:',
    'committee.organization': 'Organization Committee',
    
    // Footer
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.colocated': 'Co-located with CBSoft 2026',
    'footer.followUs': 'Follow Us',
    'footer.rights': '© 2026 SE4AS. All rights reserved.',
    'footer.sponsors': 'Sponsored By',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  // 3. Implementação da função 't' com a tipagem correta
  const t = (key: TranslationKeys): string => {
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}