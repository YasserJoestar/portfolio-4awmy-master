import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Terminal, Code, Send, Layout, User, Zap, ChevronDown, Briefcase, Award, Globe, Moon, Sun } from 'lucide-react';
import TerminalTUI from './TerminalTUI';
import ParticleBackground from './ParticleBackground';

interface Project { name: string; description: string; url: string; tech: string[]; highlight?: boolean; }
interface Skill { name: string; level: number; color: string; }
interface Experience { role: string; company: string; period: string; description: string; tags: string[]; }

const projects: Project[] = [
  {
    name: 'Portfolio Website',
    description: 'Interactive portfolio with TUI mode, built with React & TypeScript.',
    url: 'https://github.com/4awmy/portfolio-4awmy',
    tech: ['React', 'TypeScript', 'Vite'],
    highlight: true,
  },
  {
    name: 'Ben10 Ultimate Alien Multiverse',
    description: 'Multiplayer Unity game project showcasing advanced game mechanics.',
    url: 'https://github.com/4awmy/Ben10-Ultimate-Alien-Multiverse',
    tech: ['Unity', 'C#'],
  },

  {
    name: 'ML Project',
    description: 'AI job market risk analyzer using decision trees and neural networks.',
    url: 'https://github.com/4awmy/ML-project',
    tech: ['Python', 'scikit-learn', 'Streamlit'],
  },
  {
    name: 'QA Agent',
    description: 'VS Code extension that auto‑generates JUnit tests via LLMs.',
    url: 'https://github.com/4awmy/QA-agent',
    tech: ['TypeScript', 'VS Code API'],
  },
];

const skills: Skill[] = [
  { name: 'HTML/CSS', level: 5, color: '#e34c26' },
  { name: 'JavaScript', level: 4, color: '#f7df1e' },
  { name: 'React', level: 4, color: '#61dafb' },
  { name: 'TypeScript', level: 3, color: '#3178c6' },
  { name: 'C/C++', level: 3, color: '#00599C' },
  { name: 'C#', level: 3, color: '#9b4f96' },
  { name: 'Python', level: 3, color: '#3572A5' },
  { name: 'Git', level: 4, color: '#f05032' },
  { name: 'SQL', level: 3, color: '#00758f' },
];

const experiences: Experience[] = [
  {
    role: 'IT Intern',
    company: 'QNB — Qatar National Bank',
    period: '2025',
    description: 'Gained hands-on experience in IT operations and infrastructure at one of the largest banks in the Middle East.',
    tags: ['IT Infrastructure', 'Banking', 'Operations'],
  },
  {
    role: 'IT  Assistant',
    company: "Al Hamdy's Accounting Office",
    period: '2023 – Present',
    description: 'Supporting accounting operations and administrative workflows.',
    tags: ['Administration', 'Accounting', 'Office Mgmt'],
  },
];

export default function App() {
  const [isTerminal, setIsTerminal] = useState(false);
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  if (isTerminal) {
    return <TerminalTUI onExit={() => setIsTerminal(false)} />;
  }

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${dark ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <ParticleBackground dark={dark} />

      {/* Nav */}
      <nav className={`sticky top-0 z-50 px-6 py-4 flex justify-between items-center max-w-6xl mx-auto backdrop-blur-sm border-b transition-colors ${dark ? 'border-slate-800 bg-slate-950/80' : 'border-slate-200 bg-slate-50/80'}`}>
        <button onClick={() => scrollTo('hero')} className="text-xl font-bold flex items-center gap-2 hover:opacity-70 transition-opacity">
          <Code className="w-5 h-5 text-blue-500" /> Omar Hossam
        </button>
        <div className="flex items-center gap-4">
          <div className={`hidden sm:flex gap-5 text-sm font-medium ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
            {['about', 'experience', 'skills', 'projects', 'achievements', 'contact'].map(s => (
              <button key={s} onClick={() => scrollTo(s)} className="capitalize hover:text-blue-500 transition-colors">{s}</button>
            ))}
          </div>
          <button
            onClick={() => setDark(!dark)}
            className={`p-2 rounded-lg transition-all ${dark ? 'text-amber-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'}`}
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsTerminal(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-xs font-mono font-semibold transition-all ${dark ? 'border-slate-700 text-slate-400 hover:border-green-500 hover:text-green-400 hover:bg-green-950/30' : 'border-slate-300 text-slate-600 hover:border-green-500 hover:text-green-600 hover:bg-green-50'}`}
          >
            <Terminal className="w-3.5 h-3.5" /> &gt;_ TUI
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pb-24 relative z-10">

        {/* Hero */}
        <section id="hero" className="pt-20 pb-28 relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative space-y-6">
            <div className="flex flex-wrap gap-2">
              <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${dark ? 'bg-blue-900/40 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>🎓 AAST — Computer Science</span>
              <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${dark ? 'bg-amber-900/40 text-amber-300' : 'bg-amber-100 text-amber-700'}`}>🏆 ICPC 2024 — Honorable Mention</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-tight">
              Software <span className="text-blue-500">Engineer</span><br />& AI Enthusiast.
            </h1>
            <p className={`text-xl max-w-2xl leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              I build intelligent, clean software — from GenAI-powered tools to full-stack web apps. ICPC competitor, QNB intern, and passionate about turning ideas into production-ready products.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="https://github.com/4awmy" target="_blank" rel="noreferrer" className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-colors ${dark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-900 text-white hover:bg-slate-700'}`}><Github className="w-5 h-5" /> GitHub</a>
              <a href="https://www.linkedin.com/in/omar-hossam-4awmy" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-colors font-semibold"><Linkedin className="w-5 h-5" /> LinkedIn</a>
              <a href="mailto:omarhossammetwally@gmail.com" className={`flex items-center gap-2 px-5 py-3 border rounded-xl font-semibold transition-colors shadow-sm ${dark ? 'bg-slate-800/50 border-slate-700 text-slate-200 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'}`}><Mail className="w-5 h-5" /> Email Me</a>
              <button onClick={() => setIsTerminal(true)} className={`flex items-center gap-2 px-5 py-3 border rounded-xl font-semibold font-mono transition-colors ${dark ? 'border-green-700 text-green-400 hover:bg-green-950/30' : 'border-green-500 text-green-700 hover:bg-green-50'}`}>
                <Terminal className="w-5 h-5" /> &gt;_ TUI Mode
              </button>
            </div>
            <button onClick={() => scrollTo('about')} className={`flex items-center gap-1 text-sm mt-6 animate-bounce transition-colors ${dark ? 'text-slate-600 hover:text-blue-400' : 'text-slate-400 hover:text-blue-600'}`}>
              <ChevronDown className="w-5 h-5" /> scroll down
            </button>
          </motion.div>
        </section>

        {/* About */}
        <section id="about" className={`py-20 border-t ${dark ? 'border-slate-800' : 'border-slate-100'}`}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <h2 className="text-3xl font-bold flex items-center gap-2"><User className="w-7 h-7 text-blue-500" /> About Me</h2>
              <p className={`leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'}`}>Hey! I'm <strong className={dark ? 'text-slate-200' : ''}>Omar Hossam</strong>, a Computer Science student at the Arab Academy for Science, Technology &amp; Maritime Transport (AAST), expected to graduate in 2027.</p>
              <p className={`leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'}`}>I'm passionate about building intelligent, thoughtful software — from <strong className="text-blue-500">GenAI-powered tools</strong> that bridge LLMs with classical CS theory, to interactive frontends and backend systems. I earned an <strong className="text-blue-500">ICPC 2024 Honorable Mention</strong> representing AAST Cairo and have real-world experience through my IT internship at <strong className={dark ? 'text-slate-200' : ''}>QNB</strong>.</p>
              <p className={`leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'}`}>I'm trilingual (Arabic, English, French) and currently <strong className="text-blue-500">open to internships</strong> and freelance opportunities. Let's build something great together.</p>
            </div>
            <div className="flex justify-center">
              <div className="w-52 h-52 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl">
                <span className="text-8xl select-none">👨‍💻</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Experience */}
        <section id="experience" className={`py-20 border-t ${dark ? 'border-slate-800' : 'border-slate-100'}`}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold flex items-center gap-2 mb-10"><Briefcase className="w-7 h-7 text-blue-500" /> Experience</h2>
            <div className="space-y-6">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-6 border rounded-2xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group ${dark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-2xl" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 pl-4">
                    <div>
                      <h3 className={`text-xl font-bold ${dark ? 'text-slate-100' : 'text-slate-800'}`}>{exp.role}</h3>
                      <p className="text-blue-500 font-semibold">{exp.company}</p>
                    </div>
                    <span className={`text-sm font-mono mt-1 sm:mt-0 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{exp.period}</span>
                  </div>
                  <p className={`pl-4 leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{exp.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3 pl-4">
                    {exp.tags.map(t => <span key={t} className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${dark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>{t}</span>)}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Skills */}
        <section id="skills" className={`py-20 border-t ${dark ? 'border-slate-800' : 'border-slate-100'}`}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold flex items-center gap-2 mb-10"><Zap className="w-7 h-7 text-blue-500" /> Skills &amp; Tech Stack</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {skills.map((skill, i) => (
                <motion.div key={skill.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ y: -3 }} className={`p-4 border rounded-2xl shadow-sm hover:shadow-md transition-all ${dark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`font-semibold ${dark ? 'text-slate-200' : 'text-slate-800'}`}>{skill.name}</span>
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: skill.color }} />
                  </div>
                  <div className={`text-xs mb-2 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{skill.level}/5</div>
                  <div className={`w-full h-1.5 rounded-full overflow-hidden ${dark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${(skill.level / 5) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.05 }} className="h-full rounded-full" style={{ backgroundColor: skill.color }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Projects */}
        <section id="projects" className={`py-20 border-t ${dark ? 'border-slate-800' : 'border-slate-100'}`}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold flex items-center gap-2 mb-10"><Layout className="w-7 h-7 text-blue-500" /> Featured Projects</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {projects.map((project, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }} whileHover={{ y: -4 }} className={`p-6 border rounded-2xl shadow-sm hover:shadow-lg transition-all flex flex-col gap-3 ${project.highlight ? (dark ? 'border-blue-700 ring-1 ring-blue-900/50 bg-slate-900/60' : 'border-blue-300 ring-1 ring-blue-100 bg-white') : (dark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white')}`}>
                  {project.highlight && (
                    <span className={`inline-flex items-center gap-1 self-start px-2.5 py-0.5 text-xs font-bold rounded-full ${dark ? 'bg-blue-900/40 text-blue-300' : 'bg-blue-50 text-blue-600'}`}>⭐ Featured</span>
                  )}
                  <h3 className={`text-xl font-bold ${dark ? 'text-slate-100' : ''}`}>{project.name}</h3>
                  <p className={`flex-1 leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => <span key={t} className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${dark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700'}`}>{t}</span>)}
                  </div>
                  <a href={project.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-blue-500 font-semibold text-sm hover:gap-3 transition-all mt-1">
                    <Github className="w-4 h-4" /> View on GitHub →
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Achievements & Certifications */}
        <section id="achievements" className={`py-20 border-t ${dark ? 'border-slate-800' : 'border-slate-100'}`}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold flex items-center gap-2 mb-10"><Award className="w-7 h-7 text-blue-500" /> Achievements & Certifications</h2>
            <div className="grid sm:grid-cols-2 gap-6">

              {/* ICPC */}
              <motion.div whileHover={{ y: -3 }} className={`p-6 border rounded-2xl shadow-sm hover:shadow-md transition-all ${dark ? 'bg-amber-950/20 border-amber-800/40' : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200'}`}>
                <div className="text-4xl mb-3">🏆</div>
                <h3 className={`text-xl font-bold ${dark ? 'text-slate-100' : 'text-slate-800'}`}>ICPC 2024 — Honorable Mention</h3>
                <p className={`mt-2 leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Qualified and received Honorable Mention at the ICPC 2024 Qualifications (Day 1), representing AAST Cairo.</p>
                <span className={`inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-full ${dark ? 'bg-amber-900/40 text-amber-300' : 'bg-amber-100 text-amber-700'}`}>Competitive Programming</span>
              </motion.div>

              {/* DELF A2 */}
              <motion.div whileHover={{ y: -3 }} className={`p-6 border rounded-2xl shadow-sm hover:shadow-md transition-all ${dark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-4xl mb-3">📜</div>
                <h3 className={`text-xl font-bold ${dark ? 'text-slate-100' : 'text-slate-800'}`}>DELF A2 — French Language</h3>
                <p className={`mt-2 leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Diploma in French Language Studies issued by France Éducation international, November 2021.</p>
                <span className={`inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-full ${dark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-600'}`}>Language Certification</span>
              </motion.div>

              {/* DELF A1 */}
              <motion.div whileHover={{ y: -3 }} className={`p-6 border rounded-2xl shadow-sm hover:shadow-md transition-all ${dark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-4xl mb-3">📜</div>
                <h3 className={`text-xl font-bold ${dark ? 'text-slate-100' : 'text-slate-800'}`}>DELF A1 — French Language</h3>
                <p className={`mt-2 leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Diploma in French Language Studies issued by France Éducation international, July 2018.</p>
                <span className={`inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-full ${dark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-600'}`}>Language Certification</span>
              </motion.div>

              {/* Languages */}
              <motion.div whileHover={{ y: -3 }} className={`p-6 border rounded-2xl shadow-sm hover:shadow-md transition-all ${dark ? 'bg-indigo-950/20 border-indigo-800/40' : 'bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-6 h-6 text-indigo-500" />
                  <h3 className={`text-xl font-bold ${dark ? 'text-slate-100' : 'text-slate-800'}`}>Languages</h3>
                </div>
                <div className="space-y-3 mt-2">
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold ${dark ? 'text-slate-300' : 'text-slate-700'}`}>🇪🇬 Arabic</span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${dark ? 'bg-indigo-900/40 text-indigo-300' : 'bg-indigo-100 text-indigo-600'}`}>Native</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold ${dark ? 'text-slate-300' : 'text-slate-700'}`}>🇬🇧 English</span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${dark ? 'bg-indigo-900/40 text-indigo-300' : 'bg-indigo-100 text-indigo-600'}`}>Professional</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold ${dark ? 'text-slate-300' : 'text-slate-700'}`}>🇫🇷 French</span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${dark ? 'bg-indigo-900/40 text-indigo-300' : 'bg-indigo-100 text-indigo-600'}`}>Working Proficiency</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Contact */}
        <section id="contact" className={`py-20 border-t ${dark ? 'border-slate-800' : 'border-slate-100'}`}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl text-center space-y-6 shadow-xl">
            <h2 className="text-3xl font-bold">Ready to collaborate?</h2>
            <p className="text-blue-100 max-w-md mx-auto leading-relaxed">I'm currently open for internships and freelance opportunities. Let's build something amazing together.</p>
            <a href="mailto:o.metwall06131@student.aast.edu" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-md">
              Send Me an Email <Send className="w-5 h-5" />
            </a>
          </motion.div>
        </section>
      </main>

      <footer className={`py-8 text-center text-sm ${dark ? 'text-slate-600' : 'text-slate-400'}`}>
        © 2026 Omar Hossam · Built with React &amp; TypeScript
      </footer>
    </div>
  );
}
