import axios, { AxiosResponse } from 'axios';
import { keys } from '../../keys';
import { voice_ids } from '../private/voice_ids';
const Speak = async (inputText: string, voiceid: string): Promise<ArrayBuffer> => {
    
    const API_KEY: string = `${keys.voiceKey}`;
    try {
        
        if (voiceid === '') {
            throw new Error('Voice ID cannot be empty');
        }
        const response: AxiosResponse<ArrayBuffer> = await axios.post(
            `https://api.elevenlabs.io/v1/text-to-speech/${voiceid}`,
            { text: inputText, use_speaker_boost :true, style:30, stability:6, similarity_boost:5, model_id: 'eleven_turbo_v2' },
            {
                headers: {
                    accept: "audio/mpeg",
                    "Content-Type": "application/json",
                    "xi-api-key": API_KEY,
                },
                responseType: "arraybuffer",
            }
        );

        return response.data;

    } catch (error) {
        alert("error!"+error);
        throw error; // Rethrow the error to handle it in the calling code
    }
};

export default Speak;



