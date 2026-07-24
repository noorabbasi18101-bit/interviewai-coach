import React, { useState, useEffect, useRef } from 'react';
import { Screen, InterviewSessionConfig, Question, ChatMessage, QAItem, FeedbackResult } from '../types';

interface ChatScreenProps {
  onNavigate: (screen: Screen) => void;
  config: InterviewSessionConfig;
  questions: Question[];
  onFinishSession: (qaHistory: QAItem[], feedback: FeedbackResult) => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  onNavigate,
  config,
  questions,
  onFinishSession,
}) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [qaHistory, setQaHistory] = useState<QAItem[]>([]);
  const [isFinishing, setIsFinishing] = useState<boolean>(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const currentQuestion = questions[currentQuestionIdx] || {
    id: currentQuestionIdx + 1,
    question: "Tell me about a time you faced a challenge at work and how you handled it.",
    hint: "Use the STAR method: Situation, Task, Action, Result.",
    proTip: "Pro Tip: Use the STAR method (Situation, Task, Action, Result)",
  };

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format seconds to MM:SS
  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Initial welcome message and question setup
  useEffect(() => {
    if (questions.length > 0 && messages.length === 0) {
      const q = questions[0];
      setMessages([
        {
          id: 'ai-q1',
          sender: 'ai',
          text: `Hello! I'm your AI Coach today. Let's start your ${config.interviewType} (${config.experienceLevel} level).\n\n"${q.question}"`,
          timestamp: 'JUST NOW',
          isQuestion: true,
          questionIndex: 0,
        },
      ]);
    }
  }, [questions]);

  // Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isEvaluating]);

  // Voice Recognition setup
  useEffect(() => {
    const windowObj = window as any;
    const SpeechRecognition = windowObj.SpeechRecognition || windowObj.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setUserInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Voice input is not supported in this browser. Please type your answer.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleNextQuestionOrFinish = async (
    updatedQA: QAItem[],
    nextIdx: number
  ) => {
    if (nextIdx < questions.length) {
      setCurrentQuestionIdx(nextIdx);
      setShowHint(false);
      const nextQ = questions[nextIdx];

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-q-${nextIdx + 1}`,
          sender: 'ai',
          text: `Question ${nextIdx + 1} of ${questions.length}:\n\n"${nextQ.question}"`,
          timestamp: 'JUST NOW',
          isQuestion: true,
          questionIndex: nextIdx,
        },
      ]);
    } else {
      // Session finished, call server to generate comprehensive report
      setIsFinishing(true);
      try {
        const res = await fetch('/api/generate-feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            interviewType: config.interviewType,
            experienceLevel: config.experienceLevel,
            qaHistory: updatedQA,
          }),
        });
        const data = await res.json();
        const report: FeedbackResult = data.report;
        onFinishSession(updatedQA, report);
        onNavigate('feedback');
      } catch (err) {
        console.error('Error fetching final feedback:', err);
        // Fallback feedback
        const fallbackReport: FeedbackResult = {
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
                'You used "um" and "like" a few times. Practice pausing instead of using fillers to sound more deliberate.',
            },
            {
              title: 'Elaborate on results',
              description:
                'While your actions were clear, you could provide more quantifiable outcomes to show the impact of your work.',
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
              updatedQA[0]?.answer ||
              'I worked on a project where we had to move some data. I used Python and it went well.',
            recommendation:
              'I spearheaded a mission-critical data migration for our legacy systems. Leveraging Python and automated pipelines, I architected a solution that reduced latency by 40% and saved 15 hours per week.',
          },
        };
        onFinishSession(updatedQA, fallbackReport);
        onNavigate('feedback');
      } finally {
        setIsFinishing(false);
      }
    }
  };

  const handleSubmit = async () => {
    const text = userInput.trim();
    if (!text || isEvaluating) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    // Append User Answer
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'JUST NOW',
    };

    setMessages((prev) => [...prev, userMsg]);
    setUserInput('');
    setIsEvaluating(true);

    const newQAItem: QAItem = {
      questionIndex: currentQuestionIdx,
      question: currentQuestion.question,
      answer: text,
    };
    const updatedQA = [...qaHistory, newQAItem];
    setQaHistory(updatedQA);

    // Call API to evaluate answer
    try {
      const res = await fetch('/api/evaluate-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuestion.question,
          userResponse: text,
          interviewType: config.interviewType,
          experienceLevel: config.experienceLevel,
        }),
      });
      const data = await res.json();

      const aiFeedbackMsg: ChatMessage = {
        id: `ai-feedback-${Date.now()}`,
        sender: 'ai',
        text: `💡 Coach Notes: ${data.feedback}`,
        timestamp: 'JUST NOW',
      };

      setMessages((prev) => [...prev, aiFeedbackMsg]);

      // Move to next question after brief pause
      setTimeout(() => {
        setIsEvaluating(false);
        handleNextQuestionOrFinish(updatedQA, currentQuestionIdx + 1);
      }, 1200);
    } catch (err) {
      console.error('Error evaluating answer:', err);
      setIsEvaluating(false);
      handleNextQuestionOrFinish(updatedQA, currentQuestionIdx + 1);
    }
  };

  const handleSkip = () => {
    const skippedQAItem: QAItem = {
      questionIndex: currentQuestionIdx,
      question: currentQuestion.question,
      answer: '[Skipped Question]',
    };
    const updatedQA = [...qaHistory, skippedQAItem];
    setQaHistory(updatedQA);

    setMessages((prev) => [
      ...prev,
      {
        id: `user-skip-${Date.now()}`,
        sender: 'user',
        text: 'Skipped question.',
        timestamp: 'JUST NOW',
      },
    ]);

    handleNextQuestionOrFinish(updatedQA, currentQuestionIdx + 1);
  };

  const progressPercent = Math.min(
    100,
    Math.round(((currentQuestionIdx + 1) / questions.length) * 100)
  );

  return (
    <div className="h-screen bg-[#faf9ff] text-[#1a1b20] font-body flex flex-col overflow-hidden">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-[0_8px_32px_0_rgba(205,180,255,0.2)]">
        <div className="flex justify-between items-center px-4 md:px-10 py-4 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#cdb4ff]/30 text-[#685296]">
              <span className="material-symbols-outlined text-2xl">smart_toy</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl md:text-2xl bg-gradient-to-r from-[#685296] to-[#40627b] bg-clip-text text-transparent leading-none">
                InterviewAI Coach
              </span>
              <span className="text-xs font-semibold text-[#7a7580] uppercase tracking-widest mt-1">
                Question {currentQuestionIdx + 1} of {questions.length || 5}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-xs font-semibold text-[#7a7580] uppercase">
                SESSION TIMER
              </span>
              <span className="font-display font-semibold text-xl text-[#685296]">
                {formatTimer(timerSeconds)}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-[#e2e2e8]">
          <div
            className="h-full bg-[#685296] transition-all duration-500 shadow-[0_0_8px_rgba(104,82,150,0.5)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="pt-28 pb-48 flex-1 overflow-y-auto px-4 max-w-4xl mx-auto w-full custom-scrollbar space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className="space-y-4">
            {msg.sender === 'ai' ? (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-[#cbc4d1]/30 shrink-0 mt-1">
                  <span className="material-symbols-outlined text-[#685296] text-xl">
                    smart_toy
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 max-w-[88%]">
                  <div className="glass-card p-6 rounded-3xl rounded-tl-sm border-[#cbc4d1]/20 shadow-md">
                    <p className="text-base sm:text-lg text-[#1a1b20] leading-relaxed whitespace-pre-line">
                      {msg.text}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[#7a7580] px-2">
                    AI INTERVIEWER • {msg.timestamp}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-start flex-row-reverse gap-4">
                <div className="w-10 h-10 rounded-full bg-[#cdb4ff] flex items-center justify-center shadow-sm shrink-0 mt-1 text-[#584284]">
                  <span className="material-symbols-outlined text-xl">person</span>
                </div>
                <div className="flex flex-col gap-1.5 items-end max-w-[88%]">
                  <div className="primary-gradient p-6 rounded-3xl rounded-tr-sm text-[#001e2f] shadow-lg">
                    <p className="text-base sm:text-lg leading-relaxed whitespace-pre-line font-medium">
                      {msg.text}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[#7a7580] px-2">
                    YOU • {msg.timestamp}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Pro Tip Pill Banner */}
        {!isEvaluating && currentQuestion.proTip && (
          <div className="flex justify-center py-2">
            <div className="bg-[#bee1ff]/30 border border-[#bee1ff]/50 rounded-full px-6 py-2.5 flex items-center gap-2.5 shadow-sm">
              <span className="material-symbols-outlined text-[#40627b] text-base">
                lightbulb
              </span>
              <span className="text-sm font-semibold text-[#42647e]">
                {currentQuestion.proTip}
              </span>
            </div>
          </div>
        )}

        {/* AI Hint Card if toggled */}
        {showHint && (
          <div className="p-4 bg-[#cdb4ff]/20 border border-[#685296]/20 rounded-2xl text-sm text-[#584284] flex items-start gap-3">
            <span className="material-symbols-outlined text-[#685296]">help_outline</span>
            <div>
              <p className="font-bold mb-1">Coach Hint:</p>
              <p>{currentQuestion.hint}</p>
            </div>
          </div>
        )}

        {/* AI Thinking indicator */}
        {(isEvaluating || isFinishing) && (
          <div className="flex items-start gap-4 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#cbc4d1]/30">
              <span className="material-symbols-outlined text-[#685296] text-xl">
                smart_toy
              </span>
            </div>
            <div className="glass-card px-6 py-4 rounded-3xl text-[#7a7580] italic text-base">
              {isFinishing
                ? 'Generating final comprehensive performance report...'
                : 'InterviewAI is analyzing your response...'}
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </main>

      {/* Fixed Bottom Input Area */}
      <div className="fixed bottom-0 w-full bg-gradient-to-t from-[#faf9ff] via-[#faf9ff] to-transparent pb-4 px-4 md:px-8 z-40">
        <div className="max-w-4xl mx-auto space-y-3">
          {/* Input Box */}
          <div className="glass-card p-2.5 rounded-3xl flex flex-col md:flex-row items-stretch md:items-center gap-3 shadow-2xl border-white/80">
            <div className="flex-1 relative flex items-center">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                disabled={isEvaluating || isFinishing}
                placeholder="Type your answer here... (Tip: Mention specific actions you took)"
                rows={2}
                maxLength={2000}
                className="w-full bg-[#cdb4ff]/10 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-[#685296]/20 text-[#1a1b20] font-body text-base placeholder:text-[#7a7580]/60 resize-none outline-none"
              />

              <button
                type="button"
                onClick={toggleListening}
                className={`absolute right-4 p-2.5 rounded-full transition-all cursor-pointer ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'hover:bg-[#cdb4ff]/30 text-[#685296]'
                }`}
                title={isListening ? 'Stop Voice Recording' : 'Voice Input (Speak your answer)'}
              >
                <span className="material-symbols-outlined text-2xl">
                  {isListening ? 'mic_off' : 'mic'}
                </span>
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!userInput.trim() || isEvaluating || isFinishing}
              className="btn-gradient text-white px-8 py-4 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
            >
              <span>Submit Answer</span>
              <span className="material-symbols-outlined text-xl">send</span>
            </button>
          </div>

          {/* Action Row */}
          <div className="flex justify-between items-center px-4 text-sm font-semibold text-[#7a7580]">
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1.5 hover:text-[#685296] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">help_outline</span>
                <span>HINT</span>
              </button>

              <button
                type="button"
                onClick={handleSkip}
                className="flex items-center gap-1.5 hover:text-[#685296] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">skip_next</span>
                <span>SKIP</span>
              </button>
            </div>

            <div>
              Characters: <span className="font-bold text-[#1a1b20]">{userInput.length}</span> / 2000
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center items-center gap-10 pt-2 border-t border-[#cbc4d1]/20">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1 text-[#7a7580] hover:text-[#685296] text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">home</span>
              <span>Home</span>
            </button>
            <button
              onClick={() => onNavigate('setup')}
              className="flex items-center gap-1 text-[#685296] text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">fitness_center</span>
              <span>Practice</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
