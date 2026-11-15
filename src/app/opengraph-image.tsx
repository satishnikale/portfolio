import { ImageResponse } from 'next/og';
import { site } from '@/content/site';

export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#f7f7f4',
          backgroundImage: 'radial-gradient(rgba(20,20,19,0.10) 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
          color: '#141413',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 12,
              background: '#141413',
              color: '#f7f7f4',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            {site.shortName}
          </div>
          <div style={{ fontSize: 30, fontWeight: 600 }}>{site.name}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 22, letterSpacing: 4, textTransform: 'uppercase', color: '#c2410c' }}>{site.title}</div>
          <div style={{ marginTop: 20, fontSize: 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>
            Building software that solves real-world problems.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#57564f' }}>
          <div>{`${site.role} · ${site.company}`}</div>
          <div>{site.shortLocation}</div>
        </div>
      </div>
    ),
    size,
  );
}
