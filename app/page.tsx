// app/page.tsx - Manigist Pro v4.0 (Complete Edition)
'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// ── TYPES ──
type View = 'landing' | 'auth' | 'editor' | 'verify' | 'forgot';
type AuthMode = 'signin' | 'signup' | 'forgot';
type Tool =
  | 'code'
  | 'scenes'
  | 'objects'
  | 'timeline'
  | 'effects'
  | 'export'
  | 'community'
  | 'settings';
type ToastType = 'success' | 'error' | 'info' | 'warning';
type ExportFormat = 'mp4' | 'webm' | 'gif' | 'lottie' | 'png';

interface User {
  id: string;
  username: string;
  email: string;
  verified: boolean;
  avatar: string;
  createdAt: string;
  projects: string[];
}

interface Project {
  id: string;
  name: string;
  code: string;
  thumbnail: string;
  duration: string;
  resolution: string;
  fps: string;
  modified: string;
  userId: string;
  isTemplate?: boolean;
  category: 'motion' | 'text' | 'effect' | 'transition' | 'ui';
}

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface Keyframe {
  time: number;
  properties: Record<string, any>;
  easing?: string;
}

interface AnimationObject {
  id: string;
  name: string;
  type: 'circle' | 'rect' | 'text' | 'path' | 'image' | 'group';
  properties: Record<string, any>;
  keyframes: Keyframe[];
  visible: boolean;
  locked: boolean;
}

// ── DEMO TEMPLATES (10 Samples) ──
// DROP-IN REPLACEMENT for the DEMO_TEMPLATES array in app/page.tsx
// All code fields now use .join('\n') arrays — no bare ${} interpolation.

const DEMO_TEMPLATES: Project[] = [
  {
    id: 'demo-ball',
    name: 'ball_bouncing',
    category: 'motion',
    code: [
      '// ✦ ∑ Anigist · Ball Bouncing Demo',
      '∑ scene ball_demo',
      '  duration = 4s',
      '  background = linear-gradient(180deg, #1a1a2e, #16213e)',
      '',
      '  object bouncing_ball',
      '    type = circle',
      '    radius = 30',
      '    fill = linear-gradient(135deg, #ff6b6b, #ee5a5a)',
      '    stroke = #fff',
      '    stroke-width = 2',
      '    shadow = 0 10px 30px rgba(255,107,107,0.4)',
      '',
      '    keyframe t=0s',
      '      y = 400',
      '      scale = 1',
      '      easing = ease-in',
      '',
      '    keyframe t=1s',
      '      y = 100',
      '      scale = 1.1',
      '      easing = ease-out',
      '',
      '    keyframe t=2s',
      '      y = 400',
      '      scale = 0.9',
      '      easing = ease-in',
      '',
      '    keyframe t=3s',
      '      y = 150',
      '      scale = 1.05',
      '',
      '    keyframe t=4s',
      '      y = 400',
      '      scale = 1',
      '      easing = ease-out',
    ].join('\n'),
    thumbnail: '🔴',
    duration: '4s',
    resolution: '1920x1080',
    fps: '60',
    modified: 'Template',
    userId: 'system',
    isTemplate: true,
  },
  {
    id: 'demo-gate',
    name: 'gate_opening',
    category: 'motion',
    code: [
      '// ✦ ∑ Anigist · Gate Opening Demo',
      '∑ scene gate_demo',
      '  duration = 3s',
      '  background = #0f0f23',
      '',
      '  object gate_left',
      '    type = rect',
      '    width = 80',
      '    height = 300',
      '    fill = #4a4a6a',
      '    stroke = #7a7a9a',
      '    border-radius = 4',
      '    origin = right center',
      '',
      '    keyframe t=0s',
      '      rotation = 0',
      '',
      '    keyframe t=1.5s',
      '      rotation = -90',
      '      easing = cubic-bezier(0.4, 0, 0.2, 1)',
      '',
      '  object gate_right',
      '    type = rect',
      '    width = 80',
      '    height = 300',
      '    fill = #4a4a6a',
      '    stroke = #7a7a9a',
      '    border-radius = 4',
      '    origin = left center',
      '',
      '    keyframe t=0s',
      '      rotation = 0',
      '',
      '    keyframe t=1.5s',
      '      rotation = 90',
      '      easing = cubic-bezier(0.4, 0, 0.2, 1)',
      '',
      '  object light_beam',
      '    type = rect',
      '    width = 200',
      '    height = 40',
      '    fill = linear-gradient(90deg, transparent, #ffd700, transparent)',
      '    opacity = 0',
      '',
      '    keyframe t=1.5s',
      '      opacity = 0',
      '',
      '    keyframe t=2s',
      '      opacity = 0.8',
      '',
      '    keyframe t=3s',
      '      opacity = 0',
    ].join('\n'),
    thumbnail: '🚪',
    duration: '3s',
    resolution: '1920x1080',
    fps: '60',
    modified: 'Template',
    userId: 'system',
    isTemplate: true,
  },
  {
    id: 'demo-star',
    name: 'star_twinkling',
    category: 'effect',
    code: [
      '// ✦ ∑ Anigist · Star Twinkling Demo',
      '∑ scene star_demo',
      '  duration = 5s',
      '  background = radial-gradient(ellipse at center, #0a0a2a 0%, #000 70%)',
      '',
      '  // Generate 20 twinkling stars',
      '  for i in 1..20',
      '    object star_i',
      '      type = circle',
      '      radius = random(1, 3)',
      '      fill = #fff',
      '      x = random(0, 1920)',
      '      y = random(0, 1080)',
      '      opacity = random(0.3, 1)',
      '',
      '      keyframe t=0s',
      '        opacity = random(0.3, 1)',
      '        scale = 1',
      '',
      '      keyframe t=random(0.5, 2)s',
      '        opacity = random(0.8, 1)',
      '        scale = 1.2',
      '        easing = ease-in-out',
      '',
      '      keyframe t=random(2, 4)s',
      '        opacity = random(0.3, 1)',
      '        scale = 1',
    ].join('\n'),
    thumbnail: '✨',
    duration: '5s',
    resolution: '1920x1080',
    fps: '60',
    modified: 'Template',
    userId: 'system',
    isTemplate: true,
  },
  {
    id: 'demo-bird',
    name: 'bird_flying',
    category: 'motion',
    code: [
      '// ✦ ∑ Anigist · Bird Flying Demo',
      '∑ scene bird_demo',
      '  duration = 6s',
      '  background = linear-gradient(180deg, #87ceeb 0%, #e0f7ff 100%)',
      '',
      '  object cloud_1',
      '    type = path',
      '    path = "M 100,200 Q 150,180 200,200 T 300,200"',
      '    stroke = #fff',
      '    fill = rgba(255,255,255,0.8)',
      '    stroke-width = 0',
      '',
      '    keyframe t=0s { x = -100 }',
      '    keyframe t=6s { x = 2020; easing = linear }',
      '',
      '  object bird',
      '    type = path',
      '    path = "M 0,0 Q 10,-5 20,0 Q 10,5 0,0"',
      '    fill = #333',
      '    scale = 2',
      '',
      '    keyframe t=0s',
      '      x = -50',
      '      y = 300',
      '      rotation = 0',
      '',
      '    keyframe t=3s',
      '      x = 960',
      '      y = 200',
      '      rotation = -5',
      '',
      '    keyframe t=6s',
      '      x = 1970',
      '      y = 350',
      '      rotation = 5',
      '      easing = cubic-bezier(0.4, 0, 0.2, 1)',
      '',
      '    // Wing flap animation',
      '    effect wing_flap',
      '      target = bird',
      '      property = scale-y',
      '      values = [1, 0.7, 1]',
      '      duration = 0.3s',
      '      repeat = infinite',
      '      easing = ease-in-out',
    ].join('\n'),
    thumbnail: '🐦',
    duration: '6s',
    resolution: '1920x1080',
    fps: '60',
    modified: 'Template',
    userId: 'system',
    isTemplate: true,
  },
  {
    id: 'demo-text',
    name: 'text_reveal',
    category: 'text',
    code: [
      '// ✦ ∑ Anigist · Text Reveal Demo',
      '∑ scene text_demo',
      '  duration = 4s',
      '  background = #111',
      '',
      '  object title',
      '    type = text',
      '    content = "MANIGIST"',
      '    font-family = "Inter", sans-serif',
      '    font-weight = 800',
      '    font-size = 80',
      '    fill = linear-gradient(135deg, #fff, #aaa)',
      '    letter-spacing = 4',
      '    text-anchor = middle',
      '    x = 960',
      '    y = 400',
      '',
      '    // Character-by-character reveal',
      '    for char in title.content.split("")',
      '      keyframe t=(index * 0.1 + 0.5)s',
      '        opacity = 0',
      '        y = 420',
      '        scale = 0.8',
      '',
      '      keyframe t=(index * 0.1 + 1)s',
      '        opacity = 1',
      '        y = 400',
      '        scale = 1',
      '        easing = spring(0.6, 200)',
      '',
      '  object subtitle',
      '    type = text',
      '    content = "write code · see it move"',
      '    font-size = 24',
      '    fill = #666',
      '    x = 960',
      '    y = 480',
      '    text-anchor = middle',
      '    opacity = 0',
      '',
      '    keyframe t=2.5s',
      '      opacity = 0',
      '',
      '    keyframe t=3s',
      '      opacity = 1',
      '      easing = ease-out',
    ].join('\n'),
    thumbnail: '✍️',
    duration: '4s',
    resolution: '1920x1080',
    fps: '60',
    modified: 'Template',
    userId: 'system',
    isTemplate: true,
  },
  {
    id: 'demo-particles',
    name: 'particle_burst',
    category: 'effect',
    code: [
      '// ✦ ∑ Anigist · Particle Burst Demo',
      '∑ scene particles_demo',
      '  duration = 3s',
      '  background = radial-gradient(circle, #2a1a4a 0%, #0a0a1a 100%)',
      '',
      '  object burst_center',
      '    type = circle',
      '    radius = 20',
      '    fill = #fff',
      '    x = 960',
      '    y = 540',
      '    opacity = 0',
      '',
      '    keyframe t=0s { opacity = 1; scale = 0.5 }',
      '    keyframe t=0.2s { opacity = 1; scale = 1 }',
      '    keyframe t=0.5s { opacity = 0; scale = 2 }',
      '',
      '  // Generate 50 particles',
      '  for i in 1..50',
      '    object particle_i',
      '      type = circle',
      '      radius = random(2, 5)',
      '      fill = hsl(random(0, 360), 80%, 60%)',
      '      x = 960',
      '      y = 540',
      '      opacity = 0',
      '',
      '      keyframe t=0.2s',
      '        opacity = 1',
      '        x = 960 + cos(i * 7.2) * random(50, 200)',
      '        y = 540 + sin(i * 7.2) * random(50, 200)',
      '        scale = 1',
      '        easing = ease-out',
      '',
      '      keyframe t=2s',
      '        opacity = 0',
      '        scale = 0',
      '        easing = ease-in',
    ].join('\n'),
    thumbnail: '💥',
    duration: '3s',
    resolution: '1920x1080',
    fps: '60',
    modified: 'Template',
    userId: 'system',
    isTemplate: true,
  },
  {
    id: 'demo-logo',
    name: 'logo_spin',
    category: 'ui',
    code: [
      '// ✦ ∑ Anigist · Logo Spin Demo',
      '∑ scene logo_demo',
      '  duration = 4s',
      '  background = linear-gradient(135deg, #1a1a2e, #162447, #0f0f23)',
      '',
      '  object logo_ring',
      '    type = circle',
      '    radius = 60',
      '    fill = none',
      '    stroke = linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
      '    stroke-width = 4',
      '    stroke-dasharray = 377',
      '    stroke-dashoffset = 377',
      '    x = 960',
      '    y = 540',
      '',
      '    keyframe t=0s',
      '      stroke-dashoffset = 377',
      '      rotation = 0',
      '',
      '    keyframe t=1s',
      '      stroke-dashoffset = 0',
      '      easing = ease-out',
      '',
      '    keyframe t=4s',
      '      rotation = 360',
      '      easing = linear',
      '',
      '  object logo_icon',
      '    type = text',
      '    content = "∑"',
      '    font-size = 48',
      '    font-weight = 300',
      '    fill = #fff',
      '    x = 960',
      '    y = 540',
      '    text-anchor = middle',
      '    opacity = 0',
      '',
      '    keyframe t=0.8s { opacity = 0 }',
      '    keyframe t=1.2s { opacity = 1; scale = 1.2 }',
      '    keyframe t=1.5s { scale = 1; easing = spring(0.8, 300) }',
      '',
      '  object glow',
      '    type = circle',
      '    radius = 80',
      '    fill = radial-gradient(circle, rgba(100,200,255,0.3), transparent 70%)',
      '    x = 960',
      '    y = 540',
      '    opacity = 0',
      '',
      '    keyframe t=1s { opacity = 0 }',
      '    keyframe t=1.5s { opacity = 1 }',
      '    keyframe t=3s { opacity = 0.5; scale = 1.5 }',
      '    keyframe t=4s { opacity = 0 }',
    ].join('\n'),
    thumbnail: '🌀',
    duration: '4s',
    resolution: '1920x1080',
    fps: '60',
    modified: 'Template',
    userId: 'system',
    isTemplate: true,
  },
  {
    id: 'demo-wave',
    name: 'wave_animation',
    category: 'motion',
    code: [
      '// ✦ ∑ Anigist · Wave Animation Demo',
      '∑ scene wave_demo',
      '  duration = 5s',
      '  background = linear-gradient(180deg, #0077b6, #00b4d8, #90e0ef)',
      '',
      '  // Create 5 wave lines',
      '  for i in 1..5',
      '    object wave_i',
      '      type = path',
      '      stroke = rgba(255, 255, 255, 0.6)',
      '      stroke-width = 2',
      '      fill = none',
      '      path = "M 0,540 C 240,480 480,600 720,540 C 960,480 1200,600 1440,540 C 1680,480 1920,600 1920,540"',
      '',
      '      keyframe t=0s { opacity = 0.8 }',
      '      keyframe t=5s { opacity = 0.8; easing = linear }',
      '',
      '  object sun',
      '    type = circle',
      '    radius = 40',
      '    fill = radial-gradient(circle, #ffd700, #ffa500)',
      '    x = 1700',
      '    y = 200',
      '    shadow = 0 0 40px rgba(255, 215, 0, 0.6)',
      '',
      '    keyframe t=0s { y = 300; opacity = 0.5 }',
      '    keyframe t=2.5s { y = 150; opacity = 1 }',
      '    keyframe t=5s { y = 300; opacity = 0.5; easing = ease-in-out }',
    ].join('\n'),
    thumbnail: '🌊',
    duration: '5s',
    resolution: '1920x1080',
    fps: '60',
    modified: 'Template',
    userId: 'system',
    isTemplate: true,
  },
  {
    id: 'demo-loader',
    name: 'loading_spinner',
    category: 'ui',
    code: [
      '// ✦ ∑ Anigist · Loading Spinner Demo',
      '∑ scene loader_demo',
      '  duration = 2s',
      '  background = #0a0a1a',
      '  loop = true',
      '',
      '  object spinner_ring',
      '    type = circle',
      '    radius = 50',
      '    fill = none',
      '    stroke = linear-gradient(90deg, #6366f1, #8b5cf6, #d946ef, #6366f1)',
      '    stroke-width = 6',
      '    stroke-linecap = round',
      '    x = 960',
      '    y = 540',
      '    stroke-dasharray = 314',
      '    stroke-dashoffset = 314',
      '',
      '    keyframe t=0s',
      '      stroke-dashoffset = 314',
      '      rotation = 0',
      '',
      '    keyframe t=1s',
      '      stroke-dashoffset = 0',
      '',
      '    keyframe t=2s',
      '      stroke-dashoffset = 314',
      '      rotation = 360',
      '      easing = linear',
      '',
      '  object spinner_dot',
      '    type = circle',
      '    radius = 8',
      '    fill = #fff',
      '    x = 960',
      '    y = 490',
      '',
      '    keyframe t=0s',
      '      opacity = 1',
      '      scale = 1',
      '',
      '    keyframe t=0.5s',
      '      opacity = 0.5',
      '      scale = 1.3',
      '',
      '    keyframe t=1s',
      '      opacity = 1',
      '      scale = 1',
      '      easing = ease-in-out',
      '',
      '  object loading_text',
      '    type = text',
      '    content = "LOADING"',
      '    font-size = 16',
      '    font-weight = 500',
      '    fill = #888',
      '    letter-spacing = 4',
      '    x = 960',
      '    y = 620',
      '    text-anchor = middle',
      '',
      '    keyframe t=0s { content = "LOADING" }',
      '    keyframe t=0.5s { content = "LOADING." }',
      '    keyframe t=1s { content = "LOADING.." }',
      '    keyframe t=1.5s { content = "LOADING..." }',
      '    keyframe t=2s { content = "LOADING"; easing = linear }',
    ].join('\n'),
    thumbnail: '⏳',
    duration: '2s',
    resolution: '1920x1080',
    fps: '60',
    modified: 'Template',
    userId: 'system',
    isTemplate: true,
  },
  {
    id: 'demo-transition',
    name: 'scene_transition',
    category: 'transition',
    code: [
      '// ✦ ∑ Anigist · Scene Transition Demo',
      '∑ scene transition_demo',
      '  duration = 3s',
      '  background = #111',
      '',
      '  // Scene A',
      '  scene scene_a',
      '    object title_a',
      '      type = text',
      '      content = "SCENE A"',
      '      font-size = 48',
      '      fill = #ff6b6b',
      '      x = 960',
      '      y = 540',
      '      text-anchor = middle',
      '',
      '    keyframe t=0s { opacity = 1 }',
      '    keyframe t=1s { opacity = 1 }',
      '    keyframe t=1.5s { opacity = 0 }',
      '',
      '  // Transition effect',
      '  object transition_wipe',
      '    type = rect',
      '    width = 1920',
      '    height = 1080',
      '    fill = linear-gradient(90deg, #111, #2a2a4a, #111)',
      '    x = -1920',
      '    y = 0',
      '',
      '    keyframe t=1s { x = -1920 }',
      '    keyframe t=2s { x = 0; easing = cubic-bezier(0.4, 0, 0.2, 1) }',
      '    keyframe t=3s { x = 1920 }',
      '',
      '  // Scene B',
      '  scene scene_b',
      '    object title_b',
      '      type = text',
      '      content = "SCENE B"',
      '      font-size = 48',
      '      fill = #4ecdc4',
      '      x = 960',
      '      y = 540',
      '      text-anchor = middle',
      '      opacity = 0',
      '',
      '    keyframe t=1.5s { opacity = 0 }',
      '    keyframe t=2s { opacity = 1 }',
      '    keyframe t=3s { opacity = 1 }',
    ].join('\n'),
    thumbnail: '🔄',
    duration: '3s',
    resolution: '1920x1080',
    fps: '60',
    modified: 'Template',
    userId: 'system',
    isTemplate: true,
  },
];

// ── TOOLS CONFIG ──
const tools: { id: Tool; icon: string; label: string }[] = [
  { id: 'code', icon: '⌨', label: 'Code Editor' },
  { id: 'scenes', icon: '◈', label: 'Scenes' },
  { id: 'objects', icon: '◎', label: 'Objects' },
  { id: 'timeline', icon: '✦', label: 'Timeline' },
  { id: 'effects', icon: '⚡', label: 'Effects' },
  { id: 'export', icon: '↗', label: 'Export' },
  { id: 'community', icon: '◉', label: 'Community' },
  { id: 'settings', icon: '⚙', label: 'Settings' },
];

// ── MAIN COMPONENT ──
export default function ManigistPro() {
  // ── AUTH STATE ──
  const [view, setView] = useState<View>('landing');
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authForm, setAuthForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [verificationEmail, setVerificationEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // ── APP STATE ──
  const [activeView, setActiveView] = useState<'landing' | 'editor'>('landing');
  const [activeTool, setActiveTool] = useState<Tool>('code');
  const [activeTab, setActiveTab] = useState('scene.mg');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [previewMode, setPreviewMode] = useState<'canvas' | 'code'>('canvas');

  // ── PROJECT STATE ──
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [code, setCode] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [editingProject, setEditingProject] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // ── UI STATE ──
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [panelWidth, setPanelWidth] = useState(240);
  const [leftSidebarWidth, setLeftSidebarWidth] = useState(64);
  const [isResizing, setIsResizing] = useState<'left' | 'panel' | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [showShortcuts, setShowShortcuts] = useState(false);

  // ── EXPORT STATE ──
  const [exportFormat, setExportFormat] = useState<ExportFormat>('mp4');
  const [exportQuality, setExportQuality] = useState<'low' | 'medium' | 'high'>(
    'high'
  );
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  // ── REFS ──
  const animRef = useRef<number>();
  const toastIdRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const codeEditorRef = useRef<HTMLTextAreaElement>(null);

  // ── TOAST SYSTEM ──
  const addToast = useCallback(
    (message: string, type: ToastType = 'success', duration = 4000) => {
      const id = `toast-${++toastIdRef.current}-${Date.now()}`;
      setToasts((prev) => [...prev, { id, message, type, duration }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── AUTHENTICATION FUNCTIONS ──
  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!authForm.username.trim()) {
      setAuthError('Please enter a username');
      return;
    }
    if (!validateEmail(authForm.email)) {
      setAuthError('Please enter a valid email');
      return;
    }
    if (!validatePassword(authForm.password)) {
      setAuthError('Password must be at least 6 characters');
      return;
    }
    if (authForm.password !== authForm.confirmPassword) {
      setAuthError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    addToast('Creating account...', 'info');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Create user
    const newUser: User = {
      id: `user-${Date.now()}`,
      username: authForm.username,
      email: authForm.email,
      verified: false,
      avatar: authForm.username.charAt(0).toUpperCase(),
      createdAt: new Date().toISOString(),
      projects: [],
    };

    // Store in localStorage (simulating database)
    const users = JSON.parse(localStorage.getItem('manigist_users') || '[]');
    users.push(newUser);
    localStorage.setItem('manigist_users', JSON.stringify(users));

    setVerificationEmail(authForm.email);
    setView('verify');
    setIsLoading(false);
    addToast('✓ Account created! Check your email for verification', 'success');
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!authForm.email || !authForm.password) {
      setAuthError('Please enter email and password');
      return;
    }

    setIsLoading(true);
    addToast('Signing in...', 'info');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Check credentials (simulated)
    const users = JSON.parse(localStorage.getItem('manigist_users') || '[]');
    const user = users.find(
      (u: User) => u.email === authForm.email && u.verified
    );

    if (user) {
      setCurrentUser(user);
      setActiveView('editor');
      loadUserProjects(user);
      addToast(`✓ Welcome back, ${user.username}!`, 'success');
      setView('editor');
    } else {
      setAuthError('Invalid credentials or email not verified');
      addToast('Sign in failed', 'error');
    }
    setIsLoading(false);
  };

  const handleVerifyEmail = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      addToast('Please enter the 6-digit code', 'error');
      return;
    }

    setIsVerifying(true);
    addToast('Verifying...', 'info');

    // Simulate verification
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update user as verified
    const users = JSON.parse(localStorage.getItem('manigist_users') || '[]');
    const userIndex = users.findIndex(
      (u: User) => u.email === verificationEmail
    );

    if (userIndex !== -1) {
      users[userIndex].verified = true;
      localStorage.setItem('manigist_users', JSON.stringify(users));

      setCurrentUser(users[userIndex]);
      loadUserProjects(users[userIndex]);
      addToast('✓ Email verified! Welcome to Manigist', 'success');
      setView('editor');
    } else {
      addToast('Verification failed', 'error');
    }
    setIsVerifying(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(authForm.email)) {
      setAuthError('Please enter a valid email');
      return;
    }

    setIsLoading(true);
    addToast('Sending reset link...', 'info');

    await new Promise((resolve) => setTimeout(resolve, 1500));
    addToast('✓ Password reset link sent to your email', 'success');
    setAuthMode('signin');
    setIsLoading(false);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setActiveProject(null);
    setActiveView('landing');
    addToast('Signed out', 'info');
  };

  const loadUserProjects = (user: User) => {
    // Load user's projects from localStorage
    const saved = JSON.parse(
      localStorage.getItem(`manigist_projects_${user.id}`) || '[]'
    );
    // Combine with demo templates
    const allProjects = [...DEMO_TEMPLATES, ...saved];
    setProjects(allProjects);

    // Set active project
    if (saved.length > 0) {
      setActiveProject(saved[0]);
      setCode(saved[0].code);
    } else {
      setActiveProject(DEMO_TEMPLATES[0]);
      setCode(DEMO_TEMPLATES[0].code);
    }
  };

  // ── PROJECT MANAGEMENT ──
  const createProject = (template?: Project) => {
    if (!currentUser) {
      addToast('Please sign in to create projects', 'warning');
      setView('auth');
      return;
    }

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: `untitled_${projects.filter((p) => !p.isTemplate).length + 1}`,
      code:
        template?.code ||
        `// New Anitix Project\n∑ scene my_scene\n  duration = 5s\n  \n  object my_object\n    type = circle\n    keyframe t=0s\n      opacity = 0\n    keyframe t=1s\n      opacity = 1`,
      thumbnail: '✨',
      duration: '5s',
      resolution: '1920x1080',
      fps: '60',
      modified: 'Just now',
      userId: currentUser.id,
      category: 'motion',
    };

    // Save to localStorage
    const saved = JSON.parse(
      localStorage.getItem(`manigist_projects_${currentUser.id}`) || '[]'
    );
    saved.unshift(newProject);
    localStorage.setItem(
      `manigist_projects_${currentUser.id}`,
      JSON.stringify(saved)
    );

    // Update state
    setProjects((prev) => [newProject, ...prev.filter((p) => !p.isTemplate)]);
    setActiveProject(newProject);
    setCode(newProject.code);
    addToast('Project created ✓', 'success');
  };

  const deleteProject = (projectId: string) => {
    if (!currentUser) return;

    const userProjects = projects.filter(
      (p) => !p.isTemplate && p.userId === currentUser.id
    );
    if (userProjects.length <= 1) {
      addToast('Cannot delete your last project', 'warning');
      return;
    }

    // Remove from localStorage
    const saved = JSON.parse(
      localStorage.getItem(`manigist_projects_${currentUser.id}`) || '[]'
    );
    const filtered = saved.filter((p: Project) => p.id !== projectId);
    localStorage.setItem(
      `manigist_projects_${currentUser.id}`,
      JSON.stringify(filtered)
    );

    // Update state
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    if (activeProject?.id === projectId) {
      const remaining = userProjects.filter((p) => p.id !== projectId);
      setActiveProject(remaining[0] || DEMO_TEMPLATES[0]);
      setCode((remaining[0] || DEMO_TEMPLATES[0]).code);
    }
    addToast('Project deleted', 'info');
  };

  const renameProject = (projectId: string, newName: string) => {
    if (!currentUser) return;

    // Update in localStorage
    const saved = JSON.parse(
      localStorage.getItem(`manigist_projects_${currentUser.id}`) || '[]'
    );
    const updated = saved.map((p: Project) =>
      p.id === projectId ? { ...p, name: newName, modified: 'Just now' } : p
    );
    localStorage.setItem(
      `manigist_projects_${currentUser.id}`,
      JSON.stringify(updated)
    );

    // Update state
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId ? { ...p, name: newName, modified: 'Just now' } : p
      )
    );
    if (activeProject?.id === projectId) {
      setActiveProject((prev) => (prev ? { ...prev, name: newName } : null));
    }
    addToast('Project renamed ✓', 'success');
  };

  const saveProject = () => {
    if (!currentUser || !activeProject) {
      addToast('Please sign in to save', 'warning');
      return;
    }

    const updated = { ...activeProject, code, modified: 'Just now' };

    // Save to localStorage
    const saved = JSON.parse(
      localStorage.getItem(`manigist_projects_${currentUser.id}`) || '[]'
    );
    const index = saved.findIndex((p: Project) => p.id === activeProject.id);
    if (index !== -1) {
      saved[index] = updated;
    } else {
      saved.unshift(updated);
    }
    localStorage.setItem(
      `manigist_projects_${currentUser.id}`,
      JSON.stringify(saved)
    );

    // Update state
    setActiveProject(updated);
    setProjects((prev) =>
      prev.map((p) => (p.id === activeProject.id ? updated : p))
    );
    addToast('Project saved ✓', 'success');
  };

  // Auto-save on code change (debounced)
  useEffect(() => {
    if (!currentUser || !activeProject || !isEditing) return;

    const timer = setTimeout(() => {
      saveProject();
    }, 5000);

    return () => clearTimeout(timer);
  }, [code, currentUser, activeProject, isEditing]);

  // ── ANIMATION PREVIEW ──
  const getPreviewStyles = useMemo(() => {
    const progress = currentTime / 5;
    return {
      // Ball demo
      ballY:
        activeProject?.id === 'demo-ball'
          ? 400 - Math.abs(Math.sin(progress * Math.PI) * 300)
          : 400,
      ballScale:
        activeProject?.id === 'demo-ball'
          ? 1 + Math.sin(progress * Math.PI * 2) * 0.1
          : 1,

      // Gate demo
      gateLeftRotation:
        activeProject?.id === 'demo-gate'
          ? Math.min(0, -90 * Math.min(1, progress / 1.5))
          : 0,
      gateRightRotation:
        activeProject?.id === 'demo-gate'
          ? Math.max(0, 90 * Math.min(1, progress / 1.5))
          : 0,
      lightOpacity:
        activeProject?.id === 'demo-gate' && progress > 1.5 && progress < 3
          ? 0.8 - Math.abs(progress - 2.25) * 0.8
          : 0,

      // Star demo
      starOpacity:
        activeProject?.id === 'demo-star'
          ? Array.from(
              { length: 20 },
              (_, i) => 0.3 + Math.sin(progress * 10 + i * 0.5) * 0.35
            )
          : [],

      // Bird demo
      birdX:
        activeProject?.id === 'demo-bird'
          ? -50 + ((progress * 2020) / 6) * 6
          : -50,
      birdY:
        activeProject?.id === 'demo-bird'
          ? 300 + Math.sin(progress * Math.PI) * -100
          : 300,
      birdRotation:
        activeProject?.id === 'demo-bird'
          ? Math.sin(progress * Math.PI * 2) * 5
          : 0,

      // Text demo
      textOpacity:
        activeProject?.id === 'demo-text' && progress > 0.5 && progress < 3
          ? 1
          : 0,

      // Particles
      particles:
        activeProject?.id === 'demo-particles' && progress > 0.2 && progress < 2
          ? Array.from({ length: 12 }, (_, i) => ({
              x:
                Math.cos((i / 12) * Math.PI * 2 + progress * 10) *
                (30 + progress * 50),
              y:
                Math.sin((i / 12) * Math.PI * 2 + progress * 10) *
                (30 + progress * 50),
              opacity: 1 - Math.abs(progress - 1.1) * 2,
              scale: 0.5 + Math.sin(progress * 10 + i) * 0.3,
            }))
          : [],

      // Logo spin
      logoRotation: activeProject?.id === 'demo-logo' ? progress * 360 : 0,
      logoDashOffset:
        activeProject?.id === 'demo-logo' && progress < 1
          ? 377 - progress * 377
          : progress >= 1
          ? 0
          : 377,

      // Wave
      waveOffset: activeProject?.id === 'demo-wave' ? progress * 100 : 0,

      // Loader
      loaderRotation: activeProject?.id === 'demo-loader' ? progress * 360 : 0,
      loaderDashOffset:
        activeProject?.id === 'demo-loader' ? 314 - (progress % 1) * 314 : 314,

      // Transition
      wipeX:
        activeProject?.id === 'demo-transition'
          ? progress < 1
            ? -1920
            : progress < 2
            ? (progress - 1) * 1920
            : 1920
          : -1920,
      sceneAOpacity:
        activeProject?.id === 'demo-transition' && progress < 1.5 ? 1 : 0,
      sceneBOpacity:
        activeProject?.id === 'demo-transition' && progress > 1.5 ? 1 : 0,
    };
  }, [currentTime, activeProject]);

  // Animation loop
  useEffect(() => {
    if (isPlaying && activeView === 'editor') {
      const start = Date.now() - currentTime * 1000;
      const animate = () => {
        const elapsed = ((Date.now() - start) / 1000) * playbackSpeed;
        const duration = parseFloat(activeProject?.duration || '5');

        if (elapsed >= duration) {
          setIsPlaying(false);
          setCurrentTime(0);
          addToast('Animation complete ✓', 'success');
        } else {
          setCurrentTime(elapsed);
          animRef.current = requestAnimationFrame(animate);
        }
      };
      animRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [
    isPlaying,
    currentTime,
    activeView,
    playbackSpeed,
    activeProject,
    addToast,
  ]);

  // ── KEYBOARD SHORTCUTS ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        switch (e.key.toLowerCase()) {
          case '1':
            setActiveTool('code');
            addToast('Code Editor', 'info');
            break;
          case '2':
            setActiveTool('scenes');
            addToast('Scenes', 'info');
            break;
          case '3':
            setActiveTool('objects');
            addToast('Objects', 'info');
            break;
          case '4':
            setActiveTool('timeline');
            addToast('Timeline', 'info');
            break;
          case 'e':
            setActiveTool('export');
            addToast('Export', 'info');
            break;
          case 'c':
            setActiveTool('community');
            addToast('Community', 'info');
            break;
          case ',':
            setActiveTool('settings');
            addToast('Settings', 'info');
            break;
          case 'enter':
            setIsPlaying((p) => !p);
            break;
          case 's':
            saveProject();
            break;
          case 'n':
            createProject();
            break;
          case '/':
            e.preventDefault();
            document.getElementById('search-input')?.focus();
            break;
        }
      }
      if (e.key === 'Escape') {
        if (activeView === 'editor') setActiveView('landing');
        else if (view === 'auth' || view === 'verify') setView('landing');
      }
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeView, view, addToast]);

  // ── RESIZE HANDLERS ──
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      if (isResizing === 'left') {
        const width = Math.max(48, Math.min(100, e.clientX - rect.left));
        setLeftSidebarWidth(width);
      } else if (isResizing === 'panel') {
        const width = Math.max(
          200,
          Math.min(400, e.clientX - rect.left - leftSidebarWidth - 8)
        );
        setPanelWidth(width);
      }
    };
    const onMouseUp = () => setIsResizing(null);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isResizing, leftSidebarWidth]);

  // ── EXPORT FUNCTION ──
  const handleExport = async () => {
    if (!activeProject) {
      addToast('No project selected', 'error');
      return;
    }

    setIsExporting(true);
    setExportProgress(0);
    addToast(`Preparing ${exportFormat.toUpperCase()} export...`, 'info');

    // Simulate export progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setExportProgress(i);
    }

    // Create download
    const content =
      exportFormat === 'lottie'
        ? JSON.stringify(
            { v: '5.0', name: activeProject.name, layers: [] },
            null,
            2
          )
        : `// Exported from Manigist\n// Format: ${exportFormat.toUpperCase()}\n// Quality: ${exportQuality}\n\n${code}`;

    const blob = new Blob([content], {
      type:
        exportFormat === 'lottie'
          ? 'application/json'
          : exportFormat === 'gif'
          ? 'image/gif'
          : 'video/mp4',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeProject.name}.${
      exportFormat === 'lottie' ? 'json' : exportFormat
    }`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setIsExporting(false);
    addToast(`✓ Downloaded ${activeProject.name}.${exportFormat}!`, 'success');
  };

  // ── CODE SNIPPETS ──
  const insertSnippet = (snippet: string) => {
    const textarea = codeEditorRef.current;
    if (!textarea) {
      setCode((prev) => prev + `\n${snippet}\n`);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newCode = code.slice(0, start) + `\n${snippet}\n` + code.slice(end);
    setCode(newCode);
    setIsEditing(true);
    addToast(`Inserted ${snippet.split(' ')[0]} block`, 'success');

    // Focus and set cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + snippet.length + 2,
        start + snippet.length + 2
      );
    }, 0);
  };

  // ── FILTERED PROJECTS ──
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        filterCategory === 'all' || p.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, filterCategory]);

  // ── STYLES ──
  const s = {
    base: {
      fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
      background: theme === 'dark' ? '#000' : '#f8f9fa',
      color: theme === 'dark' ? '#fff' : '#1a1a2e',
      minHeight: '100vh',
    },
    flex: { display: 'flex', alignItems: 'center' },
    flexCol: { display: 'flex', flexDirection: 'column' as const },
    btn: {
      padding: '10px 20px',
      background: theme === 'dark' ? '#fff' : '#1a1a2e',
      border: 'none',
      borderRadius: '12px',
      color: theme === 'dark' ? '#000' : '#fff',
      cursor: 'pointer',
      fontWeight: 600,
      transition: 'all 0.2s',
    },
    btnSec: {
      padding: '10px 20px',
      background: 'transparent',
      border: `1px solid ${theme === 'dark' ? '#222' : '#ddd'}`,
      borderRadius: '12px',
      color: theme === 'dark' ? '#777' : '#666',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    btnSm: {
      padding: '6px 12px',
      background: 'transparent',
      border: `1px solid ${theme === 'dark' ? '#222' : '#ddd'}`,
      borderRadius: '8px',
      color: theme === 'dark' ? '#666' : '#555',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    input: {
      width: '100%',
      padding: '12px 14px',
      background: theme === 'dark' ? '#111' : '#fff',
      border: `1px solid ${theme === 'dark' ? '#1a1a1a' : '#ddd'}`,
      borderRadius: '10px',
      color: theme === 'dark' ? '#fff' : '#1a1a2e',
      fontSize: '14px',
      marginBottom: '12px',
      boxSizing: 'border-box' as const,
      outline: 'none',
    },
    modal: {
      position: 'fixed' as const,
      inset: 0,
      background: 'rgba(0,0,0,0.95)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
    },
    modalBox: {
      background: theme === 'dark' ? '#0a0a0a' : '#fff',
      border: `1px solid ${theme === 'dark' ? '#1a1a1a' : '#e0e0e0'}`,
      borderRadius: '20px',
      padding: '40px',
      width: '100%',
      maxWidth: '440px',
      textAlign: 'center' as const,
      boxShadow: '0 25px 80px rgba(0,0,0,0.5)',
    },
    editor: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column' as const,
      overflow: 'hidden',
      background: theme === 'dark' ? '#000' : '#f8f9fa',
    },
    header: {
      height: '60px',
      borderBottom: `1px solid ${theme === 'dark' ? '#111' : '#e0e0e0'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      background: theme === 'dark' ? '#050505' : '#fff',
      flexShrink: 0,
    },
    main: { display: 'flex', flex: 1, overflow: 'hidden' },
    textarea: {
      flex: 1,
      padding: '16px',
      background: theme === 'dark' ? '#030303' : '#fff',
      border: 'none',
      outline: 'none',
      color: theme === 'dark' ? '#ccc' : '#333',
      fontFamily: 'monospace',
      fontSize: '13px',
      lineHeight: '1.7',
      resize: 'none' as const,
      tabSize: 2,
    },
    landing: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column' as const,
    },
    projectCard: {
      padding: '14px 16px',
      background: theme === 'dark' ? '#0a0a0a' : '#fff',
      border: `1px solid ${theme === 'dark' ? '#1a1a1a' : '#e0e0e0'}`,
      borderRadius: '12px',
      marginBottom: '10px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    resizeHandle: {
      width: '4px',
      background: theme === 'dark' ? '#1a1a1a' : '#e0e0e0',
      cursor: 'col-resize',
      '&:hover': { background: theme === 'dark' ? '#333' : '#bbb' },
    },
    toast: {
      padding: '12px 16px',
      borderRadius: '10px',
      fontSize: '14px',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
      animation: 'slideIn 0.3s ease-out',
    },
  };

  // ── AUTH VIEW ──
  if (view === 'auth' || view === 'verify' || view === 'forgot') {
    return (
      <div style={s.modal}>
        <div style={s.modalBox}>
          {/* Close Button */}
          <button
            onClick={() => {
              setView('landing');
              setActiveView('landing');
            }}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              background: 'none',
              border: 'none',
              color: theme === 'dark' ? '#444' : '#666',
              fontSize: 20,
              cursor: 'pointer',
              width: 32,
              height: 32,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>

          {/* Logo */}
          <div style={{ marginBottom: 24 }}>
            <span
              style={{
                fontSize: 40,
                fontWeight: 300,
                color: theme === 'dark' ? '#fff' : '#1a1a2e',
              }}
            >
              ∑
            </span>
            <span style={{ fontSize: 28, fontWeight: 800, marginLeft: 4 }}>
              <span style={{ color: theme === 'dark' ? '#fff' : '#1a1a2e' }}>
                Ani
              </span>
              <span style={{ color: theme === 'dark' ? '#444' : '#666' }}>
                gist
              </span>
            </span>
            <div
              style={{
                fontSize: 11,
                color: theme === 'dark' ? '#444' : '#666',
                marginTop: 4,
              }}
            >
              Pro v4.0
            </div>
          </div>

          {/* Verification View */}
          {view === 'verify' ? (
            <>
              <h2
                style={{
                  color: theme === 'dark' ? '#fff' : '#1a1a2e',
                  marginBottom: 8,
                  fontSize: 20,
                }}
              >
                Verify your email
              </h2>
              <p
                style={{
                  color: theme === 'dark' ? '#666' : '#555',
                  marginBottom: 24,
                  fontSize: 14,
                }}
              >
                We sent a 6-digit code to <strong>{verificationEmail}</strong>
              </p>

              <input
                type="text"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) =>
                  setVerificationCode(
                    e.target.value.replace(/[^0-9]/g, '').slice(0, 6)
                  )
                }
                maxLength={6}
                style={{
                  ...s.input,
                  textAlign: 'center',
                  fontSize: 18,
                  letterSpacing: 8,
                  marginBottom: 20,
                }}
                autoFocus
              />

              <button
                onClick={handleVerifyEmail}
                disabled={isVerifying || verificationCode.length !== 6}
                style={{
                  ...s.btn,
                  width: '100%',
                  opacity:
                    isVerifying || verificationCode.length !== 6 ? 0.6 : 1,
                  cursor:
                    isVerifying || verificationCode.length !== 6
                      ? 'not-allowed'
                      : 'pointer',
                }}
              >
                {isVerifying ? 'Verifying...' : 'Verify Email'}
              </button>

              <p
                style={{
                  fontSize: 13,
                  color: theme === 'dark' ? '#444' : '#666',
                  marginTop: 16,
                }}
              >
                Didn't receive the code?{' '}
                <span
                  style={{
                    color: theme === 'dark' ? '#fff' : '#1a1a2e',
                    cursor: 'pointer',
                    fontWeight: 500,
                  }}
                  onClick={() => addToast('Code resent ✓', 'success')}
                >
                  Resend
                </span>
              </p>
              <button
                onClick={() => setView('auth')}
                style={{
                  marginTop: 20,
                  background: 'none',
                  border: 'none',
                  color: theme === 'dark' ? '#444' : '#666',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                ← Back to sign in
              </button>
            </>
          ) : (
            <>
              {/* Auth Mode Tabs */}
              {view !== 'forgot' && (
                <div
                  style={{
                    display: 'flex',
                    marginBottom: 24,
                    background: theme === 'dark' ? '#111' : '#f0f0f0',
                    borderRadius: '12px',
                    padding: '4px',
                  }}
                >
                  <button
                    onClick={() => setAuthMode('signin')}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: 600,
                      background:
                        authMode === 'signin'
                          ? theme === 'dark'
                            ? '#1a1a1a'
                            : '#fff'
                          : 'transparent',
                      color:
                        authMode === 'signin'
                          ? theme === 'dark'
                            ? '#fff'
                            : '#1a1a2e'
                          : theme === 'dark'
                          ? '#666'
                          : '#666',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setAuthMode('signup')}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: 600,
                      background:
                        authMode === 'signup'
                          ? theme === 'dark'
                            ? '#1a1a1a'
                            : '#fff'
                          : 'transparent',
                      color:
                        authMode === 'signup'
                          ? theme === 'dark'
                            ? '#fff'
                            : '#1a1a2e'
                          : theme === 'dark'
                          ? '#666'
                          : '#666',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              )}

              <h2
                style={{
                  color: theme === 'dark' ? '#fff' : '#1a1a2e',
                  marginBottom: 8,
                  fontSize: 20,
                }}
              >
                {view === 'forgot'
                  ? 'Reset password'
                  : authMode === 'signin'
                  ? 'Welcome back'
                  : 'Create account'}
              </h2>
              <p
                style={{
                  color: theme === 'dark' ? '#666' : '#555',
                  marginBottom: 24,
                  fontSize: 14,
                }}
              >
                {view === 'forgot'
                  ? 'Enter your email to receive a reset link'
                  : authMode === 'signin'
                  ? 'Sign in to access your projects'
                  : 'Start creating cinematic animations'}
              </p>

              {/* Error Message */}
              {authError && (
                <div
                  style={{
                    padding: '10px 14px',
                    background: '#2a1a1a',
                    border: '1px solid #4a2a2a',
                    borderRadius: '8px',
                    color: '#ff6b6b',
                    fontSize: '13px',
                    marginBottom: '16px',
                    textAlign: 'left',
                  }}
                >
                  ⚠ {authError}
                </div>
              )}

              {/* Google Sign In */}
              {view !== 'forgot' && (
                <button
                  onClick={() => {
                    addToast('Connecting to Google...', 'info');
                    setTimeout(() => {
                      const mockUser: User = {
                        id: 'google-user',
                        username: 'Creator',
                        email: 'user@manigist.dev',
                        verified: true,
                        avatar: 'G',
                        createdAt: new Date().toISOString(),
                        projects: [],
                      };
                      setCurrentUser(mockUser);
                      loadUserProjects(mockUser);
                      addToast('✓ Signed in with Google!', 'success');
                      setView('editor');
                    }, 1500);
                  }}
                  style={{
                    ...s.btn,
                    width: '100%',
                    marginBottom: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    background: theme === 'dark' ? '#fff' : '#1a1a2e',
                    color: theme === 'dark' ? '#000' : '#fff',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </button>
              )}

              {view !== 'forgot' && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    margin: '20px 0',
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      height: 1,
                      background: theme === 'dark' ? '#1a1a1a' : '#e0e0e0',
                    }}
                  />
                  <span
                    style={{
                      fontSize: 12,
                      color: theme === 'dark' ? '#444' : '#666',
                    }}
                  >
                    or
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: 1,
                      background: theme === 'dark' ? '#1a1a1a' : '#e0e0e0',
                    }}
                  />
                </div>
              )}

              {/* Forms */}
              {view === 'forgot' ? (
                <form onSubmit={handleForgotPassword}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={authForm.email}
                    onChange={(e) =>
                      setAuthForm({ ...authForm, email: e.target.value })
                    }
                    style={s.input}
                    required
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      ...s.btn,
                      width: '100%',
                      opacity: isLoading ? 0.6 : 1,
                    }}
                  >
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </form>
              ) : (
                <form
                  onSubmit={authMode === 'signin' ? handleSignIn : handleSignUp}
                >
                  {authMode === 'signup' && (
                    <input
                      type="text"
                      placeholder="Username"
                      value={authForm.username}
                      onChange={(e) =>
                        setAuthForm({ ...authForm, username: e.target.value })
                      }
                      style={s.input}
                      required
                    />
                  )}
                  <input
                    type="email"
                    placeholder="Email address"
                    value={authForm.email}
                    onChange={(e) =>
                      setAuthForm({ ...authForm, email: e.target.value })
                    }
                    style={s.input}
                    required
                  />
                  <input
                    type="password"
                    placeholder={
                      authMode === 'signin'
                        ? 'Password'
                        : 'Password (6+ characters)'
                    }
                    value={authForm.password}
                    onChange={(e) =>
                      setAuthForm({ ...authForm, password: e.target.value })
                    }
                    style={s.input}
                    required
                    minLength={6}
                  />
                  {authMode === 'signup' && (
                    <input
                      type="password"
                      placeholder="Confirm password"
                      value={authForm.confirmPassword}
                      onChange={(e) =>
                        setAuthForm({
                          ...authForm,
                          confirmPassword: e.target.value,
                        })
                      }
                      style={s.input}
                      required
                      minLength={6}
                    />
                  )}
                  {authMode === 'signin' && (
                    <p
                      style={{
                        textAlign: 'right',
                        fontSize: 13,
                        marginBottom: 16,
                      }}
                    >
                      <span
                        style={{
                          color: theme === 'dark' ? '#fff' : '#1a1a2e',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setAuthMode('forgot');
                          setView('forgot');
                        }}
                      >
                        Forgot password?
                      </span>
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      ...s.btn,
                      width: '100%',
                      opacity: isLoading ? 0.6 : 1,
                    }}
                  >
                    {isLoading
                      ? 'Loading...'
                      : authMode === 'signin'
                      ? 'Sign in'
                      : 'Create account'}
                  </button>
                </form>
              )}

              {/* Toggle Auth Mode */}
              {view !== 'forgot' && (
                <p
                  style={{
                    fontSize: 13,
                    color: theme === 'dark' ? '#444' : '#666',
                    marginTop: 16,
                  }}
                >
                  {authMode === 'signin'
                    ? "Don't have an account? "
                    : 'Already have an account? '}
                  <span
                    style={{
                      color: theme === 'dark' ? '#fff' : '#1a1a2e',
                      cursor: 'pointer',
                      fontWeight: 500,
                    }}
                    onClick={() => {
                      setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
                      setAuthError(null);
                    }}
                  >
                    {authMode === 'signin' ? 'Sign up free' : 'Sign in'}
                  </span>
                </p>
              )}

              {/* Back Button */}
              <button
                onClick={() => {
                  setView('landing');
                  setActiveView('landing');
                }}
                style={{
                  marginTop: 20,
                  background: 'none',
                  border: 'none',
                  color: theme === 'dark' ? '#444' : '#666',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                ← Back to Manigist
              </button>
            </>
          )}
        </div>

        {/* Toasts */}
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            zIndex: 1001,
            maxWidth: 320,
          }}
        >
          {toasts.map((toast) => (
            <div
              key={toast.id}
              style={{
                ...s.toast,
                background:
                  toast.type === 'success'
                    ? '#1a2a1a'
                    : toast.type === 'error'
                    ? '#2a1a1a'
                    : toast.type === 'warning'
                    ? '#2a2a1a'
                    : '#1a1a2a',
                border: `1px solid ${
                  toast.type === 'success'
                    ? '#2a4a2a'
                    : toast.type === 'error'
                    ? '#4a2a2a'
                    : toast.type === 'warning'
                    ? '#4a4a2a'
                    : '#2a2a4a'
                }`,
                color: '#fff',
              }}
              onClick={() => removeToast(toast.id)}
            >
              <span>
                {toast.type === 'success'
                  ? '✓'
                  : toast.type === 'error'
                  ? '⚠'
                  : toast.type === 'warning'
                  ? '⚡'
                  : 'ℹ'}
              </span>
              {toast.message}
              <span
                style={{ marginLeft: 'auto', opacity: 0.7, cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();
                  removeToast(toast.id);
                }}
              >
                ✕
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── EDITOR VIEW ──
  if (activeView === 'editor') {
    const progress = currentTime / parseFloat(activeProject?.duration || '5');

    return (
      <div style={s.editor} ref={containerRef}>
        {/* Header */}
        <header style={s.header}>
          <div style={{ ...s.flex, gap: 12 }}>
            <div
              style={{ ...s.flex, gap: 8, cursor: 'pointer' }}
              onClick={() => setActiveView('landing')}
            >
              <span style={{ fontSize: 22, fontWeight: 300 }}>∑</span>
              <span style={{ fontSize: 17, fontWeight: 800 }}>
                <span>Ani</span>
                <span style={{ opacity: 0.6 }}>gist</span>
              </span>
            </div>
            <span
              style={{
                fontSize: 10,
                background: theme === 'dark' ? '#1a1a1a' : '#e0e0e0',
                padding: '2px 8px',
                borderRadius: 20,
                opacity: 0.7,
              }}
            >
              Pro
            </span>
          </div>

          {/* Project Tabs */}
          <div
            style={{
              ...s.flex,
              gap: 4,
              background: theme === 'dark' ? '#0a0a0a' : '#f0f0f0',
              padding: '4px 8px',
              borderRadius: 12,
              maxWidth: 600,
              overflowX: 'auto',
            }}
          >
            {filteredProjects.slice(0, 8).map((p) => (
              <div
                key={p.id}
                style={{
                  ...s.flex,
                  gap: 6,
                  padding: '6px 12px',
                  background:
                    activeProject?.id === p.id
                      ? theme === 'dark'
                        ? '#1a1a1a'
                        : '#e0e0e0'
                      : 'transparent',
                  borderRadius: 8,
                  color:
                    activeProject?.id === p.id
                      ? theme === 'dark'
                        ? '#fff'
                        : '#1a1a2e'
                      : theme === 'dark'
                      ? '#666'
                      : '#666',
                  fontSize: 12,
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                  whiteSpace: 'nowrap',
                }}
                onClick={() => {
                  setActiveProject(p);
                  setCode(p.code);
                  addToast(`Opened ${p.name}`, 'info');
                  setIsEditing(false);
                }}
              >
                {editingProject?.id === p.id ? (
                  <input
                    value={editingProject.name}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        name: e.target.value,
                      })
                    }
                    onBlur={() => {
                      if (editingProject)
                        renameProject(editingProject.id, editingProject.name);
                      setEditingProject(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && editingProject) {
                        renameProject(editingProject.id, editingProject.name);
                        setEditingProject(null);
                      }
                    }}
                    style={{
                      background: theme === 'dark' ? '#111' : '#fff',
                      border: `1px solid ${theme === 'dark' ? '#333' : '#ccc'}`,
                      borderRadius: 4,
                      padding: '2px 6px',
                      color: theme === 'dark' ? '#fff' : '#1a1a2e',
                      width: 100,
                      fontSize: 12,
                      outline: 'none',
                    }}
                    autoFocus
                  />
                ) : (
                  <>
                    <span>
                      {p.thumbnail} {p.name}
                    </span>
                    {!p.isTemplate && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingProject({ id: p.id, name: p.name });
                          }}
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            border: 'none',
                            background: theme === 'dark' ? '#222' : '#e0e0e0',
                            color: theme === 'dark' ? '#666' : '#666',
                            fontSize: 10,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          ✎
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteProject(p.id);
                          }}
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            border: 'none',
                            background: theme === 'dark' ? '#222' : '#e0e0e0',
                            color: '#e63946',
                            fontSize: 10,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          ✕
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            ))}
            <button
              onClick={() => createProject()}
              style={{
                width: 28,
                height: 28,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: `1px dashed ${theme === 'dark' ? '#222' : '#ccc'}`,
                borderRadius: 8,
                color: theme === 'dark' ? '#444' : '#666',
                fontSize: 18,
                cursor: 'pointer',
              }}
            >
              +
            </button>
          </div>

          {/* Actions */}
          <div style={{ ...s.flex, gap: 8 }}>
            {currentUser ? (
              <>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${
                      theme === 'dark' ? '#222' : '#ddd'
                    }, ${theme === 'dark' ? '#111' : '#bbb'})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 600,
                    border: `1px solid ${theme === 'dark' ? '#222' : '#ddd'}`,
                    cursor: 'pointer',
                  }}
                  title={currentUser.username}
                >
                  {currentUser.avatar}
                </div>
                <button onClick={handleSignOut} style={s.btnSec}>
                  Sign out
                </button>
              </>
            ) : (
              <button onClick={() => setView('auth')} style={s.btnSec}>
                Sign in
              </button>
            )}
            <button onClick={saveProject} style={s.btnSm}>
              💾 Save
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                ...s.btn,
                background: isPlaying
                  ? '#e63946'
                  : theme === 'dark'
                  ? '#fff'
                  : '#1a1a2e',
                color: isPlaying ? '#fff' : theme === 'dark' ? '#000' : '#fff',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {isPlaying ? '⏸' : '▶'} {isPlaying ? 'Pause' : 'Run'}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div style={s.main}>
          {/* Left Sidebar - Tool Icons */}
          <aside
            style={{
              width: leftSidebarWidth,
              borderRight: `1px solid ${theme === 'dark' ? '#111' : '#e0e0e0'}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '12px 0',
              gap: 8,
              background: theme === 'dark' ? '#050505' : '#fff',
              flexShrink: 0,
              transition: 'width 0.2s',
            }}
          >
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => {
                  setActiveTool(tool.id);
                  addToast(tool.label, 'info');
                }}
                title={`${tool.label} (Ctrl+${
                  tool.id === 'code'
                    ? '1'
                    : tool.id === 'scenes'
                    ? '2'
                    : tool.id === 'objects'
                    ? '3'
                    : tool.id === 'timeline'
                    ? '4'
                    : tool.id === 'export'
                    ? 'E'
                    : tool.id === 'community'
                    ? 'C'
                    : ','
                })`}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background:
                    activeTool === tool.id
                      ? theme === 'dark'
                        ? '#1a1a1a'
                        : '#e0e0e0'
                      : 'transparent',
                  border: 'none',
                  color:
                    activeTool === tool.id
                      ? theme === 'dark'
                        ? '#fff'
                        : '#1a1a2e'
                      : theme === 'dark'
                      ? '#444'
                      : '#666',
                  fontSize: 18,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {tool.icon}
              </button>
            ))}
            <div style={{ flex: 1 }} />
            <button
              onClick={() =>
                setLeftSidebarWidth(leftSidebarWidth === 64 ? 0 : 64)
              }
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: theme === 'dark' ? '#111' : '#f0f0f0',
                border: `1px solid ${theme === 'dark' ? '#222' : '#ddd'}`,
                color: theme === 'dark' ? '#666' : '#666',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {leftSidebarWidth === 64 ? '←' : '→'}
            </button>
          </aside>

          {/* Resize Handle */}
          {leftSidebarWidth > 0 && (
            <div
              onMouseDown={() => setIsResizing('left')}
              style={s.resizeHandle}
            />
          )}

          {/* Tool Panel */}
          {leftSidebarWidth > 0 && (
            <>
              <div
                style={{
                  width: panelWidth,
                  borderRight: `1px solid ${
                    theme === 'dark' ? '#111' : '#e0e0e0'
                  }`,
                  background: theme === 'dark' ? '#080808' : '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  flexShrink: 0,
                  transition: 'width 0.2s',
                }}
              >
                <div
                  style={{
                    padding: '12px 16px',
                    borderBottom: `1px solid ${
                      theme === 'dark' ? '#111' : '#e0e0e0'
                    }`,
                    fontSize: 11,
                    color: theme === 'dark' ? '#444' : '#666',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontWeight: 600,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>{tools.find((t) => t.id === activeTool)?.label}</span>
                  <button
                    onClick={() => setPanelWidth(panelWidth === 240 ? 0 : 240)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: theme === 'dark' ? '#444' : '#666',
                      cursor: 'pointer',
                      fontSize: 12,
                    }}
                  >
                    {panelWidth === 240 ? '−' : '+'}
                  </button>
                </div>

                <div style={{ padding: 12, overflowY: 'auto', flex: 1 }}>
                  {/* CODE TOOL */}
                  {activeTool === 'code' && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                      }}
                    >
                      <p
                        style={{
                          fontSize: 11,
                          color: theme === 'dark' ? '#444' : '#666',
                          marginBottom: 8,
                        }}
                      >
                        Insert block
                      </p>
                      {[
                        { name: 'scene', desc: 'New animation scene' },
                        { name: 'object', desc: 'Add visual element' },
                        { name: 'keyframe', desc: 'Animation keyframe' },
                        { name: 'camera', desc: 'Camera movement' },
                        { name: 'text', desc: 'Text element' },
                        { name: 'path', desc: 'Vector path' },
                        { name: 'effect', desc: 'Visual effect' },
                        { name: 'transition', desc: 'Scene transition' },
                      ].map((item) => (
                        <button
                          key={item.name}
                          onClick={() =>
                            insertSnippet(
                              `${item.name} new_${item.name}\n  // Configure properties`
                            )
                          }
                          style={{
                            padding: '10px 12px',
                            background:
                              theme === 'dark' ? '#0a0a0a' : '#f8f9fa',
                            border: `1px solid ${
                              theme === 'dark' ? '#1a1a1a' : '#e0e0e0'
                            }`,
                            borderRadius: 8,
                            color: theme === 'dark' ? '#888' : '#666',
                            fontSize: 12,
                            cursor: 'pointer',
                            textAlign: 'left' as const,
                            fontFamily: 'monospace',
                            transition: 'all 0.15s',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              theme === 'dark' ? '#111' : '#e0e0e0';
                            e.currentTarget.style.color =
                              theme === 'dark' ? '#ccc' : '#333';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                              theme === 'dark' ? '#0a0a0a' : '#f8f9fa';
                            e.currentTarget.style.color =
                              theme === 'dark' ? '#888' : '#666';
                          }}
                        >
                          <div>
                            <div
                              style={{
                                color: theme === 'dark' ? '#fff' : '#1a1a2e',
                                fontWeight: 500,
                              }}
                            >
                              {item.name}
                            </div>
                            <div style={{ fontSize: 10, opacity: 0.7 }}>
                              {item.desc}
                            </div>
                          </div>
                          <span
                            style={{
                              fontSize: 10,
                              background: theme === 'dark' ? '#111' : '#e0e0e0',
                              padding: '2px 6px',
                              borderRadius: 4,
                            }}
                          >
                            +
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* SCENES TOOL */}
                  {activeTool === 'scenes' && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                      }}
                    >
                      {[
                        'attack_intro',
                        'hero_reveal',
                        'battle_sequence',
                        'credits',
                      ].map((scene, i) => (
                        <div
                          key={scene}
                          style={{
                            padding: '10px 12px',
                            background:
                              i === 0
                                ? theme === 'dark'
                                  ? '#1a1a1a'
                                  : '#e0e0e0'
                                : theme === 'dark'
                                ? '#0a0a0a'
                                : '#f8f9fa',
                            border: `1px solid ${
                              i === 0
                                ? theme === 'dark'
                                  ? '#333'
                                  : '#ccc'
                                : theme === 'dark'
                                ? '#1a1a1a'
                                : '#e0e0e0'
                            }`,
                            borderRadius: 8,
                            color:
                              i === 0
                                ? theme === 'dark'
                                  ? '#fff'
                                  : '#1a1a2e'
                                : theme === 'dark'
                                ? '#666'
                                : '#666',
                            fontSize: 13,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            transition: 'all 0.15s',
                          }}
                          onClick={() => {
                            setActiveTab(`${scene}.mg`);
                            addToast(`Switched to ${scene}`, 'info');
                          }}
                        >
                          <span>◈</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 500 }}>{scene}</div>
                            <div style={{ fontSize: 10, opacity: 0.7 }}>
                              {i === 0 ? '● Active' : `${3 + i * 2} objects`}
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        style={{
                          padding: '10px 12px',
                          background: 'transparent',
                          border: `1px dashed ${
                            theme === 'dark' ? '#222' : '#ccc'
                          }`,
                          borderRadius: 8,
                          color: theme === 'dark' ? '#444' : '#666',
                          fontSize: 13,
                          cursor: 'pointer',
                          marginTop: 4,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 4,
                        }}
                      >
                        <span>+</span> New scene
                      </button>
                    </div>
                  )}

                  {/* EXPORT TOOL */}
                  {activeTool === 'export' && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                      }}
                    >
                      <p
                        style={{
                          fontSize: 11,
                          color: theme === 'dark' ? '#444' : '#666',
                          marginBottom: 4,
                        }}
                      >
                        Format
                      </p>
                      {(
                        [
                          'mp4',
                          'webm',
                          'gif',
                          'lottie',
                          'png',
                        ] as ExportFormat[]
                      ).map((fmt) => (
                        <button
                          key={fmt}
                          onClick={() => setExportFormat(fmt)}
                          style={{
                            padding: '10px 12px',
                            background:
                              exportFormat === fmt
                                ? theme === 'dark'
                                  ? '#1a1a1a'
                                  : '#e0e0e0'
                                : theme === 'dark'
                                ? '#0a0a0a'
                                : '#f8f9fa',
                            border: `1px solid ${
                              exportFormat === fmt
                                ? theme === 'dark'
                                  ? '#333'
                                  : '#ccc'
                                : theme === 'dark'
                                ? '#1a1a1a'
                                : '#e0e0e0'
                            }`,
                            borderRadius: 8,
                            color:
                              exportFormat === fmt
                                ? theme === 'dark'
                                  ? '#fff'
                                  : '#1a1a2e'
                                : theme === 'dark'
                                ? '#888'
                                : '#666',
                            fontSize: 12,
                            cursor: 'pointer',
                            textAlign: 'left' as const,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'all 0.15s',
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 500,
                              textTransform: 'uppercase',
                            }}
                          >
                            {fmt}
                          </span>
                          {exportFormat === fmt && (
                            <span style={{ color: '#4ade80' }}>✓</span>
                          )}
                        </button>
                      ))}

                      <p
                        style={{
                          fontSize: 11,
                          color: theme === 'dark' ? '#444' : '#666',
                          marginTop: 8,
                        }}
                      >
                        Quality
                      </p>
                      <div style={{ display: 'flex', gap: 4 }}>
                        {(['low', 'medium', 'high'] as const).map((q) => (
                          <button
                            key={q}
                            onClick={() => setExportQuality(q)}
                            style={{
                              flex: 1,
                              padding: '8px',
                              background:
                                exportQuality === q
                                  ? theme === 'dark'
                                    ? '#1a1a1a'
                                    : '#e0e0e0'
                                  : 'transparent',
                              border: `1px solid ${
                                exportQuality === q
                                  ? theme === 'dark'
                                    ? '#333'
                                    : '#ccc'
                                  : theme === 'dark'
                                  ? '#222'
                                  : '#ddd'
                              }`,
                              borderRadius: 6,
                              color:
                                exportQuality === q
                                  ? theme === 'dark'
                                    ? '#fff'
                                    : '#1a1a2e'
                                  : theme === 'dark'
                                  ? '#666'
                                  : '#666',
                              fontSize: 11,
                              cursor: 'pointer',
                              textTransform: 'capitalize',
                            }}
                          >
                            {q}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={handleExport}
                        disabled={isExporting}
                        style={{
                          ...s.btn,
                          width: '100%',
                          marginTop: 12,
                          background: isExporting
                            ? '#666'
                            : theme === 'dark'
                            ? '#fff'
                            : '#1a1a2e',
                          color: isExporting
                            ? '#999'
                            : theme === 'dark'
                            ? '#000'
                            : '#fff',
                          cursor: isExporting ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 8,
                        }}
                      >
                        {isExporting ? (
                          <>
                            <span
                              style={{
                                width: 16,
                                height: 16,
                                border: `2px solid ${
                                  theme === 'dark' ? '#333' : '#ccc'
                                }`,
                                borderTopColor:
                                  theme === 'dark' ? '#fff' : '#1a1a2e',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite',
                                display: 'inline-block',
                              }}
                            />
                            Exporting {exportProgress}%...
                          </>
                        ) : (
                          <>🚀 Download {exportFormat.toUpperCase()}</>
                        )}
                      </button>

                      <p
                        style={{
                          fontSize: 10,
                          color: theme === 'dark' ? '#444' : '#666',
                          textAlign: 'center',
                          marginTop: 8,
                        }}
                      >
                        Free · No watermark · Unlimited length
                      </p>
                    </div>
                  )}

                  {/* SETTINGS TOOL */}
                  {activeTool === 'settings' && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 14,
                      }}
                    >
                      {[
                        {
                          label: 'Resolution',
                          value: '1920×1080',
                          options: ['1920×1080', '3840×2160', '1080×1080'],
                        },
                        {
                          label: 'Frame Rate',
                          value: '60 FPS',
                          options: ['24 FPS', '30 FPS', '60 FPS', '120 FPS'],
                        },
                        {
                          label: 'Theme',
                          value: theme === 'dark' ? 'Dark' : 'Light',
                          options: ['Dark', 'Light'],
                        },
                      ].map((setting) => (
                        <div key={setting.label}>
                          <div
                            style={{
                              fontSize: 11,
                              color: theme === 'dark' ? '#444' : '#666',
                              marginBottom: 6,
                            }}
                          >
                            {setting.label}
                          </div>
                          <select
                            value={setting.value}
                            onChange={(e) => {
                              if (setting.label === 'Theme') {
                                setTheme(
                                  e.target.value === 'Dark' ? 'dark' : 'light'
                                );
                                addToast(`Theme: ${e.target.value}`, 'info');
                              } else {
                                addToast(
                                  `${setting.label}: ${e.target.value}`,
                                  'info'
                                );
                              }
                            }}
                            style={{
                              width: '100%',
                              padding: '10px 12px',
                              background: theme === 'dark' ? '#0a0a0a' : '#fff',
                              border: `1px solid ${
                                theme === 'dark' ? '#1a1a1a' : '#ddd'
                              }`,
                              borderRadius: 8,
                              color: theme === 'dark' ? '#fff' : '#1a1a2e',
                              fontSize: '13px',
                              boxSizing: 'border-box' as const,
                              outline: 'none',
                              cursor: 'pointer',
                            }}
                          >
                            {setting.options.map((opt) => (
                              <option
                                key={opt}
                                value={opt}
                                style={{
                                  background:
                                    theme === 'dark' ? '#111' : '#fff',
                                  color: theme === 'dark' ? '#fff' : '#1a1a2e',
                                }}
                              >
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}

                      <div
                        style={{
                          padding: '12px',
                          background: theme === 'dark' ? '#0a0a0a' : '#f8f9fa',
                          borderRadius: 10,
                          border: `1px solid ${
                            theme === 'dark' ? '#1a1a1a' : '#e0e0e0'
                          }`,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 11,
                            color: theme === 'dark' ? '#444' : '#666',
                            marginBottom: 8,
                            fontWeight: 500,
                          }}
                        >
                          Keyboard Shortcuts
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: theme === 'dark' ? '#666' : '#555',
                            lineHeight: '2',
                          }}
                        >
                          <div>
                            <span
                              style={{
                                background:
                                  theme === 'dark' ? '#111' : '#e0e0e0',
                                padding: '2px 6px',
                                borderRadius: 4,
                              }}
                            >
                              Ctrl+Enter
                            </span>{' '}
                            Play/Pause
                          </div>
                          <div>
                            <span
                              style={{
                                background:
                                  theme === 'dark' ? '#111' : '#e0e0e0',
                                padding: '2px 6px',
                                borderRadius: 4,
                              }}
                            >
                              Ctrl+S
                            </span>{' '}
                            Save
                          </div>
                          <div>
                            <span
                              style={{
                                background:
                                  theme === 'dark' ? '#111' : '#e0e0e0',
                                padding: '2px 6px',
                                borderRadius: 4,
                              }}
                            >
                              Space
                            </span>{' '}
                            Play/Pause
                          </div>
                          <div>
                            <span
                              style={{
                                background:
                                  theme === 'dark' ? '#111' : '#e0e0e0',
                                padding: '2px 6px',
                                borderRadius: 4,
                              }}
                            >
                              Esc
                            </span>{' '}
                            Close
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* COMMUNITY TOOL */}
                  {activeTool === 'community' && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          padding: '16px',
                          background: theme === 'dark' ? '#0a0a0a' : '#f8f9fa',
                          borderRadius: '12px',
                          border: `1px solid ${
                            theme === 'dark' ? '#1a1a1a' : '#e0e0e0'
                          }`,
                          textAlign: 'center',
                        }}
                      >
                        <div style={{ fontSize: 32, marginBottom: 8 }}>◉</div>
                        <h4
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            marginBottom: 6,
                          }}
                        >
                          Manigist Community
                        </h4>
                        <p
                          style={{
                            fontSize: 12,
                            color: theme === 'dark' ? '#666' : '#555',
                            marginBottom: 12,
                          }}
                        >
                          Share animations, get feedback, collaborate
                        </p>
                        <button
                          onClick={() => {
                            window.open(
                              'https://discord.gg/manigist',
                              '_blank'
                            );
                            addToast('Opening Discord...', 'info');
                          }}
                          style={{
                            padding: '10px 16px',
                            background: '#5865F2',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            width: '100%',
                          }}
                        >
                          Join Discord →
                        </button>
                      </div>

                      <div>
                        <p
                          style={{
                            fontSize: 11,
                            color: theme === 'dark' ? '#444' : '#666',
                            marginBottom: 8,
                          }}
                        >
                          Trending
                        </p>
                        {[
                          'Epic Title Reveal',
                          'Particle Burst',
                          'Kinetic Type',
                          'Logo Animation',
                        ].map((item, i) => (
                          <div
                            key={item}
                            style={{
                              padding: '8px 12px',
                              background:
                                theme === 'dark' ? '#0a0a0a' : '#f8f9fa',
                              border: `1px solid ${
                                theme === 'dark' ? '#1a1a1a' : '#e0e0e0'
                              }`,
                              borderRadius: 8,
                              color: theme === 'dark' ? '#777' : '#666',
                              fontSize: 12,
                              cursor: 'pointer',
                              marginBottom: 6,
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                            onClick={() =>
                              addToast(`Viewing "${item}"`, 'info')
                            }
                          >
                            <span>{item}</span>
                            <span style={{ fontSize: 10, opacity: 0.7 }}>
                              {234 - i * 30}★
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TIMELINE TOOL */}
                  {activeTool === 'timeline' && (
                    <div style={{ fontSize: 12 }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: 10,
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 500,
                            color: theme === 'dark' ? '#888' : '#666',
                          }}
                        >
                          Keyframes
                        </span>
                        <button
                          style={{
                            fontSize: 10,
                            color: theme === 'dark' ? '#666' : '#555',
                            background: theme === 'dark' ? '#111' : '#f0f0f0',
                            border: `1px solid ${
                              theme === 'dark' ? '#222' : '#ddd'
                            }`,
                            borderRadius: 4,
                            padding: '2px 8px',
                            cursor: 'pointer',
                          }}
                          onClick={() =>
                            addToast(
                              `Keyframe added at ${currentTime.toFixed(1)}s`,
                              'success'
                            )
                          }
                        >
                          + Add
                        </button>
                      </div>
                      {['0s', '1s', '2s', '3s', '4s', '5s'].map((t, i) => (
                        <div
                          key={t}
                          style={{
                            padding: '6px 10px',
                            background:
                              Math.abs(currentTime - i) < 0.3
                                ? theme === 'dark'
                                  ? '#1a1a1a'
                                  : '#e0e0e0'
                                : theme === 'dark'
                                ? '#0a0a0a'
                                : '#f8f9fa',
                            border: `1px solid ${
                              Math.abs(currentTime - i) < 0.3
                                ? theme === 'dark'
                                  ? '#333'
                                  : '#ccc'
                                : theme === 'dark'
                                ? '#1a1a1a'
                                : '#e0e0e0'
                            }`,
                            borderRadius: 6,
                            marginBottom: 4,
                            fontFamily: 'monospace',
                            color:
                              Math.abs(currentTime - i) < 0.3
                                ? theme === 'dark'
                                  ? '#fff'
                                  : '#1a1a2e'
                                : theme === 'dark'
                                ? '#777'
                                : '#666',
                            fontSize: 11,
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                          onClick={() => setCurrentTime(i)}
                        >
                          <span>{t}</span>
                          <span style={{ opacity: 0.7 }}>
                            {
                              [
                                'Start',
                                'Reveal',
                                'Peak',
                                'Transition',
                                'Fade',
                                'End',
                              ][i]
                            }
                          </span>
                        </div>
                      ))}

                      {/* Mini Timeline */}
                      <div
                        style={{
                          marginTop: 16,
                          padding: 12,
                          background: theme === 'dark' ? '#0a0a0a' : '#f8f9fa',
                          borderRadius: 10,
                          border: `1px solid ${
                            theme === 'dark' ? '#1a1a1a' : '#e0e0e0'
                          }`,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 10,
                            color: theme === 'dark' ? '#444' : '#666',
                            marginBottom: 8,
                          }}
                        >
                          Timeline
                        </div>
                        <div
                          style={{
                            height: 40,
                            background: theme === 'dark' ? '#111' : '#e0e0e0',
                            borderRadius: 6,
                            position: 'relative',
                            overflow: 'hidden',
                            cursor: 'pointer',
                          }}
                          onClick={(e) => {
                            const rect = (
                              e.currentTarget as HTMLElement
                            ).getBoundingClientRect();
                            const percent =
                              (e.clientX - rect.left) / rect.width;
                            setCurrentTime(
                              Math.max(0, Math.min(5, percent * 5))
                            );
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              left: `${progress * 100}%`,
                              width: 2,
                              height: '80%',
                              background: '#fff',
                              zIndex: 2,
                            }}
                          />
                          {[0, 20, 40, 60, 80, 100].map((pos, i) => (
                            <div
                              key={i}
                              style={{
                                position: 'absolute',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                                left: `${pos}%`,
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                background:
                                  i === 0 || i === 5
                                    ? '#fff'
                                    : theme === 'dark'
                                    ? '#444'
                                    : '#999',
                                border: `2px solid ${
                                  theme === 'dark' ? '#000' : '#fff'
                                }`,
                              }}
                            />
                          ))}
                          <div
                            style={{
                              position: 'absolute',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              left: 0,
                              width: `${progress * 100}%`,
                              height: 3,
                              background: 'linear-gradient(90deg, #fff, #aaa)',
                              borderRadius: 2,
                            }}
                          />
                        </div>
                        <div
                          style={{
                            fontSize: 9,
                            color: theme === 'dark' ? '#555' : '#666',
                            marginTop: 4,
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <span>0s</span>
                          <span>{currentTime.toFixed(1)}s</span>
                          <span>5s</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Resize Handle */}
              <div
                onMouseDown={() => setIsResizing('panel')}
                style={s.resizeHandle}
              />
            </>
          )}

          {/* Code Editor */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              borderRight: `1px solid ${theme === 'dark' ? '#111' : '#e0e0e0'}`,
              background: theme === 'dark' ? '#050505' : '#fff',
              minWidth: 300,
            }}
          >
            <div
              style={{
                padding: '8px 16px',
                borderBottom: `1px solid ${
                  theme === 'dark' ? '#111' : '#e0e0e0'
                }`,
                fontSize: 12,
                color: theme === 'dark' ? '#444' : '#666',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: theme === 'dark' ? '#080808' : '#f8f9fa',
              }}
            >
              <span style={{ fontFamily: 'monospace' }}>{activeTab}</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={saveProject} style={s.btnSm}>
                  💾
                </button>
                <button
                  onClick={() => {
                    setCode(activeProject?.code || '');
                    addToast('Code reset', 'info');
                  }}
                  style={s.btnSm}
                >
                  ⟲
                </button>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
              <div
                style={{
                  width: 48,
                  padding: '16px 8px',
                  background: theme === 'dark' ? '#030303' : '#f8f9fa',
                  borderRight: `1px solid ${
                    theme === 'dark' ? '#111' : '#e0e0e0'
                  }`,
                  fontFamily: 'monospace',
                  fontSize: 12,
                  color: theme === 'dark' ? '#222' : '#999',
                  textAlign: 'right' as const,
                  userSelect: 'none',
                  flexShrink: 0,
                }}
              >
                {code.split('\n').map((_, i) => {
                  const line = code.split('\n')[i];
                  const isKeyframe = line?.includes('keyframe');
                  const isComment = line?.trim().startsWith('//');
                  return (
                    <div
                      key={i}
                      style={{
                        color: isComment
                          ? theme === 'dark'
                            ? '#444'
                            : '#999'
                          : isKeyframe
                          ? '#4ade80'
                          : theme === 'dark'
                          ? '#222'
                          : '#999',
                        fontWeight: isKeyframe ? 600 : 400,
                        cursor: isKeyframe ? 'pointer' : 'default',
                      }}
                      onClick={() => {
                        if (isKeyframe) {
                          const timeMatch = line?.match(/t=(\d+\.?\d*)s/);
                          if (timeMatch)
                            setCurrentTime(parseFloat(timeMatch[1]));
                        }
                      }}
                    >
                      {i + 1}
                    </div>
                  );
                })}
              </div>
              <textarea
                ref={codeEditorRef}
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setIsEditing(true);
                }}
                spellCheck={false}
                style={s.textarea}
                onClick={(e) => {
                  const textarea = e.currentTarget;
                  const start = textarea.selectionStart;
                  const selected = code.substring(start, textarea.selectionEnd);
                  if (selected.includes('keyframe')) {
                    addToast(
                      'Keyframe selected - use timeline to edit',
                      'info'
                    );
                  }
                }}
              />
            </div>
            <div
              style={{
                height: 32,
                borderTop: `1px solid ${theme === 'dark' ? '#111' : '#e0e0e0'}`,
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                gap: 12,
                fontSize: 11,
                color: theme === 'dark' ? '#444' : '#666',
                background: theme === 'dark' ? '#080808' : '#f8f9fa',
              }}
            >
              <span
                style={{
                  color: theme === 'dark' ? '#666' : '#555',
                  fontFamily: 'monospace',
                }}
              >
                Anitix
              </span>
              <span>·</span>
              <span>{code.split('\n').length} lines</span>
              <span>·</span>
              <span
                style={{
                  color: isPlaying
                    ? '#4ade80'
                    : theme === 'dark'
                    ? '#666'
                    : '#555',
                }}
              >
                {isPlaying ? '● Playing' : '○ Ready'}
              </span>
              <span style={{ marginLeft: 'auto', fontFamily: 'monospace' }}>
                {currentTime.toFixed(2)}s / {activeProject?.duration || '5.00s'}
              </span>
            </div>
          </div>

          {/* Preview */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              background: theme === 'dark' ? '#030303' : '#f8f9fa',
              minWidth: 300,
            }}
          >
            <div
              style={{
                padding: '8px 16px',
                borderBottom: `1px solid ${
                  theme === 'dark' ? '#111' : '#e0e0e0'
                }`,
                fontSize: 12,
                color: theme === 'dark' ? '#444' : '#666',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: theme === 'dark' ? '#080808' : '#f8f9fa',
              }}
            >
              <div style={{ ...s.flex, gap: 8 }}>
                <span>Preview</span>
                <button
                  onClick={() =>
                    setPreviewMode((p) => (p === 'canvas' ? 'code' : 'canvas'))
                  }
                  style={{ ...s.btnSm, padding: '2px 8px', fontSize: 10 }}
                >
                  {previewMode === 'canvas' ? 'Show Code' : 'Show Preview'}
                </button>
              </div>
              <span>
                {activeProject?.resolution || '1920×1080'} ·{' '}
                {activeProject?.fps || '60'}fps
              </span>
            </div>

            {previewMode === 'canvas' ? (
              <>
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: theme === 'dark' ? '#000' : '#fff',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Grid Background */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `
                      linear-gradient(rgba(${
                        theme === 'dark' ? '30,30,30' : '220,220,220'
                      }, 0.5) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(${
                        theme === 'dark' ? '30,30,30' : '220,220,220'
                      }, 0.5) 1px, transparent 1px)
                    `,
                      backgroundSize: '40px 40px',
                    }}
                  />

                  {/* Demo-Specific Previews */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      textAlign: 'center' as const,
                    }}
                  >
                    {/* Ball Bouncing */}
                    {activeProject?.id === 'demo-ball' && (
                      <div
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background:
                            'linear-gradient(135deg, #ff6b6b, #ee5a5a)',
                          margin: '0 auto',
                          border: '2px solid #fff',
                          transform: `translateY(${
                            getPreviewStyles.ballY - 400
                          }px) scale(${getPreviewStyles.ballScale})`,
                          transition: 'transform 0.1s linear',
                          boxShadow: '0 10px 30px rgba(255,107,107,0.4)',
                        }}
                      />
                    )}

                    {/* Gate Opening */}
                    {activeProject?.id === 'demo-gate' && (
                      <>
                        <div
                          style={{
                            position: 'absolute',
                            left: '45%',
                            top: '30%',
                            width: 80,
                            height: 200,
                            background: '#4a4a6a',
                            borderRadius: '4px',
                            border: '2px solid #7a7a9a',
                            transformOrigin: 'right center',
                            transform: `rotate(${getPreviewStyles.gateLeftRotation}deg)`,
                            transition: 'transform 0.1s linear',
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            right: '45%',
                            top: '30%',
                            width: 80,
                            height: 200,
                            background: '#4a4a6a',
                            borderRadius: '4px',
                            border: '2px solid #7a7a9a',
                            transformOrigin: 'left center',
                            transform: `rotate(${getPreviewStyles.gateRightRotation}deg)`,
                            transition: 'transform 0.1s linear',
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 200,
                            height: 40,
                            background: `linear-gradient(90deg, transparent, #ffd700, transparent)`,
                            opacity: getPreviewStyles.lightOpacity,
                            borderRadius: '20px',
                            transition: 'opacity 0.1s linear',
                          }}
                        />
                      </>
                    )}

                    {/* Star Twinkling */}
                    {activeProject?.id === 'demo-star' && (
                      <>
                        {getPreviewStyles.starOpacity.map((opacity, i) => (
                          <div
                            key={i}
                            style={{
                              position: 'absolute',
                              width: `${2 + (i % 3)}px`,
                              height: `${2 + (i % 3)}px`,
                              borderRadius: '50%',
                              background: '#fff',
                              left: `${((i * 47) % 90) + 5}%`,
                              top: `${((i * 31) % 80) + 10}%`,
                              opacity: opacity,
                              transition: 'opacity 0.3s ease-in-out',
                            }}
                          />
                        ))}
                      </>
                    )}

                    {/* Bird Flying */}
                    {activeProject?.id === 'demo-bird' && (
                      <div
                        style={{
                          position: 'absolute',
                          left: `${
                            ((getPreviewStyles.birdX + 50) / 1920) * 100
                          }%`,
                          top: `${(getPreviewStyles.birdY / 1080) * 100}%`,
                          transform: `rotate(${getPreviewStyles.birdRotation}deg)`,
                          transition: 'all 0.1s linear',
                          fontSize: 24,
                        }}
                      >
                        🐦
                      </div>
                    )}

                    {/* Text Reveal */}
                    {activeProject?.id === 'demo-text' && (
                      <div
                        style={{
                          fontSize: 32,
                          fontWeight: 800,
                          background: 'linear-gradient(135deg, #fff, #aaa)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          opacity: getPreviewStyles.textOpacity,
                          transition: 'opacity 0.2s',
                          letterSpacing: 4,
                        }}
                      >
                        MANIGIST
                      </div>
                    )}

                    {/* Particles */}
                    {activeProject?.id === 'demo-particles' && (
                      <>
                        {getPreviewStyles.particles.map((p, i) => (
                          <div
                            key={i}
                            style={{
                              position: 'absolute',
                              width: `${4 + (i % 4)}px`,
                              height: `${4 + (i % 4)}px`,
                              borderRadius: '50%',
                              background: `hsl(${i * 30}, 80%, 60%)`,
                              left: `calc(50% + ${p.x}px)`,
                              top: `calc(50% + ${p.y}px)`,
                              opacity: p.opacity,
                              transform: `scale(${p.scale})`,
                              transition: 'all 0.1s linear',
                            }}
                          />
                        ))}
                      </>
                    )}

                    {/* Logo Spin */}
                    {activeProject?.id === 'demo-logo' && (
                      <div
                        style={{
                          width: 120,
                          height: 120,
                          borderRadius: '50%',
                          border: `4px solid transparent`,
                          borderTop: `4px solid #ff6b6b`,
                          borderRight: `4px solid #4ecdc4`,
                          borderBottom: `4px solid #45b7d1`,
                          borderLeft: `4px solid #96ceb4`,
                          transform: `rotate(${getPreviewStyles.logoRotation}deg)`,
                          transition: 'transform 0.1s linear',
                          position: 'relative',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            inset: '8px',
                            borderRadius: '50%',
                            background: theme === 'dark' ? '#000' : '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 24,
                            fontWeight: 300,
                          }}
                        >
                          ∑
                        </div>
                      </div>
                    )}

                    {/* Wave */}
                    {activeProject?.id === 'demo-wave' && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '20%',
                          left: 0,
                          right: 0,
                          height: 2,
                          background: 'rgba(255,255,255,0.6)',
                          borderRadius: 2,
                          transform: `translateX(-${getPreviewStyles.waveOffset}px)`,
                          transition: 'transform 0.1s linear',
                        }}
                      />
                    )}

                    {/* Loader */}
                    {activeProject?.id === 'demo-loader' && (
                      <div
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: '50%',
                          border: `6px solid ${
                            theme === 'dark' ? '#222' : '#e0e0e0'
                          }`,
                          borderTop: `6px solid #6366f1`,
                          borderRight: `6px solid #8b5cf6`,
                          transform: `rotate(${getPreviewStyles.loaderRotation}deg)`,
                          transition: 'transform 0.1s linear',
                          position: 'relative',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: -8,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            background: '#fff',
                          }}
                        />
                      </div>
                    )}

                    {/* Transition */}
                    {activeProject?.id === 'demo-transition' && (
                      <>
                        <div
                          style={{
                            fontSize: 24,
                            fontWeight: 600,
                            color: '#ff6b6b',
                            opacity: getPreviewStyles.sceneAOpacity,
                            transition: 'opacity 0.2s',
                            marginBottom: 20,
                          }}
                        >
                          SCENE A
                        </div>
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background:
                              'linear-gradient(90deg, #111, #2a2a4a, #111)',
                            transform: `translateX(${getPreviewStyles.wipeX}px)`,
                            transition: 'transform 0.1s linear',
                          }}
                        />
                        <div
                          style={{
                            fontSize: 24,
                            fontWeight: 600,
                            color: '#4ecdc4',
                            opacity: getPreviewStyles.sceneBOpacity,
                            transition: 'opacity 0.2s',
                            marginTop: 20,
                          }}
                        >
                          SCENE B
                        </div>
                      </>
                    )}

                    {/* Default Preview */}
                    {!activeProject?.id?.startsWith('demo-') && (
                      <div
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #fff, #ccc)',
                          margin: '0 auto',
                          transform: `translateX(${Math.min(
                            200,
                            progress * 400 - 200
                          )}px)`,
                          transition: 'transform 0.1s linear',
                          boxShadow: '0 0 40px rgba(255,255,255,0.2)',
                        }}
                      />
                    )}
                  </div>

                  {/* Watermark */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 16,
                      right: 16,
                      fontSize: 10,
                      color: theme === 'dark' ? '#222' : '#ccc',
                      fontFamily: 'monospace',
                      background: theme === 'dark' ? '#0a0a0a' : '#f0f0f0',
                      padding: '4px 8px',
                      borderRadius: 4,
                    }}
                  >
                    ∑ anigist.dev
                  </div>
                </div>

                {/* Playback Controls */}
                <div
                  style={{
                    height: 60,
                    borderTop: `1px solid ${
                      theme === 'dark' ? '#111' : '#e0e0e0'
                    }`,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    gap: 12,
                    background: theme === 'dark' ? '#080808' : '#f8f9fa',
                  }}
                >
                  <button
                    onClick={() => {
                      setCurrentTime(0);
                      setIsPlaying(false);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: theme === 'dark' ? '#666' : '#555',
                      fontSize: 16,
                      cursor: 'pointer',
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    ⟲
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: isPlaying
                        ? '#e63946'
                        : theme === 'dark'
                        ? '#fff'
                        : '#1a1a2e',
                      border: 'none',
                      color: isPlaying
                        ? '#fff'
                        : theme === 'dark'
                        ? '#000'
                        : '#fff',
                      fontSize: 16,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}
                  >
                    {isPlaying ? '⏸' : '▶'}
                  </button>

                  {/* Timeline */}
                  <div
                    style={{
                      flex: 1,
                      height: 4,
                      background: theme === 'dark' ? '#1a1a1a' : '#e0e0e0',
                      borderRadius: 2,
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                    onClick={(e) => {
                      const rect = (
                        e.currentTarget as HTMLElement
                      ).getBoundingClientRect();
                      const percent = (e.clientX - rect.left) / rect.width;
                      setCurrentTime(Math.max(0, Math.min(5, percent * 5)));
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${progress * 100}%`,
                        background: 'linear-gradient(90deg, #fff, #aaa)',
                        borderRadius: 2,
                        transition: 'width 0.1s linear',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: `${progress * 100}%`,
                        transform: 'translate(-50%, -50%)',
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: '#fff',
                        border: `2px solid ${
                          theme === 'dark' ? '#000' : '#fff'
                        }`,
                        transition: 'left 0.1s linear',
                      }}
                    />
                  </div>

                  <span
                    style={{
                      fontSize: 11,
                      color: theme === 'dark' ? '#555' : '#666',
                      fontFamily: 'monospace',
                      minWidth: 70,
                      textAlign: 'right' as const,
                    }}
                  >
                    {currentTime.toFixed(2)}s
                  </span>

                  {/* Speed Control */}
                  <select
                    value={playbackSpeed}
                    onChange={(e) =>
                      setPlaybackSpeed(parseFloat(e.target.value))
                    }
                    style={{
                      padding: '4px 8px',
                      background: theme === 'dark' ? '#111' : '#fff',
                      border: `1px solid ${theme === 'dark' ? '#222' : '#ddd'}`,
                      borderRadius: 6,
                      color: theme === 'dark' ? '#fff' : '#1a1a2e',
                      fontSize: 11,
                      cursor: 'pointer',
                    }}
                  >
                    {[0.5, 1, 1.5, 2].map((speed) => (
                      <option
                        key={speed}
                        value={speed}
                        style={{
                          background: theme === 'dark' ? '#111' : '#fff',
                        }}
                      >
                        {speed}x
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              // Code Preview Mode
              <div
                style={{
                  flex: 1,
                  padding: 16,
                  fontFamily: 'monospace',
                  fontSize: 12,
                  lineHeight: '1.6',
                  color: theme === 'dark' ? '#aaa' : '#333',
                  background: theme === 'dark' ? '#030303' : '#fff',
                  overflow: 'auto',
                }}
              >
                <div
                  style={{
                    color: theme === 'dark' ? '#444' : '#666',
                    marginBottom: 12,
                  }}
                >
                  // Live Code Preview · Anitix Language
                </div>
                {code.split('\n').map((line, i) => {
                  let color = theme === 'dark' ? '#ccc' : '#333';
                  if (line.trim().startsWith('//'))
                    color = theme === 'dark' ? '#444' : '#666';
                  else if (
                    line.includes('∑') ||
                    line.includes('scene') ||
                    line.includes('object') ||
                    line.includes('keyframe')
                  )
                    color = theme === 'dark' ? '#fff' : '#1a1a2e';
                  else if (line.includes('='))
                    color = theme === 'dark' ? '#888' : '#555';
                  else if (line.includes('#')) color = '#4ade80';
                  else if (line.includes('t=')) color = '#60a5fa';

                  return (
                    <div key={i} style={{ color, whiteSpace: 'pre' }}>
                      <span
                        style={{
                          color: theme === 'dark' ? '#333' : '#ccc',
                          marginRight: 16,
                          userSelect: 'none',
                        }}
                      >
                        {String(i + 1).padStart(3)}
                      </span>
                      {line}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── LANDING PAGE ──
  return (
    <main style={{ ...s.base, ...s.landing }}>
      {/* Navigation */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 48px',
          borderBottom: `1px solid ${theme === 'dark' ? '#111' : '#e0e0e0'}`,
          background: theme === 'dark' ? '#050505' : '#fff',
          position: 'sticky' as const,
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ ...s.flex, gap: 8 }}>
          <span style={{ fontSize: 24, fontWeight: 300 }}>∑</span>
          <span style={{ fontSize: 20, fontWeight: 800 }}>
            <span>Ani</span>
            <span style={{ opacity: 0.6 }}>gist</span>
          </span>
          <span
            style={{
              fontSize: 10,
              background: theme === 'dark' ? '#1a1a1a' : '#e0e0e0',
              padding: '2px 8px',
              borderRadius: 20,
              opacity: 0.7,
            }}
          >
            Pro
          </span>
        </div>

        <div style={{ ...s.flex, gap: 24, fontSize: 14, opacity: 0.8 }}>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => addToast('Documentation', 'info')}
          >
            Docs
          </span>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => {
              window.open('https://discord.gg/manigist', '_blank');
              addToast('Community', 'info');
            }}
          >
            Community
          </span>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => addToast('Gallery', 'info')}
          >
            Gallery
          </span>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => addToast('Free forever ✓', 'success')}
          >
            Pricing
          </span>
        </div>

        <div style={{ ...s.flex, gap: 12 }}>
          {currentUser ? (
            <>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${
                    theme === 'dark' ? '#222' : '#ddd'
                  }, ${theme === 'dark' ? '#111' : '#bbb'})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 15,
                  fontWeight: 600,
                  border: `1px solid ${theme === 'dark' ? '#222' : '#ddd'}`,
                  cursor: 'pointer',
                }}
                title={currentUser.username}
              >
                {currentUser.avatar}
              </div>
              <button onClick={() => setActiveView('editor')} style={s.btn}>
                Editor →
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setView('auth')} style={s.btnSec}>
                Sign in
              </button>
              <button
                onClick={() => {
                  setView('auth');
                  setAuthMode('signup');
                  addToast('Create free account', 'info');
                }}
                style={s.btn}
              >
                Start free →
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '80px 48px 60px',
          textAlign: 'center',
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            background: theme === 'dark' ? '#111' : '#f0f0f0',
            border: `1px solid ${theme === 'dark' ? '#222' : '#ddd'}`,
            borderRadius: 100,
            fontSize: 12,
            opacity: 0.9,
            marginBottom: 32,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: theme === 'dark' ? '#fff' : '#1a1a2e',
              display: 'inline-block',
            }}
          />
          Free forever · No software · Export any length
        </div>

        <h1
          style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: 24,
            maxWidth: 900,
          }}
        >
          <span>∑ Ani</span>
          <span style={{ opacity: 0.6 }}>gist</span>
          <br />
          <span
            style={{
              fontSize: 32,
              fontWeight: 300,
              opacity: 0.7,
              display: 'block',
              marginTop: 12,
            }}
          >
            write code. see it move. create magic.
          </span>
        </h1>

        <p
          style={{
            fontSize: 18,
            opacity: 0.8,
            maxWidth: 560,
            lineHeight: 1.7,
            marginBottom: 40,
          }}
        >
          The free browser-based animation studio. Type in{' '}
          <span style={{ fontFamily: 'monospace', opacity: 0.9 }}>Anitix</span>{' '}
          — our LaTeX-like language for cinematic motion — and watch stunning
          animations render instantly. ✦
        </p>

        <div style={{ ...s.flex, gap: 16, marginBottom: 60 }}>
          <button
            onClick={() => {
              currentUser ? setActiveView('editor') : setView('auth');
            }}
            style={{ ...s.btn, padding: '14px 36px', fontSize: 16 }}
          >
            {currentUser ? 'Open Editor →' : 'Start animating free →'}
          </button>
          <button
            onClick={() => setView('auth')}
            style={{ ...s.btnSec, padding: '14px 36px', fontSize: 16 }}
          >
            View gallery
          </button>
        </div>

        {/* Projects Grid (when signed in) */}
        {currentUser && (
          <div style={{ width: '100%', maxWidth: 1100, marginBottom: 40 }}>
            <div
              style={{
                ...s.flex,
                justifyContent: 'space-between',
                marginBottom: 16,
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              <div style={{ ...s.flex, gap: 8 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600 }}>Your Projects</h3>
                <span
                  style={{
                    fontSize: 12,
                    opacity: 0.7,
                    background: theme === 'dark' ? '#1a1a1a' : '#e0e0e0',
                    padding: '2px 8px',
                    borderRadius: 20,
                  }}
                >
                  {projects.filter((p) => !p.isTemplate).length}
                </span>
              </div>
              <div style={{ ...s.flex, gap: 8 }}>
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    ...s.input,
                    width: 200,
                    padding: '6px 12px',
                    fontSize: 13,
                    marginBottom: 0,
                  }}
                />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  style={{
                    padding: '6px 12px',
                    background: theme === 'dark' ? '#111' : '#fff',
                    border: `1px solid ${theme === 'dark' ? '#222' : '#ddd'}`,
                    borderRadius: 8,
                    color: theme === 'dark' ? '#fff' : '#1a1a2e',
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  <option value="all">All</option>
                  <option value="motion">Motion</option>
                  <option value="text">Text</option>
                  <option value="effect">Effects</option>
                  <option value="transition">Transitions</option>
                  <option value="ui">UI</option>
                </select>
                <button onClick={() => createProject()} style={s.btnSm}>
                  + New
                </button>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 12,
              }}
            >
              {filteredProjects.map((p) => (
                <div
                  key={p.id}
                  style={{
                    ...s.projectCard,
                    border:
                      activeProject?.id === p.id
                        ? `2px solid ${
                            theme === 'dark' ? '#4ade80' : '#4ade80'
                          }`
                        : undefined,
                  }}
                  onClick={() => {
                    setActiveProject(p);
                    setCode(p.code);
                    setActiveView('editor');
                    addToast(`Opened ${p.name}`, 'info');
                  }}
                  onMouseEnter={(e) => {
                    if (activeProject?.id !== p.id) {
                      e.currentTarget.style.borderColor =
                        theme === 'dark' ? '#333' : '#ccc';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeProject?.id !== p.id) {
                      e.currentTarget.style.borderColor =
                        theme === 'dark' ? '#1a1a1a' : '#e0e0e0';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <div
                    style={{
                      ...s.flex,
                      justifyContent: 'space-between',
                      marginBottom: 8,
                    }}
                  >
                    {editingProject?.id === p.id ? (
                      <input
                        value={editingProject.name}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            name: e.target.value,
                          })
                        }
                        onBlur={() => {
                          if (editingProject)
                            renameProject(
                              editingProject.id,
                              editingProject.name
                            );
                          setEditingProject(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && editingProject) {
                            renameProject(
                              editingProject.id,
                              editingProject.name
                            );
                            setEditingProject(null);
                          }
                        }}
                        style={{
                          background: theme === 'dark' ? '#111' : '#fff',
                          border: `1px solid ${
                            theme === 'dark' ? '#333' : '#ccc'
                          }`,
                          borderRadius: 4,
                          padding: '4px 8px',
                          color: theme === 'dark' ? '#fff' : '#1a1a2e',
                          fontSize: 14,
                          width: '70%',
                          outline: 'none',
                        }}
                        autoFocus
                      />
                    ) : (
                      <span style={{ fontWeight: 500 }}>
                        {p.thumbnail} {p.name}
                        {p.isTemplate && (
                          <span style={{ opacity: 0.6 }}> ✦</span>
                        )}
                      </span>
                    )}
                    {!p.isTemplate && (
                      <div style={{ ...s.flex, gap: 4 }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingProject({ id: p.id, name: p.name });
                          }}
                          style={{ ...s.btnSm, padding: '4px 8px' }}
                        >
                          ✎
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteProject(p.id);
                          }}
                          style={{
                            ...s.btnSm,
                            padding: '4px 8px',
                            color: '#e63946',
                          }}
                        >
                          🗑
                        </button>
                      </div>
                    )}
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      opacity: 0.7,
                      marginBottom: 8,
                      minHeight: 40,
                    }}
                  >
                    {p.code.split('\n')[0]?.slice(0, 50)}...
                  </p>
                  <div
                    style={{
                      fontSize: 11,
                      opacity: 0.6,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>
                      {p.duration} · {p.resolution}
                    </span>
                    <span>{p.modified}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Demo Templates Preview */}
        {!currentUser && (
          <div style={{ width: '100%', maxWidth: 1100, marginBottom: 40 }}>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 600,
                marginBottom: 16,
                textAlign: 'left',
              }}
            >
              Try a demo template →
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 12,
              }}
            >
              {DEMO_TEMPLATES.map((template) => (
                <div
                  key={template.id}
                  style={{
                    padding: '16px',
                    background: theme === 'dark' ? '#0a0a0a' : '#fff',
                    border: `1px solid ${
                      theme === 'dark' ? '#1a1a1a' : '#e0e0e0'
                    }`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'center' as const,
                    transition: 'all 0.2s',
                  }}
                  onClick={() => {
                    createProject(template);
                    setActiveView('editor');
                    addToast(`Loaded "${template.name}" demo`, 'success');
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      theme === 'dark' ? '#333' : '#ccc';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      theme === 'dark' ? '#1a1a1a' : '#e0e0e0';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 8 }}>
                    {template.thumbnail}
                  </div>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>
                    {template.name}
                  </div>
                  <div style={{ fontSize: 11, opacity: 0.7 }}>
                    {template.category}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Preview Card */}
        <div
          onClick={() => {
            currentUser ? setActiveView('editor') : setView('auth');
          }}
          style={{
            width: '100%',
            maxWidth: 1100,
            borderRadius: 20,
            border: `1px solid ${theme === 'dark' ? '#1a1a1a' : '#e0e0e0'}`,
            overflow: 'hidden',
            background: theme === 'dark' ? '#0a0a0a' : '#fff',
            cursor: 'pointer',
            boxShadow: `0 25px 80px ${
              theme === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'
            }`,
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = `0 35px 100px ${
              theme === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.15)'
            }`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 25px 80px ${
              theme === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'
            }`;
          }}
        >
          {/* Window Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 24px',
              borderBottom: `1px solid ${
                theme === 'dark' ? '#1a1a1a' : '#e0e0e0'
              }`,
              background: theme === 'dark' ? '#080808' : '#f8f9fa',
            }}
          >
            <div style={{ ...s.flex, gap: 6 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#ff5f57',
                }}
              />
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#ffbd2e',
                }}
              />
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#28c940',
                }}
              />
            </div>
            <span
              style={{
                marginLeft: 16,
                fontSize: 12,
                opacity: 0.7,
                fontFamily: 'monospace',
              }}
            >
              manigist · attack_intro.mg
            </span>
            <span
              style={{
                marginLeft: 'auto',
                fontSize: 11,
                opacity: 0.6,
                background: theme === 'dark' ? '#111' : '#e0e0e0',
                padding: '2px 10px',
                borderRadius: 20,
              }}
            >
              click to open editor →
            </span>
          </div>

          {/* Editor Preview */}
          <div style={{ display: 'flex', height: 400 }}>
            {/* Tools Sidebar */}
            <div
              style={{
                width: 64,
                borderRight: `1px solid ${
                  theme === 'dark' ? '#1a1a1a' : '#e0e0e0'
                }`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px 0',
                gap: 12,
                background: theme === 'dark' ? '#050505' : '#fff',
              }}
            >
              {['⌨', '◈', '◎', '✦', '↗'].map((icon, i) => (
                <div
                  key={i}
                  style={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                    background:
                      i === 0
                        ? theme === 'dark'
                          ? '#1a1a1a'
                          : '#e0e0e0'
                        : 'transparent',
                    color:
                      i === 0
                        ? theme === 'dark'
                          ? '#fff'
                          : '#1a1a2e'
                        : theme === 'dark'
                        ? '#444'
                        : '#666',
                    fontSize: 18,
                    border: `1px solid ${
                      i === 0
                        ? theme === 'dark'
                          ? '#333'
                          : '#ccc'
                        : 'transparent'
                    }`,
                  }}
                >
                  {icon}
                </div>
              ))}
            </div>

            {/* Code Area */}
            <div
              style={{
                flex: 1,
                padding: 24,
                fontFamily: 'monospace',
                fontSize: 13,
                lineHeight: '1.8',
                borderRight: `1px solid ${
                  theme === 'dark' ? '#1a1a1a' : '#e0e0e0'
                }`,
                color: theme === 'dark' ? '#b0b0b0' : '#333',
                background: theme === 'dark' ? '#030303' : '#fff',
              }}
            >
              <div style={{ opacity: 0.6, marginBottom: 12, fontSize: 11 }}>
                // Anitix Language · Cinematic Animation
              </div>
              <div>
                <span style={{ fontWeight: 600 }}>∑ scene</span>{' '}
                <span style={{ opacity: 0.7 }}>attack_intro</span>
              </div>
              <div style={{ paddingLeft: 20, opacity: 0.8 }}>
                <div>
                  duration = <span style={{ color: '#4ade80' }}>5s</span>
                </div>
                <div>
                  resolution ={' '}
                  <span style={{ color: '#4ade80' }}>1920x1080</span>
                </div>
              </div>
              <div style={{ marginTop: 16 }}>
                <div>
                  <span style={{ fontWeight: 600 }}>object</span>{' '}
                  <span style={{ opacity: 0.7 }}>titan_shadow</span>
                </div>
                <div style={{ paddingLeft: 20, opacity: 0.8 }}>
                  <div>
                    type = <span style={{ color: '#4ade80' }}>path</span>
                  </div>
                </div>
                <div style={{ paddingLeft: 20, marginTop: 8, opacity: 0.7 }}>
                  <div>
                    keyframe t=<span style={{ color: '#4ade80' }}>0s</span>{' '}
                    draw=<span style={{ color: '#4ade80' }}>0%</span>
                  </div>
                  <div>
                    keyframe t=<span style={{ color: '#4ade80' }}>2s</span>{' '}
                    draw=<span style={{ color: '#4ade80' }}>100%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Area */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: theme === 'dark' ? '#000' : '#f8f9fa',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `radial-gradient(circle, ${
                    theme === 'dark' ? '#1a1a1a' : '#e0e0e0'
                  } 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }}
              />
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  textAlign: 'center' as const,
                }}
              >
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    letterSpacing: 5,
                    marginBottom: 16,
                    animation: 'titleReveal 2.5s ease-out forwards',
                    opacity: 0,
                    transform: 'translateY(20px)',
                  }}
                >
                  MANIGIST
                </div>
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #fff, #ccc)',
                    margin: '0 auto',
                    animation: 'circleMove 3s ease-in-out infinite',
                    boxShadow: `0 0 30px ${
                      theme === 'dark'
                        ? 'rgba(255,255,255,0.2)'
                        : 'rgba(0,0,0,0.1)'
                    }`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        style={{
          padding: '60px 48px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          background: theme === 'dark' ? '#0a0a0a' : '#f0f0f0',
          borderTop: `1px solid ${theme === 'dark' ? '#111' : '#e0e0e0'}`,
        }}
      >
        {[
          {
            icon: '∑',
            title: 'Anitix Language',
            desc: 'LaTeX-like syntax for animations. Simple, readable, powerful. No complex UI to learn.',
          },
          {
            icon: '✦',
            title: 'Cinematic Quality',
            desc: 'Industry-grade rendering with smooth easing, particles, and effects. Attack on Titan level motion.',
          },
          {
            icon: '∞',
            title: 'Free Forever',
            desc: 'Export 5 seconds or 5 hours. MP4, WebM, GIF, Lottie. No watermarks. No paywalls. Ever.',
          },
        ].map((f, i) => (
          <div
            key={i}
            style={{
              padding: '40px 32px',
              background: theme === 'dark' ? '#000' : '#fff',
              borderRight:
                i < 2
                  ? `1px solid ${theme === 'dark' ? '#111' : '#e0e0e0'}`
                  : 'none',
              borderBottom: `1px solid ${
                theme === 'dark' ? '#111' : '#e0e0e0'
              }`,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                theme === 'dark' ? '#080808' : '#f8f9fa';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                theme === 'dark' ? '#000' : '#fff';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div
              style={{
                fontSize: 32,
                marginBottom: 20,
                background: `linear-gradient(135deg, ${
                  theme === 'dark' ? '#fff' : '#1a1a2e'
                }, ${theme === 'dark' ? '#aaa' : '#666'})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 300,
              }}
            >
              {f.icon}
            </div>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              {f.title}
            </h3>
            <p style={{ fontSize: 14, opacity: 0.8, lineHeight: 1.7 }}>
              {f.desc}
            </p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section
        style={{
          padding: '80px 48px',
          textAlign: 'center',
          background: `linear-gradient(180deg, ${
            theme === 'dark' ? '#000' : '#fff'
          }, ${theme === 'dark' ? '#0a0a0a' : '#f8f9fa'})`,
          borderTop: `1px solid ${theme === 'dark' ? '#111' : '#e0e0e0'}`,
        }}
      >
        <h2
          style={{
            fontSize: 42,
            fontWeight: 800,
            marginBottom: 24,
            background: `linear-gradient(135deg, ${
              theme === 'dark' ? '#fff' : '#1a1a2e'
            }, ${theme === 'dark' ? '#888' : '#666'})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Ready to create something epic?
        </h2>
        <p
          style={{
            fontSize: 18,
            opacity: 0.8,
            maxWidth: 600,
            margin: '0 auto 40px',
            lineHeight: 1.7,
          }}
        >
          Join thousands of creators building stunning animations with Manigist.
          No installation. No credit card. Just code and create.
        </p>
        <button
          onClick={() => {
            currentUser ? setActiveView('editor') : setView('auth');
          }}
          style={{
            padding: '18px 48px',
            background: theme === 'dark' ? '#fff' : '#1a1a2e',
            border: 'none',
            borderRadius: '16px',
            color: theme === 'dark' ? '#000' : '#fff',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: `0 8px 30px ${
              theme === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.15)'
            }`,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = `0 15px 40px ${
              theme === 'dark' ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.2)'
            }`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 8px 30px ${
              theme === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.15)'
            }`;
          }}
        >
          Start creating free →
        </button>
        <p
          style={{
            fontSize: 13,
            opacity: 0.7,
            marginTop: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#4ade80',
            }}
          />
          Free forever · No sign-up required to start
        </p>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: '24px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: `1px solid ${theme === 'dark' ? '#111' : '#e0e0e0'}`,
          background: theme === 'dark' ? '#050505' : '#fff',
          fontSize: 13,
          opacity: 0.8,
        }}
      >
        <div style={{ ...s.flex, gap: 8 }}>
          <span style={{ fontSize: 16 }}>∑</span>
          <span>Anigist Pro · free animation studio</span>
        </div>
        <div style={{ ...s.flex, gap: 20 }}>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => addToast('Documentation', 'info')}
          >
            Docs
          </span>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => addToast('API Reference', 'info')}
          >
            API
          </span>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => {
              window.open('https://discord.gg/manigist', '_blank');
              addToast('Community', 'info');
            }}
          >
            Community
          </span>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => addToast('GitHub', 'info')}
          >
            GitHub
          </span>
        </div>
        <span style={{ fontSize: 12, opacity: 0.6 }}>
          made with ♥ for creators worldwide
        </span>
      </footer>

      {/* Toasts */}
      <div
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          zIndex: 1001,
          maxWidth: 320,
        }}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              ...s.toast,
              background:
                toast.type === 'success'
                  ? '#1a2a1a'
                  : toast.type === 'error'
                  ? '#2a1a1a'
                  : toast.type === 'warning'
                  ? '#2a2a1a'
                  : '#1a1a2a',
              border: `1px solid ${
                toast.type === 'success'
                  ? '#2a4a2a'
                  : toast.type === 'error'
                  ? '#4a2a2a'
                  : toast.type === 'warning'
                  ? '#4a4a2a'
                  : '#2a2a4a'
              }`,
              color: '#fff',
            }}
            onClick={() => removeToast(toast.id)}
          >
            <span>
              {toast.type === 'success'
                ? '✓'
                : toast.type === 'error'
                ? '⚠'
                : toast.type === 'warning'
                ? '⚡'
                : 'ℹ'}
            </span>
            {toast.message}
            <span
              style={{ marginLeft: 'auto', opacity: 0.7, cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                removeToast(toast.id);
              }}
            >
              ✕
            </span>
          </div>
        ))}
      </div>

      {/* Global CSS */}
      <style>{`
        @keyframes titleReveal { 
          0% { opacity: 0; transform: translateY(20px) } 
          30% { opacity: 1; transform: translateY(0) } 
          100% { opacity: 1; transform: translateY(0) } 
        }
        @keyframes circleMove {
          0%, 100% { transform: translateX(-40px) scale(0.9); opacity: 0.7; }
          50% { transform: translateX(40px) scale(1.1); opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(100px); opacity: 0 }
          to { transform: translateX(0); opacity: 1 }
        }
        @keyframes spin {
          to { transform: rotate(360deg) }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${
          theme === 'dark' ? '#0a0a0a' : '#f0f0f0'
        }; }
        ::-webkit-scrollbar-thumb { background: ${
          theme === 'dark' ? '#222' : '#ccc'
        }; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${
          theme === 'dark' ? '#333' : '#bbb'
        }; }
        textarea::selection { background: rgba(100, 150, 255, 0.3); }
        input::selection, select::selection { background: rgba(100, 150, 255, 0.3); }
        @media (max-width: 1024px) {
          section[style*="gridTemplateColumns"] { grid-template-columns: 1fr !important; }
          nav[style*="padding"] { padding: 16px 24px !important; flex-wrap: wrap; gap: 16px; }
        }
      `}</style>
    </main>
  );
}
