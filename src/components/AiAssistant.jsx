import React, { useState, useRef, useEffect } from 'react';

function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Mensagem inicial padrão para o reset
  const initialGreeting = { 
    sender: 'bot', 
    text: 'Olá Alexandre! Sessão reiniciada. Sou o Assistente IA de Operações BrisaNet. O que deseja auditar hoje?' 
  };

  // Estados de arrastar e esticar (Drag & Resize)
  const [position, setPan] = useState({ x: 80, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 460, height: 620 });
  const [isResizing, setIsResizing] = useState(false);
  const resizeStart = useRef({ width: 0, height: 0, mouseX: 0, mouseY: 0 });

  // Estados do Chat
  const [messages, setMessages] = useState([initialGreeting]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const windowRef = useRef(null);
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // --- NOVA FUNÇÃO: FECHAR E REINICIAR ---
  const handleCloseAndReset = () => {
    setIsOpen(false);
    // Pequeno delay para a animação de fechar antes de limpar (opcional)
    setTimeout(() => {
      setMessages([initialGreeting]); // Reinicia a conversa
      setInputValue(''); // Limpa o campo de texto
      setIsTyping(false);
    }, 300);
  };

  // Base de dados mockada (igual ao anterior)
  const sitesDatabase = {
    fortaleza: [
      { id: "FLA0002", status: "up", failType: null },
      { id: "FLA0008", status: "down", failType: "Tensão Baixa" },
      { id: "FLA0011", status: "down", failType: "Falta de AC (Energia)" },
    ],
    juazeiro: [
      { id: "JUO0001", status: "down", failType: "Falta de AC Concessionária" },
      { id: "JUO0003", status: "down", failType: "Banco de Baterias Descarregado" },
    ],
    mossoro: [
      { id: "MRO0005", status: "down", failType: "Banco de Baterias Crítico" },
      { id: "MRO0006", status: "down", failType: "Tensão Alta Concessionária" }
    ]
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // --- ENGINE DE PROCESSAMENTO ---
  const processUserQuery = (query) => {
    const text = query.toLowerCase();
    setIsTyping(true);

    setTimeout(() => {
      let responseText = "Desculpe, não consegui correlacionar esse incidente. Tente perguntar sobre Fortaleza, Mossoró ou Juazeiro.";

      if (text.includes('fortaleza')) {
        responseText = `📊 [AUDITORIA FORTALEZA]\n• Estações inoperantes: 2\n• Motivos: 1 Falha de Energia AC e 1 Instabilidade de Tensão.`;
      } else if (text.includes('juazeiro')) {
        responseText = `📊 [AUDITORIA JUAZEIRO]\n• Estações inoperantes: 2\n• Diagnóstico: Queda de AC Concessionária Coelba e Banco de Baterias esgotado.`;
      } else if (text.includes('mossoro') || text.includes('mossoró')) {
        responseText = `📊 [AUDITORIA MOSSORÓ]\n• MRO0005: Bateria Crítica (abaixo de 44V).\n• MRO0006: Tensão Alta na entrada AC.`;
      }

      setMessages(prev => [...prev, { sender: 'bot', text: responseText }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const userText = inputValue;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputValue('');
    processUserQuery(userText);
  };

  // Handlers de Drag & Resize
  const handleDragStart = (e) => {
    if (e.target.closest('.resize-handle') || e.target.closest('.chat-input-zone')) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleResizeStart = (e) => {
    e.preventDefault(); e.stopPropagation();
    setIsResizing(true);
    resizeStart.current = { width: size.width, height: size.height, mouseX: e.clientX, mouseY: e.clientY };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) setPan({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
      if (isResizing) {
        const deltaX = e.clientX - resizeStart.current.mouseX;
        const deltaY = e.clientY - resizeStart.current.mouseY;
        setSize({ width: Math.max(400, resizeStart.current.width + deltaX), height: Math.max(500, resizeStart.current.height + deltaY) });
      }
    };
    const handleMouseUp = () => { setIsDragging(false); setIsResizing(false); };
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => { document.removeEventListener('mousemove', handleMouseMove); document.removeEventListener('mouseup', handleMouseUp); };
  }, [isDragging, isResizing]);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed', bottom: '25px', right: '25px', width: '60px', height: '60px', borderRadius: '50%',
          background: 'var(--purple)', border: '2px solid #fff', boxShadow: '0 4px 20px rgba(147, 51, 234, 0.4)',
          cursor: 'pointer', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px'
        }}
      >
        🤖
      </button>

      {isOpen && (
        <div 
          ref={windowRef}
          style={{
            position: 'fixed', left: `${position.x}px`, top: `${position.y}px`, width: `${size.width}px`, height: `${size.height}px`,
            background: '#0b131e', border: '1px solid #1e293b', borderRadius: '12px', boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
            zIndex: 9998, display: 'flex', flexDirection: 'column', overflow: 'hidden'
          }}
        >
          {/* Cabeçalho arrastável */}
          <div 
            onMouseDown={handleDragStart}
            style={{
              background: '#0f172a', padding: '12px 15px', display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', cursor: isDragging ? 'grabbing' : 'grab', borderBottom: '1px solid #1e293b', userSelect: 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px' }}>🤖</span>
              <strong style={{ color: '#fff', fontSize: '13px', fontFamily: 'monospace' }}>BRISANET COGNITIVE IA</strong>
            </div>
            {/* BOTÃO X CHAMANDO A FUNÇÃO DE RESET */}
            <button 
              onClick={handleCloseAndReset} 
              style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '14px', padding: '5px' }}
            >
              ✕
            </button>
          </div>

          {/* Área de Mensagens */}
          <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', background: '#070c14' }}>
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                style={{ 
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.sender === 'user' ? 'var(--purple)' : '#0f1720',
                  color: '#fff', padding: '10px 14px', borderRadius: '10px', maxWidth: '85%', fontSize: '12.5px',
                  border: msg.sender === 'user' ? 'none' : '1px solid #1e293b'
                }}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div style={{ alignSelf: 'flex-start', background: '#0f1720', padding: '10px 14px', borderRadius: '10px', fontSize: '12px', color: '#64748b' }}>
                🤖 Analisando telemetria...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input zone */}
          <div className="chat-input-zone" style={{ background: '#0f172a', padding: '12px', borderTop: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748b' }}>📎</button>
            <input 
              type="text" 
              placeholder="Digite sua dúvida técnica..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              style={{ flex: 1, background: '#070c14', border: '1px solid #1e293b', color: '#fff', padding: '8px 12px', borderRadius: '6px' }}
            />
            <button style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748b' }}>🎙️</button>
            <button onClick={handleSendMessage} style={{ background: 'var(--blue)', border: 'none', color: '#fff', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Enviar</button>
          </div>

          <div onMouseDown={handleResizeStart} className="resize-handle" style={{ position: 'absolute', bottom: '0', right: '0', width: '15px', height: '15px', cursor: 'se-resize', background: 'linear-gradient(135deg, transparent 50%, #475569 50%)', borderRadius: '0 0 12px 0' }} />
        </div>
      )}
    </>
  );
}

export default AiAssistant;

