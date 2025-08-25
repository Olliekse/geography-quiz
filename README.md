# Geography Quiz - My First AI App

This is my first attempt at building an AI-powered application. I built a **Next.js app** that generates geography trivia questions with multiple choice answers using **OpenRouter** (which gives access to AI models like Claude and GPT-4). It creates engaging quiz questions about countries, capitals, landmarks, and geographical features.

## Live Demo 🚀

**[Try it out live](https://geography-quiz-seven.vercel.app/)**

## What I Built

- **AI-Generated Questions**: The AI creates unique geography trivia questions
- **Multiple Choice Answers**: Each question comes with 4 possible answers (1 correct, 3 incorrect)
- **Interactive Quiz Interface**: Click buttons to select answers and see immediate feedback
- **Backend API**: Learned how to build a proper backend with Next.js API routes
- **Fallback System**: If the AI fails, it falls back to pre-written geography questions
- **Responsive UI**: Made it look good on both desktop and mobile with Tailwind CSS

## How I Made It Work

### Backend

I built the quiz generation in `src/app/api/route.tsx` using **OpenRouter**:

1. **OpenRouter Integration**: Learned how to connect to an external AI service
2. **Structured Prompts**: The AI generates questions with exactly 4 multiple choice answers
3. **JSON Response Parsing**: Handles structured data from the AI model
4. **Error Handling**: Added fallbacks so the app doesn't crash
5. **Data Validation**: Ensures the AI response has the correct format

### Frontend

The quiz interface is built in `src/app/page.tsx`:

1. **API Calls**: Learned how to make proper API calls from React
2. **Interactive Buttons**: Each answer is displayed as a clickable button
3. **Answer Validation**: Shows whether the user's selection is correct
4. **Visual Feedback**: Green for correct answers, red for incorrect selections
5. **Responsive Design**: Made sure it looks good on all devices

## Tech Stack I Used

- **Next.js 15**: First time using the latest version
- **OpenRouter**: Gives access to multiple AI models without dealing with each one separately
- **OpenAI SDK**: Use this to talk to OpenRouter (it's OpenAI-compatible)
- **TypeScript**: Added this for better code quality (still learning it)
- **Tailwind CSS**: Made styling easier than writing CSS from scratch
- **React Hooks**: Used useState for managing quiz state and user interactions

## Why I Chose OpenRouter

- **Free Tier**: I'm a student, so free is good
- **Multiple Models**: Can try different AI models without changing much code
- **Reliable**: Good uptime and support
- **Easy to Use**: OpenAI-compatible API, so lots of tutorials online
- **Cost-Effective**: Good pricing for AI model access

## Models I Can Use

OpenRouter gives access to:

- **Claude 3.5 Sonnet**: What I'm currently using - it's really good at generating structured content
- **GPT-4**: OpenAI's latest model (might try this next)
- **GPT-3.5 Turbo**: Fast and cost-effective
- **Llama Models**: Meta's open-source models
- **And tons more**: Still exploring what's available

## How It All Works

```
User clicks "Generate New Question"
    ↓
Frontend calls my backend API
    ↓
Backend calls OpenRouter API
    ↓
OpenRouter asks Claude to create a geography question with 4 answers
    ↓
Question and answers are sent back to my app
    ↓
User sees the question and 4 answer buttons
    ↓
User selects an answer and sees immediate feedback
```

## Getting Started

1. **Clone this repo** (if you want to see how I built it)
2. **Install stuff**: `npm install`
3. **Get OpenRouter API key**: Sign up at [https://openrouter.ai/](https://openrouter.ai/) (it's free)
4. **Create `.env.local`**: Add `OPENROUTER_API_KEY=your_key_here`
5. **Run it**: `npm run dev`
6. **Have fun**: Start taking geography quizzes

## How to Use It

1. **Click "Generate New Question"** - watch it create a new geography trivia question
2. **Read the question** carefully
3. **Click on one of the 4 answer buttons** to make your selection
4. **See the result** - correct answers are highlighted in green, wrong selections in red
5. **Generate another question** to keep learning about geography

## What I Learned

This project taught me:

- **Full-stack development** with Next.js
- **External API integration** (OpenRouter)
- **Structured AI prompts** and response handling
- **JSON parsing** and data validation
- **Error handling** and fallback systems
- **Environment variables** and security
- **TypeScript** (still learning, but getting better)
- **Interactive UI components** with React

## Challenges I Faced

- **AI Response Structure**: Getting the AI to consistently return properly formatted JSON
- **API integration**: Figuring out how to properly call external services
- **Error handling**: Making sure the app doesn't crash when things go wrong
- **TypeScript**: Getting the types right for the quiz data structure
- **UI State Management**: Managing multiple states (loading, selected answer, showing results)

## Future Improvements I Want to Make

- [ ] Add different quiz categories (history, science, etc.)
- [ ] Keep track of user scores
- [ ] Add difficulty levels
- [ ] Let users choose different AI models
- [ ] Add explanations for why answers are correct
- [ ] User accounts and quiz history
- [ ] Share quiz results with friends

## Why I Built This

I'm a frontend developer trying to get a junior-level job, and I wanted to show that I can:

- Build full-stack applications
- Integrate with external APIs
- Handle structured data from AI models
- Build something that actually works and is fun to use
- Create interactive user interfaces

This project combines my interest in geography with my passion for coding. Plus, AI is super hot right now, so learning how to build AI-powered apps seems like a smart career move.

## Getting Help

If you run into issues:

1. Check that your `.env.local` file has the right API key
2. Make sure you have an OpenRouter account
3. Check the console for error messages
4. Feel free to open an issue if something's broken

---

**Thanks for checking out my first AI app!**

This was a huge learning experience for me, and I'm really proud of how it turned out. Building something that actually uses AI to generate educational content felt like magic when I first got it working.
