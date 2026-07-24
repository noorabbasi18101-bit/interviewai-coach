/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { SetupScreen } from './components/SetupScreen';
import { ChatScreen } from './components/ChatScreen';
import { FeedbackScreen } from './components/FeedbackScreen';
import {
  Screen,
  InterviewType,
  InterviewSessionConfig,
  Question,
  QAItem,
  FeedbackResult,
} from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedType, setSelectedType] = useState<InterviewType>('Job Interview');
  const [sessionConfig, setSessionConfig] = useState<InterviewSessionConfig>({
    interviewType: 'Job Interview',
    experienceLevel: 'Intermediate',
    jobRole: '',
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [qaHistory, setQaHistory] = useState<QAItem[]>([]);
  const [feedbackResult, setFeedbackResult] = useState<FeedbackResult | null>(null);

  const handleStartSession = (
    config: InterviewSessionConfig,
    questionsList: Question[]
  ) => {
    setSessionConfig(config);
    setQuestions(questionsList);
    setQaHistory([]);
    setFeedbackResult(null);
  };

  const handleFinishSession = (history: QAItem[], feedback: FeedbackResult) => {
    setQaHistory(history);
    setFeedbackResult(feedback);
  };

  const handleRestart = () => {
    setQaHistory([]);
    setFeedbackResult(null);
  };

  return (
    <div className="min-h-screen bg-[#faf9ff]">
      {currentScreen === 'home' && (
        <HomeScreen
          onNavigate={setCurrentScreen}
          onSelectType={(type) => setSelectedType(type)}
        />
      )}

      {currentScreen === 'setup' && (
        <SetupScreen
          onNavigate={setCurrentScreen}
          onStartSession={handleStartSession}
          selectedType={selectedType}
        />
      )}

      {currentScreen === 'interview' && (
        <ChatScreen
          onNavigate={setCurrentScreen}
          config={sessionConfig}
          questions={questions}
          onFinishSession={handleFinishSession}
        />
      )}

      {currentScreen === 'feedback' && (
        <FeedbackScreen
          onNavigate={setCurrentScreen}
          feedback={feedbackResult}
          qaHistory={qaHistory}
          onRestartSession={handleRestart}
        />
      )}
    </div>
  );
}

