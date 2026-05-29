export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#000000',
      color: '#ffffff',
      fontFamily: "'Segoe UI', sans-serif",
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Top Navbar */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 48px',
        borderBottom: '1px solid #1a1a1a',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '28px', fontWeight: '300', color: '#fff' }}>∑</span>
          <span style={{ fontSize: '22px', fontWeight: '700', letterSpacing: '-0.5px' }}>
            <span style={{ color: '#ffffff' }}>Ani</span>
            <span style={{ color: '#888888' }}>gist</span>
          </span>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: '32px', fontSize: '14px', color: '#666' }}>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Docs</span>
          <span style={{ cursor: 'pointer' }}>Examples</span>
          <span style={{ cursor: 'pointer' }}>Community</span>
        </div>

        {/* Nav CTA */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            padding: '8px 20px',
            background: 'transparent',
            border: '1px solid #333',
            borderRadius: '6px',
            color: '#888',
            fontSize: '14px',
            cursor: 'pointer',
          }}>Sign in</button>
          <button style={{
            padding: '8px 20px',
            background: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            color: '#000',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}>Get started free</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 48px 60px',
        textAlign: 'center',
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          background: '#111',
          border: '1px solid #222',
          borderRadius: '100px',
          fontSize: '12px',
          color: '#888',
          marginBottom: '32px',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
          Free forever · No software needed
        </div>

        {/* Big heading */}
        <h1 style={{
          fontSize: '72px',
          fontWeight: '800',
          lineHeight: '1.05',
          letterSpacing: '-3px',
          marginBottom: '24px',
          maxWidth: '800px',
        }}>
          <span style={{ color: '#ffffff' }}>∑ Ani</span>
          <span style={{ color: '#444' }}>gist</span>
          <br />
          <span style={{ fontSize: '40px', fontWeight: '300', color: '#444', letterSpacing: '-1px' }}>
            write code. see it move.
          </span>
        </h1>

        {/* Description */}
        <p style={{
          fontSize: '17px',
          color: '#555',
          maxWidth: '480px',
          lineHeight: '1.7',
          marginBottom: '40px',
        }}>
          Manigist is your free, browser-based animation studio. 
          Type a few lines of code on the left — 
          watch stunning animations come alive on the right. 
          No installs. No limits. Just pure creation. ✨
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '80px' }}>
          <button style={{
            padding: '14px 36px',
            background: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            color: '#000',
            fontSize: '15px',
            fontWeight: '700',
            cursor: 'pointer',
            letterSpacing: '-0.3px',
          }}>
            Start animating →
          </button>
          <button style={{
            padding: '14px 36px',
            background: 'transparent',
            border: '1px solid #222',
            borderRadius: '8px',
            color: '#666',
            fontSize: '15px',
            cursor: 'pointer',
          }}>
            Watch demo
          </button>
        </div>

        {/* App Preview */}
        <div style={{
          width: '100%',
          maxWidth: '1000px',
          borderRadius: '16px',
          border: '1px solid #1a1a1a',
          overflow: 'hidden',
          background: '#0a0a0a',
        }}>

          {/* App top bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            borderBottom: '1px solid #1a1a1a',
            background: '#050505',
          }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#333' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#333' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#333' }} />
            <span style={{ marginLeft: '12px', fontSize: '12px', color: '#333' }}>manigist.vercel.app</span>
          </div>

          {/* App body — split pane */}
          <div style={{ display: 'flex', height: '420px' }}>

            {/* Sidebar */}
            <div style={{
              width: '52px',
              borderRight: '1px solid #1a1a1a',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px 0',
              gap: '20px',
            }}>
              {['⊞', '◈', '▷', '⚙'].map((icon, i) => (
                <div key={i} style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  background: i === 0 ? '#1a1a1a' : 'transparent',
                  color: i === 0 ? '#fff' : '#333',
                  fontSize: '16px',
                  cursor: 'pointer',
                }}>
                  {icon}
                </div>
              ))}
            </div>

            {/* Code editor */}
            <div style={{
              flex: 1,
              padding: '20px',
              fontFamily: 'monospace',
              fontSize: '13px',
              lineHeight: '2',
              borderRight: '1px solid #1a1a1a',
              overflowY: 'auto',
            }}>
              <div style={{ color: '#333', fontSize: '11px', marginBottom: '12px' }}>scene.mg</div>
              <div><span style={{ color: '#555' }}>// Manigist animation script</span></div>
              <div style={{ marginTop: '8px' }}>
                <span style={{ color: '#fff' }}>scene</span>
                <span style={{ color: '#444' }}> intro </span>
                <span style={{ color: '#666' }}>duration=5s</span>
              </div>
              <div style={{ paddingLeft: '16px' }}>
                <div>
                  <span style={{ color: '#fff' }}>object</span>
                  <span style={{ color: '#444' }}> hero </span>
                  <span style={{ color: '#666' }}>type=circle</span>
                </div>
                <div style={{ paddingLeft: '16px', color: '#444' }}>
                  <div>keyframe <span style={{ color: '#666' }}>t=0s</span> pos=(100,200) opacity=0</div>
                  <div>keyframe <span style={{ color: '#666' }}>t=1s</span> pos=(400,200) opacity=1</div>
                  <div>keyframe <span style={{ color: '#666' }}>t=4s</span> pos=(700,200) scale=2</div>
                </div>
              </div>
              <div style={{ marginTop: '12px' }}>
                <span style={{ color: '#fff' }}>camera</span>
                <span style={{ color: '#444' }}> pan </span>
                <span style={{ color: '#666' }}>from=(0,0) to=(200,0)</span>
              </div>
              {/* Cursor blink */}
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                <span style={{ color: '#444' }}>easing=</span>
                <span style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '14px',
                  background: '#fff',
                  animation: 'blink 1s infinite',
                }} />
              </div>
            </div>

            {/* Preview canvas */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#050505',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Grid dots background */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(circle, #1a1a1a 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }} />

              {/* Animated circle */}
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: '#ffffff',
                animation: 'move 3s ease-in-out infinite',
                position: 'relative',
                zIndex: 1,
                boxShadow: '0 0 60px #ffffff30',
              }} />

              {/* Orbit ring */}
              <div style={{
                position: 'absolute',
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                border: '1px solid #1a1a1a',
                animation: 'spin 4s linear infinite',
              }} />

              <div style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                fontSize: '10px',
                color: '#222',
              }}>
                preview · 60fps
              </div>
            </div>
          </div>

          {/* Timeline bar */}
          <div style={{
            padding: '10px 20px',
            borderTop: '1px solid #1a1a1a',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <span style={{ fontSize: '12px', color: '#333' }}>▶</span>
            <div style={{
              flex: 1,
              height: '2px',
              background: '#1a1a1a',
              borderRadius: '2px',
              position: 'relative',
            }}>
              <div style={{
                width: '30%',
                height: '100%',
                background: '#ffffff',
                borderRadius: '2px',
              }} />
            </div>
            <span style={{ fontSize: '11px', color: '#333', fontFamily: 'monospace' }}>1.5s / 5s</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{
        padding: '80px 48px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1px',
        background: '#111',
        borderTop: '1px solid #111',
        borderBottom: '1px solid #111',
      }}>
        {[
          { icon: '∑', title: 'Simple syntax', desc: 'Write animations in plain readable code. No PhD required — if you can type, you can animate.' },
          { icon: '◎', title: 'Any length, free', desc: 'Export 5 seconds or 5 hours. No paywalls, no watermarks, no limits. Ever.' },
          { icon: '⟳', title: 'Live preview', desc: 'See your animation update in real time as you type. Instant feedback, zero lag.' },
        ].map((f, i) => (
          <div key={i} style={{
            padding: '48px 40px',
            background: '#000',
            borderRight: i < 2 ? '1px solid #111' : 'none',
          }}>
            <div style={{ fontSize: '28px', marginBottom: '16px', color: '#fff' }}>{f.icon}</div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#fff' }}>{f.title}</h3>
            <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.7' }}>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={{
        padding: '32px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid #111',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px', color: '#333' }}>∑</span>
          <span style={{ fontSize: '14px', color: '#333' }}>Manigist · free forever</span>
        </div>
        <span style={{ fontSize: '12px', color: '#222' }}>made with ♥ for creators</span>
      </footer>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes move {
          0%, 100% { transform: translateX(-60px); }
          50% { transform: translateX(60px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  )
}