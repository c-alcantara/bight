import axios from "axios";
import { ElevenLabsClient } from "elevenlabs";


const Speak = async (inputText: string, voiceChoice: string) => {
  const API_KEY = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY; // Make sure to use a public key in the frontend
  const client = new ElevenLabsClient({ apiKey: API_KEY });
 
  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceChoice}`,
      {
        text: inputText,
        use_speaker_boost: true,

        model_id: "eleven_turbo_v2_5",
      },
      {
        headers: {
          accept: "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    // Convert the arraybuffer to a blob and create an audio URL
    const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
    const audioUrl = URL.createObjectURL(audioBlob);

    return audioUrl; // Return the generated audio URL
  } catch (error) {
    console.error("Error calling ElevenLabs API:", error);
    throw new Error("Error processing text-to-speech");
  }
};

export default Speak;
