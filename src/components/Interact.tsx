import React, { FC, useEffect, useState } from "react";
import AudioPlayer from "../components/AudioPlayer";
import { voice_ids } from "../private/voice_ids";
import { PropagateLoader } from "react-spinners";
import CodePreview from "@/components/CodePreview";
import languages from "../private/languages";
import DownloadButton from "@/components/Download";
import Translate from "../components/Translate";
import { Random } from "@/components/Random";

import Beautify from "@/components/Beautify";

interface BightProps {
  updateColors: () => void;
  useDefaults: () => void;
}

interface FormData {
  placeholder: string;
  query: string;
  language: string;
  limit: number;
  messageList: any[];
  waiting: boolean;
  code: any;
  message: string;
  voice: string;
  business: string;
  conversation: any | null;
  submitted: boolean;
  audioPlayerVisible: boolean;
  messageVisible: boolean;
}

const Interact: FC<BightProps> = ({ updateColors, useDefaults }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    placeholder: "",
    query: "",
    messageList: [],
    waiting: false,
    message: "",
    voice: "1BUhH8aaMvGMUdGAmWVM",
    conversation: null,
    limit: 30,
    submitted: false,
    code: null,
    language: "🇺🇸",
    business: "",
    audioPlayerVisible: false,
    messageVisible: true,
  });

  useEffect(() => {
    const translatePlaceholder = async () => {
      const updatedPlaceholder = await Translate(
        "en",
        formData.language,
        "How can we help? ✨"
      );
      setFormData((prevData) => ({
        ...prevData,
        placeholder: updatedPlaceholder,
      }));
    };
    translatePlaceholder();
  }, [formData.language]);

  useEffect(() => {
    const newConversation = async () => {
      try {
        const response = await fetch("/api/vapi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "createConversation" }),
        });
        const newConversation = await response.json();
        setFormData((prevData) => ({
          ...prevData,
          conversation: newConversation,
        }));
      } catch (error) {
        console.error("Error creating conversation:", error);
      }
    };

    if (!formData.conversation) newConversation();
  }, [formData.conversation]);

  const updateMessages = async () => {
    if (!formData.conversation) return;

    try {
      const response = await fetch("/api/vapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "listMessages",
          conversationId: formData.conversation.id,
        }),
      });
      const messages = await response.json();
      const messageContent = generateMessageListString(
        messages.data.reverse(),
        formData.query
      );

      const translatedContent = await Translate(
        "en",
        formData.language,
        messageContent
      );

      setFormData((prevData) => ({
        ...prevData,
        messageList: messages.data.reverse(),
        message: translatedContent,
        audioPlayerVisible: true,
        waiting: false,
      }));
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error("API error or no keys provided", error);
    }
  };

  const handleQuery = async () => {
    if (!formData.conversation) return;

    try {
      setFormData((prevData) => ({
        ...prevData,
        audioPlayerVisible: false,
        submitted: false,
        waiting: true,
      }));

      await fetch("/api/vapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "sendMessage",
          conversationId: formData.conversation.id,
          message: `${formData.query}. The business you are going to help is ${formData.business}.`,
        }),
      });

      const runResponse = await fetch("../api/vapi.ts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "startRun",
          conversationId: formData.conversation.id,
         
        
        }),
      });

      const runData = await runResponse.json();
      if (!runData.id) throw new Error("Failed to create run");

      const checkRunStatus = async () => {
        const resResponse = await fetch("../api/vapi.ts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "getRun",
            conversationId: formData.conversation.id,
            runId: runData.id,
          }),
        });

        const res = await resResponse.json();
        if (res.status === "completed") {
          updateMessages();
        } else if (res.status === "failed") {
          throw new Error("Run failed");
        } else {
          setTimeout(checkRunStatus, 1000);
        }
      };

      checkRunStatus();
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error("An error occurred:", error);
    }
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({ ...prevData, query: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleQuery();
    setFormData((prev) => ({ ...prev, submitted: true, query: "" }));
  };

  async function generateRandom() {
    setFormData((prev) => ({
      ...prev,
      query: Random.generateRandomQuery(),
      voice: Random.generateRandomVoice(),
    }));
  }

  function simplify() {
    setFormData((prev) => ({
      ...prev,
      limit: prev.limit === 120 ? 30 : prev.limit + 30,
    }));
  }

  function generateMessageListString(
    messageList: any[],
    userQuery: string
  ): string {
    let jsxString: string = "";
    for (let i = messageList.length - 1; i >= 0; i--) {
      const message = messageList[i];
      if (message.role === "user") continue;
      jsxString = message.content; // Use the message content directly
      return jsxString;
    }
    return jsxString;
  }

  const businesses = [
    "Joe's Coffee Shop",
    "Sally's Bakery",
    "Techie Gadgets",
    "Green Thumb Nursery",
    "Artisan Crafts",
  ];

  return (
    <div className="w-[100%] items-center justify-center lg:container">
      <form
        onSubmit={handleSubmit}
        className={`flex items-center justify-center hover:scale-105 ${
          formData.waiting ? "fade-out-main" : "fade-in-main"
        }`}
      >
        <div className="border border-white overflow-hidden hover:scale-x-105 transition-all duration-300 bounce items-center justify-center z-10 flex w-5/5 bg-black p-1 rounded-[20px] shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.05),_0_6.7px_5.3px_rgba(0,_0,_0,_0.06),_0_12.5px_10px_rgba(0,_0,_0,_0.07),_0_22.3px_17.9px_rgba(0,_0,_0,_0.09),_0_41.8px_33.4px_rgba(0,_0,_0,_0.1),_0_100px_80px_rgba(0,_0,_0,_0.14)]">
          {formData.code && (
            <DownloadButton formData={{ code: formData.code }} />
          )}
          {formData.code && <Beautify formData={{ code: formData.code }} />}
          <select
            className="pl-2 text-lg focus:outline-none cursor-pointer font-bold focus:ring-0 transition-transform duration-500 ease-in-out custom-select"
            value={formData.business}
            title="Choose a business"
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                business: e.target.value,
              }))
            }
            style={{
              borderRadius: "20px 20px 20px 20px",
              width: "190px",
              height: "38px",
              WebkitAppearance: "none",
            }}
          >
            <option value="" disabled>
              Choose a business
            </option>
            {businesses.map((business) => (
              <option key={business} value={business}>
                {business}
              </option>
            ))}
          </select>
          <input
            style={{ flex: 1 }}
            onChange={handleQueryChange}
            value={formData.query}
            id="query"
            placeholder={formData.placeholder}
            className="caret-white text-white pl-2 focus:outline-none focus:ring-0 rounded-xl font-bold grayscale bg-transparent"
            autoFocus
          />
          <select
            className="pl-1 focus:outline-none cursor-pointer focus:ring-0 hover:scale-90 font-bold text-sm transition-transform duration-500 ease-out"
            value={formData.voice}
            title="Customize voice"
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                voice: e.target.value,
              }))
            }
            style={{
              borderRadius: "12px",
              width: "63px",
              height: "37px",
              WebkitAppearance: "none",
            }}
          >
            <optgroup label="Silent">
              {Object.entries(voice_ids.silent).map(([name, id]) => (
                <option key={name} value={id}>
                  {name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Voice">
              {Object.entries(voice_ids.voice).map(([name, id]) => (
                <option key={name} value={id}>
                  {name}
                </option>
              ))}
            </optgroup>
          </select>
          <select
            className="ml-1.5 pl-1.5 text-2xl focus:outline-none cursor-pointer focus:ring-0 hover:scale-90 transition-transform duration-500 ease-in-out custom-select"
            value={formData.language}
            title="Choose a language"
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                language: e.target.value,
              }))
            }
            style={{
              borderRadius: "13px 20px 20px 13px",
              width: "39px",
              height: "38px",
              WebkitAppearance: "none",
            }}
          >
            {Object.entries(languages).map(([name, flag]) => (
              <option key={flag} value={name}>
                {flag}
              </option>
            ))}
          </select>
        </div>
      </form>
      {formData.waiting ? (
        <div
          className={`flex absolute left-0 right-0 justify-center items-center ${
            formData.waiting ? "fade-in" : "fade-out"
          }`}
        >
          <PropagateLoader color="#000000" size={18} speedMultiplier={1.5} />
        </div>
      ) : (
        <div className="mt-0">
          {formData.messageVisible && (
            <div>
              <p
                className={`flex justify-center items-center flex-col pt-4 leading-7 font-medium text-md ${
                  !formData.waiting ? "fade-in-main" : "fade-out-main"
                }`}
              >
                {formData.message}
              </p>
            </div>
          )}
          <div
            className={`flex flex-col justify-center pt-8 ${
              formData.waiting ? "fade-in" : "fade-out"
            }`}
          >
            {formData.code && <CodePreview code={formData.code} />}
          </div>
        </div>
      )}
      {formData.audioPlayerVisible && (
        <AudioPlayer
          inputText={formData.message}
          voiceChoice={formData.voice}
          onPlay={updateColors}
          onEnded={useDefaults}
        />
      )}
    </div>
  );
};

export default Interact;
