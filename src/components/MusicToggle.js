import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import retroArcade from "../assets/retro-arcade.mp3";
import retroSyths from "../assets/retro-synths.mp3";
import retroPop from "../assets/retro-pop.mp3";
import tooRetro from "../assets/too-retro.mp3";

const songs = [retroArcade, retroSyths, retroPop, tooRetro];

const MusicToggle = ({ className, noBorder }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(new Audio(songs[0]));

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSongEnd = () => {
    const nextSongIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextSongIndex);
  };

  useEffect(() => {
    const currentAudio = audioRef.current;

    currentAudio.addEventListener("ended", handleSongEnd);

    return () => {
      currentAudio.removeEventListener("ended", handleSongEnd);
    };
  }, [currentSongIndex]);

  useEffect(() => {
    audioRef.current.src = songs[currentSongIndex];
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentSongIndex, isPlaying]);

  useEffect(() => {
    // Ensure the current audio element is set correctly on initial load
    audioRef.current = new Audio(songs[currentSongIndex]);
  }, []);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <button
        onClick={togglePlay}
        className={`p-2 bg-brown-200 text-brown-800 ${
          noBorder ? "" : "border-0 border-brown-800"
        } rounded focus:outline-none hover:bg-brown-800 hover:text-white transition-colors duration-200`}
        style={{ width: "50px", height: "50px" }}
      >
        <FontAwesomeIcon icon={faMusic} size="lg" />
      </button>
    </div>
  );
};

export default MusicToggle;
