import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const MODEL = 'llama-3.3-70b-versatile'
// ====================================================

const recentChats = [
  "Explain machine learning",
  "Write a Python script",
  "Draft a project proposal",
  "Translate to French",
  "Summarize this article",
  "Create a meal plan",
]

const suggestions = [
  { icon: "🧠", text: "Explain machine learning in simple terms" },
  { icon: "💻", text: "Write a Python function to sort a list" },
  { icon: "📧", text: "Help me draft a professional email" },
  { icon: "🥗", text: "What are some healthy dinner recipes?" },
]

export default function Copilot() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [error, setError] = useState('')
  const [userDetails, setUserDetails] = useState(null)
  const chatEndRef = useRef(null)

  // ── Fetch user details ──
  useEffect(() => {
    const fetchedUserDetails = async () => {
      const userId = localStorage.getItem("userId")
      if (!userId) {
        navigate("/login")
        return
      }
      try {
        const response = await axios.get(
          `https://github-backend-clone.onrender.com/userProfile/${userId}`
        )
        setUserDetails(response.data)
      } catch (err) {
        console.error("Cannot fetch user details:", err)
      }
    }
    fetchedUserDetails()
  }, [])

  // ── Scroll to bottom ──
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // ── Get avatar initials ──
  const getInitials = () => {
    if (!userDetails) return 'U'
    const name = userDetails.name || userDetails.username || userDetails.login || ''
    return name.slice(0, 2).toUpperCase() || 'U'
  }

  // ── Get display name ──
  const getDisplayName = () => {
    if (!userDetails) return 'User'
    return userDetails.name || userDetails.username || userDetails.login || 'User'
  }

  // ── Get username/handle ──
  const getUsername = () => {
    if (!userDetails) return ''
    return userDetails.username || userDetails.login || userDetails.email || ''
  }

  const sendMessage = async (text) => {
    const msg = text || input.trim()
    if (!msg) return

    setInput('')
    setError('')
    setShowWelcome(false)

    const newMessages = [...messages, { role: 'user', text: msg }]
    setMessages(newMessages)
    setIsTyping(true)

    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: 'system',
              content: `You are Copilot, a helpful AI assistant. The user's name is ${getDisplayName()}. Be concise and helpful.`
            },
            ...newMessages.map(m => ({
              role: m.role === 'ai' ? 'assistant' : 'user',
              content: m.text
            })),
          ],
          max_tokens: 1024,
          temperature: 0.7,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error?.message || 'API error hua')
      const reply = data.choices[0]?.message?.content || 'Koi response nahi mila.'
      setMessages(prev => [...prev, { role: 'ai', text: reply }])
    } catch (err) {
      setError('Error: ' + err.message)
      setMessages(prev => [...prev, { role: 'ai', text: '⚠️ Error: ' + err.message }])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const newChat = () => {
    setMessages([])
    setShowWelcome(true)
    setIsTyping(false)
    setError('')
  }

  const copyText = (text) => navigator.clipboard.writeText(text)

  return (
    <div style={styles.shell}>

      {/* ── Sidebar ── */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logo}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
            </svg>
          </div>
          <span style={styles.sidebarTitle}>Copilot</span>
        </div>

        <button style={styles.newChatBtn} onClick={newChat}>
          <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> New chat
        </button>

        <div style={styles.sectionLabel}>Recent</div>
        {recentChats.map((chat, i) => (
          <div
            key={i}
            style={{ ...styles.chatItem, ...(i === 0 ? styles.chatItemActive : {}) }}
            onClick={() => sendMessage(chat)}
          >
            {chat}
          </div>
        ))}

        {/* ── User Profile Section ── */}
        <div style={styles.sidebarBottom}>
          <div style={styles.modelBadge}>⚡ Llama 3.3 70B via Groq</div>

          {userDetails ? (
            <div style={styles.userCard}>
              {/* Avatar — image agar ho, warna initials */}
              {userDetails.avatar_url || userDetails.profilePicture || userDetails.avatar ? (
                <img
                  src={userDetails.avatar_url || userDetails.profilePicture || userDetails.avatar}
                  alt="avatar"
                  style={styles.avatarImg}
                />
              ) : (
                <div style={styles.avatar}>{getInitials()}</div>
              )}

              <div style={styles.userInfo}>
                <div style={styles.userName}>{getDisplayName()}</div>
                {getUsername() && (
                  <div style={styles.userHandle}>@{getUsername()}</div>
                )}
                {userDetails.email && (
                  <div style={styles.userEmail}>{userDetails.email}</div>
                )}
              </div>
            </div>
          ) : (
            // Loading skeleton
            <div style={styles.userRow}>
              <div style={{ ...styles.avatar, background: 'rgba(255,255,255,0.1)' }}>...</div>
              <span style={{ ...styles.userName, color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>
                Loading...
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Main ── */}
      <div style={styles.main}>

        {/* Topbar */}
        <div style={styles.topbar}>
          <div style={styles.modelPill}>⚡ Llama 3.3 70B (Groq) ▾</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* User name in topbar */}
            {userDetails && (
              <div style={styles.topbarUser}>
                {userDetails.avatar_url || userDetails.profilePicture || userDetails.avatar ? (
                  <img
                    src={userDetails.avatar_url || userDetails.profilePicture || userDetails.avatar}
                    alt="avatar"
                    style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ ...styles.avatar, width: 24, height: 24, fontSize: 10 }}>
                    {getInitials()}
                  </div>
                )}
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
                  {getDisplayName()}
                </span>
              </div>
            )}
            <div style={styles.iconBtn} onClick={newChat} title="New Chat">🗒</div>
            <div style={styles.iconBtn}>⋯</div>
          </div>
        </div>

        {/* Chat Area */}
        <div style={styles.chatArea}>

          {showWelcome && (
            <div style={styles.welcomeArea}>
              <div style={styles.welcomeIcon}>
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
                    stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={styles.welcomeTitle}>
                Hello, {getDisplayName()} 👋
              </div>
              <div style={styles.welcomeSub}>Powered by Llama 3.3 70B via Groq ⚡</div>
              <div style={styles.suggestionsGrid}>
                {suggestions.map((s, i) => (
                  <div key={i} style={styles.suggestionCard} onClick={() => sendMessage(s.text)}>
                    <div style={{ fontSize: 20, marginBottom: 7 }}>{s.icon}</div>
                    <div style={styles.suggestionText}>{s.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && <div style={styles.errorBanner}>⚠️ {error}</div>}

          {messages.map((msg, i) => (
            <div key={i}>
              <div style={{ ...styles.msgRow, ...(msg.role === 'user' ? styles.msgRowUser : {}) }}>
                {/* Avatar */}
                {msg.role === 'user' ? (
                  userDetails?.avatar_url || userDetails?.profilePicture || userDetails?.avatar ? (
                    <img
                      src={userDetails.avatar_url || userDetails.profilePicture || userDetails.avatar}
                      alt="avatar"
                      style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, marginTop: 2 }}
                    />
                  ) : (
                    <div style={{ ...styles.msgAvatar, ...styles.msgAvatarUser }}>{getInitials()}</div>
                  )
                ) : (
                  <div style={{ ...styles.msgAvatar, ...styles.msgAvatarAi }}>C</div>
                )}

                <div style={{ ...styles.msgBubble, ...(msg.role === 'user' ? styles.msgBubbleUser : styles.msgBubbleAi) }}>
                  {msg.text}
                </div>
              </div>

              {msg.role === 'ai' && (
                <div style={styles.msgActions}>
                  <button style={styles.actionBtn} onClick={() => copyText(msg.text)}>📋 Copy</button>
                  <button style={styles.actionBtn} onClick={() => sendMessage(messages[i - 1]?.text)}>🔄 Regenerate</button>
                  <button style={styles.actionBtn}>👍</button>
                  <button style={styles.actionBtn}>👎</button>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div style={styles.msgRow}>
              <div style={{ ...styles.msgAvatar, ...styles.msgAvatarAi }}>C</div>
              <div style={styles.msgBubbleAi}><TypingDots /></div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div style={styles.inputArea}>
          <div style={styles.inputBox}>
            <textarea
              style={styles.textarea}
              placeholder="Message Copilot..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              disabled={isTyping}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button style={styles.attachBtn}>📎</button>
              <button
                style={{ ...styles.sendBtn, ...(isTyping ? { opacity: 0.5 } : {}) }}
                onClick={() => sendMessage()}
                disabled={isTyping}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                  <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                </svg>
              </button>
            </div>
          </div>
          <div style={styles.inputHint}>Copilot can make mistakes. Consider checking important information.</div>
        </div>
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '4px 2px' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: '50%', background: '#60a5fa',
          animation: 'bounce 1.2s infinite',
          animationDelay: `${i * 0.15}s`,
        }} />
      ))}
      <style>{`
        @keyframes bounce {
          0%,60%,100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

const styles = {
  shell: {
    display: 'flex', height: '100vh', background: '#1a1a2e',
    fontFamily: "'Segoe UI', system-ui, sans-serif", overflow: 'hidden',
  },
  sidebar: {
    width: 240, background: '#16213e', display: 'flex', flexDirection: 'column',
    borderRight: '0.5px solid rgba(255,255,255,0.07)', flexShrink: 0, overflowY: 'auto',
  },
  sidebarHeader: {
    padding: '18px 16px 14px', display: 'flex', alignItems: 'center', gap: 10,
    borderBottom: '0.5px solid rgba(255,255,255,0.07)',
  },
  logo: {
    width: 28, height: 28, borderRadius: 6, display: 'flex',
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    background: 'linear-gradient(135deg, #0f6cbd, #2d7de0, #8a5dc8)',
  },
  sidebarTitle: { color: '#fff', fontSize: 15, fontWeight: 600 },
  newChatBtn: {
    margin: '12px 12px 4px', padding: '8px 12px',
    background: 'rgba(45,125,224,0.15)', border: '0.5px solid rgba(45,125,224,0.35)',
    borderRadius: 8, color: '#60a5fa', fontSize: 13, cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: 8,
  },
  sectionLabel: {
    padding: '14px 12px 6px', color: 'rgba(255,255,255,0.35)',
    fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase',
  },
  chatItem: {
    margin: '2px 8px', padding: '8px 10px', borderRadius: 7,
    color: 'rgba(255,255,255,0.7)', fontSize: 13, cursor: 'pointer',
    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
  },
  chatItemActive: { background: 'rgba(45,125,224,0.18)', color: '#93c5fd' },
  sidebarBottom: {
    marginTop: 'auto', padding: 12, borderTop: '0.5px solid rgba(255,255,255,0.07)',
  },
  modelBadge: { color: 'rgba(255,255,255,0.3)', fontSize: 11, marginBottom: 8, textAlign: 'center' },

  // User card in sidebar
  userCard: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '8px', borderRadius: 8,
    background: 'rgba(255,255,255,0.04)',
    border: '0.5px solid rgba(255,255,255,0.07)',
  },
  avatarImg: {
    width: 36, height: 36, borderRadius: '50%',
    objectFit: 'cover', flexShrink: 0,
    border: '1.5px solid rgba(45,125,224,0.4)',
  },
  userInfo: { display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 },
  userRow: { display: 'flex', alignItems: 'center', gap: 10, padding: '6px 4px' },
  avatar: {
    width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
    background: 'linear-gradient(135deg, #0f6cbd, #8a5dc8)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 12, fontWeight: 600, color: '#fff',
  },
  userName: { color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  userHandle: { color: 'rgba(255,255,255,0.4)', fontSize: 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  userEmail: { color: 'rgba(255,255,255,0.3)', fontSize: 10, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },

  main: { flex: 1, display: 'flex', flexDirection: 'column', background: '#1a1a2e', minWidth: 0 },
  topbar: {
    padding: '14px 20px', display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', borderBottom: '0.5px solid rgba(255,255,255,0.07)',
  },
  modelPill: {
    padding: '4px 12px', background: 'rgba(255,255,255,0.06)',
    border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 20,
    color: 'rgba(255,255,255,0.6)', fontSize: 12, cursor: 'pointer',
  },
  topbarUser: {
    display: 'flex', alignItems: 'center', gap: 7,
    padding: '4px 10px', borderRadius: 20,
    background: 'rgba(255,255,255,0.05)',
    border: '0.5px solid rgba(255,255,255,0.08)',
  },
  iconBtn: {
    width: 32, height: 32, borderRadius: 7, background: 'rgba(255,255,255,0.04)',
    border: '0.5px solid rgba(255,255,255,0.08)', display: 'flex',
    alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
    color: 'rgba(255,255,255,0.5)', fontSize: 16,
  },
  chatArea: {
    flex: 1, overflowY: 'auto', padding: '24px 32px',
    display: 'flex', flexDirection: 'column', gap: 20,
  },
  welcomeArea: { textAlign: 'center', padding: '24px 0 16px' },
  welcomeIcon: {
    width: 52, height: 52, margin: '0 auto 14px', borderRadius: 14,
    background: 'linear-gradient(135deg, #0f6cbd, #8a5dc8)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  welcomeTitle: { color: '#fff', fontSize: 20, fontWeight: 600, marginBottom: 6 },
  welcomeSub: { color: 'rgba(255,255,255,0.45)', fontSize: 14 },
  suggestionsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 20 },
  suggestionCard: {
    padding: '12px 14px', background: 'rgba(255,255,255,0.04)',
    border: '0.5px solid rgba(255,255,255,0.09)', borderRadius: 10,
    cursor: 'pointer', textAlign: 'left',
  },
  suggestionText: { color: 'rgba(255,255,255,0.7)', fontSize: 13, lineHeight: 1.4 },
  errorBanner: {
    padding: '10px 14px', background: 'rgba(239,68,68,0.15)',
    border: '0.5px solid rgba(239,68,68,0.3)', borderRadius: 8,
    color: '#fca5a5', fontSize: 13,
  },
  msgRow: { display: 'flex', gap: 12, alignItems: 'flex-start' },
  msgRowUser: { flexDirection: 'row-reverse' },
  msgAvatar: {
    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 11, fontWeight: 600, marginTop: 2,
  },
  msgAvatarAi: { background: 'linear-gradient(135deg, #0f6cbd, #8a5dc8)', color: '#fff' },
  msgAvatarUser: { background: 'linear-gradient(135deg, #16a34a, #059669)', color: '#fff' },
  msgBubble: { maxWidth: '78%', padding: '11px 15px', borderRadius: 12, fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-wrap' },
  msgBubbleAi: {
    background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.85)',
    border: '0.5px solid rgba(255,255,255,0.08)', borderTopLeftRadius: 4,
  },
  msgBubbleUser: {
    background: 'rgba(45,125,224,0.22)', color: 'rgba(255,255,255,0.9)',
    border: '0.5px solid rgba(45,125,224,0.3)', borderTopRightRadius: 4,
  },
  msgActions: { display: 'flex', gap: 6, marginTop: 8, paddingLeft: 40 },
  actionBtn: {
    padding: '4px 10px', borderRadius: 5, background: 'transparent',
    border: '0.5px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)',
    fontSize: 12, cursor: 'pointer',
  },
  inputArea: { padding: '14px 20px 18px', borderTop: '0.5px solid rgba(255,255,255,0.07)' },
  inputBox: {
    background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.12)',
    borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'flex-end', gap: 10,
  },
  textarea: {
    flex: 1, background: 'transparent', border: 'none', outline: 'none',
    color: 'rgba(255,255,255,0.85)', fontSize: 14, fontFamily: 'inherit',
    resize: 'none', lineHeight: 1.5,
  },
  attachBtn: {
    width: 30, height: 30, borderRadius: 7, background: 'transparent',
    border: '0.5px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: 14,
  },
  sendBtn: {
    width: 34, height: 34, borderRadius: 8, background: '#2d7de0',
    border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', flexShrink: 0,
  },
  inputHint: { fontSize: 11, color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: 8 },
}