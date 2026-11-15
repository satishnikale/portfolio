import type { ComponentType } from 'react';
import type { Project } from '@/content/types';
import { cn } from '@/lib/utils';

/*
 * Each project gets a small, code-drawn illustration of what it actually does
 * instead of a stock photo. Everything is SVG coloured through design tokens,
 * so the art follows the active theme automatically.
 */

const mono = { fontFamily: 'var(--font-geist-mono), ui-monospace, monospace' };

function Whiteboard() {
  return (
    <svg viewBox="0 0 400 240" className="size-full" role="presentation">
      {/* hand-drawn rectangle */}
      <path
        d="M62 58 C110 54 160 57 196 60 C198 92 197 120 195 148 C150 151 104 150 60 147 C59 118 60 86 62 58 Z"
        fill="var(--accent-soft)"
        stroke="var(--ink)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* hand-drawn ellipse */}
      <path
        d="M262 76 C300 70 338 88 336 116 C334 144 290 154 258 144 C230 135 226 84 262 76 Z"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2"
      />
      {/* connecting arrow */}
      <path d="M198 104 C214 98 228 96 238 98" fill="none" stroke="var(--ink-muted)" strokeWidth="2" strokeLinecap="round" />
      <path d="M230 91 L240 98 L229 104" fill="none" stroke="var(--ink-muted)" strokeWidth="2" strokeLinecap="round" />
      {/* freehand stroke being drawn by a second user */}
      <path
        d="M92 196 C120 176 140 206 168 188 C192 172 206 200 232 186"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        pathLength={100}
        className="[stroke-dasharray:100] motion-safe:transition-[stroke-dashoffset] motion-safe:duration-700 motion-safe:[stroke-dashoffset:38] motion-safe:group-hover:[stroke-dashoffset:0]"
      />
      {/* live cursors */}
      <g transform="translate(232 180)">
        <path d="M0 0 L0 15 L4 11 L7 18 L10 17 L7 10 L12 10 Z" fill="var(--accent)" />
        <rect x="12" y="16" width="44" height="16" rx="4" fill="var(--accent)" />
        <text x="34" y="27.5" textAnchor="middle" fontSize="9" fill="var(--canvas)" style={mono}>
          user b
        </text>
      </g>
      <g transform="translate(318 132)">
        <path d="M0 0 L0 15 L4 11 L7 18 L10 17 L7 10 L12 10 Z" fill="var(--ink)" />
        <rect x="12" y="16" width="44" height="16" rx="4" fill="var(--ink)" />
        <text x="34" y="27.5" textAnchor="middle" fontSize="9" fill="var(--canvas)" style={mono}>
          user a
        </text>
      </g>
    </svg>
  );
}

function Pipeline() {
  const stages = [
    { x: 24, label: 'IoT APIs' },
    { x: 116, label: 'Kafka' },
    { x: 208, label: 'BullMQ' },
    { x: 300, label: 'Reports' },
  ];
  return (
    <svg viewBox="0 0 400 240" className="size-full" role="presentation">
      <text x="24" y="58" fontSize="10" fill="var(--ink-subtle)" style={mono}>
        cron · 0 0 * * *
      </text>
      {stages.slice(0, -1).map((stage) => (
        <g key={stage.label}>
          <line x1={stage.x + 76} y1="120" x2={stage.x + 92} y2="120" stroke="var(--ink-muted)" strokeWidth="1.5" />
          <path d={`M${stage.x + 87} 115 L${stage.x + 92} 120 L${stage.x + 87} 125`} fill="none" stroke="var(--ink-muted)" strokeWidth="1.5" />
        </g>
      ))}
      {stages.map((stage, i) => (
        <g key={stage.label}>
          <rect
            x={stage.x}
            y="96"
            width="76"
            height="48"
            rx="8"
            fill={i === 2 ? 'var(--accent-soft)' : 'var(--surface)'}
            stroke={i === 2 ? 'var(--accent)' : 'var(--line-strong)'}
            strokeWidth="1.5"
          />
          <text x={stage.x + 38} y="124" textAnchor="middle" fontSize="11" fill="var(--ink)" style={mono}>
            {stage.label}
          </text>
        </g>
      ))}
      {/* queued jobs under BullMQ, backed by Redis */}
      {[0, 1, 2].map((n) => (
        <rect
          key={n}
          x={214 + n * 22}
          y="160"
          width="18"
          height="10"
          rx="2"
          fill="var(--accent)"
          opacity={1 - n * 0.3}
          className="motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-translate-x-2"
        />
      ))}
      <text x="214" y="188" fontSize="9" fill="var(--ink-subtle)" style={mono}>
        redis queue
      </text>
    </svg>
  );
}

function Review() {
  const lines = [
    { sign: ' ', w: 180 },
    { sign: '-', w: 150 },
    { sign: '+', w: 200 },
    { sign: '+', w: 130 },
    { sign: ' ', w: 170 },
  ];
  const tone = (sign: string) =>
    sign === '+' ? 'var(--positive)' : sign === '-' ? 'var(--accent)' : 'var(--line-strong)';

  return (
    <svg viewBox="0 0 400 240" className="size-full" role="presentation">
      <rect x="40" y="36" width="320" height="168" rx="10" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1.5" />
      <line x1="40" y1="60" x2="360" y2="60" stroke="var(--line)" strokeWidth="1.5" />
      <text x="54" y="52" fontSize="9" fill="var(--ink-subtle)" style={mono}>
        pull request · diff
      </text>
      {lines.map((line, i) => (
        <g key={i} transform={`translate(0 ${74 + i * 20})`}>
          <text x="54" y="9" fontSize="10" fill={tone(line.sign)} style={mono}>
            {line.sign}
          </text>
          <rect x="70" y="2" width={line.w} height="8" rx="2" fill={tone(line.sign)} opacity={line.sign === ' ' ? 1 : 0.35} />
        </g>
      ))}
      {/* inline review comment */}
      <g className="motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-translate-y-1">
        <rect x="200" y="112" width="140" height="44" rx="8" fill="var(--canvas)" stroke="var(--accent)" strokeWidth="1.5" />
        <circle cx="216" cy="126" r="5" fill="var(--accent)" />
        <rect x="228" y="122" width="96" height="7" rx="2" fill="var(--ink-muted)" opacity="0.5" />
        <rect x="214" y="138" width="110" height="7" rx="2" fill="var(--ink-muted)" opacity="0.3" />
      </g>
    </svg>
  );
}

const visuals: Record<Project['visual'], ComponentType> = {
  whiteboard: Whiteboard,
  pipeline: Pipeline,
  review: Review,
};

export function ProjectVisual({ visual, className }: { visual: Project['visual']; className?: string }) {
  const Visual = visuals[visual];
  return (
    <div
      aria-hidden="true"
      className={cn('bg-dot-grid relative overflow-hidden bg-surface-muted/50', className)}
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-out-soft motion-safe:group-hover:scale-[1.025]">
        <Visual />
      </div>
    </div>
  );
}
