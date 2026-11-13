// Web Audio API ambient classical tanpura drone & temple chime synthesizer

class AudioAmbienceEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private oscillators: OscillatorNode[] = [];
  private gainNode: GainNode | null = null;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start() {
    try {
      this.init();
      if (!this.ctx) return;

      this.stop(); // clear any prior

      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 2.5);
      masterGain.connect(this.ctx.destination);
      this.gainNode = masterGain;

      // Indian Classical Sa-Pa Tanpura Frequencies (D tonic: ~146.83 Hz)
      const freqs = [
        146.83, // Sa (D3)
        220.00, // Pa (A3)
        293.66, // Sa (D4)
        294.00, // Shimmer beating Sa
        587.33, // Subtle harmonic
      ];

      this.oscillators = freqs.map((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const oscGain = this.ctx!.createGain();
        
        // Gentle warm sawtooth / triangle mix
        osc.type = i === 1 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

        // subtle frequency modulation (LFO vibration)
        const lfo = this.ctx!.createOscillator();
        const lfoGain = this.ctx!.createGain();
        lfo.frequency.setValueAtTime(0.2 + i * 0.05, this.ctx!.currentTime);
        lfoGain.gain.setValueAtTime(0.8, this.ctx!.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.value = i === 0 ? 0.35 : i === 1 ? 0.25 : 0.15;
        osc.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start();
        return osc;
      });

      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  public stop() {
    if (this.gainNode && this.ctx) {
      try {
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
        setTimeout(() => {
          this.oscillators.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch { /* ignore */ }
          });
          this.oscillators = [];
        }, 850);
      } catch {
        this.oscillators.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch { /* ignore */ }
        });
        this.oscillators = [];
      }
    }
    this.isPlaying = false;
  }

  public playChime() {
    try {
      this.init();
      if (!this.ctx) return;
      
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      // High bell tone
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.15);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.2);
    } catch {
      // Audio autoplay policy fallback
    }
  }
}

export const audioAmbience = new AudioAmbienceEngine();
