import axios, { AxiosResponse } from 'axios';

const Speak = async (inputText: string, voiceid: string): Promise<ArrayBuffer | null> => {
    try {
        if (voiceid === '') {
            console.warn("Voice ID is empty, returning null");
            return null;
        }

        const response: AxiosResponse<ArrayBuffer> = await axios.post(
            '/api/elevenlabs', // Use a server-side API route
            {
                text: inputText,
                voiceId: voiceid,
                // Other parameters...
            },
            {
                responseType: "arraybuffer",
            }
        );

        return response.data;

    } catch (error) {
        console.error("Error in Speak function:", error);
        throw error;
    }
};

export default Speak;



