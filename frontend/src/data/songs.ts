import { Song, TrendingTab } from "@/types/song";

export const trendingTabs: TrendingTab[] = [
  {
    id: "1",
    title: "Hotel California",
    artist: "Eagles",
    key: "Bm",
    tempo: 148,
    difficulty: "intermediate",
  },
  {
    id: "2",
    title: "Wonderwall",
    artist: "Oasis",
    key: "Em",
    tempo: 84,
    difficulty: "beginner",
  },
  {
    id: "3",
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    key: "Am",
    tempo: 80,
    difficulty: "advanced",
  },
];

export const sampleSongs: Song[] = [
  {
    id: "song-1",
    title: "Hotel California",
    artist: "Eagles",
    metadata: {
      key: "Bm",
      scale: "minor",
      bpm: 148,
      timeSignature: "4/4",
      recommendedCapo: 0,
    },
    media: {
      sourceType: "youtube",
      sourceUrl: "https://youtube.com/watch?v=example1",
      audioDuration: 391,
    },
    chordTimeline: [
      { timestamp: 0, chord: "Bm", lyrics: "On a dark des-ert high-way," },
      { timestamp: 4.5, chord: "F#", lyrics: "cool wind in my hair..." },
      { timestamp: 8.2, chord: "A", lyrics: "Warm smell of co-li-tas," },
      { timestamp: 12.8, chord: "E", lyrics: "ris-ing up through the air..." },
      { timestamp: 17.0, chord: "G", lyrics: "Up a-head in the dis-tance," },
      { timestamp: 21.5, chord: "D", lyrics: "I saw a shim-mer-ing light..." },
      { timestamp: 26.0, chord: "Em", lyrics: "My head grew heavy and my sight grew dim," },
      { timestamp: 30.5, chord: "F#", lyrics: "I had to stop for the night..." },
    ],
    tablatureData: "",
  },
  {
    id: "song-2",
    title: "Wonderwall",
    artist: "Oasis",
    metadata: {
      key: "Em",
      scale: "minor",
      bpm: 84,
      timeSignature: "4/4",
      recommendedCapo: 2,
    },
    media: {
      sourceType: "youtube",
      sourceUrl: "https://youtube.com/watch?v=example2",
      audioDuration: 258,
    },
    chordTimeline: [
      { timestamp: 0, chord: "Em", lyrics: "To-day is gon-na be the day..." },
      { timestamp: 4.0, chord: "G", lyrics: "That they're gon-na throw it back to you..." },
      { timestamp: 8.0, chord: "D", lyrics: "By now you should have some-how..." },
      { timestamp: 12.0, chord: "A7sus4", lyrics: "Re-a-lized what you got-ta do..." },
    ],
    tablatureData: "",
  },
  {
    id: "song-3",
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    metadata: {
      key: "Am",
      scale: "minor",
      bpm: 80,
      timeSignature: "4/4",
      recommendedCapo: 0,
    },
    media: {
      sourceType: "youtube",
      sourceUrl: "https://youtube.com/watch?v=example3",
      audioDuration: 482,
    },
    chordTimeline: [
      { timestamp: 0, chord: "Am", lyrics: "There's a la-dy who's sure..." },
      { timestamp: 6.0, chord: "C", lyrics: "All that glit-ters is gold..." },
      { timestamp: 12.0, chord: "D", lyrics: "And she's buy-ing a stair-way to heav-en..." },
      { timestamp: 18.0, chord: "F", lyrics: "When she gets there she knows..." },
      { timestamp: 24.0, chord: "Am", lyrics: "If the stores are all closed..." },
    ],
    tablatureData: "",
  },
];
