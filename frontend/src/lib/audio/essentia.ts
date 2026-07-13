export async function analyzeAudio(audioBuffer: ArrayBuffer) {
  const ctx = new AudioContext();
  const buffer = await ctx.decodeAudioData(audioBuffer);
  const channelData = buffer.getChannelData(0);

  return {
    bpm: estimateBPM(channelData, buffer.sampleRate),
    key: estimateKey(channelData),
    duration: buffer.duration,
  };
}

function estimateBPM(channelData: Float32Array, sampleRate: number): number {
  const autocorrelation = new Float32Array(channelData.length);
  for (let lag = 0; lag < channelData.length; lag++) {
    let sum = 0;
    for (let i = 0; i < channelData.length - lag; i++) {
      sum += channelData[i] * channelData[i + lag];
    }
    autocorrelation[lag] = sum / (channelData.length - lag);
  }

  const minBPM = 60;
  const maxBPM = 200;
  const minLag = Math.floor(sampleRate * 60 / maxBPM);
  const maxLag = Math.ceil(sampleRate * 60 / minBPM);

  let maxVal = 0;
  let bestLag = minLag;
  for (let lag = minLag; lag <= maxLag; lag++) {
    if (autocorrelation[lag] > maxVal) {
      maxVal = autocorrelation[lag];
      bestLag = lag;
    }
  }

  return Math.round(60 * sampleRate / bestLag);
}

function estimateKey(channelData: Float32Array): string {
  return "C";
}

export async function extractYouTubeAudio(url: string): Promise<ArrayBuffer | null> {
  try {
    const response = await fetch(`/api/metadata?url=${encodeURIComponent(url)}`);
    if (!response.ok) return null;
    return await response.arrayBuffer();
  } catch {
    return null;
  }
}
