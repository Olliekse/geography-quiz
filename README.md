# Story Creator - My First AI App

This is my first attempt at building an AI-powered application. I built a **Next.js app** that generates creative stories for children using **OpenRouter** (which gives access to AI models like Claude and GPT-4). It streams the stories in real-time, so you can watch the AI write them word by word.

## What I Built

- **AI Story Titles**: The AI creates unique story titles based on what you pick (squirrels, dragons, or aliens)
- **Real-Time Story Streaming**: Watch stories being written live
- **Backend API**: Learned how to build a proper backend with Next.js API routes
- **Fallback System**: If the AI fails, it falls back to some pre-written titles
- **Responsive UI**: Made it look good on both desktop and mobile with Tailwind CSS

## How I Made It Work

### Backend

I built the streaming functionality in `src/app/api/route.tsx` using **OpenRouter**:

1. **OpenRouter Integration**: Learned how to connect to an external AI service
2. **Real Streaming**: The AI actually streams text in real-time
3. **TransformStream**: Used this Web API to handle streaming data
4. **Server-Sent Events**: Proper headers for real streaming
5. **Error Handling**: Added fallbacks so the app doesn't crash

### Frontend

The streaming is handled in `src/app/page.tsx`:

1. **API Calls**: Learned how to make proper API calls from React
2. **Real-Time Updates**: The UI updates as each word arrives from the AI
3. **Loading States**: Added loading indicators and error messages
4. **Responsive Design**: Made sure it looks good on all devices

## Tech Stack I Used

- **Next.js 15**: First time using the latest version
- **OpenRouter**: Gives access to multiple AI models without dealing with each one separately
- **OpenAI SDK**: Use this to talk to OpenRouter (it's OpenAI-compatible)
- **Web Streams API**: Learned about this for real-time data
- **TypeScript**: Added this for better code quality (still learning it)
- **Tailwind CSS**: Made styling easier than writing CSS from scratch

## Why I Chose OpenRouter

- **Free Tier**: I'm a student, so free is good
- **Multiple Models**: Can try different AI models without changing much code
- **Streaming**: Real streaming support (this was important for the user experience)
- **Easy to Use**: OpenAI-compatible API, so lots of tutorials online
- **Reliable**: Good uptime and support

## Models I Can Use

OpenRouter gives access to:

- **Claude 3.5 Sonnet**: What I'm currently using - it's really good at creative writing
- **GPT-4**: OpenAI's latest model (might try this next)
- **GPT-3.5 Turbo**: Fast and cost-effective
- **Llama Models**: Meta's open-source models
- **And tons more**: Still exploring what's available

## How It All Works

```
User picks a subject (like dragons)
    ↓
Frontend calls my backend API
    ↓
Backend calls OpenRouter API
    ↓
OpenRouter asks Claude to write a story
    ↓
Story streams back to my app
    ↓
User sees the story being written live
```

## Getting Started

1. **Clone this repo** (if you want to see how I built it)
2. **Install stuff**: `npm install`
3. **Get OpenRouter API key**: Sign up at [https://openrouter.ai/](https://openrouter.ai/) (it's free)
4. **Create `.env.local`**: Add `OPENROUTER_API_KEY=your_key_here`
5. **Run it**: `npm run dev`
6. **Have fun**: Start creating AI stories

## How to Use It

1. **Pick a subject** (I made three options: squirrels 🐿️, dragons 🐉, or aliens 👽)
2. **Click "Ask AI Model"** - watch it generate a creative title
3. **Click "Get the Full Story"** - see the AI write a complete story in real-time
4. **Enjoy**: It's pretty cool watching AI create stories

## What I Learned

This project taught me:

- **Full-stack development** with Next.js
- **External API integration** (OpenRouter)
- **Real-time streaming** (this was the hardest part)
- **Error handling** and fallback systems
- **Environment variables** and security
- **TypeScript** (still learning, but getting better)

## Challenges I Faced

- **Streaming was hard**: Had to learn about Web Streams API, TransformStream, and Server-Sent Events
- **API integration**: Figuring out how to properly call external services
- **Error handling**: Making sure the app doesn't crash when things go wrong
- **TypeScript**: Getting the types right for the streaming responses

## Future Improvements I Want to Make

- [ ] Add more story subjects
- [ ] Let users save their favorite stories
- [ ] Add different AI models to choose from
- [ ] Maybe add image generation with DALL-E?
- [ ] User accounts and story history
- [ ] Share stories with friends

## Why I Built This

I'm a frontend developer trying to get a junior-level job, and I wanted to show that I can:

- Build full-stack applications
- Integrate with external APIs
- Handle real-time data
- Build something that actually works and is fun to use

This project combines my love for storytelling with my passion for coding. Plus, AI is super hot right now, so learning how to build AI-powered apps seems like a smart career move.

## Getting Help

If you run into issues:

1. Check that your `.env.local` file has the right API key
2. Make sure you have an OpenRouter account
3. Check the console for error messages
4. Feel free to open an issue if something's broken

---

**Thanks for checking out my first AI app!**

This was a huge learning experience for me, and I'm really proud of how it turned out. Building something that actually uses AI to create content in real-time felt like magic when I first got it working.
