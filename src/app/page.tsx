"use client";

import { useState } from "react";

interface Answer {
  text: string;
  correct: boolean;
}

interface QuizData {
  question: string;
  answers: Answer[];
}

export default function Home() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  async function handleClick() {
    setLoading(true);
    setSelectedAnswer(null);
    setShowResult(false);
    try {
      const response = await fetch("/api");
      const data = await response.json();
      setQuizData(data);
    } catch (error) {
      console.error("Error fetching question:", error);
      // Fallback quiz data
      setQuizData({
        question: "What is the capital city of Australia?",
        answers: [
          { text: "Canberra", correct: true },
          { text: "Sydney", correct: false },
          { text: "Melbourne", correct: false },
          { text: "Brisbane", correct: false },
        ],
      });
    } finally {
      setLoading(false);
    }
  }

  function handleAnswerClick(answerIndex: number) {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
  }

  function getButtonStyle(answerIndex: number) {
    if (!showResult) {
      return "border p-3 rounded-lg w-full cursor-pointer hover:bg-gray-100 transition-colors";
    }

    const answer = quizData?.answers[answerIndex];
    if (answer?.correct) {
      return "border p-3 rounded-lg w-full cursor-pointer bg-green-100 border-green-500 text-green-800";
    } else if (selectedAnswer === answerIndex) {
      return "border p-3 rounded-lg w-full cursor-pointer bg-red-100 border-red-500 text-red-800";
    } else {
      return "border p-3 rounded-lg w-full cursor-pointer bg-gray-50 border-gray-300 text-gray-500";
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-center">🌎 Geography Quiz</h1>
      
      <button
        onClick={handleClick}
        disabled={loading}
        className="border p-3 rounded-lg w-full cursor-pointer hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-50 border-blue-300 hover:bg-blue-100 transition-colors"
      >
        {loading ? "Loading..." : "Generate New Question"}
      </button>

      {quizData && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center p-4 bg-gray-50 rounded-lg">
            {quizData.question}
          </h2>
          
          <div className="grid gap-3">
            {quizData.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={showResult}
                className={getButtonStyle(index)}
              >
                {answer.text}
              </button>
            ))}
          </div>

          {showResult && selectedAnswer !== null && (
            <div className="mt-4 p-4 rounded-lg text-center">
              {quizData.answers[selectedAnswer].correct ? (
                <div className="text-green-700 bg-green-50 p-3 rounded-lg">
                  🎉 Correct! Well done!
                </div>
              ) : (
                <div className="text-red-700 bg-red-50 p-3 rounded-lg">
                  ❌ Wrong answer. The correct answer is:{" "}
                  <span className="font-semibold">
                    {quizData.answers.find((a) => a.correct)?.text}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
