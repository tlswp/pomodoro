import { useCallback, useEffect, useRef, useState } from 'react';

interface UseSoundOptions {
  volume?: number;
  loop?: boolean;
}

export const useSound = (src: string, options: UseSoundOptions = {}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(src);
    if (options.volume !== undefined) {
      audioRef.current.volume = options.volume;
    }
    audioRef.current.loop = options.loop || false;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [src, options.volume, options.loop]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, []);

  return {
    play,
    pause,
    stop,
    setVolume,
    isPlaying,
  };
};
