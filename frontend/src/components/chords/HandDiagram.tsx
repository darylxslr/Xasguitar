"use client";

interface HandDiagramProps {
  usedFingers: number[];
  isBarre?: boolean;
}

const FINGER_COLORS: Record<number, string> = {
  1: "#ef4444",
  2: "#3b82f6",
  3: "#22c55e",
  4: "#f59e0b",
};

const BASE_Y = 105;

interface FingerConfig {
  id: number;
  cxBase: number;
  cxTip: number;
  tipY: number;
  wBase: number;
  wTip: number;
  bend: number;
}

const FINGERS: FingerConfig[] = [
  { id: 1, cxBase: 36, cxTip: 34, tipY: 28, wBase: 11, wTip: 6, bend: -1 },
  { id: 2, cxBase: 57, cxTip: 57, tipY: 16, wBase: 11, wTip: 6, bend: 0 },
  { id: 3, cxBase: 78, cxTip: 80, tipY: 26, wBase: 11, wTip: 6, bend: 1 },
  { id: 4, cxBase: 99, cxTip: 102, tipY: 44, wBase: 10, wTip: 6, bend: 2 },
];

function fingerPath(f: FingerConfig): string {
  const lb = f.cxBase - f.wBase / 2;
  const rb = f.cxBase + f.wBase / 2;
  const lt = f.cxTip - f.wTip / 2;
  const rt = f.cxTip + f.wTip / 2;
  const midY = (BASE_Y + f.tipY) / 2;
  const tipMidX = (lt + rt) / 2;
  const tipTop = f.tipY - 2;

  return (
    `M ${lb},${BASE_Y}` +
    ` Q ${lb + f.bend},${midY} ${lt},${f.tipY + 3}` +
    ` Q ${tipMidX},${tipTop} ${rt},${f.tipY + 3}` +
    ` Q ${rb + f.bend},${midY} ${rb},${BASE_Y}` +
    ` Z`
  );
}

export default function HandDiagram({ usedFingers, isBarre }: HandDiagramProps) {
  const usedSet = new Set(usedFingers);

  return (
    <svg
      viewBox="0 0 130 230"
      className="w-full max-w-[130px] shrink-0"
    >
      {/* Wrist outline */}
      <path
        d="M 36,200 L 33,225 L 97,225 L 94,200"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-text-muted"
        opacity="0.5"
      />

      {/* Palm outline */}
      <path
        d="M 24,105 C 21,125 19,160 26,190 C 32,205 46,208 65,208 C 84,208 98,205 104,190 C 111,160 109,125 106,105 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-text-muted"
        opacity="0.5"
      />

      {/* Thumb outline */}
      <path
        d="M 21,128 C 12,122 6,112 5,102 C 4,96 7,93 11,94 C 15,95 21,103 23,115 C 25,125 24,130 24,130"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-text-muted"
        opacity="0.5"
      />

      {/* Fingers */}
      {FINGERS.map((f) => {
        const used = usedSet.has(f.id);

        return (
          <g key={f.id} opacity={used ? 1 : 0.3}>
            {/* Finger outline */}
            <path
              d={fingerPath(f)}
              fill="none"
              stroke={used ? FINGER_COLORS[f.id] : "currentColor"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={!used ? "text-text-muted" : undefined}
            />

            {/* Finger tip dot */}
            <circle
              cx={f.cxTip}
              cy={f.tipY + 2}
              r={f.wTip / 2 + 1}
              fill={used ? FINGER_COLORS[f.id] : "none"}
              stroke={used ? FINGER_COLORS[f.id] : "none"}
              strokeWidth="1"
            />

            {/* Finger number */}
            <text
              x={f.cxTip}
              y={f.tipY + 7}
              textAnchor="middle"
              fill={used ? "#fff" : "currentColor"}
              className={!used ? "text-text-muted" : undefined}
              fontSize="8"
              fontWeight="700"
            >
              {f.id}
            </text>
          </g>
        );
      })}

      {/* Barre line */}
      {isBarre && (
        <path
          d="M 14,50 Q 60,42 112,50"
          stroke={FINGER_COLORS[1]}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.7"
          fill="none"
        />
      )}
    </svg>
  );
}
