from app.core.chord_estimator import _fallback_chords


def test_fallback_chords():
    chords = _fallback_chords()
    assert len(chords) > 0
    assert "chord" in chords[0]
    assert "timestamp" in chords[0]
