import React from 'react';

function Dwdm() {
  const cities = [
    { name: "OADM Fortaleza", x: 480, y: 100, status: "online" },
    { name: "OADM Pacajus", x: 520, y: 140, status: "online" },
    { name: "OADM Aracati", x: 570, y: 130, status: "online" },
    { name: "OADM Mossoró", x: 640, y: 180, status: "online" },
    { name: "OADM Sobral", x: 380, y: 110, status: "online" },
    { name: "OADM Tianguá", x: 320, y: 130, status: "online" },
    { name: "OADM Quixadá", x: 440, y: 190, status: "online" },
    { name: "OADM Iguatu", x: 430, y: 290, status: "online" },
    { name: "OADM Juazeiro", x: 450, y: 380, status: "online" },
    { name: "OADM Pereiro", x: 510, y: 280, status: "online" },
    { name: "OADM São Miguel", x: 540, y: 290, status: "online" },
    { name: "OADM Natal", x: 740, y: 220, status: "break" }, // Falha de canal aqui
    { name: "OADM Recife", x: 790, y: 400, status: "online" },
    { name: "OADM Caruaru", x: 710, y: 410, status: "online" },
    { name: "OADM Petrolina", x: 360, y: 480, status: "online" },
    { name: "OADM Campina Grande", x: 730, y: 340, status: "online" },
    { name: "OADM João Pessoa", x: 800, y: 320, status: "online" }
  ];

  const links = [
    { from: 0, to: 1, lambda: "C21" }, { from: 1, to: 2, lambda: "C22" }, { from: 2, to: 3, lambda: "C23" },
    { from: 3, to: 11, lambda: "C24", type: "break" }, { from: 11, to: 15, lambda: "C25" }, { from: 15, to: 16, lambda: "C26" },
    { from: 16, to: 12, lambda: "C27" }, { from: 12, to: 13, lambda: "C28" }, { from: 0, to: 4, lambda: "C29" },
    { from: 4, to: 5, lambda: "C30" }, { from: 0, to: 6, lambda: "C31" }, { from: 6, to: 7, lambda: "C32" },
    { from: 7, to: 8, lambda: "C33" }, { from: 9, to: 10, lambda: "C34" }, { from: 10, to: 3, lambda: "C35" }
  ];

  return (
    <div className="page active">
      <div className="page-head" style={{ marginBottom: '15px' }}>
        <h1>Sistemas Multiplexadores DWDM</h1>
        <p>Monitoramento de Canais Ópticos (Lambdas) de Alta Capacidade • Modulação e Amplificação de Sinal</p>
      </div>

      <div className="grid-2">
        <div className="card" style={{ padding: '10px', background: '#0f1720', height: '74vh', display: 'flex', flexDirection: 'column' }}>
          <div className="card-head" style={{ padding: '5px' }}>
            <h3>Grid de Frequências Ópticas / Multiplexação</h3>
            <span className="chip purple">LAMBDA MONITOR</span>
          </div>
          <div style={{ flex: 1, background: '#050b10', borderRadius: '8px', overflow: 'hidden' }}>
            <svg style={{ width: '100%', height: '100%' }} viewBox="280 60 550 450">
              <rect x="280" y="60" width="100%" height="100%" fill="#050b10" />

              {links.map((link, idx) => {
                const fromNode = cities[link.from];
                const toNode = cities[link.to];
                let strokeColor = "var(--purple)";
                let strokeWidth = "2";
                if (link.type === "break") { strokeColor = "var(--red)"; strokeWidth = "3.5"; }

                return (
                  <g key={idx}>
                    <line x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y} stroke={strokeColor} strokeWidth={strokeWidth} />
                    <text x={(fromNode.x + toNode.x)/2} y={(fromNode.y + toNode.y)/2 - 3} textAnchor="middle" style={{ fill: '#a855f7', fontSize: '7px', fontFamily: 'monospace' }}>
                      {link.lambda}
                    </text>
                  </g>
                );
              })}

              {cities.map((city, idx) => (
                <g key={idx}>
                  <rect x={city.x - 4} y={city.y - 4} width="8" height="8" fill={city.status === 'break' ? 'var(--red)' : 'var(--purple)'} />
                  <text x={city.x} y={city.y - 8} textAnchor="middle" style={{ fill: '#94a3b8', fontSize: '8px', fontFamily: 'Inter', fontWeight: 'bold' }}>
                    {city.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="card" style={{ height: '74vh' }}>
          <div className="card-head">
            <h3>Status dos Canais OADM</h3>
          </div>
          <table className="data-table">
            <thead>
              <tr><th>Canal Lambda</th><th>Frequência</th><th>Status</th><th>Capacidade</th></tr>
            </thead>
            <tbody>
              <tr><td>Mux-Mossoró ↔ Mux-Natal (C24)</td><td>192.4 THz</td><td><span className="chip red">Rompido</span></td><td>0 Gbps (Down)</td></tr>
              <tr><td>Mux-Fortaleza ↔ Mux-Pacajus (C21)</td><td>192.1 THz</td><td><span className="chip green">Ativo</span></td><td>400 Gbps</td></tr>
              <tr><td>Mux-Pereiro ↔ Mux-São Miguel (C34)</td><td>193.4 THz</td><td><span className="chip green">Ativo</span></td><td>200 Gbps</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dwdm;