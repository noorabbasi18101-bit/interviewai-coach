import React, { useState } from 'react';
import { Screen, FeedbackResult, QAItem } from '../types';

interface FeedbackScreenProps {
  onNavigate: (screen: Screen) => void;
  feedback: FeedbackResult | null;
  qaHistory: QAItem[];
  onRestartSession: () => void;
}

export const FeedbackScreen: React.FC<FeedbackScreenProps> = ({
  onNavigate,
  feedback,
  qaHistory,
  onRestartSession,
}) => {
  const [showDetail, setShowDetail] = useState<boolean>(true);

  // Default fallback if feedback is null
  const data: FeedbackResult = feedback || {
    score: 85,
    overallMessage:
      'You demonstrated strong analytical thinking and technical confidence. Here is how you can level up for your next round.',
    strengths: [
      {
        title: 'Confident tone',
        description:
          'Your vocal variety and projection conveyed high authority and domain expertise throughout the session.',
      },
      {
        title: 'Clear structure',
        description:
          'You organized your thoughts logically, making it very easy for the interviewer to follow your problem-solving process.',
      },
    ],
    areasToImprove: [
      {
        title: 'Reduce filler words',
        description:
          'You used filler phrases occasionally. Practice pausing deliberately instead of filling silence to sound more authoritative.',
      },
      {
        title: 'Elaborate on results',
        description:
          'While your actions were clear, you could provide more quantifiable outcomes (e.g., % metric impact) to show project value.',
      },
    ],
    communicationTips: {
      title: 'Master the STAR Method',
      description:
        'For behavioral questions, always define the Situation, Task, Action, and specific Result.',
      tags: ['BEHAVIORAL', 'METHODOLOGY'],
    },
    answerOptimization: {
      originalResponse:
        qaHistory[0]?.answer ||
        'I worked on a project where we had to move some data. I used Python and it went well.',
      recommendation:
        'I spearheaded a mission-critical data migration for our legacy systems. Leveraging Python and automated AWS Glue pipelines, I architected a process that reduced latency by 40% and saved approximately 15 hours of manual work per week.',
    },
  };

  // Calculate SVG dashoffset for score ring (circumference for r=40 is ~251.32)
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (data.score / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#faf9ff] text-[#1a1b20] font-body flex flex-col">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-[0_8px_32px_0_rgba(205,180,255,0.2)]">
        <div className="flex justify-between items-center px-4 md:px-10 py-4 max-w-[1200px] mx-auto">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <img
              alt="InterviewAI Coach Logo"
              className="h-10 w-auto"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiBwkBAU4BU8DL7ShHLCaae-6IE_Y98ucbo7ZQwKIKBOiyyP5FpoDtB9n_dH1LtDJu0sKWMHFfobae47lr-tM_LBPwnMskVcnoDf1WRP04GRuUvkmR9y7rc-Rm9YfEH84aFXR8lKbzQqRdwGlsGFhsKIKLRSPm1_0UdpkTpT8gXl1YrV_zsPZmuhV_H9uhOdtn3mnW3TrjivUlZvkXNXdOcSNoIrNopRkIqEcXIZK0CIjHwrwe8N5rPpWSdtkyb4GnBCgHDBd3U8Y"
            />
            <span className="font-display font-bold text-2xl md:text-3xl tracking-tight bg-gradient-to-r from-[#685296] to-[#40627b] bg-clip-text text-transparent">
              InterviewAI Coach
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-28 pb-36 px-4 md:px-10 max-w-[1200px] mx-auto flex-1 w-full">
        {/* Performance Score Hero Section */}
        <section className="mb-12 text-center flex flex-col items-center">
          <div className="relative w-48 h-48 md:w-56 md:h-56 mb-6">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-[#e2e2e8] stroke-current"
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                strokeWidth="8"
              />
              <circle
                className="text-[#685296] stroke-current transition-all duration-1000 ease-out"
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                strokeWidth="8"
                strokeLinecap="round"
                style={{
                  strokeDasharray: `${circumference} ${circumference}`,
                  strokeDashoffset: strokeDashoffset,
                  transform: 'rotate(-90deg)',
                  transformOrigin: '50% 50%',
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display font-bold text-4xl md:text-5xl text-[#685296]">
                {data.score}%
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#40627b] mt-1">
                {data.score >= 80 ? 'Great Job!' : data.score >= 60 ? 'Good Effort!' : 'Keep Practicing!'}
              </span>
            </div>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3 text-[#1a1b20]">
            Interview Session Complete
          </h1>
          <p className="text-[#49454f] text-base md:text-lg max-w-2xl leading-relaxed">
            {data.overallMessage}
          </p>
        </section>

        {/* Bento Grid Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Strengths Card */}
          <div className="lg:col-span-6 glass-card rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#bee1ff]/40 flex items-center justify-center text-[#40627b]">
                <span className="material-symbols-outlined text-3xl">verified</span>
              </div>
              <h3 className="font-display font-semibold text-2xl text-[#1a1b20]">Strengths</h3>
            </div>

            <div className="space-y-4">
              {data.strengths.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 bg-white/60 p-5 rounded-xl border border-white/60"
                >
                  <span className="material-symbols-outlined text-[#685296] text-2xl shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <div>
                    <p className="font-bold text-[#685296] text-lg mb-1">{item.title}</p>
                    <p className="text-sm sm:text-base text-[#49454f] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Areas to Improve Card */}
          <div className="lg:col-span-6 glass-card rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#e7b2c6]/40 flex items-center justify-center text-[#7c5264]">
                <span className="material-symbols-outlined text-3xl">trending_up</span>
              </div>
              <h3 className="font-display font-semibold text-2xl text-[#1a1b20]">
                Areas to Improve
              </h3>
            </div>

            <div className="space-y-4">
              {data.areasToImprove.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 bg-white/60 p-5 rounded-xl border border-white/60"
                >
                  <span className="material-symbols-outlined text-[#7c5264] text-2xl shrink-0 mt-0.5">
                    lightbulb
                  </span>
                  <div>
                    <p className="font-bold text-[#7c5264] text-lg mb-1">{item.title}</p>
                    <p className="text-sm sm:text-base text-[#49454f] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Communication Tips */}
          <div className="lg:col-span-4 glass-card rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#cdb4ff]/40 flex items-center justify-center text-[#685296]">
                <span className="material-symbols-outlined text-3xl">psychology</span>
              </div>
              <h3 className="font-display font-semibold text-2xl text-[#1a1b20]">
                Communication Tips
              </h3>
            </div>

            <div className="bg-[#685296]/5 p-5 rounded-xl border border-[#685296]/10 space-y-4">
              <h4 className="font-bold text-[#685296] text-lg">
                {data.communicationTips.title}
              </h4>
              <p className="text-sm sm:text-base text-[#49454f] leading-relaxed">
                {data.communicationTips.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {data.communicationTips.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1 rounded-full bg-[#685296]/10 text-[#685296] text-xs font-bold uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AI Answer Optimization */}
          <div className="lg:col-span-8 glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#bee1ff]/40 flex items-center justify-center text-[#40627b]">
                  <span className="material-symbols-outlined text-3xl">auto_awesome</span>
                </div>
                <h3 className="font-display font-semibold text-2xl text-[#1a1b20]">
                  AI Answer Optimization
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowDetail(!showDetail)}
                className="text-[#685296] font-bold text-xs uppercase hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{showDetail ? 'HIDE DETAIL' : 'VIEW DETAIL'}</span>
                <span className="material-symbols-outlined text-lg">
                  {showDetail ? 'expand_less' : 'expand_more'}
                </span>
              </button>
            </div>

            {showDetail && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div className="p-5 bg-[#f4f3f9] rounded-xl border border-[#cbc4d1]/30">
                  <p className="text-xs font-bold text-[#7a7580] uppercase tracking-wider mb-2">
                    Your Original Response
                  </p>
                  <p className="italic text-[#49454f] text-base leading-relaxed">
                    "{data.answerOptimization.originalResponse}"
                  </p>
                </div>

                <div className="p-6 bg-[#cdb4ff]/20 rounded-xl border border-[#cdb4ff]/50 relative">
                  <span className="absolute top-4 right-4 material-symbols-outlined text-[#685296]/20 text-5xl pointer-events-none">
                    format_quote
                  </span>
                  <p className="text-xs font-bold text-[#685296] uppercase tracking-wider mb-2">
                    InterviewAI's Recommendation
                  </p>
                  <p className="text-base sm:text-lg font-medium text-[#584284] leading-relaxed">
                    "{data.answerOptimization.recommendation}"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Actions */}
        <div className="mt-14 flex flex-col items-center gap-6">
          <button
            onClick={() => {
              onRestartSession();
              onNavigate('setup');
            }}
            className="primary-gradient text-[#230a4e] font-bold py-5 px-12 sm:px-16 rounded-full text-xl sm:text-2xl shadow-xl hover:scale-105 transition-all duration-300 active:scale-95 flex items-center gap-3 cursor-pointer"
          >
            <span className="material-symbols-outlined text-3xl">refresh</span>
            <span>Practice Again</span>
          </button>

          <p className="text-xs font-bold text-[#49454f] uppercase tracking-widest">
            Next Recommended: Technical Systems Design & Behavioral STAR Session
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-10 border-t border-[#cbc4d1]/20 mt-auto">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <span className="font-display font-bold text-xl text-[#685296]">
            InterviewAI Coach
          </span>
          <p className="text-sm text-[#49454f]">© 2026 InterviewAI Coach. Elevate your career.</p>
          <div className="flex gap-6 text-sm text-[#49454f]">
            <button onClick={() => onNavigate('home')} className="hover:text-[#685296]">Home</button>
            <button onClick={() => onNavigate('setup')} className="hover:text-[#685296]">Practice</button>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-white/50 py-3 px-6 flex justify-around items-center z-50 shadow-[0_-8px_32px_0_rgba(205,180,255,0.15)] rounded-t-2xl">
        <button
          onClick={() => onNavigate('home')}
          className="flex flex-col items-center justify-center text-[#49454f] hover:text-[#685296] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-2xl">home</span>
          <span className="text-xs font-bold mt-0.5">Home</span>
        </button>

        <button
          onClick={() => {
            onRestartSession();
            onNavigate('setup');
          }}
          className="flex flex-col items-center justify-center bg-[#cdb4ff]/50 text-[#584284] rounded-full px-5 py-1.5 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-2xl">record_voice_over</span>
          <span className="text-xs font-bold mt-0.5">Practice</span>
        </button>
      </nav>
    </div>
  );
};
