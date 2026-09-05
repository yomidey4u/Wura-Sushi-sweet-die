import { useState } from 'react';

interface Course {
  id: string;
  title: string;
  description: string;
  status: 'in-progress' | 'coming-soon';
  progress?: number;
  currentModule?: string;
  launchDate?: string;
  modules: number;
  duration: string;
}

const courses: Course[] = [
  {
    id: 'foundations',
    title: 'Cybersecurity Foundations',
    description:
      'A practical introduction to threats, defences, and how to think like an operator — not just a target.',
    status: 'in-progress',
    progress: 34,
    currentModule: '1.3 — Understanding Threat Actors',
    modules: 12,
    duration: '6 hours',
  },
  {
    id: 'phishing',
    title: 'Phishing & Social Engineering',
    description:
      'How social engineering attacks work, how to spot them under pressure, and how to build a culture that catches them.',
    status: 'coming-soon',
    launchDate: 'October 2026',
    modules: 8,
    duration: '4 hours',
  },
  {
    id: 'network',
    title: 'Network Security Essentials',
    description:
      'Network architecture, common attack surfaces, and practical hardening techniques for small teams.',
    status: 'coming-soon',
    launchDate: 'December 2026',
    modules: 10,
    duration: '5 hours',
  },
];

const resources = [
  { title: 'Getting Started Guide', type: 'PDF', size: '1.2 MB' },
  { title: 'Cybersecurity Glossary', type: 'PDF', size: '840 KB' },
  { title: 'Incident Response Checklist', type: 'PDF', size: '320 KB' },
];

export default function TrainingView() {
  const [notified, setNotified] = useState<Set<string>>(new Set());
  const active = courses.find((c) => c.status === 'in-progress');

  function toggleNotify(id: string) {
    setNotified((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="space-y-10">
      {/* Continue learning */}
      {active && (
        <section>
          <h2 className="font-serif text-xl text-[#0A1A2B] mb-4">Continue where you left off</h2>
          <div
            className="relative overflow-hidden border border-[rgba(46,125,138,0.25)] bg-[#0A1A2B] p-6 lg:p-8"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='14' cy='14' r='1' fill='%232E7D8A' fill-opacity='0.25'/%3E%3C/svg%3E")`,
            }}
          >
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
              <div>
                <p className="text-[#2E7D8A] text-[9px] font-mono tracking-[0.15em] uppercase mb-2">
                  In progress
                </p>
                <h3 className="font-serif text-white text-xl lg:text-2xl mb-1.5">
                  {active.title}
                </h3>
                <p className="text-white/50 text-sm">{active.currentModule}</p>

                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/35 text-[10px] font-mono tracking-wide uppercase">
                      Progress
                    </span>
                    <span className="text-white/50 text-[10px] font-mono">{active.progress}%</span>
                  </div>
                  <div className="h-0.5 bg-white/10 rounded-full overflow-hidden w-48">
                    <div
                      className="h-full bg-[#2E7D8A] rounded-full transition-all"
                      style={{ width: `${active.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <button className="bg-[#2E7D8A] text-white text-sm font-semibold px-5 py-3 hover:bg-[#3A95A3] active:bg-[#256975] transition-colors flex-shrink-0 flex items-center gap-2 self-start">
                <PlayIcon />
                Continue learning
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Course library */}
      <section>
        <h2 className="font-serif text-xl text-[#0A1A2B] mb-4">Course library</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              notified={notified.has(course.id)}
              onToggleNotify={() => toggleNotify(course.id)}
            />
          ))}
        </div>
      </section>

      {/* Resources */}
      <section>
        <h2 className="font-serif text-xl text-[#0A1A2B] mb-4">Resources</h2>
        <div className="border border-[rgba(10,26,43,0.1)] bg-white divide-y divide-[rgba(10,26,43,0.06)]">
          {resources.map((r, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-5 py-4 hover:bg-[#F7F3EE] transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-[rgba(10,26,43,0.12)] flex items-center justify-center text-[#9A9490] flex-shrink-0">
                  <DocIcon />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2C2C2C]">{r.title}</p>
                  <p className="text-[10px] text-[#9A9490] font-mono">
                    {r.type} · {r.size}
                  </p>
                </div>
              </div>
              <span className="text-[#C08A3E] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Download ↓
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CourseCard({
  course, notified, onToggleNotify,
}: {
  course: Course;
  notified: boolean;
  onToggleNotify: () => void;
}) {
  const isActive = course.status === 'in-progress';

  return (
    <div
      className={`border flex flex-col ${
        isActive
          ? 'border-[rgba(46,125,138,0.3)] bg-white'
          : 'border-[rgba(10,26,43,0.1)] bg-white'
      }`}
    >
      <div className="p-5 flex-1">
        {isActive ? (
          <span className="inline-flex items-center gap-1.5 text-[9px] font-mono tracking-[0.12em] uppercase bg-[rgba(46,125,138,0.1)] text-[#2E7D8A] px-2 py-1 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D8A] animate-pulse" />
            In progress
          </span>
        ) : (
          <span className="inline-flex items-center text-[9px] font-mono tracking-[0.12em] uppercase bg-[rgba(10,26,43,0.04)] text-[#9A9490] px-2 py-1 mb-3">
            Launching {course.launchDate}
          </span>
        )}

        <h3 className="font-serif text-[#0A1A2B] text-base leading-snug mb-2">
          {course.title}
        </h3>
        <p className="text-[#6B6560] text-xs leading-relaxed mb-4">{course.description}</p>

        <div className="flex items-center gap-2 text-[10px] font-mono text-[#B0AAA3]">
          <span>{course.modules} modules</span>
          <span>·</span>
          <span>{course.duration}</span>
        </div>

        {isActive && typeof course.progress === 'number' && (
          <div className="mt-3 h-0.5 bg-[rgba(10,26,43,0.07)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2E7D8A] rounded-full"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        )}
      </div>

      <div className="border-t border-[rgba(10,26,43,0.06)] px-5 py-3">
        {isActive ? (
          <button className="text-[#2E7D8A] text-xs font-semibold hover:underline">
            Continue →
          </button>
        ) : (
          <button
            onClick={onToggleNotify}
            className={`text-xs font-medium transition-colors ${
              notified ? 'text-[#C08A3E]' : 'text-[#B0AAA3] hover:text-[#6B6560]'
            }`}
          >
            {notified ? "You're on the list ✓" : 'Notify me when it launches'}
          </button>
        )}
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path d="M2 1.5l8 4-8 4V1.5z" fill="currentColor" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path
        d="M2 1h6.5L11 3.5V12H2V1z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 1v3h3M4 7.5h5M4 9.5h3.5"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}
