import React, { FC, useEffect, useRef, useState } from "react";
import { Message } from "openai/resources/beta/threads/messages";
import { Threads } from "openai/resources/beta/threads/threads";
import OpenAI from "openai";
import AudioPlayer from "../components/AudioPlayer";
import { voice_ids } from "../private/voice_ids";
import { PropagateLoader } from "react-spinners";
import languages from "../private/languages";
import Translate from "../components/Translate";
import { getInstructionsByName } from "../../public/instructions";
import { getPersonalityByName } from "../../public/instructions";

import Spline from "@splinetool/react-spline";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

import { personalities } from "../../public/instructions";
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const assistantId = process.env.NEXT_PUBLIC_ASSISTANT_ID;

interface BightProps {
  updateColors: () => void;
  useDefaults: () => void;
}

interface FormData {
  placeholder: string;
  query: string;
  language: any;
  messageList: Message[];
  waiting: boolean;
  code: any;
  message: string;

  voice: string;
  attitude: string;
  thread: Threads.Thread | null;
  submitted: boolean;
  audioPlayerVisible: boolean;
  messageVisible: boolean;
}

const Interact: FC<BightProps> = ({ updateColors, useDefaults }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [formData, setFormData] = useState<FormData>({
    placeholder: "",
    query: "",
    messageList: [],
    waiting: false,
    message: "",
    voice: "T0pkYhIZ7UMOc26gqqeX",
    attitude: "Gen-Z",
    thread: null,
    submitted: false,
    code: null,
    language: "🇺🇸",
    audioPlayerVisible: false,
    messageVisible: true,
  });

  const createThread = async () => {
    try {
      const thread = await openai.beta.threads.create();
      return thread;
    } catch (error) {
      console.error("Error creating thread:", error);
      throw error;
    }
  };

  const listMessages = async (threadId: string) => {
    try {
      const messages = await openai.beta.threads.messages.list(threadId);
      return messages;
    } catch (error) {
      console.error("Error listing messages:", error);
      throw error;
    }
  };

  const createMessage = async (threadId: string, content: string) => {
    try {
      await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: content,
      });
    } catch (error) {
      console.error("Error creating message:", error);
      throw error;
    }
  };

  const createRun = async (threadId: string, instructions: string) => {
    try {
      if (!assistantId) throw new Error("Assistant ID is not configured");
      const run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: assistantId,
        instructions: instructions || undefined,
      });
      return run;
    } catch (error) {
      console.error("Error creating run:", error);
      throw error;
    }
  };

  const retrieveRun = async (threadId: string, runId: string) => {
    try {
      const run = await openai.beta.threads.runs.retrieve(threadId, runId);
      return run;
    } catch (error) {
      console.error("Error retrieving run:", error);
      throw error;
    }
  };

  useEffect(() => {
    const translatePlaceholder = async () => {
      const updatedPlaceholder = await Translate(
        "en",
        formData.language,
        "Go off... "
      );

      setFormData((prevFormData) => ({
        ...prevFormData,
        placeholder: updatedPlaceholder,
      }));
    };

    translatePlaceholder();
  }, [formData.language]);

  useEffect(() => {
    const newThread = async () => {
      try {
        const thread = await createThread();
        setFormData((prevData) => ({ ...prevData, thread: thread }));
      } catch (error) {
        console.error("Error creating new thread:", error);
        alert("An error occurred while creating a new thread");
      }
    };

    if (!formData.thread) newThread();
  }, []);

  const updateMessages = async () => {
    try {
      if (!formData.thread?.id) throw new Error("No thread ID available");

      const messages = await listMessages(formData.thread.id);
      let messageContent = generateMessageListString(
        messages.data.reverse(),
        formData.query
      );

      messageContent = messageContent.includes("【")
        ? messageContent.substring(0, messageContent.indexOf("【"))
        : messageContent;

      const between = /```([\s\S]*)```/;
      let tech = between.exec(messageContent)?.[1];
      tech = tech?.substring(tech.indexOf("<"), tech.lastIndexOf(">") + 1);
      messageContent = messageContent.replace(/```[\s\S]*$/, "");

      messageContent = await Translate("en", formData.language, messageContent);

      setFormData((prevData) => ({
        ...prevData,
        messageList: messages.data.reverse(),
        code: tech,
        message: messageContent,
        audioPlayerVisible: true,
        messageVisible: true,
        waiting: false,
      }));
    } catch (error) {
      alert("An error occurred. Please try again. Keys?");
      console.error("API error or no keys provided", error);
    }
  };

  const handleQuery = async () => {
    try {
      if (!formData.thread?.id) throw new Error("No thread ID available");

      setFormData((prevData) => ({
        ...prevData,
        audioPlayerVisible: false,
        submitted: false,
        waiting: true,
      }));

      await createMessage(formData.thread.id, formData.query);

      const instructions = getInstructionsByName(formData.attitude);
      if (!instructions) {
        throw new Error("Instructions not found for the given attitude");
      }

      const run = await createRun(formData.thread.id, instructions);
      if (!run.id) {
        throw new Error("Failed to create run");
      }

      const checkRunStatus = async () => {
        const res = await retrieveRun(formData.thread!.id, run.id);
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
      alert(error);
      console.error("An error occurred:", error);
    }
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({ ...prevData, query: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleQuery();
    setFormData((prevData) => ({ ...prevData, submitted: true, query: "" }));
  };

  // const toggleSelection = (personalityName: string) => {
  //   let str = selectedItems.join(", + ");
  //   alert(str);
  //   setSelectedItems((prev) => {
  //     const newSelection = prev.includes(personalityName)
  //       ? prev.filter((item) => item !== personalityName)
  //       : [...prev, getInstructionsByName(personalityName)].filter(Boolean); // Ensure no undefined values

  //     setFormData((prevData) => ({
  //       ...prevData,
  //       attitude: str,
  //     }));

  //     return newSelection;
  //   });
  // };

  function generateMessageListString(
    messageList: Message[],
    userQuery: string
  ): string {
    let jsxString: string = "";
    for (let i = messageList.length - 1; i >= 0; i--) {
      const message = messageList[i];
      if (message.role === "user") continue;
      for (let j = message.content.length - 1; j >= 0; j--) {
        const contentBlock = message.content[j];
        if (contentBlock.type === "text") {
          const textValue = contentBlock.text.value;
          if (textValue !== userQuery) {
            jsxString = textValue;
            return jsxString;
          }
        }
      }
    }
    return jsxString;
  }

  return (
    <div className="w-[100%] ">
      <form
        onSubmit={handleSubmit}
        className={`flex items-center justify-center hover:scale-105 ${
          formData.waiting ? "fade-out-main" : "fade-in-main"
        } `}
      >
        <div className="overflow-hidden hover:scale-x-105 transition-all duration-300 bounce items-center justify-center z-10 flex w-5/5 bg-black/100 p-1.5 rounded-[30px] shadow-xl shadow-black/30  ">
          <input
            style={{ flex: 1 }}
            onChange={handleQueryChange}
            value={formData.query}
            id="query"
            placeholder={formData.placeholder}
            className="caret-white text-white pl-2 focus:outline-none focus:ring-0 bg-transparent"
            autoFocus
          />
        </div>
        <select
          className="  grayscale text-white ml-2 pl-2 text-2xl focus:outline-none cursor-pointer focus:ring-0 hover:scale-90 transition-transform duration-500 ease-in-out custom-select"
          value={formData.language}
          title="Choose a language"
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              language: e.target.value,
            }))
          }
          style={{
            borderRadius: "20px",
            width: "42px",
            height: "37px",
            WebkitAppearance: "none",
          }}
        >
          {Object.entries(languages).map(([name, flag]) => (
            <option key={flag} value={name}>
              {flag}
            </option>
          ))}
        </select>
      </form>
      {/* Moved dropdowns outside the form */}
      <div className="opacity-0 w-full flex items-center justify-center mt-4">
        <select
          className="  pl-3 mr-1 focus:outline-none cursor-pointer focus:ring-0 hover:scale-90 font-bold text-sm transition-transform duration-500 ease-out"
          value={formData.attitude}
          title="Customize attitude"
          onChange={(e) => {
            const selectedPersonality = getPersonalityByName(e.target.value);
            setFormData((prevData) => ({
              ...prevData,
              attitude: selectedPersonality ? selectedPersonality.name : "",
            }));
          }}
          style={{
            borderRadius: "20px 11px 11px 20px",
            width: "77px",
            height: "39px",
            WebkitAppearance: "none",
          }}
        >
          <optgroup label="Attitude">
            {personalities.map((personality) => (
              <option key={personality.name} value={personality.name}>
                {personality.name}
              </option>
            ))}
          </optgroup>
        </select>

        <select
          className="  pl-2 focus:outline-none cursor-pointer bg-gradient-to-b from-white/50 to-white focus:ring-0 hover:scale-90 font-semibold text-md transition-transform duration-500 ease-out"
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
            width: "70px",
            height: "39px",
            WebkitAppearance: "none",
          }}
        >
          <optgroup label="He/Him">
            {Object.entries(voice_ids.he).map(([name, id]) => (
              <option key={name} value={id}>
                {name}
              </option>
            ))}
          </optgroup>
          <optgroup label="She/Her">
            {Object.entries(voice_ids.her).map(([name, id]) => (
              <option key={name} value={id}>
                {name}
              </option>
            ))}
          </optgroup>
          <optgroup label="They/Them">
            {Object.entries(voice_ids.they).map(([name, id]) => (
              <option key={name} value={id}>
                {name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
      <div className="scale-150 overflow-hidden">
        {/* <Spline scene="https://prod.spline.design/efovozZ1Mdzz734Z/scene.splinecode" /> */}
      </div>
      {formData.waiting ? (
        <div
          className={`flex absolute left-0 right-0 justify-center items-center ${
            formData.waiting ? "fade-in" : "fade-out"
          }`}
        >
          <PropagateLoader color="#000000" size={18} speedMultiplier={1.4} />
        </div>
      ) : (
        <div className="mt-0">
          {formData.messageVisible && (
            <div>
              <p
                className={`flex justify-center items-center flex-col p-4 font-medium text-md text-black ${
                  !formData.waiting ? "fade-in-main" : "fade-out-main"
                }`}
              >
                {/* {formData.message} */}
              </p>
            </div>
          )}
          <div
            className={`flex flex-col justify-center pt-8 ${
              formData.waiting ? "fade-in" : "fade-out"
            }`}
          >
            {/* {formData.code && <CodePreview code={formData.code} />} */}
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
