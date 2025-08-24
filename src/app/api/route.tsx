import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client with OpenRouter endpoint
// Note: You'll need to get a free API key from https://openrouter.ai/
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "demo", // Use demo mode if no API key
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000", // Required by OpenRouter
    "X-Title": "Story Maker App", // Optional but recommended
  },
});

// Function to generate a creative story title using OpenRouter
const makeStoryTitle = async (subject: string) => {
  console.log("makeStoryTitle called with subject:", subject);

  try {
    // Use OpenRouter to generate a story title
    const response = await openai.chat.completions.create({
      model: "anthropic/claude-3.5-sonnet", // Free model on OpenRouter
      messages: [
        {
          role: "user",
          content: `Generate a creative and engaging story title about ${subject}. Make it suitable for children and keep it under 10 words.`,
        },
      ],
      max_tokens: 50,
      temperature: 0.9,
    });

    console.log("OpenRouter response:", response);

    if (
      response.choices &&
      response.choices[0] &&
      response.choices[0].message
    ) {
      const title = response.choices[0].message.content?.trim();
      if (title) {
        console.log("Generated AI title:", title);
        return title;
      }
    }

    throw new Error("No text generated from OpenRouter");
  } catch (error) {
    console.error("OpenRouter error:", error);
    console.log("Falling back to local story title generation...");

    // Fallback mechanism: When the AI API fails, use predefined story titles
    const storyTitles = {
      dragons: [
        "The Brave Dragon's Adventure",
        "A Dragon's First Flight",
        "The Friendly Dragon Next Door",
        "Dragon School Days",
        "The Dragon Who Loved Flowers",
      ],
      squirrels: [
        "The Squirrel's Secret Stash",
        "A Squirrel's Winter Preparation",
        "The Squirrel Family Tree",
        "Squirrel's First Acorn",
        "The Squirrel Who Could Fly",
      ],
      aliens: [
        "My Alien Best Friend",
        "The Alien's Earth Vacation",
        "Alien School on Earth",
        "The Alien Who Loved Pizza",
        "Alien's First Day at School",
      ],
    };

    // Select appropriate titles based on the subject, defaulting to dragons if subject not found
    const titles =
      storyTitles[subject as keyof typeof storyTitles] || storyTitles.dragons;
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];

    console.log("Generated fallback title:", randomTitle);
    return randomTitle;
  }
};

// Real streaming story generation using OpenRouter
const streamStory = async (storyTitle: string) => {
  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  // Start the story generation in the background
  const generateStory = async () => {
    try {
      // Create a prompt for story generation
      const storyPrompt = `Write a creative children's story titled "${storyTitle}". Make it engaging, age-appropriate, and around 200-300 words. Start the story immediately without repeating the title.`;

      // Use OpenRouter streaming for real-time story generation
      const response = await openai.chat.completions.create({
        model: "anthropic/claude-3.5-sonnet", // Free model on OpenRouter
        messages: [
          {
            role: "user",
            content: storyPrompt,
          },
        ],
        max_tokens: 400,
        temperature: 0.8,
        stream: true, // Enable streaming
      });

      // Handle streaming response
      for await (const chunk of response) {
        if (
          chunk.choices &&
          chunk.choices[0] &&
          chunk.choices[0].delta &&
          chunk.choices[0].delta.content
        ) {
          const text = chunk.choices[0].delta.content;

          // Send the text chunk to the client
          await writer.ready;
          await writer.write(encoder.encode(text));
        }
      }

      // Close the stream when done
      await writer.close();
    } catch (error) {
      console.error("Error in story generation:", error);
      try {
        // Send error message to client
        await writer.ready;
        await writer.write(
          encoder.encode("Sorry, there was an error generating your story.")
        );
        await writer.close();
      } catch (closeError) {
        console.error("Error closing stream:", closeError);
      }
    }
  };

  // Start the story generation
  generateStory();

  // Return the readable stream with proper headers for Server-Sent Events
  return new NextResponse(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
};

// Main API endpoint handler for POST requests
export async function POST(req: Request) {
  try {
    console.log("API called - processing request...");

    // Extract the subject and storyTitle from the request body
    const { subject, storyTitle } = await req.json();
    console.log("Request data:", { subject, storyTitle });

    // If the request includes a storyTitle, return the story stream
    if (storyTitle) {
      console.log("Returning story stream for:", storyTitle);
      return streamStory(storyTitle);
    }

    // If no storyTitle is provided, generate a new story title based on the subject
    console.log("Generating story title for subject:", subject);
    const gptResponse = await makeStoryTitle(subject);
    console.log("Generated response:", gptResponse);
    return Response.json({ data: gptResponse });
  } catch (error) {
    console.error("API Error:", error);
    // Provide meaningful error messages while avoiding information leakage
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return Response.json(
      { error: "Internal server error", details: errorMessage },
      { status: 500 }
    );
  }
}
