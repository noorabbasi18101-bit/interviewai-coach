export type Screen = 'home' | 'setup' | 'interview' | 'feedback';

export type InterviewType =
  | 'Job Interview'
  | 'Internship Interview'
  | 'HR Interview'
  | 'Technical Interview';

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface InterviewSessionConfig {
  interviewType: InterviewType;
  experienceLevel: ExperienceLevel;
  jobRole: string;
}

export interface Question {
  id: number;
  question: string;
  hint: string;
  proTip: string;
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  isQuestion?: boolean;
  questionIndex?: number;
}

export interface QAItem {
  questionIndex: number;
  question: string;
  answer: string;
}

export interface FeedbackResult {
  score: number;
  overallMessage: string;
  strengths: Array<{ title: string; description: string }>;
  areasToImprove: Array<{ title: string; description: string }>;
  communicationTips: {
    title: string;
    description: string;
    tags: string[];
  };
  answerOptimization: {
    originalResponse: string;
    recommendation: string;
  };
}
