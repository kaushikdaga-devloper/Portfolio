// src/assistant/AssistantWidget.jsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { handleAssistantQuery } from './assistant.logic';

// -------------------- Button Parser --------------------
const parseButtons = (text) => {
  const buttonRegex = /\[button:(.*?)\|(.*?)\]/g;
  const buttons = [];
  let match;
  while ((match = buttonRegex.exec(text)) !== null) {
    buttons.push({ label: match[1], url: match[2], index: match.index });
  }
  const cleanText = text.replace(buttonRegex, '');
  return { cleanText, buttons };
};

// -------------------- Action Button --------------------
const ActionButton = ({ label, url, navigate }) => {
  const isExternal = url.startsWith('http');
  const handleClick = () => {
    if (isExternal) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(url);
    }
  };

  return (
    <motion.button
      className="assistant-action-btn"
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {label} {isExternal ? '↗' : '→'}
    </motion.button>
  );
};

// -------------------- Main Widget --------------------
const AssistantWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true); // visible until scrolled past 50%
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // ---- Scroll listener: hide prompt after 50% of the page ----
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      // If user has seen more than 50% of the page, hide the prompt
      setShowPrompt(scrollPosition < pageHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // check initial position
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ---- Scroll to bottom when messages change ----
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ---- Send message handler ----
  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input;
    setInput('');
    setLoading(true);
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);

    const reply = await handleAssistantQuery(userMessage);
    const { cleanText, buttons } = parseButtons(reply);

    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: cleanText,
        buttons: buttons.length > 0 ? buttons : undefined,
      },
    ]);
    setLoading(false);
  };

  const handleOpenAssistant = () => setOpen(true);

  return (
    <>
      {/* ---- Home page prompt (above button, with scroll-triggered hide) ---- */}
      <AnimatePresence>
        {location.pathname === '/' && !open && showPrompt && (
          <motion.div
            className="assistant-home-prompt"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            onClick={handleOpenAssistant}
            whileHover={{ scale: 1.03 }}
          >
            <span className="assistant-prompt-icon">💬</span>
            <span>Ask me anything about Kaushik</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- Floating Chat Button ---- */}
      <motion.button
        className="assistant-fab"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat with AI assistant"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </motion.button>

      {/* ---- Chat Panel (unchanged) ---- */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="assistant-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="assistant-panel"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="assistant-panel-header">
                <div>
                  <h5 className="assistant-title">Kaushik's AI Assistant</h5>
                  <span className="assistant-subtitle">Powered by Llama 3.1 · Answers from full portfolio</span>
                </div>
                <button className="assistant-close" onClick={() => setOpen(false)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Messages Area */}
              <div className="assistant-messages">
                {messages.length === 0 && (
                  <div className="assistant-empty">
                    <div className="assistant-icon-big">
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                      </svg>
                    </div>
                    <p>Hello! I can:</p>
                    <ul className="assistant-suggestions">
                      <li>📂 Show you projects and navigate to them</li>
                      <li>📜 List achievements & certifications</li>
                      <li>📝 Share blog posts & learning notes</li>
                      <li>📞 Provide contact information</li>
                    </ul>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    className={`assistant-bubble ${msg.role}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                  >
                    {msg.role === 'assistant' ? (
                      <>
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            a: ({ href, children }) => (
                              <a href={href} target="_blank" rel="noopener noreferrer" className="assistant-link">
                                {children}
                              </a>
                            ),
                            code: ({ children }) => (
                              <code className="assistant-code">{children}</code>
                            ),
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                        {msg.buttons && msg.buttons.length > 0 && (
                          <div className="assistant-buttons">
                            {msg.buttons.map((btn, idx) => (
                              <ActionButton key={idx} label={btn.label} url={btn.url} navigate={navigate} />
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <span>{msg.content}</span>
                    )}
                  </motion.div>
                ))}

                {loading && (
                  <motion.div className="assistant-bubble assistant" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="typing-indicator">
                      <span></span><span></span><span></span>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="assistant-input-area">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  disabled={loading}
                />
                <button onClick={sendMessage} disabled={loading || !input.trim()} className="assistant-send-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AssistantWidget;