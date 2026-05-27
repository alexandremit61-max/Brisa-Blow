import React from 'react';
import { 
  LayoutDashboard, 
  Network, 
  Radio, 
  TrendingUp, 
  Bell, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

function Sidebar({ onPageChange, currentPage, isCollapsed, toggleSidebar }) {
  const menuItems = [
    { id: 'dashboard', label: 'Painel', icon: LayoutDashboard, category: 'OPERAÇÃO' },
    { id: 'metro', label: 'METRO', icon: Network, category: 'OPERAÇÃO' }, 
    { id: 'dwdm', label: 'DWDM', icon: Radio, category: 'OPERAÇÃO' },
    { id: '5g', label: 'Sites 5G', icon: TrendingUp, category: 'OPERAÇÃO' },
    { id: 'alarms', label: 'Alarmes', icon: Bell, category: 'INTELIGÊNCIA', badge: 3 },
    { id: 'analytics', label: 'Análise', icon: BarChart3, category: 'INTELIGÊNCIA' },
    { id: 'settings', label: 'Configurações', icon: Settings, category: 'SISTEMA' },
  ];

  const categories = ['OPERAÇÃO', 'INTELIGÊNCIA', 'SISTEMA'];

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} style={{
      width: isCollapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-w)',
      background: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 0',
      transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      height: '100vh',
      flexShrink: 0,
      overflow: 'hidden'
    }}>
      
      {/* Brand / Logo com Função de Recarregar Página e Cor Dinâmica var(--text) */}
      <div className="sidebar-brand" style={{
        padding: isCollapsed ? '0 0 25px 0' : '0 20px 25px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isCollapsed ? 'center' : 'flex-start',
        gap: '10px',
        height: '40px',
        width: '100%',
        borderBottom: '1px solid var(--border)',
        marginBottom: '15px'
      }}>
        <img 
          src="jangada-brisanet.png" 
          alt="BrisaBlow Logo" 
          onClick={() => window.location.reload()}
          style={{ 
            width: '26px', 
            height: '26px', 
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 4px var(--orange))',
            flexShrink: 0,
            cursor: 'pointer'
          }} 
        />
        {!isCollapsed && (
          <strong 
            className="brand-name" 
            onClick={() => window.location.reload()}
            style={{
              color: 'var(--text)', /* CORRIGIDO: Assume var(--text) para não sumir no dia */
              fontSize: '16px',
              letterSpacing: '0.5px',
              fontFamily: 'sans-serif',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'opacity 0.2s ease, color 0.25s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            brisa<span style={{ color: 'var(--orange)' }}>BLOW</span>
          </strong>
        )}
      </div>

      {/* Menu Categorizado Dinâmico */}
      <div className="sidebar-nav" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '0 10px'
      }}>
        {categories.map((category) => {
          const filteredItems = menuItems.filter(item => item.category === category);
          if (filteredItems.length === 0) return null;

          return (
            <div key={category} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {!isCollapsed ? (
                <span className="nav-group-label" style={{
                  fontSize: '10px',
                  color: 'var(--text-muted)',
                  fontWeight: 'bold',
                  paddingLeft: '12px',
                  marginBottom: '4px',
                  letterSpacing: '0.5px'
                }}>
                  {category}
                </span>
              ) : (
                <div style={{ height: '1px', background: 'var(--border)', margin: '10px 5px' }}></div>
              )}

              {filteredItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = currentPage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => onPageChange(item.id)}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    title={isCollapsed ? item.label : ''}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: isCollapsed ? 'center' : 'space-between',
                      width: '100%',
                      padding: '10px 12px',
                      background: isActive ? 'rgba(255, 69, 0, 0.08)' : 'transparent',
                      border: 'none',
                      borderRadius: '6px',
                      color: isActive ? '#ffffff' : 'var(--text-muted)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                      borderLeft: isActive ? '3px solid var(--orange)' : '3px solid transparent',
                      paddingLeft: isCollapsed ? '12px' : isActive ? '9px' : '12px'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'var(--text)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'var(--text-muted)';
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <IconComponent size={16} strokeWidth={isActive ? 2.5 : 2} style={{ color: isActive ? 'var(--orange)' : 'inherit', flexShrink: 0 }} />
                      {!isCollapsed && <span style={{ fontSize: '13px', fontWeight: isActive ? 'bold' : 'normal' }}>{item.label}</span>}
                    </div>

                    {!isCollapsed && item.badge && (
                      <span style={{
                        background: 'var(--red)',
                        color: '#ffffff',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        padding: '2px 6px',
                        borderRadius: '10px',
                        minWidth: '18px',
                        textAlign: 'center'
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ 
        padding: '15px 12px 0 12px', 
        borderTop: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <button 
          onClick={toggleSidebar} 
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            transition: 'all 0.2s ease',
            fontSize: '11px',
            fontWeight: 'bold',
            fontFamily: 'monospace'
          }}
        >
          {isCollapsed ? <ChevronRight size={14} /> : (
            <>
              <ChevronLeft size={14} />
              <span>RECOLHER CONTROLES</span>
            </>
          )}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: isCollapsed ? 'center' : 'flex-start', paddingBottom: '5px' }}>
          <span className="pulse-dot"></span>
          {!isCollapsed && <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>SLA: 99.98%</span>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;