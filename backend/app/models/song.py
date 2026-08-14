from pydantic import BaseModel
from typing import Optional


class SongMetadata(BaseModel):
    key: str
    scale: str
    bpm: int
    timeSignature: str
    recommendedCapo: int


class MediaInfo(BaseModel):
    sourceType: str
    sourceUrl: str
    audioDuration: float
    audioUrl: str = ""


class ChordEvent(BaseModel):
    timestamp: float
    chord: str
    lyrics: str


class Song(BaseModel):
    id: str
    title: str
    artist: str
    metadata: SongMetadata
    media: MediaInfo
    chordTimeline: list[ChordEvent]
    tablatureData: str
