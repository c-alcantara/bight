import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { text, voiceId } = req.body;
    const API_KEY = process.env.NEXT_PRIVATE_ELEVENLABS_API_KEY;

    try {
        const response = await axios.post(
            `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
            {
                text,
                use_speaker_boost: true,
                style: 30,
                stability: 6,
                similarity_boost: 5,
                model_id: "eleven_turbo_v2",
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

        res.setHeader('Content-Type', 'audio/mpeg');
        res.send(response.data);
    } catch (error) {
        console.error('Error calling ElevenLabs API:', error);
        res.status(500).json({ error: 'Error processing text-to-speech' });
    }
}