import React, { useState, useEffect } from 'react';
import Speak from './Speak';

interface AudioProps {
  inputText: string;
  voiceChoice: string;
  onPlay: () => void;
  onEnded: () => void;
}


const AudioPlayer: React.FC<AudioProps> = ({ inputText, voiceChoice, onPlay, onEnded }) => {
  const [audioURL, setAudioURL] = useState<string | null>(null);

  useEffect(() => {
  
    const handleAudioFetch = async () => {
      if (voiceChoice == '') { /* DEMO LINE */return; } /*  UNCOMMENT AFTER DEMO */
      
       
      
      try {
        const data = await Speak(inputText, voiceChoice);
        const url = URL.createObjectURL(new Blob([data], { type: 'audio/mpeg' }));
        setAudioURL(url);
      } catch (error) {
  
        console.error('ERROR!!! 😡', error);
      }
    };

    if (inputText.trim() && !audioURL) handleAudioFetch();

    return () => {
      if (audioURL) URL.revokeObjectURL(audioURL);
    };
  }, []);

  return (
    <div>
      {audioURL && (
        <audio autoPlay controls hidden onPlay={onPlay} onEnded={onEnded}>
          <source src={audioURL} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
};

export default AudioPlayer;


