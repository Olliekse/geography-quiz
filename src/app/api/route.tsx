import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client with OpenRouter endpoint
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "Geography Quiz App",
  },
});

export async function GET() {
  try {
    // Check if API key is available
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error("API key not found");
    }

    console.log("Making API call to OpenRouter...");

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Generate a geography trivia question with exactly 4 multiple choice answers. 
          Format your response as JSON with this structure:
          {
            "question": "Your geography question here?",
            "answers": [
              {"text": "Correct answer", "correct": true},
              {"text": "Wrong answer 1", "correct": false},
              {"text": "Wrong answer 2", "correct": false},
              {"text": "Wrong answer 3", "correct": false}
            ]
          }
          
          Make sure to shuffle the answers so the correct one isn't always first. 
          The question should be about countries, capitals, landmarks, or geographical features.`,
        },
      ],
      model: "anthropic/claude-3-5-sonnet", // Using Claude Sonnet 3.5 via OpenRouter
      max_tokens: 300,
      temperature: 0.7,
    });

    const responseText = completion.choices[0]?.message?.content || "";
    console.log("Generated response:", responseText);

    // Try to parse the JSON response
    let quizData;
    try {
      quizData = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError);
      // Fallback to a default question if parsing fails
      quizData = {
        question: "What is the capital city of Australia?",
        answers: [
          { text: "Canberra", correct: true },
          { text: "Sydney", correct: false },
          { text: "Melbourne", correct: false },
          { text: "Brisbane", correct: false },
        ],
      };
    }

    // Validate the structure
    if (
      !quizData.question ||
      !quizData.answers ||
      quizData.answers.length !== 4
    ) {
      throw new Error("Invalid quiz data structure");
    }

    return NextResponse.json(quizData);
  } catch (error) {
    console.error("Error generating question:", error);

    // Fallback to mock questions if API fails
    const mockQuizzes = [
      {
        question: "What is the capital city of Australia?",
        answers: [
          { text: "Canberra", correct: true },
          { text: "Sydney", correct: false },
          { text: "Melbourne", correct: false },
          { text: "Brisbane", correct: false },
        ],
      },
      {
        question: "Which country has the largest population in the world?",
        answers: [
          { text: "China", correct: true },
          { text: "India", correct: false },
          { text: "United States", correct: false },
          { text: "Indonesia", correct: false },
        ],
      },
      {
        question: "What is the longest river in Africa?",
        answers: [
          { text: "Nile", correct: true },
          { text: "Congo", correct: false },
          { text: "Niger", correct: false },
          { text: "Zambezi", correct: false },
        ],
      },
    ];

    const randomIndex = Math.floor(Math.random() * mockQuizzes.length);
    const fallbackQuiz = mockQuizzes[randomIndex];

    console.log("Using fallback quiz:", fallbackQuiz);
    return NextResponse.json(fallbackQuiz);
  }
}
