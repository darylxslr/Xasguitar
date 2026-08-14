import numpy as np

try:
    import librosa
except ImportError:
    librosa = None

CHROMA_NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

MAJOR_SHAPE = np.array([1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0])
MINOR_SHAPE = np.array([1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0])

MAJOR_PROFILE = np.array([6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88])
MINOR_PROFILE = np.array([6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17])

def analyze_audio(audio_path: str) -> dict:
    if librosa is None:
        return _empty_result()

    try:
        y, sr = librosa.load(audio_path, sr=22050, mono=True)
        duration = librosa.get_duration(y=y, sr=sr)

        hop_length = 512
        frame_rate = sr / hop_length

        tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
        bpm = int(round(float(np.asarray(tempo).reshape(-1)[0])))

        chroma = librosa.feature.chroma_cqt(y=y, sr=sr, hop_length=hop_length)

        return {
            "chords": _chroma_to_chords(chroma, frame_rate, duration),
            "key": _estimate_key(chroma),
            "scale": _estimate_scale(chroma),
            "bpm": bpm,
            "duration": round(duration, 2),
        }
    except Exception:
        return _empty_result()


def _chroma_to_chords(
    chroma, frame_rate: float, duration: float
) -> list[dict]:
    if chroma.shape[1] == 0:
        return []

    chords = []
    prev_chord = ""
    hop_duration = 1.0 / frame_rate
    step = max(1, int(frame_rate * 2))
    window = max(1, int(frame_rate * 0.5))

    for i in range(0, chroma.shape[1], step):
        frame = chroma[:, i : min(i + window, chroma.shape[1])].mean(axis=1)
        chord = _classify_chord(frame)
        if chord == prev_chord:
            continue
        chords.append({
            "timestamp": round(i * hop_duration, 2),
            "chord": chord,
            "lyrics": "",
        })
        prev_chord = chord

    return chords


def _classify_chord(chroma_vector: np.ndarray) -> str:
    norm = float(np.linalg.norm(chroma_vector))
    if norm < 0.1:
        return "N"

    vector = chroma_vector / norm
    best_root = 0
    best_quality = ""
    best_score = -1.0
    for root in range(12):
        for quality, shape in (("", MAJOR_SHAPE), ("m", MINOR_SHAPE)):
            template = np.roll(shape, root) / float(np.sum(shape))
            score = float(vector @ template)
            if score > best_score:
                best_score = score
                best_root = root
                best_quality = quality

    return CHROMA_NOTES[best_root] + best_quality


def _estimate_key(chroma) -> str:
    mean = chroma.mean(axis=1)
    return CHROMA_NOTES[_best_root(mean)]


def _estimate_scale(chroma) -> str:
    mean = chroma.mean(axis=1)
    profile_score = _best_result(mean)
    return "major" if profile_score["scale"] == "major" else "minor"


def _best_root(chroma_vector: np.ndarray) -> int:
    return _best_result(chroma_vector)["root"]


def _best_result(chroma_vector: np.ndarray) -> dict:
    norm = float(np.linalg.norm(chroma_vector))
    vector = chroma_vector / (norm + 1e-8)

    best_root = 0
    best_scale = "major"
    best_score = -1.0
    for root in range(12):
        for scale, profile in (("major", MAJOR_PROFILE), ("minor", MINOR_PROFILE)):
            template = np.roll(profile, root)
            template = template / float(np.sum(template))
            score = float(vector @ template)
            if score > best_score:
                best_score = score
                best_root = root
                best_scale = scale

    return {"root": best_root, "scale": best_scale}


def _empty_result() -> dict:
    return {
        "chords": [],
        "key": "",
        "scale": "major",
        "bpm": 0,
        "duration": 0.0,
    }