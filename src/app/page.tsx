"use client";

import { useState } from "react";

export default function Home() {
  // State management for the story generation workflow
  const [storyTitle, setStoryTitle] = useState("");
  const [storyBody, setStoryBody] = useState("");
  const [loading, setLoading] = useState(false);

  // Handles the initial form submission to generate a story title
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const subject = formData.get("subject") as string;

    try {
      // Make a POST request to our API endpoint to generate a story title
      const response = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("AI Response:", result);

      if (result.error) {
        throw new Error(result.error);
      }

      // Update the UI with the generated story title and show a placeholder message
      setStoryTitle(result.data);
      setStoryBody(
        "Story title generated! Click the button above to get the full story."
      );
    } catch (error) {
      console.error("Error:", error);
      setStoryBody("Sorry, there was an error generating your story title.");
    } finally {
      setLoading(false);
    }
  };

  // Initiates the story streaming process after a title has been generated
  const startStoryStream = async () => {
    if (!storyTitle) return;

    setLoading(true);
    setStoryBody(""); // Clear previous content to show streaming effect

    try {
      // Make a second API call to get the actual story content
      const response = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storyTitle }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if the response is a stream (text/event-stream)
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("text/event-stream")) {
        // Handle streaming response
        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error("No response body reader available");
        }

        const decoder = new TextDecoder();
        let accumulatedText = "";

        try {
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              break;
            }

            // Decode the chunk and add to accumulated text
            const chunk = decoder.decode(value, { stream: true });
            accumulatedText += chunk;

            // Update the UI with the accumulated text for a streaming effect
            setStoryBody(accumulatedText);
          }
        } catch (streamError) {
          console.error("Streaming error:", streamError);
          if (accumulatedText) {
            // If we got some content, show what we have
            setStoryBody(
              accumulatedText + "\n\n[Story generation was interrupted]"
            );
          } else {
            setStoryBody(
              "Sorry, there was an error while streaming your story."
            );
          }
        } finally {
          reader.releaseLock();
        }
      } else {
        // Fallback to JSON response handling
        const result = await response.json();
        setStoryBody(result.data);
      }
    } catch (error) {
      console.error("Error:", error);
      setStoryBody("Sorry, there was an error getting your story.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">📖 The Story Creator</h1>
      <p className="text-gray-600 mb-6">
        This app uses an AI Model to generate a story for children.
      </p>

      {/* Story generation form - allows users to select a subject and trigger AI generation */}
      <form onSubmit={onSubmitHandler} className="mb-6">
        Main subject of the story:
        <select className="ml-5" name="subject">
          <option value="squirrels">🐿 Squirrels</option>
          <option value="dragons">🐉 Dragons</option>
          <option value="aliens">👽 Aliens</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 ml-10 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "🤖 Generating..." : "🤖 Ask AI Model"}
        </button>
      </form>

      {/* Story display section - only shows after a title has been generated */}
      {storyTitle && (
        <div className="bg-gray-50 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-3">Generated Story Title:</h2>
          <p className="text-lg mb-4 font-medium">{storyTitle}</p>
          <button
            onClick={startStoryStream}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {loading ? "🤖 Getting Story..." : "📖 Get the Full Story"}
          </button>

          {/* Story content with streaming indicator */}
          <div className="mt-4">
            {loading && storyBody === "" && (
              <div className="flex items-center text-gray-600 mb-2">
                <div className="animate-pulse mr-2">⏳</div>
                <span>Generating your story...</span>
              </div>
            )}
            {storyBody && (
              <div className="bg-white p-4 rounded border">
                <h3 className="font-semibold mb-2">Your Story:</h3>
                <p className="whitespace-pre-wrap leading-relaxed">
                  {storyBody}
                </p>
                {loading && (
                  <span className="inline-block ml-2 animate-pulse text-green-500">
                    |
                  </span>
                )}
              </div>
            )}
            {!loading && storyBody === "" && storyTitle && (
              <div className="text-gray-500 italic">
                Click &quot;Get the Full Story&quot; to start generating your
                story...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
