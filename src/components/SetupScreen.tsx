import React, { useState } from 'react';
import { Screen, InterviewType, ExperienceLevel, InterviewSessionConfig, Question } from '../types';
import candidateImage from '../assets/images/interview_candidate_1784844869660.jpg';

interface SetupScreenProps {
  onNavigate: (screen: Screen) => void;
  onStartSession: (config: InterviewSessionConfig, questions: Question[]) => void;
  selectedType?: InterviewType;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({
  onNavigate,
  onStartSession,
  selectedType = 'Job Interview',
}) => {
  const [type, setType] = useState<InterviewType>(selectedType);
  const [level, setLevel] = useState<ExperienceLevel>('Intermediate');
  const [role, setRole] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleStart = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interviewType: type,
          experienceLevel: level,
          jobRole: role || undefined,
        }),
      });

      const data = await res.json();
      const questionsList: Question[] = (data.questions || []).map((q: any, idx: number) => ({
        id: idx + 1,
        question: q.question,
        hint: q.hint || 'Focus on specific examples and quantify your achievements.',
        proTip: q.proTip || 'Use the STAR method (Situation, Task, Action, Result)',
      }));

      onStartSession(
        { interviewType: type, experienceLevel: level, jobRole: role },
        questionsList
      );
      onNavigate('interview');
    } catch (err) {
      console.error('Error starting session:', err);
      // Fallback questions on network error
      const fallbackQuestions: Question[] = [
        {
          id: 1,
          question: "Tell me about a time you faced a significant challenge at work or school and how you handled it.",
          hint: "Structure your response with the STAR method (Situation, Task, Action, Result). Focus on specific actions you took.",
          proTip: "Use the STAR method (Situation, Task, Action, Result)",
        },
        {
          id: 2,
          question: "How do you prioritize your tasks when managing multiple tight deadlines?",
          hint: "Mention specific prioritization frameworks like Urgent vs Important or tools you use to stay organized.",
          proTip: "Highlight trade-off analysis and clear stakeholder communication",
        },
        {
          id: 3,
          question: "Describe a situation where you had a conflict or disagreement with a team member and how you resolved it.",
          hint: "Emphasize active listening, empathy, and focusing on shared project goals.",
          proTip: "Demonstrate emotional intelligence and constructive resolution",
        },
        {
          id: 4,
          question: "What is a major technical or professional project you led or contributed to recently?",
          hint: "Walk through the architectural or logical decisions made and quantify your final impact.",
          proTip: "Quantify your impact with numbers, metrics, or time saved",
        },
        {
          id: 5,
          question: "Where do you see yourself growing in your career over the next 2-3 years?",
          hint: "Align your personal skill growth with driving value in leadership or technical mastery.",
          proTip: "Focus on continuous skill acquisition and long-term ambition",
        },
      ];
      onStartSession(
        { interviewType: type, experienceLevel: level, jobRole: role },
        fallbackQuestions
      );
      onNavigate('interview');
    } finally {
      setIsLoading(false);
    }
  };

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

    <button
      onClick={() => onNavigate('home')}
      className="text-[#685296] font-bold text-lg"
    >
      Home
    </button>
  </div>
</header>
  {/* Main Content */}
      <main className="pt-28 pb-36 px-4 md:px-0 flex-1">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Page Title */}
          <div className="text-center space-y-3">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#685296] tracking-tight">
              Set Up Your Interview
            </h1>
            <p className="text-base sm:text-lg text-[#49454f] max-w-xl mx-auto">
              Customize your session to get the most accurate feedback from your AI mentor.
            </p>
          </div>

          {/* Hero Banner Image */}
          <div className="flex justify-center py-2">
            <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-xl glass-card p-3 flex justify-center items-center bg-white/70">
              <img
                alt="Professional job candidate prepared for interview"
                className="w-auto h-72 sm:h-80 max-w-full rounded-xl object-contain mx-auto transition-transform duration-300 hover:scale-105"
                src={candidateImage}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Section 1: Choose Interview Type */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#685296] text-3xl">work</span>
              <h2 className="font-display font-semibold text-2xl text-[#1a1b20]">
                Choose Interview Type
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Option 1: Job Interview */}
              <button
                type="button"
                onClick={() => setType('Job Interview')}
                className={`glass-card p-5 rounded-2xl text-left border-2 transition-all duration-300 flex items-center gap-4 cursor-pointer active:scale-[0.98] ${
                  type === 'Job Interview'
                    ? 'option-selected border-[#685296]'
                    : 'border-transparent hover:border-[#cdb4ff]/60'
                }`}
              >
                <div className="w-14 h-14 rounded-full bg-[#cdb4ff]/30 flex items-center justify-center text-[#685296] shrink-0">
                  <span className="material-symbols-outlined text-3xl">corporate_fare</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#1a1b20]">Job Interview</h3>
                  <p className="text-sm text-[#49454f]">Full-time roles & career shifts</p>
                </div>
              </button>

              {/* Option 2: Internship Interview */}
              <button
                type="button"
                onClick={() => setType('Internship Interview')}
                className={`glass-card p-5 rounded-2xl text-left border-2 transition-all duration-300 flex items-center gap-4 cursor-pointer active:scale-[0.98] ${
                  type === 'Internship Interview'
                    ? 'option-selected border-[#685296]'
                    : 'border-transparent hover:border-[#cdb4ff]/60'
                }`}
              >
                <div className="w-14 h-14 rounded-full bg-[#bee1ff]/30 flex items-center justify-center text-[#40627b] shrink-0">
                  <span className="material-symbols-outlined text-3xl">school</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#1a1b20]">Internship Interview</h3>
                  <p className="text-sm text-[#49454f]">Student roles & early career</p>
                </div>
              </button>

              {/* Option 3: HR Interview */}
              <button
                type="button"
                onClick={() => setType('HR Interview')}
                className={`glass-card p-5 rounded-2xl text-left border-2 transition-all duration-300 flex items-center gap-4 cursor-pointer active:scale-[0.98] ${
                  type === 'HR Interview'
                    ? 'option-selected border-[#685296]'
                    : 'border-transparent hover:border-[#cdb4ff]/60'
                }`}
              >
                <div className="w-14 h-14 rounded-full bg-[#e7b2c6]/30 flex items-center justify-center text-[#7c5264] shrink-0">
                  <span className="material-symbols-outlined text-3xl">groups</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#1a1b20]">HR Interview</h3>
                  <p className="text-sm text-[#49454f]">Behavioral & cultural fit</p>
                </div>
              </button>

              {/* Option 4: Technical Interview */}
              <button
                type="button"
                onClick={() => setType('Technical Interview')}
                className={`glass-card p-5 rounded-2xl text-left border-2 transition-all duration-300 flex items-center gap-4 cursor-pointer active:scale-[0.98] ${
                  type === 'Technical Interview'
                    ? 'option-selected border-[#685296]'
                    : 'border-transparent hover:border-[#cdb4ff]/60'
                }`}
              >
                <div className="w-14 h-14 rounded-full bg-[#685296]/10 flex items-center justify-center text-[#685296] shrink-0">
                  <span className="material-symbols-outlined text-3xl">code</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#1a1b20]">Technical Interview</h3>
                  <p className="text-sm text-[#49454f]">Coding, design, & systems</p>
                </div>
              </button>
            </div>
          </section>

          {/* Section 2: Experience Level */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#685296] text-3xl">stairs</span>
              <h2 className="font-display font-semibold text-2xl text-[#1a1b20]">
                Experience Level
              </h2>
            </div>

            <div className="flex p-1.5 bg-[#f4f3f9] rounded-2xl border border-[#cbc4d1]/30">
              {(['Beginner', 'Intermediate', 'Advanced'] as ExperienceLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevel(lvl)}
                  className={`flex-1 py-3.5 px-3 rounded-xl font-bold transition-all text-base sm:text-lg cursor-pointer ${
                    level === lvl
                      ? 'bg-white shadow-md text-[#685296]'
                      : 'text-[#49454f] hover:bg-white/50'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </section>

          {/* Section 3: Target Role (Optional Customization) */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#685296] text-3xl">badge</span>
              <h2 className="font-display font-semibold text-xl text-[#1a1b20]">
                Target Job Role <span className="text-xs font-normal text-[#49454f]">(Optional)</span>
              </h2>
            </div>

            <div className="relative">
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Frontend Engineer, Product Manager, Data Analyst..."
                className="w-full bg-white/80 border border-[#cbc4d1]/50 rounded-2xl px-5 py-4 text-[#1a1b20] focus:ring-2 focus:ring-[#685296]/30 focus:border-[#685296] outline-none transition-all placeholder:text-[#cbc4d1]"
              />
            </div>
          </section>

          {/* CTA Button */}
          <div className="pt-6 flex flex-col items-center">
            <button
              onClick={handleStart}
              disabled={isLoading}
              className="primary-gradient primary-glow w-full sm:w-auto px-12 sm:px-16 py-5 rounded-full text-white font-bold text-xl sm:text-2xl transition-all duration-300 active:scale-95 shadow-[0_8px_32px_0_rgba(104,82,150,0.3)] hover:translate-y-[-2px] disabled:opacity-60 cursor-pointer flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-2xl">sync</span>
                  <span>Generating Session...</span>
                </>
              ) : (
                <>
                  <span>Start Interview</span>
                  <span className="material-symbols-outlined text-2xl">arrow_forward</span>
                </>
              )}
            </button>

            <p className="mt-5 text-base text-[#49454f] flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-[#685296]">verified_user</span>
              AI coach is ready to analyze your performance
            </p>
          </div>
        </div>
      </main>

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
          onClick={() => onNavigate('setup')}
          className="flex flex-col items-center justify-center bg-[#cdb4ff]/50 text-[#584284] rounded-full px-5 py-1.5 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-2xl">record_voice_over</span>
          <span className="text-xs font-bold mt-0.5">Practice</span>
        </button>
      </nav>
    </div>
  );
};
