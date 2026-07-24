import React from 'react';
import { Screen, InterviewType } from '../types';
import candidateImage from '../assets/images/interview_candidate_1784844869660.jpg';
 interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
  onSelectType?: (type: InterviewType) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onSelectType }) => {
  const handleStartPractice = (type?: InterviewType) => {
    if (type && onSelectType) {
      onSelectType(type);
    }
    onNavigate('setup');
  };

  return (
    <div className="min-h-screen bg-[#faf9ff] text-[#1a1b20] font-body flex flex-col">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-[0_8px_32px_0_rgba(205,180,255,0.2)]">
        <nav className="flex justify-between items-center px-4 md:px-10 py-4 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <img
              alt="InterviewAI Coach Logo"
              className="h-10 w-auto"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiBwkBAU4BU8DL7ShHLCaae-6IE_Y98ucbo7ZQwKIKBOiyyP5FpoDtB9n_dH1LtDJu0sKWMHFfobae47lr-tM_LBPwnMskVcnoDf1WRP04GRuUvkmR9y7rc-Rm9YfEH84aFXR8lKbzQqRdwGlsGFhsKIKLRSPm1_0UdpkTpT8gXl1YrV_zsPZmuhV_H9uhOdtn3mnW3TrjivUlZvkXNXdOcSNoIrNopRkIqEcXIZK0CIjHwrwe8N5rPpWSdtkyb4GnBCgHDBd3U8Y"
            />
            <span className="font-display font-bold text-2xl md:text-3xl tracking-tight bg-gradient-to-r from-[#685296] to-[#40627b] bg-clip-text text-transparent">
              InterviewAI Coach
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-semibold text-lg">
            <button
              onClick={() => onNavigate('home')}
              className="text-[#685296] font-bold transition-all duration-300"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('setup')}
              className="text-[#49454f] hover:text-[#685296] transition-all duration-300"
            >
              Practice
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('setup')}
              className="p-2 rounded-full hover:bg-[#cdb4ff]/30 text-[#685296] transition-all"
              title="Start Practice"
            >
              <span className="material-symbols-outlined text-2xl">search</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-28 pb-32 flex-1">
        {/* Hero Section */}
        <section className="relative px-4 md:px-10 max-w-[1200px] mx-auto pt-8 md:pt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Atmospheric Glows */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#685296]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-40 -right-20 w-80 h-80 bg-[#40627b]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#cdb4ff]/30 text-[#685296] font-bold text-xs uppercase tracking-wider mb-6 border border-[#685296]/10">
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              POWERED BY ADVANCED AI
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight text-[#1a1b20]">
              Practice Interviews. <br />
              <span className="text-[#685296]">Improve Confidence.</span> <br />
              Get Hired.
            </h1>

            <p className="text-lg md:text-xl text-[#49454f] mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Your AI interview partner that helps you prepare, practice, and improve with real-time feedback and personalized coaching.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => handleStartPractice()}
                className="primary-gradient-btn px-8 py-4 rounded-xl font-bold text-[#584284] flex items-center justify-center gap-2 text-lg active:scale-95 cursor-pointer"
              >
                Start Mock Interview
                <span className="material-symbols-outlined">rocket_launch</span>
              </button>

              <button
                onClick={() => handleStartPractice('Technical Interview')}
                className="px-8 py-4 rounded-xl font-bold text-[#685296] border-2 border-[#685296]/20 hover:bg-[#685296]/5 transition-all duration-300 text-lg cursor-pointer active:scale-95"
              >
                Practice Questions
              </button>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="relative z-10 flex justify-center items-center">
            <div className="floating relative w-full max-w-[480px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#685296]/20 to-[#40627b]/20 rounded-[40px] blur-3xl opacity-40" />
             <img
  className="w-full h-auto drop-shadow-2xl rounded-2xl relative z-10 object-cover"
  alt="AI Interview Candidate"
  src={candidateImage}
/>

              {/* Floating Glass Stats Card */}
              <div className="absolute -bottom-6 -left-6 glass-card p-4 shadow-xl rounded-xl hidden sm:flex items-center gap-3 z-20">
                <div className="w-12 h-12 rounded-full bg-[#e7b2c6] flex items-center justify-center text-[#6b4254]">
                  <span className="material-symbols-outlined text-2xl">trending_up</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#49454f]">Success Rate</p>
                  <p className="text-xl font-display font-bold text-[#685296]">+85%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Section */}
        <section className="px-4 md:px-10 max-w-[1200px] mx-auto mt-28 md:mt-36">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Empowering Your Journey</h2>
            <p className="text-[#49454f] text-lg max-w-xl mx-auto">Expert-level tools designed for modern career seekers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div
              onClick={() => handleStartPractice('Job Interview')}
              className="glass-card p-8 rounded-2xl flex flex-col gap-6 hover:shadow-[0_20px_50px_rgba(205,180,255,0.25)] transition-all duration-300 group cursor-pointer hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#cdb4ff]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-4xl text-[#685296]">smart_toy</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl mb-3 text-[#1a1b20]">AI Mock Interviews</h3>
                <p className="text-[#49454f] leading-relaxed">
                  Engage in realistic role-play scenarios tailored to your specific industry and job level.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div
              onClick={() => handleStartPractice('HR Interview')}
              className="glass-card p-8 rounded-2xl flex flex-col gap-6 hover:shadow-[0_20px_50px_rgba(205,180,255,0.25)] transition-all duration-300 group cursor-pointer hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#bee1ff]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-4xl text-[#40627b]">flash_on</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl mb-3 text-[#1a1b20]">Instant Feedback</h3>
                <p className="text-[#49454f] leading-relaxed">
                  Receive detailed analysis of your answers, structure, tone, and domain accuracy immediately.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div
              onClick={() => handleStartPractice('Technical Interview')}
              className="glass-card p-8 rounded-2xl flex flex-col gap-6 hover:shadow-[0_20px_50px_rgba(205,180,255,0.25)] transition-all duration-300 group cursor-pointer hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#e7b2c6]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-4xl text-[#7c5264]">trending_up</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl mb-3 text-[#1a1b20]">Skill Improvement</h3>
                <p className="text-[#49454f] leading-relaxed">
                  Master communication frameworks like the STAR method used by top tech and executive hiring leaders.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic AI Feedback Teaser */}
        <section className="px-4 md:px-10 max-w-[1100px] mx-auto mt-28">
          <div className="glass-card overflow-hidden p-8 md:p-12 rounded-3xl relative">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-[140px]">chat_bubble</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="inline-block px-4 py-1 rounded bg-[#cae6ff] text-[#001e2f] font-bold text-xs uppercase tracking-wider">
                  REAL-TIME INSIGHTS
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold">AI-Powered Critique</h2>
                <p className="text-[#49454f] text-lg leading-relaxed">
                  We don't just tell you if you're good; we tell you why and how to get better. Our AI analyzes subtle nuances in your delivery.
                </p>

                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#685296] text-2xl">check_circle</span>
                    <span className="text-[#1a1b20] font-medium text-lg">Answer structure and relevance</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#685296] text-2xl">check_circle</span>
                    <span className="text-[#1a1b20] font-medium text-lg">Confidence and vocal clarity</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#685296] text-2xl">check_circle</span>
                    <span className="text-[#1a1b20] font-medium text-lg">Impact quantification & STAR alignment</span>
                  </li>
                </ul>
              </div>

              <div className="w-full lg:w-1/2 flex flex-col gap-5">
                <div className="glass-card p-6 rounded-2xl border-l-4 border-l-[#685296] shadow-sm hover:-translate-y-1 transition-transform">
                  <p className="text-xs text-[#685296] font-bold mb-2 uppercase tracking-wider">AI Suggestion</p>
                  <p className="text-base italic text-[#1a1b20]">
                    "Try using the STAR method for your 'Tell me about a time' response. You had a great Situation and Task, but could expand more on the specific Result."
                  </p>
                </div>

                <div className="glass-card p-6 rounded-2xl border-l-4 border-l-[#40627b] shadow-sm hover:-translate-y-1 transition-transform">
                  <p className="text-xs text-[#40627b] font-bold mb-2 uppercase tracking-wider">Communication Tip</p>
                  <p className="text-base italic text-[#1a1b20]">
                    "Your tone is very professional, but you used filler words like 'um' 4 times in that response. Try pausing slightly instead."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-[#cbc4d1]/20 mt-auto">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <img
              alt="Logo"
              className="h-8 w-auto"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiBwkBAU4BU8DL7ShHLCaae-6IE_Y98ucbo7ZQwKIKBOiyyP5FpoDtB9n_dH1LtDJu0sKWMHFfobae47lr-tM_LBPwnMskVcnoDf1WRP04GRuUvkmR9y7rc-Rm9YfEH84aFXR8lKbzQqRdwGlsGFhsKIKLRSPm1_0UdpkTpT8gXl1YrV_zsPZmuhV_H9uhOdtn3mnW3TrjivUlZvkXNXdOcSNoIrNopRkIqEcXIZK0CIjHwrwe8N5rPpWSdtkyb4GnBCgHDBd3U8Y"
            />
            <span className="font-display font-bold text-xl text-[#685296]">InterviewAI Coach</span>
          </div>

          <p className="text-[#49454f] text-sm text-center">
            © 2026 InterviewAI Coach. Elevate your career with artificial intelligence.
          </p>

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
          className="flex flex-col items-center justify-center bg-[#cdb4ff]/50 text-[#584284] rounded-full px-5 py-1.5 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-2xl">home</span>
          <span className="text-xs font-bold mt-0.5">Home</span>
        </button>

        <button
          onClick={() => onNavigate('setup')}
          className="flex flex-col items-center justify-center text-[#49454f] hover:text-[#685296] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-2xl">record_voice_over</span>
          <span className="text-xs font-bold mt-0.5">Practice</span>
        </button>
      </nav>
    </div>
  );
};
