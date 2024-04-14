import React, { FC, useEffect, useState } from 'react';
import { Threads } from 'openai/resources/beta/index.mjs';
import { Message } from 'openai/resources/beta/threads/index.mjs';
import { OpenAI } from 'openai';
import AudioPlayer from '../components/AudioPlayer';
import { voice_ids } from '../private/voice_ids';
import { SpinnerDotted } from 'spinners-react';
import CodePreview from '@/components/CodePreview';
import languages from '../private/languages';
import DownloadButton from '@/components/Download';
import Translate from '../components/Translate';
import { Random } from '@/components/Random';
import { instruct, aldInstruct } from '../../public/instructions';
interface BightProps {
  assistantId: string;
  apiKey: string;
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
  thread: Threads.Thread | null;
  submitted: boolean;
  audioPlayerVisible: boolean;
  messageVisible: boolean;
}

const Interact: FC<BightProps> = ({ assistantId, apiKey, updateColors, useDefaults }) => {
const [isHovered, setIsHovered] = useState(false);




  const syncPrompt = prompt();

  export const keys: { [key: string]: string } = {
    assistantID: syncPrompt('Enter OpenAI Assistant ID: '),
    openKey: syncPrompt('Enter OpenAI Key: '),
    voiceKey: syncPrompt('Enter ElevenLabs Key: '),
    // newsKey: syncPrompt('Enter NewsAPI Key: ') 
  };

  const [formData, setFormData] = useState<FormData>({
    placeholder: '',
    query: '',
    messageList: [],
    waiting: false,
    message: '',
    voice: Random.generateRandomVoice(),
    thread: null,
    limit: 15,
    submitted: false,
    code: null,
    language: '🇺🇸',
    audioPlayerVisible: false,
    messageVisible: true
  });

  useEffect(() => { //optimize this
    const translatePlaceholder = async () => {
      const updatedPlaceholder = await Translate('en', formData.language, 'Ask me anything ✦');
    
      setFormData(prevFormData => ({
        ...prevFormData,
        placeholder: updatedPlaceholder
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
      formData.messageVisible=true
    } else {
      setAnimate2(false);
      formData.messageVisible = false
    }
  }, [formData.audioPlayerVisible]);

  const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

  useEffect(() => {
    const newThread = async () => {
      const newThread = await openai.beta.threads.create();
      setFormData((prevData) => ({ ...prevData, thread: newThread }));
    };

    if (!formData.thread) newThread();
  }, [apiKey, formData.thread]);



  const updateMessages = async () => {
    try {
      const messages = await openai.beta.threads.messages.list(formData.thread!.id);
      let messageContent = generateMessageListString(messages.data.reverse(), formData.query);
      messageContent = messageContent.includes('【') ? messageContent.substring(0, messageContent.indexOf('【')) : messageContent;
      const between = /```([\s\S]*)```/;
      let tech = between.exec(messageContent)?.[1]; // Extracting the matched first group 
      tech = tech?.substring(tech.indexOf('<'), tech.lastIndexOf('>') + 1);
      //tech = tech?.substring(tech.indexOf('CREATE'), tech.lastIndexOf(');') + 1);
      messageContent = messageContent.replace(/```[\s\S]*$/, '');
      //alert(tech);
     
        messageContent = await Translate('en', formData.language, messageContent);


      setFormData((prevData) => ({
        ...prevData,
        messageList: messages.data.reverse(),
        code: tech,
        message: messageContent,
        audioPlayerVisible: true,
        messageVisible: true,
        waiting: false
      }));
    } catch (error) {
      alert('An error occurred. Please try again.');
      console.error('API error or no keys provided', error);
    }
  };

  const handleQuery = async () => {
    try {
      setFormData((prevData) => ({ ...prevData, audioPlayerVisible: false, submitted: false, waiting: true }));

      await openai.beta.threads.messages.create(formData.thread!.id, {
        role: 'user', // revise below
        content: formData.query + "; Please limit your responses to " + formData.limit + "words except when generating code.",
      });

      const run = await openai.beta.threads.runs.create(formData.thread!.id, {
        assistant_id: assistantId,
        instructions: `${instruct}`,
        additional_instructions: `${aldInstruct}`,
      });

      const int = setInterval(async () => {
        const res = await openai.beta.threads.runs.retrieve(formData.thread!.id, run.id);
        if (res.status === 'completed') {
          clearInterval(int);
          updateMessages();
        }
      }, 1000);
    } catch (error) {
      alert('An error occurred. Please try again.');
      console.error('An error occurred:', error);
    }
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({ ...prevData, query: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleQuery();
    setFormData((prevData) => ({ ...prevData, submitted: true, query: '' }));
  };

  async function generateRandom() {
   
    setFormData((prevData) => ({ ...prevData, query: Random.generateRandomQuery(), voice: Random.generateRandomVoice() }));
}

  function simplify() {
    if (formData.limit === 15) {
      setFormData((prevData) => ({ ...prevData, limit: 30 }));
    } else if (formData.limit === 30) {
      setFormData((prevData) => ({ ...prevData, limit: 45 }));
    } else if (formData.limit === 45){
      setFormData((prevData) => ({ ...prevData, limit: 60 }));
    } else {
    setFormData((prevData) => ({ ...prevData, limit: 15 }));
  }
  }

  function generateMessageListString(messageList: Message[], userQuery: string): string {
    let jsxString: string = '';
    for (let i = messageList.length - 1; i >= 0; i--) {
      const message = messageList[i];
      if (message.role === 'user') continue;
      for (let j = message.content.length - 1; j >= 0; j--) {
        const contentBlock = message.content[j];
        if (contentBlock.type === 'text') {
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
    <div className=" items-center justify-center lg:container  p-20 z-10 ">
      <form onSubmit={handleSubmit} className={`flex items-center justify-center hover:scale-105 z-10 ${formData.waiting ? 'fade-out-main' : 'fade-in-main'} `}>
        <div className="items-center justify-center z-10 flex w-4/5 bg-black p-1.5 outline-0 outline outline-white rounded-full shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.05),_0_6.7px_5.3px_rgba(0,_0,_0,_0.06),_0_12.5px_10px_rgba(0,_0,_0,_0.07),_0_22.3px_17.9px_rgba(0,_0,_0,_0.09),_0_41.8px_33.4px_rgba(0,_0,_0,_0.1),_0_100px_80px_rgba(0,_0,_0,_0.14)] ">
          {formData.code && <DownloadButton formData={{ code: formData.code }} />}
          <button 
    className="pl-1 hover:scale-90 transition-all duration-500  ease-out " 
    id="randomButton" 
    type="button" 
    onClick={generateRandom}
>
    <img src="/random.svg" alt="Random" />
</button>
          <input
            style={{ flex: 1 }}
            onChange={handleQueryChange}
            value={formData.query}
            id="query"
            placeholder={formData.placeholder}
            className=" caret-white text-white pl-2 focus:outline-none focus:ring-0 rounded-xl text-xl font-light  bg-black"
            autoFocus
          />
          
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`hover:scale-90 transition-all duration-500 leading-5 ease-out rounded-xl bg-white px-4 mr-1.5 py-2 pr-2 pl-2 transition-all   ${formData.limit === 15 ? 'font-medium text-sm' : ''} ${formData.limit === 30 ? 'font-bold text-md' : ''} ${formData.limit === 45 ? 'font-extrabold text-lg' : ''} ${formData.limit === 60 ? 'font-black text-xl' : ''}`}
            id="simplify"
            type="button"
            onClick={simplify}
          >
            <span style={{ fontSize: '15px' }}>{''}</span>
            {'<' + (formData.limit === 15 ? '15' : formData.limit === 30 ? '30' : formData.limit === 45 ? '45' : formData.limit === 60 ? '60' : '')}
          
          </button>
          <select
            className=" pl-2 focus:outline-none cursor-pointer focus:ring-0 hover:scale-90 o  text-xl transition-transform duration-500 ease-out font-bold "
            value={formData.voice}
            onChange={(e) => setFormData((prevData) => ({ ...prevData, voice: e.target.value }))}
            style={{ borderRadius: '12px', width: '37px', height: '37px', WebkitAppearance: 'none', color: 'white' }}
          >
            
            
            <optgroup label="Silent">
              {Object.entries(voice_ids.silent).map(([name, id]) => (
                <option key={name} value={id}>
                  {name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Formal">
              {Object.entries(voice_ids.formal).map(([name, id]) => (
                <option key={name} value={id}>
                  {name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Casual">
              {Object.entries(voice_ids.casual).map(([name, id]) => (
                <option key={name} value={id}>
                  {name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Soft">
              {Object.entries(voice_ids.soft).map(([name, id]) => (
                <option key={name} value={id}>
                  {name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Sassy">
              {Object.entries(voice_ids.sassy).map(([name, id]) => (
                <option key={name} value={id}>
                  {name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Animated">
              {Object.entries(voice_ids.animated).map(([name, id]) => (
                <option key={name} value={id}>
                  {name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Cinematic">
              {Object.entries(voice_ids.cinematic).map(([name, id]) => (
                <option key={name} value={id}>
                  {name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Intelligent">
              {Object.entries(voice_ids.intelligent).map(([name, id]) => (
                <option key={name} value={id}>
                  {name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Informative">
              {Object.entries(voice_ids.informative).map(([name, id]) => (
                <option key={name} value={id}>
                  {name}
                </option>
              ))}
            </optgroup>
          </select>
          <select
            className="mr-0.5 ml-1.5 pl-1.5 pr-1 text-2xl focus:outline-none cursor-pointer focus:ring-0 hover:scale-90 transition-transform duration-500 ease-in-out"
            value={formData.language}
            onChange={(e) => setFormData((prevData) => ({ ...prevData, language: e.target.value }))}
            style={{ borderRadius: '13px 20px 20px 13px', width: '42px', height: '38px', WebkitAppearance: 'none' }}
          >
            {Object.entries(languages).map(([name, flag]) => (
              <option key={flag} value={name}>{flag}</option>
            ))}
          </select>
        </div>
      </form>
      {formData.waiting ? (
        <div className={`flex absolute  left-0 right-0  justify-center items-center ${formData.waiting ? 'fade-in' : 'fade-out'}`}>
  <SpinnerDotted size={45} thickness={160} speed={400} color="rgba(0, 0, 0, 1)" />
</div>
      ) : (



        <div className="mt-0">
          {formData.messageVisible && (
          <div>
                <p className={` flex  justify-center items-center flex-col pt-4 leading-7 font-bold text-xl ${!formData.waiting ? 'fade-in-main' : 'fade-out-main'}`}>
            {formData.message}
          </p>
          </div>
          )}
          <div className={`flex flex-col justify-center pt-8 ${formData.waiting ? 'fade-in' : 'fade-out'}`}>
            {formData.code && <CodePreview code={formData.code} />}
          </div>
        </div>
        
      )}
      {formData.audioPlayerVisible && (
        <AudioPlayer inputText={formData.message} voiceChoice={formData.voice} onPlay={updateColors} onEnded={useDefaults}  />
      )}
    </div>
  );
};

export default Interact;
