export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#0a0a0f',
      color: '#ffffff',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>

      {/* Logo */}
      <div style={{ marginBottom: '16px' }}>
        <span style={{
          fontSize: '48px',
          fontWeight: '800',
          background: 'linear-gradient(90deg, #a855f7, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-1px',
        }}>
          animix
        </span>
      </div>

      {/* Tagline */}
      <p style={{
        fontSize: '18px',
        color: '#888',
        marginBottom: '48px',
        textAlign: 'center',
        maxWidth: '400px',
        lineHeight: '1.6',
      }}>
        Write code. Get stunning animations.<br />
        No software. No limits.
      </p>

      {/* Split pane preview shell */}
      <div style={{
        display: 'flex',
        width: '100%',
        maxWidth: '900px',
        height: '400px',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid #222',
        background: '#111',
      }}>

        {/* Left - Code side */}
        <div style={{
          flex: 1,
          padding: '24px',
          borderRight: '1px solid #222',
          fontFamily: 'monospace',
          fontSize: '13px',
          color: '#a855f7',
          lineHeight: '2',
          overflowY: 'auto',
        }}>
          <div style={{ color: '#555', marginBottom: '12px', fontSize: '11px' }}>// animix code</div>
          <div><span style={{ color: '#3b82f6' }}>scene</span> intro <span style={{ color: '#888' }}>duration=5s</span></div>
          <div style={{ paddingLeft: '16px' }}>
            <div><span style={{ color: '#3b82f6' }}>object</span> hero <span style={{ color: '#888' }}>type=circle</span></div>
            <div style={{ paddingLeft: '16px', color: '#888' }}>
              <div>keyframe t=0s pos=(100,200) opacity=0</div>
              <div>keyframe t=1s pos=(400,200) opacity=1</div>
              <div>keyframe t=4s pos=(700,200) scale=2</div>
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <span style={{ color: '#3b82f6' }}>camera</span> <span style={{ color: '#888' }}>pan from=(0,0) to=(200,0)</span>
          </div>
          <div style={{
            marginTop: '32px',
            padding: '8px 16px',
            background: '#1a1a2e',
            borderRadius: '8px',
            border: '1px solid #a855f720',
            color: '#a855f7',
            fontSize: '12px',
          }}>
            ▶ Rendering...
          </div>
        </div>

        {/* Right - Preview side */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0d0d1a',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Animated circle */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
            animation: 'pulse 2s ease-in-out infinite',
            boxShadow: '0 0 40px #a855f750',
          }} />
          <style>{`
            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.2); opacity: 0.8; }
            }
          `}</style>
          <div style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            fontSize: '11px',
            color: '#333',
          }}>
            preview
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ marginTop: '40px', display: 'flex', gap: '16px' }}>
        <button style={{
          padding: '12px 32px',
          background: 'linear-gradient(90deg, #a855f7, #3b82f6)',
          border: 'none',
          borderRadius: '8px',
          color: '#fff',
          fontSize: '15px',
          fontWeight: '600',
          cursor: 'pointer',
        }}>
          Start Creating →
        </button>
        <button style={{
          padding: '12px 32px',
          background: 'transparent',
          border: '1px solid #333',
          borderRadius: '8px',
          color: '#888',
          fontSize: '15px',
          cursor: 'pointer',
        }}>
          See examples
        </button>
      </div>

      <p style={{ marginTop: '48px', fontSize: '12px', color: '#333' }}>
        animix — free forever
      </p>
    </main>
  )
}