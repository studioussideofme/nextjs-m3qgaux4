'use client'
import { useState } from 'react'

export default function Home() {
  const [showEditor, setShowEditor] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [activeTool, setActiveTool] = useState('code')
  const [activeTab, setActiveTab] = useState('scene.mg')
  const [code, setCode] = useState(`// Welcome to Anigist ✦
// Write your animation below

scene my_first_animation
  duration = 3s
  background = #000000

  object circle_1
    type = circle
    size = 80
    color = #ffffff
    
    keyframe t=0s
      position = (100, 300)
      opacity = 0
    
    keyframe t=1s
      position = (400, 300)
      opacity = 1
    
    keyframe t=3s
      position = (700, 300)
      scale = 2`)

  const tools = [
    { id: 'code', icon: '⌨', label: 'Code' },
    { id: 'scenes', icon: '◈', label: 'Scenes' },
    { id: 'objects', icon: '◎', label: 'Objects' },
    { id: 'timeline', icon: '⟷', label: 'Timeline' },
    { id: 'export', icon: '↗', label: 'Export' },
    { id: 'settings', icon: '⚙', label: 'Settings' },
  ]

  // ── SIGN IN MODAL ──
  if (showAuth) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Segoe UI', sans-serif",
      }}>
        <div style={{
          background: '#0a0a0a',
          border: '1px solid #1a1a1a',
          borderRadius: '16px',
          padding: '48px 40px',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
        }}>
          {/* Logo */}
          <div style={{ marginBottom: '32px' }}>
            <span style={{ fontSize: '32px', color: '#fff' }}>∑ </span>
            <span style={{ fontSize: '24px', fontWeight: '700', color: '#fff' }}>Ani</span>
            <span style={{ fontSize: '24px', fontWeight: '700', color: '#444' }}>gist</span>
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: '#fff' }}>
            Welcome back
          </h2>
          <p style={{ fontSize: '14px', color: '#555', marginBottom: '32px' }}>
            Sign in to save your animations
          </p>

          {/* Google Sign In */}
          <button
            onClick={() => alert('Google Sign In coming soon!')}
            style={{
              width: '100%',
              padding: '14px',
              background: '#fff',
              border: 'none',
              borderRadius: '8px',
              color: '#000',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '12px',
            }}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '20px 0',
          }}>
            <div style={{ flex: 1, height: '1px', background: '#1a1a1a' }} />
            <span style={{ fontSize: '12px', color: '#333' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: '#1a1a1a' }} />
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="you@example.com"
            style={{
              width: '100%',
              padding: '12px 16px',
              background: '#111',
              border: '1px solid #1a1a1a',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '14px',
              marginBottom: '10px',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            style={{
              width: '100%',
              padding: '12px 16px',
              background: '#111',
              border: '1px solid #1a1a1a',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '14px',
              marginBottom: '16px',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
          <button style={{
            width: '100%',
            padding: '12px',
            background: '#fff',
            border: 'none',
            borderRadius: '8px',
            color: '#000',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            marginBottom: '20px',
          }}>
            Sign in
          </button>

          <p style={{ fontSize: '13px', color: '#444' }}>
            No account?{' '}
            <span style={{ color: '#fff', cursor: 'pointer' }}>
              Sign up free
            </span>
          </p>

          {/* Back */}
          <button
            onClick={() => setShowAuth(false)}
            style={{
              marginTop: '24px',
              background: 'transparent',
              border: 'none',
              color: '#333',
              fontSize: '12px',
              cursor: 'pointer',
            }}>
            ← Back to home
          </button>
        </div>
      </div>
    )
  }

  // ── EDITOR VIEW ──
  if (showEditor) {
    return (
      <div style={{
        height: '100vh',
        background: '#000',
        color: '#fff',
        fontFamily: "'Segoe UI', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>

        {/* Top Nav */}
        <div style={{
          height: '48px',
          borderBottom: '1px solid #1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          flexShrink: 0,
        }}>
          <div
            onClick={() => setShowEditor(false)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <span style={{ fontSize: '20px' }}>∑</span>
            <span style={{ fontSize: '16px', fontWeight: '700' }}>
              <span style={{ color: '#fff' }}>Ani</span>
              <span style={{ color: '#555' }}>gist</span>
            </span>
          </div>

          <div style={{ display: 'flex', gap: '4px' }}>
            {['scene.mg', 'objects.mg', 'camera.mg'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '4px 16px',
                  background: activeTab === tab ? '#1a1a1a' : 'transparent',
                  border: '1px solid',
                  borderColor: activeTab === tab ? '#333' : 'transparent',
                  borderRadius: '4px',
                  color: activeTab === tab ? '#fff' : '#444',
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                }}>{tab}</button>
            ))}
            <button style={{
              padding: '4px 10px',
              background: 'transparent',
              border: '1px solid #1a1a1a',
              borderRadius: '4px',
              color: '#333',
              fontSize: '14px',
              cursor: 'pointer',
            }}>+</button>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setShowAuth(true)}
              style={{
                padding: '6px 16px',
                background: 'transparent',
                border: '1px solid #222',
                borderRadius: '6px',
                color: '#555',
                fontSize: '12px',
                cursor: 'pointer',
              }}>Sign in</button>
            <button style={{
              padding: '6px 16px',
              background: '#fff',
              border: 'none',
              borderRadius: '6px',
              color: '#000',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
            }}>▶ Run</button>
          </div>
        </div>

        {/* Body */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

          {/* Icon sidebar */}
          <div style={{
            width: '52px',
            borderRight: '1px solid #1a1a1a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '12px 0',
            gap: '4px',
            flexShrink: 0,
          }}>
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                title={tool.label}
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  background: activeTool === tool.id ? '#1a1a1a' : 'transparent',
                  border: `1px solid ${activeTool === tool.id ? '#333' : 'transparent'}`,
                  color: activeTool === tool.id ? '#fff' : '#444',
                  fontSize: '16px',
                  cursor: 'pointer',
                }}>{tool.icon}</button>
            ))}
            <div style={{ flex: 1 }} />
            <button
              onClick={() => setShowAuth(true)}
              title="Account"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#1a1a1a',
                border: '1px solid #333',
                color: '#fff',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>JN</button>
          </div>

          {/* Tool panel */}
          <div style={{
            width: '200px',
            borderRight: '1px solid #1a1a1a',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
          }}>
            <div style={{
              padding: '12px 16px',
              borderBottom: '1px solid #1a1a1a',
              fontSize: '11px',
              color: '#444',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>
              {tools.find(t => t.id === activeTool)?.label}
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
              {activeTool === 'code' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <p style={{ fontSize: '11px', color: '#333', marginBottom: '8px' }}>Insert block</p>
                  {['scene', 'object', 'keyframe', 'camera', 'text', 'path', 'group', 'effect'].map((item) => (
                    <button key={item} style={{
                      padding: '8px 12px',
                      background: '#0a0a0a',
                      border: '1px solid #1a1a1a',
                      borderRadius: '6px',
                      color: '#888',
                      fontSize: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'monospace',
                    }}>
                      <span style={{ color: '#fff' }}>{item}</span>
                      <span style={{ color: '#333', fontSize: '10px', float: 'right' }}>+</span>
                    </button>
                  ))}
                </div>
              )}

              {activeTool === 'scenes' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {['my_first_animation', 'intro_scene', 'outro'].map((scene, i) => (
                    <div key={scene} style={{
                      padding: '8px 12px',
                      background: i === 0 ? '#1a1a1a' : '#0a0a0a',
                      border: `1px solid ${i === 0 ? '#333' : '#1a1a1a'}`,
                      borderRadius: '6px',
                      color: i === 0 ? '#fff' : '#444',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}>◈ {scene}</div>
                  ))}
                  <button style={{
                    padding: '8px 12px',
                    background: 'transparent',
                    border: '1px dashed #222',
                    borderRadius: '6px',
                    color: '#333',
                    fontSize: '12px',
                    cursor: 'pointer',
                    marginTop: '4px',
                  }}>+ New scene</button>
                </div>
              )}

              {activeTool === 'objects' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {[{ name: 'circle_1', type: '◎' }, { name: 'text_hero', type: 'T' }, { name: 'bg_rect', type: '▭' }].map((obj) => (
                    <div key={obj.name} style={{
                      padding: '8px 12px',
                      background: '#0a0a0a',
                      border: '1px solid #1a1a1a',
                      borderRadius: '6px',
                      color: '#888',
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}>
                      <span style={{ color: '#fff' }}>{obj.type}</span>
                      {obj.name}
                    </div>
                  ))}
                </div>
              )}

              {activeTool === 'export' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p style={{ fontSize: '11px', color: '#333', marginBottom: '4px' }}>Export as</p>
                  {[{ label: 'MP4 Video', icon: '🎬' }, { label: 'WebM', icon: '🌐' }, { label: 'GIF', icon: '🖼' }, { label: 'PNG frames', icon: '📁' }].map((exp) => (
                    <button key={exp.label} style={{
                      padding: '10px 12px',
                      background: '#0a0a0a',
                      border: '1px solid #1a1a1a',
                      borderRadius: '6px',
                      color: '#888',
                      fontSize: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}>
                      {exp.icon} {exp.label}
                    </button>
                  ))}
                </div>
              )}

              {activeTool === 'settings' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[{ label: 'FPS', value: '60' }, { label: 'Width', value: '1920' }, { label: 'Height', value: '1080' }, { label: 'Duration', value: '5s' }].map((s) => (
                    <div key={s.label}>
                      <div style={{ fontSize: '10px', color: '#444', marginBottom: '4px' }}>{s.label}</div>
                      <input defaultValue={s.value} style={{
                        width: '100%',
                        padding: '6px 10px',
                        background: '#0a0a0a',
                        border: '1px solid #1a1a1a',
                        borderRadius: '6px',
                        color: '#fff',
                        fontSize: '12px',
                        boxSizing: 'border-box',
                        outline: 'none',
                      }} />
                    </div>
                  ))}
                </div>
              )}

              {activeTool === 'timeline' && (
                <div style={{ fontSize: '12px', color: '#444' }}>
                  <p style={{ marginBottom: '8px', color: '#666' }}>Keyframes</p>
                  {['t=0s', 't=1s', 't=3s'].map((kf) => (
                    <div key={kf} style={{
                      padding: '6px 10px',
                      background: '#0a0a0a',
                      border: '1px solid #1a1a1a',
                      borderRadius: '4px',
                      marginBottom: '4px',
                      fontFamily: 'monospace',
                      color: '#888',
                    }}>{kf}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Code editor */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid #1a1a1a',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '8px 16px',
              borderBottom: '1px solid #1a1a1a',
              fontSize: '11px',
              color: '#333',
              display: 'flex',
              justifyContent: 'space-between',
            }}>
              <span style={{ fontFamily: 'monospace' }}>scene.mg</span>
              <span>Anigist Script · .mg</span>
            </div>

            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
              <div style={{
                width: '40px',
                padding: '16px 8px',
                background: '#050505',
                borderRight: '1px solid #111',
                fontFamily: 'monospace',
                fontSize: '12px',
                color: '#222',
                lineHeight: '1.8',
                textAlign: 'right',
                userSelect: 'none',
              }}>
                {code.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                style={{
                  flex: 1,
                  padding: '16px',
                  background: '#050505',
                  border: 'none',
                  outline: 'none',
                  color: '#ccc',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  lineHeight: '1.8',
                  resize: 'none',
                }}
              />
            </div>

            <div style={{
              height: '24px',
              borderTop: '1px solid #111',
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
              gap: '16px',
              fontSize: '11px',
              color: '#333',
              background: '#050505',
            }}>
              <span>Anigist Script</span>
              <span>·</span>
              <span>{code.split('\n').length} lines</span>
              <span>·</span>
              <span style={{ color: '#2a2' }}>● Ready</span>
            </div>
          </div>

          {/* Preview */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '8px 16px',
              borderBottom: '1px solid #1a1a1a',
              fontSize: '11px',
              color: '#333',
              display: 'flex',
              justifyContent: 'space-between',
            }}>
              <span>Preview</span>
              <span>1920×1080 · 60fps</span>
            </div>

            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#050505',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'radial-gradient(circle, #1a1a1a 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }} />
              <div style={{
                width: '64px', height: '64px',
                borderRadius: '50%',
                background: '#fff',
                animation: 'move 3s ease-in-out infinite',
                position: 'relative', zIndex: 1,
                boxShadow: '0 0 40px #ffffff20',
              }} />
            </div>

            <div style={{
              height: '48px',
              borderTop: '1px solid #1a1a1a',
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
              gap: '12px',
              background: '#050505',
            }}>
              <button style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '14px', cursor: 'pointer' }}>▶</button>
              <button style={{ background: 'transparent', border: 'none', color: '#444', fontSize: '14px', cursor: 'pointer' }}>⟳</button>
              <div style={{
                flex: 1, height: '3px',
                background: '#1a1a1a',
                borderRadius: '2px',
                cursor: 'pointer',
                position: 'relative',
              }}>
                <div style={{ width: '35%', height: '100%', background: '#fff', borderRadius: '2px' }} />
                <div style={{
                  position: 'absolute', top: '50%', left: '35%',
                  transform: 'translate(-50%, -50%)',
                  width: '10px', height: '10px',
                  borderRadius: '50%', background: '#fff',
                }} />
              </div>
              <span style={{ fontSize: '11px', color: '#444', fontFamily: 'monospace' }}>1.75s / 5s</span>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes move {
            0%, 100% { transform: translateX(-80px) scale(0.8); opacity: 0.5; }
            50% { transform: translateX(80px) scale(1.2); opacity: 1; }
          }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: #000; }
          ::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
        `}</style>
      </div>
    )
  }

  // ── LANDING PAGE ──
  return (
    <main style={{
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      fontFamily: "'Segoe UI', sans-serif",
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Navbar */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 48px',
        borderBottom: '1px solid #1a1a1a',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '22px' }}>∑</span>
          <span style={{ fontSize: '18px', fontWeight: '700' }}>
            <span style={{ color: '#fff' }}>Ani</span>
            <span style={{ color: '#444' }}>gist</span>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '32px', fontSize: '14px', color: '#555' }}>
          <span style={{ cursor: 'pointer' }}>Docs</span>
          <span
            onClick={() => window.open('https://discord.gg', '_blank')}
            style={{ cursor: 'pointer' }}>
            Community
          </span>
          <span style={{ cursor: 'pointer' }}>Examples</span>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setShowAuth(true)}
            style={{
              padding: '8px 20px',
              background: 'transparent',
              border: '1px solid #222',
              borderRadius: '6px',
              color: '#888',
              fontSize: '14px',
              cursor: 'pointer',
            }}>Sign in</button>
          <button
            onClick={() => setShowEditor(true)}
            style={{
              padding: '8px 20px',
              background: '#fff',
              border: 'none',
              borderRadius: '6px',
              color: '#000',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
            }}>Get started free</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '80px 48px 60px',
        textAlign: 'center',
      }}>
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
          Free forever · No software needed · Any length
        </div>

        <h1 style={{
          fontSize: '72px',
          fontWeight: '800',
          lineHeight: '1.05',
          letterSpacing: '-3px',
          marginBottom: '24px',
          maxWidth: '800px',
        }}>
          <span style={{ color: '#fff' }}>∑ Ani</span>
          <span style={{ color: '#333' }}>gist</span>
          <br />
          <span style={{ fontSize: '36px', fontWeight: '300', color: '#444', letterSpacing: '-1px' }}>
            write code. see it move.
          </span>
        </h1>

        <p style={{
          fontSize: '17px',
          color: '#555',
          maxWidth: '480px',
          lineHeight: '1.7',
          marginBottom: '40px',
        }}>
          The free browser-based animation studio for everyone.
          Type a few lines — watch it come alive. ✨
        </p>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '80px' }}>
          <button
            onClick={() => setShowEditor(true)}
            style={{
              padding: '14px 36px',
              background: '#fff',
              border: 'none',
              borderRadius: '8px',
              color: '#000',
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer',
            }}>
            Start animating →
          </button>
          <button
            onClick={() => setShowAuth(true)}
            style={{
              padding: '14px 36px',
              background: 'transparent',
              border: '1px solid #222',
              borderRadius: '8px',
              color: '#666',
              fontSize: '15px',
              cursor: 'pointer',
            }}>
            Sign in
          </button>
        </div>

        {/* App preview */}
        <div style={{
          width: '100%',
          maxWidth: '1000px',
          borderRadius: '16px',
          border: '1px solid #1a1a1a',
          overflow: 'hidden',
          background: '#0a0a0a',
          cursor: 'pointer',
        }}
          onClick={() => setShowEditor(true)}
        >
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
            <span style={{ marginLeft: '12px', fontSize: '12px', color: '#333' }}>anigist · scene.mg</span>
            <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#222' }}>click to open editor →</span>
          </div>

          <div style={{ display: 'flex', height: '380px' }}>
            <div style={{
              width: '52px',
              borderRight: '1px solid #1a1a1a',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px 0',
              gap: '16px',
            }}>
              {['⌨', '◈', '◎', '↗'].map((icon, i) => (
                <div key={i} style={{
                  width: '32px', height: '32px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '6px',
                  background: i === 0 ? '#1a1a1a' : 'transparent',
                  color: i === 0 ? '#fff' : '#333',
                  fontSize: '14px',
                }}>{icon}</div>
              ))}
            </div>

            <div style={{
              flex: 1,
              padding: '20px',
              fontFamily: 'monospace',
              fontSize: '13px',
              lineHeight: '2',
              borderRight: '1px solid #1a1a1a',
              color: '#ccc',
            }}>
              <div style={{ color: '#444', marginBottom: '8px', fontSize: '11px' }}>// Anigist script</div>
              <div><span style={{ color: '#fff' }}>scene</span> <span style={{ color: '#666' }}>intro duration=5s</span></div>
              <div style={{ paddingLeft: '16px' }}>
                <div><span style={{ color: '#fff' }}>object</span> <span style={{ color: '#666' }}>hero type=circle</span></div>
                <div style={{ paddingLeft: '16px', color: '#444' }}>
                  <div>keyframe t=0s opacity=0</div>
                  <div>keyframe t=1s opacity=1</div>
                  <div>keyframe t=4s scale=2</div>
                </div>
              </div>
            </div>

            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#050505',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'radial-gradient(circle, #1a1a1a 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }} />
              <div style={{
                width: '64px', height: '64px',
                borderRadius: '50%',
                background: '#fff',
                animation: 'move 3s ease-in-out infinite',
                position: 'relative', zIndex: 1,
                boxShadow: '0 0 40px #ffffff20',
              }} />
            </div>
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
      }}>
        {[
          { icon: '∑', title: 'Simple syntax', desc: 'Write animations in plain readable code. No PhD required.' },
          { icon: '◎', title: 'Any length, free', desc: 'Export 5 seconds or 5 hours. No paywalls. Ever.' },
          { icon: '⟳', title: 'Live preview', desc: 'See your animation update in real time as you type.' },
        ].map((f, i) => (
          <div key={i} style={{
            padding: '48px 40px',
            background: '#000',
            borderRight: i < 2 ? '1px solid #111' : 'none',
          }}>
            <div style={{ fontSize: '28px', marginBottom: '16px' }}>{f.icon}</div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px' }}>{f.title}</h3>
            <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.7' }}>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={{
        padding: '32px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #111',
      }}>
        <span style={{ fontSize: '14px', color: '#333' }}>∑ Anigist · free forever</span>
        <span style={{ fontSize: '12px', color: '#222' }}>made with ♥ for creators</span>
      </footer>

      <style>{`
        @keyframes move {
          0%, 100% { transform: translateX(-80px) scale(0.8); opacity: 0.5; }
          50% { transform: translateX(80px) scale(1.2); opacity: 1; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
    </main>
  )
}