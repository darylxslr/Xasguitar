import numpy as np

from app.core.chord_estimator import (
    _best_result,
    _classify_chord,
    analyze_audio,
    _empty_result,
)


def _chroma_for_chord(root: int, quality: str) -> np.ndarray:
    chroma = np.zeros(12)
    intervals = [0, 4, 7] if quality == "major" else [0, 3, 7]
    for interval in intervals:
        chroma[(root + interval) % 12] = 1.0
    return chroma


def _chroma_for_scale(root: int, intervals: list[int]) -> np.ndarray:
    chroma = np.zeros(12)
    for interval in intervals:
        chroma[(root + interval) % 12] = 1.0
    return chroma


def test_classify_major_chord():
    assert _classify_chord(_chroma_for_chord(0, "major")) == "C"
    assert _classify_chord(_chroma_for_chord(9, "major")) == "A"


def test_classify_minor_chord():
    assert _classify_chord(_chroma_for_chord(9, "minor")) == "Am"


def test_key_detection_major():
    result = _best_result(_chroma_for_scale(0, [0, 2, 4, 5, 7, 9, 11]))
    assert result["root"] == 0
    assert result["scale"] == "major"


def test_key_detection_minor():
    chroma = np.zeros(12)
    for interval in [0, 2, 3, 5, 7, 8, 10]:
        chroma[(9 + interval) % 12] = 1.0
    chroma[9] = 2.0
    result = _best_result(chroma)
    assert result["root"] == 9
    assert result["scale"] == "minor"


def test_analyze_missing_file_returns_empty():
    result = analyze_audio("/nonexistent/audio.wav")
    assert result == _empty_result()


def test_silence_classified_as_no_chord():
    assert _classify_chord(np.zeros(12)) == "N"
