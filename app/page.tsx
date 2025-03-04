"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUp, Share, X, Bookmark } from "lucide-react";
import { useChat } from "ai/react";

export default function Home() {
  const [view, setView] = useState<"insights" | "chat" | "followUp">(
    "insights"
  );
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showFollowUpResponse, setShowFollowUpResponse] = useState(false);
  const [followUpQuestion, setFollowUpQuestion] = useState("");
  const [initialResponseComplete, setInitialResponseComplete] = useState(false);
  const [userFollowUpQuestion, setUserFollowUpQuestion] = useState("");
  const [isFollowUpStreaming, setIsFollowUpStreaming] = useState(false);
  const [followUpStreamedText, setFollowUpStreamedText] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { messages } = useChat();

  useEffect(() => {
    if (view === "chat" && !isStreaming && streamedText === "") {
      setIsStreaming(true);
      streamAnswer();
    }
  }, [view, isStreaming, streamedText]);

  useEffect(() => {
    if (view === "followUp" && !isStreaming && !initialResponseComplete) {
      setIsStreaming(true);
      streamAnswer();
    }
  }, [view, isStreaming, initialResponseComplete]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [streamedText, showFollowUpResponse]);

  // Handle drawer animation
  useEffect(() => {
    if (view === "chat" || view === "followUp") {
      // Small delay to ensure proper animation
      setTimeout(() => {
        setIsDrawerOpen(true);
      }, 10);
    } else {
      setIsDrawerOpen(false);
    }
  }, [view]);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    // Wait for animation to finish before changing view
    setTimeout(() => {
      // Reset all chat-related state when closing the drawer
      setView("insights");
      setStreamedText("");
      setIsStreaming(false);
      setShowFollowUpResponse(false);
      setInitialResponseComplete(false);
      setUserFollowUpQuestion("");
      setFollowUpQuestion("");
      setFollowUpStreamedText("");
      setIsFollowUpStreaming(false);
    }, 300); // Match the transition duration
  };

  const streamAnswer = () => {
    const answer =
      "This is a great question! Let me analyze your subscriptions:\n\n" +
      "Based on your usage patterns, here are the subscriptions you might want to consider canceling:\n\n" +
      "1. ClassPass ($80/month)\n" +
      "• No logged sessions in the last 3 months\n" +
      "• Potential annual savings: $960\n\n" +
      "2. MasterClass ($40/month)\n" +
      "• Last watched: 4 months ago\n" +
      "• Potential annual savings: $480\n\n" +
      "Total potential annual savings: $1,440\n\n" +
      "Would you like me to help you cancel these subscriptions?";

    let i = 0;
    const streamingSpeed = 20;

    const interval = setInterval(() => {
      if (i <= answer.length) {
        setStreamedText(answer.substring(0, i));
        i += 1;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
        setInitialResponseComplete(true);
      }
    }, streamingSpeed);
  };

  const streamFollowUpAnswer = () => {
    const followUpAnswer =
      "Given your usage, cancelling Classpass and MasterClass could save " +
      "you $120/month—that's $1,440/year!";

    let i = 0;
    const streamingSpeed = 20;

    setIsFollowUpStreaming(true);

    const interval = setInterval(() => {
      if (i <= followUpAnswer.length) {
        setFollowUpStreamedText(followUpAnswer.substring(0, i));
        i += 1;
      } else {
        clearInterval(interval);
        setIsFollowUpStreaming(false);
      }
    }, streamingSpeed);
  };

  const handleFollowUpClick = () => {
    setView("followUp");
    setStreamedText("");
    setIsStreaming(false);
    setShowFollowUpResponse(false);
    setInitialResponseComplete(false);
    setUserFollowUpQuestion("");
    setFollowUpStreamedText("");
    setIsFollowUpStreaming(false);
  };

  const handleFollowUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (followUpQuestion.trim()) {
      setUserFollowUpQuestion(followUpQuestion);
      setFollowUpQuestion("");

      setShowFollowUpResponse(true);
      streamFollowUpAnswer();
    }
  };

  const renderInsightsView = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 relative">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-[17px] text-gray-500 font-normal mb-1">
              Weekly check-in
            </h1>
            <div className="text-gray-500 text-[15px]">Dec 29 - Jan 4</div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-500 p-1">
              <Share size={18} />
            </button>
            <button className="text-gray-500 p-1">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100">
          <div className="h-full w-1/3 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex-1 px-6 pt-6 overflow-y-auto">
        <div className="flex justify-center items-end gap-8 sm:gap-16 mb-12">
          <div className="flex flex-col items-center">
            <div className="text-[22px] mb-2 font-medium">$237</div>
            <div className="chart-bar w-[50px] sm:w-[60px] h-[120px] sm:h-[140px]"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[22px] mb-2 font-medium">$280</div>
            <div className="chart-bar w-[50px] sm:w-[60px] h-[170px] sm:h-[200px]"></div>
          </div>
        </div>

        {/* Main Text */}
        <div className="text-center mb-10">
          <h2 className="serif-font text-[24px] sm:text-[28px] leading-tight mb-4">
            You&apos;re spending $43 more on subscriptions this month
          </h2>
          <p className="text-gray-500 text-[15px] sm:text-[17px]">
            Review unused subscriptions to immediately save $1K+ this year
          </p>
        </div>

        {/* Divider with signature */}
        <div className="relative py-8">
          <div className="border-t-2 border-gray-300"></div>
          <img
            src="/divider.png"
            alt="Signature"
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-5"
            width={800}
            height={200}
          />
        </div>

        {/* Follow-up Questions Section */}
        <div className="px-4 pb-4">
          <div className="bg-white rounded-[28px] shadow-sm p-6">
            <div className="text-gray-500 mb-4 text-[15px]">
              Ask follow up questions
            </div>

            <button
              className="w-full text-left follow-up-question text-[17px]"
              onClick={handleFollowUpClick}
            >
              Which subscriptions should I cancel?
            </button>

            <button className="w-full text-left follow-up-question text-[17px]">
              How would reduce 20% subscriptions cost help me save more towards
              my goal?
            </button>

            <div className="input-bar mt-6 relative bg-[#F5F5F7]">
              <div className="text-gray-500 text-[15px]">Ask Peek anything</div>
              <button className="send-button">
                <ArrowUp size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderChatView = () => (
    <>
      <div
        className={`drawer-overlay ${isDrawerOpen ? "open" : ""}`}
        onClick={closeDrawer}
      />
      <div className={`chat-container ${isDrawerOpen ? "open" : ""}`}>
        <div className="flex flex-col h-full bg-white">
          {/* Add drawer handle */}
          <div className="drawer-handle" />

          {/* Chat header with close button */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={closeDrawer}
                className="text-gray-500 p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
              <h2 className="text-[17px] font-medium text-center flex-1">
                Chat
              </h2>
              <div className="w-8" /> {/* Spacer for centering */}
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="user-message">
              Which subscriptions should I cancel?
            </div>

            {isStreaming ? (
              <div className="ai-message">
                <div className="streaming-text">{streamedText}</div>
                <div className="typing-indicator mt-2">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            ) : (
              streamedText && (
                <div className="ai-message">
                  <div className="streaming-text">{streamedText}</div>
                </div>
              )
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-gray-200">
            <div className="input-bar">
              <input
                type="text"
                placeholder="Ask Peek anything"
                className="w-full bg-transparent outline-none text-[15px]"
              />
              <button className="send-button">
                <ArrowUp size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderFollowUpView = () => (
    <>
      <div
        className={`drawer-overlay ${isDrawerOpen ? "open" : ""}`}
        onClick={closeDrawer}
      />
      <div className={`chat-container ${isDrawerOpen ? "open" : ""}`}>
        <div className="flex flex-col h-full bg-white">
          {/* Add drawer handle */}
          <div className="drawer-handle" />

          {/* Chat header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={closeDrawer}
                className="text-gray-500 p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
              <h2 className="text-[17px] font-medium text-center flex-1">
                Chat
              </h2>
              <div className="w-8" /> {/* Spacer for centering */}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="user-message">
              Which subscriptions should I cancel?
            </div>

            {isStreaming ? (
              <div className="ai-message">
                <div className="streaming-text">{streamedText}</div>
                <div className="typing-indicator mt-2">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            ) : (
              initialResponseComplete && (
                <div className="ai-message">
                  <div className="streaming-text">{streamedText}</div>
                </div>
              )
            )}

            {userFollowUpQuestion && (
              <div className="user-message">{userFollowUpQuestion}</div>
            )}

            {showFollowUpResponse && (
              <div className="ai-message">
                {isFollowUpStreaming ? (
                  <>
                    <div className="streaming-text">{followUpStreamedText}</div>
                    <div className="typing-indicator mt-2">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="streaming-text">
                      Given your usage, cancelling Classpass and MasterClass
                      could save you $120/month—that&apos;s $1,440/year!
                    </div>

                    {/* Suggested Task Card - only show when streaming is complete */}
                    {!isFollowUpStreaming && followUpStreamedText && (
                      <div className="suggested-task">
                        <div className="suggested-task-label">
                          Suggested task
                        </div>
                        <div className="suggested-task-title text-[17px] sm:text-[20px]">
                          Review and cancel Classpass and Masterclass
                          subscriptions
                        </div>
                        <button className="add-to-tasks-button text-[14px] sm:text-[15px]">
                          <Bookmark size={16} className="bookmark-icon" /> Add
                          to tasks
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.role === "user" ? "user-message" : "ai-message"
                }
              >
                {message.role === "user" ? (
                  message.content
                ) : (
                  <div className="streaming-text">{message.content}</div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-gray-200">
            <form onSubmit={handleFollowUpSubmit}>
              <div className="input-bar">
                <input
                  ref={inputRef}
                  type="text"
                  value={followUpQuestion}
                  onChange={(e) => setFollowUpQuestion(e.target.value)}
                  placeholder="Ask Peek anything"
                  className="w-full bg-transparent outline-none text-[14px] sm:text-[15px]"
                  disabled={!initialResponseComplete || isStreaming}
                />
                <button
                  type="submit"
                  className="send-button"
                  disabled={!initialResponseComplete || isStreaming}
                >
                  <ArrowUp size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <main className="flex min-h-screen w-full bg-white">
      <div className="flex flex-col w-full h-full">
        {view === "insights" && renderInsightsView()}
        {view === "chat" && renderChatView()}
        {view === "followUp" && renderFollowUpView()}
      </div>
    </main>
  );
}
