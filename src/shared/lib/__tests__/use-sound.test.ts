import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { useSound } from '../hooks/use-sound';

let lastAudioInstance: FakeAudio | null = null;

class FakeAudio {
  src: string;
  volume: number = 1;
  loop: boolean = false;
  currentTime: number = 0;
  paused: boolean = true;

  constructor(src: string) {
    this.src = src;
    lastAudioInstance = this;
  }

  play() {
    this.paused = false;
    return Promise.resolve();
  }

  pause() {
    this.paused = true;
  }
}

global.Audio = FakeAudio as any;

describe('useSound hook', () => {
  beforeEach(() => {
    lastAudioInstance = null;
  });

  it('initially isPlaying is false', () => {
    const { result } = renderHook(() => useSound('test.mp3'));
    expect(result.current.isPlaying).toBe(false);
  });

  it('play sets isPlaying to true and resets currentTime', async () => {
    const { result } = renderHook(() => useSound('test.mp3'));
    await act(async () => {
      await result.current.play();
    });
    expect(result.current.isPlaying).toBe(true);
    expect(lastAudioInstance?.currentTime).toBe(0);
  });

  it('pause sets isPlaying to false', async () => {
    const { result } = renderHook(() => useSound('test.mp3'));
    await act(async () => {
      await result.current.play();
    });
    expect(result.current.isPlaying).toBe(true);
    act(() => {
      result.current.pause();
    });
    expect(result.current.isPlaying).toBe(false);
  });

  it('stop sets isPlaying to false and resets currentTime', async () => {
    const { result } = renderHook(() => useSound('test.mp3'));
    await act(async () => {
      await result.current.play();
    });
    expect(result.current.isPlaying).toBe(true);
    act(() => {
      result.current.stop();
    });
    expect(result.current.isPlaying).toBe(false);
    expect(lastAudioInstance?.currentTime).toBe(0);
  });

  it('setVolume changes audio volume', () => {
    const { result } = renderHook(() => useSound('test.mp3'));
    act(() => {
      result.current.setVolume(0.5);
    });
    expect(lastAudioInstance?.volume).toBe(0.5);
  });
});
