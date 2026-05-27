import React, { useState } from 'react';

function Alarms() {
  const [searchTerm, setSearchTerm] = useState('');

  // Dados reais dos alarmes simulando a criticidade do NOC
  const alarmData = [
    { id: 1, status: "RED", site: "SÃO LUÍS-CORE", description: "Corte de Fibra - Link Principal Down", time: "18:05:43" },
    { id: 2, status: "AMBER", site: "RECIFE-OLT", description: "Latência Alta - Degradação no Slot 04", time: "18:09:17" },
    { id: 3, status: "RED", site: "JUO0001", description: "Falta de AC Concessionária - Operando por Baterias", time: "17:42:11" },
    { id: 4, status: "RED", site: "MRO0005", description: "Banco de Baterias Crítico - Baixa Voltagem", time: "17:55:30" },
    { id: 5, status: "AMBER", site: "NATAL-CORE", description: "Jitter Elevado no Backbone de Redundância", time: "18:03:31" },
    { id: 6, status: "GREEN", site: "FORTALEZA-DC", description: "Operacional - Sincronismo Restabelecido", time: "18:07:56" },
  ];

  // Filtro dinâmico de pesquisa
  const filteredAlarms = alarmData.filter(alarm => 
    alarm.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alarm.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page active">
      <div className="page-head" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ color: 'var(--text)', transition: 'color 0.25s ease' }}>Central de Alarmes</h1>
          <p style={{ color: 'var(--text-muted)', transition: 'color 0.25s ease' }}>Mapeamento de Incidentes de Rede e Criticidade Crítica em Tempo Real</p>
        </div>
        
        {/* Barra de pesquisa rápida integrada */}
        <input 
          type="text" 
          placeholder="🔍 Filtrar por Site ou Descrição..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            padding: '8px 16px',
            borderRadius: '6px',
            width: '280px',
            fontSize: '13px',
            transition: 'all 0.25s ease'
          }}
        />
      </div>

      <div className="card" style={{ padding: '0px', minHeight: '65vh' }}>
        <div className="card-head" style={{ padding: '15px 20px', borderBottom: '1px solid var(--border)' }}>
          <h3 style={{ color: 'var(--text)' }}>Alarmes Ativos</h3>
          <span className="chip red">{filteredAlarms.filter(a => a.status !== 'GREEN').length} Ativos</span>
        </div>

        <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '15px 20px', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '15px 20px', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Site</th>
              <th style={{ padding: '15px 20px', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Descrição</th>
              <th style={{ padding: '15px 20px', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', textAlign: 'right' }}>Ação</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlarms.map((alarm) => (
              <tr key={alarm.id} style={{ borderBottom: '1px solid var(--border)', background: 'transparent' }}>
                <td style={{ padding: '15px 20px' }}>
                  <span className={`chip ${
                    alarm.status === 'RED' ? 'red' : alarm.status === 'AMBER' ? 'amber' : 'green'
                  }`} style={{ fontWeight: 'bold', minWidth: '60px', textAlign: 'center', display: 'inline-block' }}>
                    {alarm.status}
                  </span>
                </td>
                <td style={{ padding: '15px 20px', fontWeight: 'bold', color: 'var(--text)', fontSize: '13px' }}>
                  {alarm.site}
                </td>
                <td style={{ padding: '15px 20px', color: 'var(--text-muted)', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text)' }}>{alarm.description}</span> 
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '8px' }}>({alarm.time})</span>
                </td>
                <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                  <button 
                    title="Inspecionar Incidente"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      fontSize: '16px',
                      padding: '4px 8px',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--blue)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                  >
                    👁️
                  </button>
                </td>
              </tr>
            ))}
            {filteredAlarms.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                  Nenhum alarme crítico encontrado para os filtros aplicados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Alarms;