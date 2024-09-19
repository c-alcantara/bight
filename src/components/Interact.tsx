import React, { FC, useEffect, useState } from 'react';

import { Message } from 'openai/resources/beta/threads/messages';
import { Threads } from 'openai/resources/beta/threads/threads';
//import { OpenAI } from 'openai';
import AudioPlayer from '../components/AudioPlayer';
import { voice_ids } from '../private/voice_ids';
//import { SpinnerDotted } from 'spinners-react';
import { PropagateLoader } from 'react-spinners';
import CodePreview from '@/components/CodePreview';
import languages from '../private/languages';
import DownloadButton from '@/components/Download';
//import beautify from '@/components/Beautify';
import Translate from '../components/Translate';
import { Random } from '@/components/Random';
import { instruct, aldInstruct } from '../../public/instructions';
import Beautify from '@/components/Beautify';
interface BightProps {
  updateColors: () => void;
  useDefaults: () => void;
  
}

interface FormData {
  placeholder: string;
  query: string;
  language: any;
  limit: number;
  messageList: Message[];
  waiting: boolean;
  code: any;
  message: string;
  voice: string;
  business: string;
  thread: Threads.Thread | null;
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
    thread: null,
    limit: 30,
    submitted: false,
    code: null,
    language: "🇺🇸",
    business: "",
    audioPlayerVisible: false,
    messageVisible: true,
  });

  useEffect(() => {
    //optimize this
    const translatePlaceholder = async () => {
      const updatedPlaceholder = await Translate(
        "en",
        formData.language,
        "How can we help? ✨"
      );

      setFormData((prevFormData) => ({
        ...prevFormData,
        placeholder: updatedPlaceholder,
      }));
    };

    translatePlaceholder();
  }, [formData.language]);

  // Inside your component
  const [prevLimit, setPrevLimit] = useState(formData.limit);
  const [animate, setAnimate] = useState(false);
  const [animate2, setAnimate2] = useState(false);
  useEffect(() => {
    if (prevLimit !== formData.limit) {
      setAnimate(true);
      setPrevLimit(formData.limit);
    }
  }, [formData.limit]);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setAnimate(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  // In your button
  // useEffect(() => {
  //   if (formData.voice === '') {
  //     setFormData((prevData) => ({ ...prevData, messageVisible: true }));
  //   } else {
  //     setFormData((prevData) => ({ ...prevData, messageVisible: false }));
  //   }
  // },[formData.voice]);

  useEffect(() => {
    if (formData.audioPlayerVisible) {
      setAnimate2(true);
      formData.messageVisible = true;
    } else {
      setAnimate2(false);
      formData.messageVisible = false;
    }
  }, [formData.audioPlayerVisible]);

  //const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });
  require("dotenv").config();
  // const openai = new OpenAI({ apiKey: process.env.NEXT_PRIVATE_OPENAI_API_KEY, dangerouslyAllowBrowser: true });
  useEffect(() => {
    const newThread = async () => {
      const response = await fetch("../api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "createThread" }),
      });
      const newThread = await response.json();
      setFormData((prevData) => ({ ...prevData, thread: newThread }));
    };

    if (!formData.thread) newThread();
  }, []);

  const updateMessages = async () => {
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "listMessages",
          threadId: formData.thread!.id,
        }),
      });
      const messages = await response.json();
      let messageContent = generateMessageListString(
        messages.data.reverse(),
        formData.query
      );
      messageContent = messageContent.includes("【")
        ? messageContent.substring(0, messageContent.indexOf("【"))
        : messageContent;
      const between = /```([\s\S]*)```/;
      let tech = between.exec(messageContent)?.[1]; // Extracting the matched first group
      tech = tech?.substring(tech.indexOf("<"), tech.lastIndexOf(">") + 1);
      //tech = tech?.substring(tech.indexOf('CREATE'), tech.lastIndexOf(');') + 1);
      messageContent = messageContent.replace(/```[\s\S]*$/, "");
      //alert(tech);

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
      setFormData((prevData) => ({
        ...prevData,
        audioPlayerVisible: false,
        submitted: false,
        waiting: true,
      }));

      // Create message
      await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "createMessage",
          threadId: formData.thread!.id,
          content: formData.query + ". the business your going to help out with is  " + formData.business + "that you will communicate on behalf of the user",
        }),
      });

      // Create run
      const runResponse = await fetch("../api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "createRun",
          threadId: formData.thread!.id,
          instructions: `${instruct}`,
          additional_instructions: `${aldInstruct}`,
        }),
      });
      const runData = await runResponse.json();

      if (!runData.id) {
        throw new Error("Failed to create run");
      }

      const checkRunStatus = async () => {
        const resResponse = await fetch("../api/openai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "retrieveRun",
            threadId: formData.thread!.id,
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
      alert("An error occurred. Please try again. OpenAI?");
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

  async function generateRandom() {
    setFormData((prevData) => ({
      ...prevData,
      query: Random.generateRandomQuery(),
      voice: Random.generateRandomVoice(),
    }));
  }

  function simplify() {
    if (formData.limit === 30) {
      setFormData((prevData) => ({ ...prevData, limit: 60 }));
    } else if (formData.limit === 60) {
      setFormData((prevData) => ({ ...prevData, limit: 90 }));
    } else if (formData.limit === 90) {
      setFormData((prevData) => ({ ...prevData, limit: 120 }));
    } else {
      setFormData((prevData) => ({ ...prevData, limit: 30 }));
    }
  }

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

  // Example list of small businesses
  const businesses = [
    "Joe's Coffee Shop",
    "Sally's Bakery",
    "Techie Gadgets",
    "Green Thumb Nursery",
    "Artisan Crafts",
  ];

  return (
    <div className="   w-[100%] items-center justify-center lg:container    ">
      <form
        onSubmit={handleSubmit}
        className={`flex items-center justify-center hover:scale-105  ${
          formData.waiting ? "fade-out-main" : "fade-in-main"
        } `}
      >
        <div className="overflow-hidden hover:scale-x-105 transition-all duration-300 bounce items-center justify-center z-10 flex w-4/5 bg-black p-1.5  rounded-full shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.05),_0_6.7px_5.3px_rgba(0,_0,_0,_0.06),_0_12.5px_10px_rgba(0,_0,_0,_0.07),_0_22.3px_17.9px_rgba(0,_0,_0,_0.09),_0_41.8px_33.4px_rgba(0,_0,_0,_0.1),_0_100px_80px_rgba(0,_0,_0,_0.14)] ">
          {formData.code && (
            <DownloadButton formData={{ code: formData.code }} />
          )}
          {formData.code && <Beautify formData={{ code: formData.code }} />}
          {/* <button 
    className="pl-1 hover:scale-90 transition-all duration-500  ease-out " 
    id="randomButton" 
    type="button" 
            title="Generate random query"
    onClick={generateRandom}
>
    <img src="/random.svg" alt="Random" />
</button> */}
          <select
            className=" pl-2 text-lg focus:outline-none cursor-pointer font-bold focus:ring-0  transition-transform duration-500 ease-in-out custom-select"
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
              width: "190px", // Adjusted width for better display
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
            className="caret-white text-white pl-2 focus:outline-none focus:ring-0 rounded-xl  font-bold grayscale bg-transparent"
            autoFocus
          />

          {/* <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`hover:scale-90 transition-all duration-500 leading-5 ease-out rounded-xl bg-white px-4 mr-1.5 py-2 pr-1.5 pl-1.5 transition-all   ${formData.limit === 30 ? 'font-semibold text-sm' : ''} ${formData.limit === 60 ? 'font-bold text-md' : ''} ${formData.limit === 90 ? 'font-extrabold text-lg' : ''} ${formData.limit === 120 ? 'font-black text-xl' : ''}`}
            id="simplify"
            title="Choose response length"
            type="button"
            onClick={simplify}
          >
            <span style={{ fontSize: '15px' }}>{''}</span>
            {(formData.limit === 30 ? '30' : formData.limit === 60 ? '60' : formData.limit === 90 ? '90' : formData.limit === 120 ? '120' : '') }
          
          </button> */}
          <select
            className=" pl-1 focus:outline-none cursor-pointer focus:ring-0 hover:scale-90  font-bold text-sm transition-transform duration-500 ease-out "
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
            className="ml-1.5 pl-1.5 text-2xl focus:outline-none cursor-pointer focus:ring-0 hover:scale-90  transition-transform duration-500 ease-in-out custom-select"
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
          className={`flex absolute  left-0 right-0  justify-center items-center ${
            formData.waiting ? "fade-in" : "fade-out"
          }`}
        >
          {/* <SpinnerDotted size={45} thickness={160} speed={400} color="rgba(0, 0, 0, 1)" /> */}
          <PropagateLoader color="#000000" size={18} speedMultiplier={1.5} />
        </div>
      ) : (
        <div className="mt-0">
          {formData.messageVisible && (
            <div>
              <p
                className={` flex  justify-center items-center flex-col pt-4 leading-7 font-medium text-md ${
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
