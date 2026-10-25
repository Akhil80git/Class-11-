// Web Speech API Hindi text-to-speech utility

class HindiSpeechPlayer {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking = false;
  private isPaused = false;
  private onStateChangeCallback: ((speaking: boolean, paused: boolean) => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public subscribe(callback: (speaking: boolean, paused: boolean) => void) {
    this.onStateChangeCallback = callback;
  }

  private notify() {
    if (this.onStateChangeCallback) {
      this.onStateChangeCallback(this.isSpeaking, this.isPaused);
    }
  }

  public speak(text: string) {
    if (!this.synth) return;
    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.95; // Clear pace for Hindi literature
    utterance.pitch = 1.0;

    // Pick Hindi voice if available in system
    const voices = this.synth.getVoices();
    const hindiVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('Hindi'));
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.isPaused = false;
      this.notify();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.isPaused = false;
      this.notify();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.isPaused = false;
      this.notify();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause() {
    if (!this.synth) return;
    if (this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
      this.isPaused = true;
      this.notify();
    }
  }

  public resume() {
    if (!this.synth) return;
    if (this.synth.paused) {
      this.synth.resume();
      this.isPaused = false;
      this.notify();
    }
  }

  public stop() {
    if (!this.synth) return;
    this.synth.cancel();
    this.isSpeaking = false;
    this.isPaused = false;
    this.notify();
  }

  public getStatus() {
    return {
      isSpeaking: this.isSpeaking,
      isPaused: this.isPaused,
      isSupported: Boolean(this.synth)
    };
  }
}

export const hindiSpeech = new HindiSpeechPlayer();
