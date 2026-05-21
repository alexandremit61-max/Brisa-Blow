import React from 'react';
import { Sun, Moon, LogOut, Search, Bell } from 'lucide-react';

function Topbar({ currentPage, toggleTheme, currentTheme }) {
  return (
    <div className="topbar">
      
      {/* Lado Esquerdo: Título com a rota atual */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', fontFamily: 'monospace', letterSpacing: '0.5px' }}>
        // {currentPage}
        </h2>
      </div>

      {/* Centro: Barra de Pesquisa Integrada */}
      <div className="ai-search">
        <Search size={14} style={{ color: 'var(--blue)' }} />
        <input 
          type="text" 
          placeholder="Busca... ex: 'Falta de AC em Fortaleza'" 
        />

      </div>

      {/* Lado Direito: Controles Globais, Nome e Sair */}
      <div className="topbar-right">
        
        {/* Status da Rede */}
        <div className="net-status">
          <span className="pulse-dot"></span>
          <span>Ativo</span>
        </div>

        {/* BOTÃO INTERATIVO: DIA / NOITE */}
        <button 
          onClick={toggleTheme}
          title="Alternar Modo Claro/Escuro"
          className="icon-btn"
          style={{
            background: 'rgba(148, 163, 184, 0.05)',
            border: '1px solid var(--border)',
            padding: '8px',
            borderRadius: '8px',
            cursor: 'pointer',
            color: 'var(--text)'
          }}
        >
          {currentTheme === 'dark' ? (
            <Sun size={16} style={{ color: 'var(--amber)' }} />
          ) : (
            <Moon size={16} style={{ color: 'var(--blue)' }} />
          )}
        </button>

        <div style={{ width: '1px', height: '20px', background: 'var(--border)' }}></div>

        {/* PERFIL DO OPERADOR COM BOTÃO SAIR INTEGRADO */}
        <div className="user-chip" style={{ paddingRight: '12px' }}>
          <div className="avatar">AR</div>
          <div className="user-meta">
            <strong>Alexandre R.</strong>
            <small>Operador</small>
          </div>

          {/* BOTÃO SAIR COMTEMPORÂNEO */}
          <button 
            onClick={() => window.location.reload()} // Reinicia a aplicação limpando a sessão
            title="Encerrar Sessão"
            className="btn-logout"
            style={{
              marginLeft: '10px',
              paddingLeft: '12px',
              background: 'none',
              border: 'none',
              borderLeft: '1px solid var(--border)',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontWeight: 'bold'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--red)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <LogOut size={13} />
            SAIR
          </button>
        </div>

      </div>
    </div>
  );
}

export default Topbar;