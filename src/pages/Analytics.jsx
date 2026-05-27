import React, { useState } from 'react';

function Analytics() {
  const [regionFilter, setRegionFilter] = useState('TODAS');

  // Dados de performance das regiões polo
  const metrics = [
    { region: "FORTALEZA", traffic: 84, packetLoss: "0.002%", jitter: "1.2ms", availability: "99.98%" },
    { region: "MOSSORÓ", traffic: 62, packetLoss: "0.015%", jitter: "4.8ms", availability: "99.64%" },
    { region: "RECIFE", traffic: 79, packetLoss: "0.005%", jitter: "2.1ms", availability: "99.91%" },
    { region: "JUAZEIRO-BA", traffic: 41, packetLoss: "0.042%", jitter: "8.5ms", availability: "98.12%" },
    { region: "JOÃO PESSOA", traffic: 73, packetLoss: "0.003%", jitter: "1.8ms", availability: "99.95%" },
  ];

  const filteredMetrics = regionFilter === 'TODAS' 
    ? metrics 
    : metrics.filter(m => m.region === regionFilter);

  return (
    <div className="page active">
      <div className="page-head" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ color: 'var(--text)', transition: 'color 0.25s ease' }}>Análise & Performance (Analytics)</h1>
          <p style={{ color: 'var(--text-muted)', transition: 'color 0.25s ease' }}>Métricas detalhadas de vazão de banda, telemetria IP e integridade de infraestrutura</p>
        </div>

        <select 
          value={regionFilter} 
          onChange={(e) => setRegionFilter(e.target.value)}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
        >
          <option value="TODAS">🌎 Filtro: Todas as Regiões</option>
          <option value="FORTALEZA">Fortaleza</option>
          <option value="MOSSORÓ">Mossoró</option>
          <option value="RECIFE">Recife</option>
          <option value="JUAZEIRO-BA">Juazeiro-BA</option>
          <option value="JOÃO PESSOA">João Pessoa</option>
        </select>
      </div>

      {/* Gráficos de Barras de Tráfego por Backbone */}
      <div className="grid-2" style={{ marginBottom: '20px' }}>
        <div className="card" style={{ padding: '20px' }}>
          <div className="card-head" style={{ marginBottom: '15px' }}>
            <h3 style={{ color: 'var(--text)' }}>Ocupação de Banda Ativa (Backbone Core)</h3>
            <span className="chip blue">Real-time Gbps</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px' }}>
            {filteredMetrics.map((m, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '5px', color: 'var(--text-muted)' }}>
                  <span style={{ fontWeight: 'bold', color: 'var(--text)' }}>{m.region}</span>
                  <span>{m.traffic}% (Capacidade Nominal)</span>
                </div>
                <div style={{ background: 'var(--bg-main)', height: '12px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <div style={{ 
                    width: `${m.traffic}%`, 
                    height: '100%', 
                    background: m.traffic > 80 ? 'var(--red)' : m.traffic > 60 ? 'var(--amber)' : 'var(--blue)',
                    transition: 'width 0.5s ease-in-out'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gráfico de KPI de Disponibilidade Global em Anel SVG */}
        <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div className="card-head">
            <h3 style={{ color: 'var(--text)' }}>Disponibilidade Média da Rede (SLA)</h3>
            <span className="chip green">Mês Corrente</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px', margin: 'auto 0' }}>
            <svg width="120" height="120" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--bg-main)" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--green)" strokeWidth="3" 
                strokeDasharray="99.5 0.5" strokeDashoffset="25" />
              <text x="18" y="20.5" textAnchor="middle" fill="var(--text)" style={{ fontSize: '7px', fontWeight: 'bold', fontFamily: 'monospace', transition: 'fill 0.25s ease' }}>99.5%</text>
            </svg>
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: 'var(--text-muted)' }}>Meta Global NOC: <b style={{ color: 'var(--text)' }}>99.90%</b></p>
              <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: 'var(--text-muted)' }}>Desvio Padrão: <b style={{ color: 'var(--amber)' }}>0.4%</b></p>
              <p style={{ margin: '0', fontSize: '11px', color: 'var(--text-muted)', opacity: 0.7 }}>Janela de manutenção preventiva aos domingos (00:00 - 04:00).</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Telemetria Fina */}
      <div className="card" style={{ padding: '0px' }}>
        <div className="card-head" style={{ padding: '15px 20px', borderBottom: '1px solid var(--border)' }}>
          <h3 style={{ color: 'var(--text)' }}>Matriz Quântica de Latência e Telemetria IP</h3>
        </div>
        <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '12px 20px', fontSize: '11px', color: 'var(--text-muted)' }}>Região Monitorada</th>
              <th style={{ padding: '12px 20px', fontSize: '11px', color: 'var(--text-muted)' }}>Perda de Pacotes</th>
              <th style={{ padding: '12px 20px', fontSize: '11px', color: 'var(--text-muted)' }}>Jitter Acumulado</th>
              <th style={{ padding: '12px 20px', fontSize: '11px', color: 'var(--text-muted)', textAlign: 'right' }}>SLA de Rádio</th>
            </tr>
          </thead>
          <tbody>
            {filteredMetrics.map((m, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px 20px', fontWeight: 'bold', color: 'var(--text)' }}>{m.region}</td>
                <td style={{ padding: '12px 20px', fontFamily: 'monospace', color: parseFloat(m.packetLoss) > 0.02 ? 'var(--red)' : 'var(--text-muted)' }}>{m.packetLoss}</td>
                <td style={{ padding: '12px 20px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{m.jitter}</td>
                <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                  <span className={`chip ${parseFloat(m.availability) > 99.5 ? 'green' : 'red'}`}>
                    {m.availability}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Analytics;