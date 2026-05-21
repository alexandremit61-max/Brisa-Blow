import React, { useState, useEffect, useRef } from 'react';

function Logs() {
  const [logs, setLogs] = useState([
    { time: "18:15:01", type: "INFO", system: "OSPF", msg: "Neighbor 10.0.0.4 on GigabitEthernet0/1 up and full" },
    { time: "18:15:24", type: "WARN", system: "BGP", msg: "Prefix threshold reached on Peer 192.168.45.2" },
    { time: "18:16:10", type: "ERROR", system: "DWDM-CORE", msg: "LOS (Loss of Signal) detected on Slot 3 Transponder" },
    { time: "18:16:42", type: "INFO", system: "RADIUS", msg: "User re-authentication successful for node_BR_recife_02" },
    { time: "18:17:15", type: "INFO", system: "METRO-ETH", msg: "STP instance 0 topology change detected on port xe-0/0/1" }
  ]);
  const [isLive, setIsLive] = useState(true);
  const logEndRef = useRef(null);

  // Efeito para injetar linhas de log dinamicamente imitando a rede viva
  useEffect(() => {
    if (!isLive) return;

    const systems = ["OSPF", "BGP", "RADIUS", "METRO-ETH", "FIBRA-GPON", "DWDM-CORE"];
    const msgs = [
      "Interface Vlan100, changed state to up",
      "LLDP neighbor cache cleared dynamically",
      "Optical power RX levels recovered to -19.4 dBm",
      "Backup route engagement activated via backup core path",
      "Configuration backup saved to remote TFTP storage server",
      "SNMP trap sent: Fan tray 01 rotational speed normal"
    ];
    const types = ["INFO", "INFO", "WARN", "INFO", "INFO"];

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const randomSystem = systems[Math.floor(Math.random() * systems.length)];
      const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
      const randomType = types[Math.floor(Math.random() * types.length)];

      setLogs(prev => [...prev.slice(-35), { // Mantém as últimas 35 linhas para performance
        time: timeStr,
        type: randomType,
        system: randomSystem,
        msg: randomMsg
      }]);
    }, 2500);

    return () => clearInterval(interval);
  }, [isLive]);

  // Scroll automático para o final do terminal
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <div className="page active">
      <div className="page-head" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Logs e Stream de Eventos</h1>
          <p>Auditoria contínua das mensagens de console geradas pelos elementos ativos do Core de Rede</p>
        </div>

        <button 
          onClick={() => setIsLive(!isLive)}
          style={{
            background: isLive ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
            border: `1px solid ${isLive ? 'var(--red)' : 'var(--green)'}`,
            color: isLive ? 'var(--red)' : 'var(--green)',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {isLive ? "⏸️ Pausar Stream" : "▶️ Retomar Stream"}
        </button>
      </div>

      {/* Terminal Cyberpunk de Visualização */}
      <div className="card" style={{ 
        background: '#020617', 
        border: '1px solid #1e293b', 
        padding: '0px', 
        fontFamily: 'monospace', 
        display: 'flex', 
        flexDirection: 'column',
        height: '68vh' 
      }}>
        
        {/* Barra superior de controle do Terminal */}
        <div style={{ background: '#0f1720', padding: '10px 20px', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', background: '#ef4444', borderRadius: '50%' }}></span>
            <span style={{ width: '10px', height: '10px', background: '#f59e0b', borderRadius: '50%' }}></span>
            <span style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%' }}></span>
            <span style={{ color: '#475569', fontSize: '11px', marginLeft: '10px' }}>bash - root@noc-core-router</span>
          </div>
          <span style={{ color: 'var(--blue)', fontSize: '11px', fontWeight: 'bold' }}>
            {isLive ? "● LIVE STREAMING ACTIVE" : "STREAM PAUSED"}
          </span>
        </div>

        {/* Caixa de Texto do Console */}
        <div style={{ 
          flex: 1, 
          padding: '20px', 
          overflowY: 'auto', 
          color: '#38bdf8', 
          fontSize: '13px', 
          lineHeight: '1.6',
          textAlign: 'left'
        }}>
          {logs.map((log, idx) => (
            <div key={idx} style={{ marginBottom: '6px', display: 'flex', gap: '10px' }}>
              <span style={{ color: '#475569' }}>[{log.time}]</span>
              <span style={{ 
                color: log.type === 'ERROR' ? 'var(--red)' : log.type === 'WARN' ? 'var(--amber)' : '#10b981',
                fontWeight: 'bold'
              }}>[{log.type}]</span>
              <span style={{ color: '#e2e8f0', background: '#1e293b', padding: '0 5px', borderRadius: '3px', fontSize: '11px' }}>{log.system}</span>
              <span style={{ color: '#cbd5e1' }}>{log.msg}</span>
            </div>
          ))}
          <div ref={logEndRef} />
        </div>

      </div>
    </div>
  );
}

export default Logs;