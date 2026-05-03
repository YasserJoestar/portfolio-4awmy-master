import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Data ────────────────────────────────────────────────────────────────────

const MENU_ITEMS = ['about', 'experience', 'skills', 'projects', 'achievements', 'contact', 'cmd'] as const;
type Section = typeof MENU_ITEMS[number];

interface Project { name: string; desc: string; tech: string[]; url: string; }
interface Skill   { name: string; level: number; color: string; }

const PROJECTS: Project[] = [
  {
    name: 'Portfolio Website',
    desc: 'Interactive portfolio with TUI mode, built with React & TypeScript.',
    url: 'https://github.com/4awmy/portfolio-4awmy',
    tech: ['React', 'TypeScript', 'Vite'],
  },
  {
    name: 'Ben10 Ultimate Alien Multiverse',
    desc: 'Multiplayer Unity game project showcasing advanced game mechanics.',
    url: 'https://github.com/4awmy/Ben10-Ultimate-Alien-Multiverse',
    tech: ['Unity', 'C#'],
  },
  {
    name: 'ML Project',
    desc: 'AI job market risk analyzer using decision trees and neural networks.',
    url: 'https://github.com/4awmy/ML-project',
    tech: ['Python', 'scikit-learn', 'Streamlit'],
  },
  {
    name: 'QA Agent',
    desc: 'VS Code extension that auto‑generates JUnit tests via LLMs.',
    url: 'https://github.com/4awmy/QA-agent',
    tech: ['TypeScript', 'VS Code API'],
  },
];

const SKILLS: Skill[] = [
  { name: 'HTML / CSS',   level: 95, color: '#e34c26' },
  { name: 'JavaScript',   level: 80, color: '#f7df1e' },
  { name: 'TypeScript',   level: 65, color: '#3178c6' },
  { name: 'React',        level: 75, color: '#61dafb' },
  { name: 'C / C++',      level: 60, color: '#00599C' },
  { name: 'C#',           level: 60, color: '#9b4f96' },
  { name: 'Python',       level: 60, color: '#3572A5' },
  { name: 'Git & GitHub', level: 80, color: '#f05032' },
  { name: 'SQL',          level: 55, color: '#00758f' },
];

// ─── ASCII Art ───────────────────────────────────────────────────────────────

const ASCII_BANNER = `
 ██████╗ ███╗   ███╗ █████╗ ██████╗ 
██╔═══██╗████╗ ████║██╔══██╗██╔══██╗
██║   ██║██╔████╔██║███████║██████╔╝
██║   ██║██║╚██╔╝██║██╔══██║██╔══██╗
╚██████╔╝██║ ╚═╝ ██║██║  ██║██║  ██║
 ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝`;

const ASCII_4AWMY = `
  _  _   ___  _    __ __ __  __ _   _
 | || | /   || |  | \\/  |\\ \\/ /| | | |
 |_  _|| - || |__ | |\\/| | \\  / | |_| |
   |_| |_|_||____||_|  |_| |\\/|  \\_  /
                                   |_/`;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const bar = (level: number, width = 20) => {
  const filled = Math.round((level / 100) * width);
  return '█'.repeat(filled) + '░'.repeat(width - filled);
};

const clock = () => new Date().toLocaleTimeString('en-US', { hour12: false });

// ─── Panels ──────────────────────────────────────────────────────────────────

function AboutPanel() {
  return (
    <div className="space-y-6 p-1 select-none">
      <pre className="text-green-400 text-[0.55rem] sm:text-[0.65rem] leading-tight font-mono whitespace-pre">
        {ASCII_BANNER}
      </pre>
      <pre className="text-green-600 text-[0.55rem] sm:text-[0.65rem] leading-tight font-mono whitespace-pre">
        {ASCII_4AWMY}
      </pre>
      <div className="border-t border-green-900 pt-4 space-y-3 text-sm">
        <div className="flex gap-3">
          <span className="text-green-600 w-24 shrink-0">name</span>
          <span className="text-green-300">Omar Hossam</span>
        </div>
        <div className="flex gap-3">
          <span className="text-green-600 w-24 shrink-0">handle</span>
          <span className="text-green-300">@4awmy</span>
        </div>
        <div className="flex gap-3">
          <span className="text-green-600 w-24 shrink-0">role</span>
          <span className="text-green-300">Computer Science Student</span>
        </div>
        <div className="flex gap-3">
          <span className="text-green-600 w-24 shrink-0">university</span>
          <span className="text-green-300">AAST — Arab Academy for Science & Tech (2023–2027)</span>
        </div>
        <div className="flex gap-3">
          <span className="text-green-600 w-24 shrink-0">focus</span>
          <span className="text-green-300">Web Dev, GenAI, Full-Stack, Systems</span>
        </div>
        <div className="flex gap-3">
          <span className="text-green-600 w-24 shrink-0">achievement</span>
          <span className="text-green-300">🏆 ICPC 2024 — Honorable Mention</span>
        </div>
        <div className="flex gap-3">
          <span className="text-green-600 w-24 shrink-0">experience</span>
          <span className="text-green-300">IT Assistant @ Al Hamdy's | Intern @ QNB</span>
        </div>
        <div className="flex gap-3">
          <span className="text-green-600 w-24 shrink-0">languages</span>
          <span className="text-green-300">Arabic · English · French</span>
        </div>
        <div className="flex gap-3">
          <span className="text-green-600 w-24 shrink-0">status</span>
          <span className="text-green-400"><span className="animate-pulse">●</span> Available for internships</span>
        </div>
        <div className="flex gap-3">
          <span className="text-green-600 w-24 shrink-0">location</span>
          <span className="text-green-300">Cairo, Egypt 🇪🇬</span>
        </div>
      </div>
      <div className="border-t border-green-900 pt-4">
        <p className="text-green-700 text-xs">
          I build intelligent, clean software — from GenAI-powered tools to full-stack web apps.<br />
          ICPC competitor, QNB intern, trilingual. Passionate about developer tools & open source.
        </p>
      </div>
    </div>
  );
}

function ExperiencePanel() {
  const experiences = [
    { role: 'IT Intern', company: 'QNB — Qatar National Bank', period: '2025', desc: 'Hands-on experience in IT operations and infrastructure at one of the largest banks in the Middle East.' },
    { role: 'IT Assistant', company: "Al Hamdy's Accounting Office", period: '2023 – Present', desc: 'Supporting accounting operations and administrative workflows.' },
  ];

  return (
    <div className="space-y-4 p-1">
      <div className="text-green-300 text-xs border-b border-green-900 pb-2 font-bold">
        EXPERIENCE
        <span className="text-green-800 font-normal float-right">professional history</span>
      </div>
      <div className="space-y-3">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-3 border border-green-900 rounded space-y-1"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-green-300 font-bold text-sm">{exp.role}</span>
                <span className="text-green-700 text-xs block">{exp.company}</span>
              </div>
              <span className="text-green-800 text-xs font-mono shrink-0">{exp.period}</span>
            </div>
            <p className="text-green-600 text-xs leading-relaxed">{exp.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AchievementsPanel() {
  return (
    <div className="space-y-4 p-1">
      <div className="text-green-300 text-xs border-b border-green-900 pb-2 font-bold">
        ACHIEVEMENTS & CERTIFICATIONS
      </div>
      <div className="space-y-3">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="p-3 border border-green-500/40 rounded bg-green-950/30">
          <div className="text-green-300 font-bold text-sm">🏆 ICPC 2024 — Honorable Mention</div>
          <div className="text-green-600 text-xs mt-1">Qualifications Day 1, representing AAST Cairo</div>
          <div className="text-green-800 text-[10px] font-mono mt-1">competitive programming</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="p-3 border border-green-900 rounded">
          <div className="text-green-300 font-bold text-sm">📜 DELF A2 — French Language</div>
          <div className="text-green-600 text-xs mt-1">France Éducation international · Nov 2021</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="p-3 border border-green-900 rounded">
          <div className="text-green-300 font-bold text-sm">📜 DELF A1 — French Language</div>
          <div className="text-green-600 text-xs mt-1">France Éducation international · Jul 2018</div>
        </motion.div>
      </div>
      <div className="border-t border-green-900 pt-3">
        <div className="text-green-300 text-xs font-bold mb-2">LANGUAGES</div>
        <div className="space-y-1 text-xs font-mono">
          <div className="flex justify-between"><span className="text-green-400">🇪🇬 Arabic</span><span className="text-green-700">native</span></div>
          <div className="flex justify-between"><span className="text-green-400">🇬🇧 English</span><span className="text-green-700">professional</span></div>
          <div className="flex justify-between"><span className="text-green-400">🇫🇷 French</span><span className="text-green-700">working proficiency</span></div>
        </div>
      </div>
    </div>
  );
}

function SkillsPanel() {
  return (
    <div className="space-y-4 p-1">
      <div className="text-green-500 text-xs border-b border-green-900 pb-2">
        <span className="text-green-300 font-bold">SKILL MATRIX</span>
        <span className="float-right text-green-800">proficiency levels</span>
      </div>
      <div className="space-y-3">
        {SKILLS.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            className="space-y-1"
          >
            <div className="flex justify-between text-xs">
              <span className="text-green-300 font-mono">{s.name}</span>
              <span className="text-green-700">{s.level}%</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-sm">
              <motion.span
                className="text-green-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.07 + 0.1 }}
              >
                {bar(s.level)}
              </motion.span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="border-t border-green-900 pt-3 text-green-800 text-xs">
        also learning: Go · Docker · Next.js · System Design
      </div>
    </div>
  );
}

function ProjectsPanel({ onOpenProject }: { onOpenProject: (p: Project) => void }) {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(s => Math.max(0, s - 1)); }
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(PROJECTS.length - 1, s + 1)); }
      if (e.key === 'Enter')     { e.preventDefault(); onOpenProject(PROJECTS[selected]); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selected, onOpenProject]);

  return (
    <div className="space-y-3 p-1">
      <div className="text-green-300 text-xs border-b border-green-900 pb-2 font-bold">
        PROJECTS
        <span className="text-green-800 font-normal float-right">↑↓ navigate · Enter open</span>
      </div>
      {PROJECTS.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          onClick={() => { setSelected(i); onOpenProject(p); }}
          className={`p-3 rounded border cursor-pointer transition-all ${
            selected === i
              ? 'border-green-500 bg-green-950/60 text-green-300'
              : 'border-green-900 text-green-600 hover:border-green-700 hover:text-green-400'
          }`}
        >
          <div className="flex items-center gap-2 text-sm font-mono font-bold">
            <span className={selected === i ? 'text-green-400' : 'text-green-800'}>{'>'}</span>
            {p.name}
          </div>
          <div className="text-xs mt-1 pl-4 text-green-700">{p.desc}</div>
          <div className="flex gap-2 mt-2 pl-4 flex-wrap">
            {p.tech.map(t => (
              <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-green-900/40 text-green-600 font-mono">
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape' || e.key === 'q') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute inset-0 z-10 bg-black/90 flex items-center justify-center p-8"
    >
      <div className="border border-green-500 rounded-xl p-6 max-w-lg w-full bg-black space-y-4">
        <div className="flex justify-between items-start">
          <h2 className="text-green-300 font-bold font-mono text-lg">{project.name}</h2>
          <button onClick={onClose} className="text-green-800 hover:text-green-400 text-xs">[ESC / q]</button>
        </div>
        <p className="text-green-600 text-sm leading-relaxed">{project.desc}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map(t => (
            <span key={t} className="px-2 py-1 text-xs bg-green-900/40 text-green-500 rounded font-mono">{t}</span>
          ))}
        </div>
        <div className="border-t border-green-900 pt-3">
          <a href={project.url} target="_blank" rel="noreferrer"
            className="text-green-400 hover:text-green-200 text-sm font-mono underline underline-offset-4">
            → {project.url}
          </a>
        </div>
        <button
          onClick={() => window.open(project.url, '_blank')}
          className="w-full py-2 border border-green-500 text-green-400 rounded font-mono text-sm hover:bg-green-500/10 transition-colors"
        >
          [ OPEN IN GITHUB ]
        </button>
      </div>
    </motion.div>
  );
}

function ContactPanel() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const items = [
    { label: 'github',   value: 'github.com/4awmy',                      href: 'https://github.com/4awmy',                         copy: 'https://github.com/4awmy' },
    { label: 'linkedin', value: 'linkedin.com/in/omar-hossam-4awmy',      href: 'https://www.linkedin.com/in/omar-hossam-4awmy',     copy: 'https://www.linkedin.com/in/omar-hossam-4awmy' },
    { label: 'email',    value: 'omarhossammetwally@gmail.com',            href: 'mailto:omarhossammetwally@gmail.com',               copy: 'omarhossammetwally@gmail.com' },
  ];

  return (
    <div className="space-y-4 p-1">
      <div className="text-green-300 text-xs border-b border-green-900 pb-2 font-bold">
        CONTACT
        <span className="text-green-800 font-normal float-right">click to copy</span>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 p-3 border border-green-900 rounded hover:border-green-600 group transition-colors"
          >
            <span className="text-green-700 font-mono text-sm w-16 shrink-0">{item.label}</span>
            <a href={item.href} target="_blank" rel="noreferrer"
              className="text-green-400 font-mono text-xs hover:text-green-200 flex-1 truncate">
              {item.value}
            </a>
            <button
              onClick={() => copy(item.copy, item.label)}
              className="text-green-800 hover:text-green-400 text-[10px] font-mono shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {copied === item.label ? '[copied!]' : '[copy]'}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-green-900 pt-4 space-y-2">
        <div className="text-green-700 text-xs font-mono">
          <span className="text-green-600">status</span>   <span className="animate-pulse text-green-400">●</span> available for internships &amp; freelance
        </div>
        <div className="text-green-700 text-xs font-mono">
          <span className="text-green-600">response</span>  usually within 24 hours
        </div>
      </div>

      <div className="border border-green-900 rounded p-4 mt-4">
        <p className="text-green-700 text-xs font-mono leading-relaxed">
          "Let's build something amazing together."<br/>
          <span className="text-green-600">— Omar Hossam, 2026</span>
        </p>
      </div>
    </div>
  );
}

// ─── Command Terminal Panel ───────────────────────────────────────────────────

const HELP_TEXT = `Available commands:
  about         — show about panel
  experience    — show experience panel
  skills        — show skills panel  
  projects      — show projects panel
  achievements  — show achievements panel
  contact       — show contact panel
  whoami        — identity card
  neofetch      — system info card
  ls            — list all sections
  date          — current date & time
  echo [text]   — print message
  open github   — open GitHub profile
  open linkedin — open LinkedIn profile
  email         — copy email to clipboard
  matrix        — 🐇 follow the rabbit
  sudo          — 😏
  clear         — clear the terminal
  help          — show this list`;

const NEOFETCH = `
omar@4awmy
──────────
OS:       Portfolio OS v2.0
Host:     AAST Engineering
Shell:    bash 5.2
Terminal: TerminalTUI.tsx (React)
Font:     JetBrains Mono
Theme:    Gruvbox Dark
WM:       Framer Motion
CPU:      Intel i7 (8 cores)
Stack:    React · TypeScript · CSS
`;

// ─── Matrix Rain ─────────────────────────────────────────────────────────────

function MatrixRain({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const cols = Math.floor(canvas.width / 16);
    const drops = Array.from({ length: cols }, () => Math.random() * -canvas.height);
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ01234567890ABCDEF'.split('');

    const interval = setInterval(() => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff41';
      ctx.font = '14px monospace';
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 16, y);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 16;
      });
    }, 40);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      onDone();
    }, 4000);

    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [onDone]);

  return (
    <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 text-green-400 font-mono text-lg animate-pulse">
        Follow the white rabbit...
      </div>
    </div>
  );
}

// ─── Main TUI ────────────────────────────────────────────────────────────────

export default function TerminalTUI({ onExit }: { onExit: () => void }) {
  const [section, setSection]         = useState<Section>('about');
  const [menuIndex, setMenuIndex]     = useState(0);
  const [history, setHistory]         = useState<string[]>([
    'omar@4awmy terminal — type "help" for commands',
    '────────────────────────────────────────────────',
  ]);
  const [command, setCommand]         = useState('');
  const [time, setTime]               = useState(clock());
  const [matrix, setMatrix]           = useState(false);
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  // Clock tick
  useEffect(() => {
    const t = setInterval(() => setTime(clock()), 1000);
    return () => clearInterval(t);
  }, []);

  // Auto-scroll cmd output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Global keyboard nav for sidebar
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Only intercept when not focused on input
      if (document.activeElement === inputRef.current) return;

      // Skip global arrow nav if we are in projects section (let ProjectsPanel handle it)
      if (section === 'projects' && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) return;

      if (e.key === 'ArrowUp') {
        setMenuIndex(i => {
          const n = Math.max(0, i - 1);
          setSection(MENU_ITEMS[n]);
          return n;
        });
      }
      if (e.key === 'ArrowDown') {
        setMenuIndex(i => {
          const n = Math.min(MENU_ITEMS.length - 1, i + 1);
          setSection(MENU_ITEMS[n]);
          return n;
        });
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [section]);

  const selectItem = useCallback((item: Section, idx: number) => {
    setSection(item);
    setMenuIndex(idx);
    if (item !== 'cmd') inputRef.current?.blur();
    else inputRef.current?.focus();
  }, []);

  const push = (cmd: string, resp: string | string[]) => {
    const lines = Array.isArray(resp) ? resp : [resp];
    setHistory(h => [...h, `omar@4awmy:~$ ${cmd}`, ...lines, '']);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = command.trim();
    const cmd = raw.toLowerCase();
    if (!raw) return;
    setCommand('');

    if (cmd === 'clear') { setHistory([]); return; }

    if (cmd === 'exit' || cmd === 'quit')   { onExit(); return; }
    if (cmd === 'about')                    { setSection('about');        setMenuIndex(0); push(raw, '→ switching to about panel'); return; }
    if (cmd === 'experience')               { setSection('experience');   setMenuIndex(1); push(raw, '→ switching to experience panel'); return; }
    if (cmd === 'skills')                   { setSection('skills');       setMenuIndex(2); push(raw, '→ switching to skills panel'); return; }
    if (cmd === 'projects')                 { setSection('projects');     setMenuIndex(3); push(raw, '→ switching to projects panel'); return; }
    if (cmd === 'achievements')             { setSection('achievements'); setMenuIndex(4); push(raw, '→ switching to achievements panel'); return; }
    if (cmd === 'contact')                  { setSection('contact');      setMenuIndex(5); push(raw, '→ switching to contact panel'); return; }
    if (cmd === 'help')                     { push(raw, HELP_TEXT); return; }
    if (cmd === 'whoami')                   { push(raw, 'omar@4awmy — CS student · ICPC competitor · QNB intern · GenAI builder'); return; }
    if (cmd === 'neofetch')                 { push(raw, NEOFETCH); return; }
    if (cmd === 'ls')                       { push(raw, 'about/   experience/   skills/   projects/   achievements/   contact/   cmd/'); return; }
    if (cmd === 'date')                     { push(raw, new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })); return; }
    if (cmd === 'open github')              { window.open('https://github.com/4awmy', '_blank'); push(raw, '→ opening github.com/4awmy 🚀'); return; }
    if (cmd === 'open linkedin')            { window.open('https://www.linkedin.com/in/omar-hossam-4awmy', '_blank'); push(raw, '→ opening LinkedIn 💼'); return; }
    if (cmd === 'email')                    { navigator.clipboard.writeText('omarhossammetwally@gmail.com').catch(()=>{}); push(raw, '→ copied to clipboard: omarhossammetwally@gmail.com'); return; }
    if (cmd === 'matrix')                   { push(raw, '→ initiating matrix protocol...'); setMatrix(true); return; }
    if (cmd === 'sudo' || cmd === 'sudo su'){ push(raw, 'Permission denied. Nice try 😄'); return; }
    if (cmd === 'sudo rm -rf /')            { push(raw, 'Absolutely not. 💀'); return; }
    if (cmd.startsWith('echo '))            { push(raw, raw.slice(5)); return; }
    if (cmd === 'pwd')                      { push(raw, '/home/omar@4awmy/portfolio'); return; }
    if (cmd === 'cat readme.md')            { push(raw, ['# omar@4awmy portfolio', '', 'Interactive portfolio with full TUI terminal.', 'Built with React + TypeScript + Framer Motion.', '', 'https://github.com/4awmy']); return; }

    push(raw, `command not found: ${raw}. Type "help" for a list of commands.`);
  };

  return (
    <div className="relative flex flex-col h-screen bg-black text-green-400 font-mono select-none overflow-hidden">
      {/* CRT scanlines overlay */}
      <div className="pointer-events-none absolute inset-0 z-50 scanlines opacity-[0.03]" />

      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between px-4 py-2 bg-green-950/30 border-b border-green-900/60 text-xs shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-green-300 font-bold">omar@4awmy</span>
          <span className="text-green-800">│</span>
          <span className="text-green-700">portfolio v2.0</span>
        </div>
        <div className="flex items-center gap-4">
          {MENU_ITEMS.map(item => (
            <button
              key={item}
              onClick={() => selectItem(item, MENU_ITEMS.indexOf(item))}
              className={`uppercase tracking-widest text-[10px] px-2 py-0.5 rounded transition-colors ${
                section === item
                  ? 'text-black bg-green-400'
                  : 'text-green-700 hover:text-green-400'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="text-green-700">{time}</div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Matrix easter egg */}
        <AnimatePresence>
          {matrix && (
            <MatrixRain onDone={() => setMatrix(false)} />
          )}
        </AnimatePresence>

        {/* Project modal */}
        <AnimatePresence>
          {openProject && (
            <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <div className="w-36 shrink-0 border-r border-green-900/60 bg-black/40 flex flex-col py-4 gap-1 px-2">
          {MENU_ITEMS.map((item, i) => (
            <button
              key={item}
              onClick={() => selectItem(item, i)}
              className={`text-left text-xs px-3 py-2 rounded transition-all font-mono ${
                menuIndex === i
                  ? 'bg-green-400/10 text-green-300 border border-green-500/40'
                  : 'text-green-800 hover:text-green-500 border border-transparent'
              }`}
            >
              <span className={menuIndex === i ? 'text-green-400 mr-1' : 'text-green-900 mr-1'}>
                {menuIndex === i ? '▶' : ' '}
              </span>
              {item}
            </button>
          ))}

          <div className="mt-auto pt-4 border-t border-green-900/40 text-[9px] text-green-900 px-2 space-y-1">
            <div>↑↓ navigate</div>
            <div>Tab → input</div>
            <div>Esc → exit</div>
          </div>
        </div>

        {/* Main panel */}
        <div className="flex-1 overflow-y-auto p-5">
          <AnimatePresence mode="wait">
            {section === 'about' && (
              <motion.div key="about" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <AboutPanel />
              </motion.div>
            )}
            {section === 'experience' && (
              <motion.div key="experience" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <ExperiencePanel />
              </motion.div>
            )}
            {section === 'skills' && (
              <motion.div key="skills" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <SkillsPanel />
              </motion.div>
            )}
            {section === 'projects' && (
              <motion.div key="projects" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <ProjectsPanel onOpenProject={p => setOpenProject(p)} />
              </motion.div>
            )}
            {section === 'achievements' && (
              <motion.div key="achievements" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <AchievementsPanel />
              </motion.div>
            )}
            {section === 'contact' && (
              <motion.div key="contact" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <ContactPanel />
              </motion.div>
            )}
            {section === 'cmd' && (
              <motion.div key="cmd" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <div className="text-xs text-green-800 border-b border-green-900 pb-2 mb-3">
                  <span className="text-green-600">COMMAND OUTPUT</span>
                  <span className="float-right">Tab → focus input</span>
                </div>
                <div className="space-y-0.5 text-sm leading-relaxed">
                  {history.map((line, i) => (
                    <div key={i} className={`whitespace-pre-wrap ${line.startsWith('omar@') ? 'text-green-300' : 'text-green-600'}`}>
                      {line}
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="shrink-0 border-t border-green-900/60 bg-black/60">
        <form onSubmit={handleCommand} className="flex items-center gap-3 px-4 py-3">
          <span className="text-green-500 text-xs shrink-0 font-bold">omar@4awmy:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={e => setCommand(e.target.value)}
            onFocus={() => { setSection('cmd'); setMenuIndex(6); }}
            className="flex-1 bg-transparent border-none outline-none text-green-300 text-sm caret-green-400 placeholder-green-900"
            placeholder="type a command... (help for list)"
          />
          <div className="flex items-center gap-3 text-[10px] text-green-800 shrink-0">
            <button
              type="button"
              onClick={onExit}
              className="hover:text-green-400 transition-colors tracking-wider uppercase"
            >
              [exit tui]
            </button>
            <span className="text-green-900">│</span>
            <span>{time}</span>
          </div>
        </form>
      </div>
    </div>
  );
}
