import React, { useState, useEffect } from "react";
import Speak from "./Speak";

interface AudioProps {
  inputText: string;
  voiceChoice: string;
  onPlay: () => void;
  onEnded: () => void;
}

const AudioPlayer: React.FC<AudioProps> = ({
  inputText,
  voiceChoice,
  onPlay,
  onEnded,
}) => {
  const [audioURL, setAudioURL] = useState<string | null>(null);

  useEffect(() => {
    const handleAudioFetch = async () => {
      try {
        // Call Speak and get the audio URL directly
        const audioUrl = await Speak(inputText, voiceChoice);
        if (audioUrl) {
          setAudioURL(audioUrl); // Set the URL directly
        }
      } catch (error) {
        alert(error);
        console.error("Error:", error);
      }
    };

    if (inputText.trim() && !audioURL) handleAudioFetch();

    // Cleanup function to revoke object URLs
    return () => {
      if (audioURL) URL.revokeObjectURL(audioURL);
    };
  }, [inputText, voiceChoice, audioURL]);

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
