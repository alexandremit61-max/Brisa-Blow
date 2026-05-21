import React from 'react';

function Fibra() {
  const cities = [
    { name: "Fortaleza", x: 480, y: 100, status: "online" },
    { name: "Pacajus", x: 520, y: 140, status: "online" },
    { name: "Aracati", x: 570, y: 130, status: "online" },
    { name: "Mossoró", x: 640, y: 180, status: "online" },
    { name: "Sobral", x: 380, y: 110, status: "online" },
    { name: "Itapipoca", x: 420, y: 80, status: "online" },
    { name: "Tianguá", x: 320, y: 130, status: "online" },
    { name: "Crateús", x: 330, y: 220, status: "online" },
    { name: "Quixadá", x: 440, y: 190, status: "online" },
    { name: "Iguatu", x: 430, y: 290, status: "online" },
    { name: "Juazeiro do Norte", x: 450, y: 380, status: "online" },
    { name: "Pereiro", x: 510, y: 280, status: "online" },
    { name: "São Miguel", x: 540, y: 290, status: "online" },
    { name: "Caicó", x: 610, y: 270, status: "online" },
    { name: "Pau dos Ferros", x: 560, y: 260, status: "online" },
    { name: "Sousa", x: 550, y: 320, status: "online" },
    { name: "Cajazeiras", x: 500, y: 340, status: "online" },
    { name: "Patos", x: 630, y: 330, status: "online" },
    { name: "Campina Grande", x: 730, y: 340, status: "online" },
    { name: "João Pessoa", x: 800, y: 320, status: "online" },
    { name: "Natal", x: 740, y: 220, status: "online" },
    { name: "Recife", x: 790, y: 400, status: "online" },
    { name: "Caruaru", x: 710, y: 410, status: "online" },
    { name: "Petrolina", x: 360, y: 480, status: "online" },
    { name: "Juazeiro-BA", x: 350, y: 510, status: "online" },
    { name: "Paulo Afonso", x: 490, y: 510, status: "online" },
    { name: "Teresina", x: 180, y: 240, status: "online" },
    { name: "Parnaíba", x: 220, y: 60, status: "online" },
    { name: "Aracaju", x: 600, y: 590, status: "online" },
    { name: "Maceió", x: 700, y: 510, status: "online" },
    { name: "Feira de Santana", x: 430, y: 640, status: "online" },
    { name: "Salvador", x: 480, y: 690, status: "online" },
    { name: "Camacan", x: 440, y: 770, status: "break" }, // Ponto Crítico Simulado
    { name: "Senhor do Bonfim", x: 320, y: 590, status: "online" },
    { name: "Salgueiro", x: 440, y: 430, status: "online" },
    { name: "Serra Talhada", x: 510, y: 420, status: "online" },
    { name: "Arcoverde", x: 600, y: 420, status: "online" },
    { name: "Garanhuns", x: 660, y: 460, status: "online" },
    { name: "Arapiraca", x: 620, y: 520, status: "online" },
    { name: "Lagarto", x: 550, y: 620, status: "online" },
    { name: "Alagoinhas", x: 470, y: 650, status: "online" }
  ];

  // Conexões de cabos de longa distância entre os índices dos nós acima
  const links = [
    { from: 0, to: 1, type: "normal" }, { from: 1, to: 2, type: "normal" }, { from: 2, to: 3, type: "normal" },
    { from: 3, to: 20, type: "normal" }, { from: 20, to: 18, type: "normal" }, { from: 18, to: 19, type: "normal" },
    { from: 19, to: 21, type: "normal" }, { from: 21, to: 22, type: "normal" }, { from: 22, to: 37, type: "normal" },
    { from: 37, to: 29, type: "normal" }, { from: 29, to: 38, type: "normal" }, { from: 38, to: 28, type: "normal" },
    { from: 28, to: 39, type: "normal" }, { from: 39, to: 30, type: "normal" }, { from: 30, to: 31, type: "normal" },
    { from: 31, to: 32, type: "attenuation" }, { from: 30, to: 40, type: "normal" }, { from: 25, to: 28, type: "normal" },
    { from: 23, to: 24, type: "normal" }, { from: 23, to: 34, type: "normal" }, { from: 34, to: 35, type: "normal" },
    { from: 35, to: 36, type: "normal" }, { from: 36, to: 22, type: "normal" }, { from: 0, to: 5, type: "normal" },
    { from: 5, to: 4, type: "normal" }, { from: 4, to: 6, type: "normal" }, { from: 6, to: 26, type: "normal" },
    { from: 26, to: 27, type: "normal" }, { from: 27, to: 4, type: "normal" }, { from: 4, to: 7, type: "normal" },
    { from: 7, to: 8, type: "normal" }, { from: 8, to: 9, type: "normal" }, { from: 9, to: 10, type: "normal" },
    { from: 10, to: 16, type: "normal" }, { from: 16, to: 15, type: "normal" }, { from: 15, to: 14, type: "normal" },
    { from: 14, to: 13, type: "normal" }, { from: 13, to: 11, type: "normal" }, { from: 11, to: 12, type: "normal" },
    { from: 12, to: 3, type: "normal" }, { from: 14, to: 17, type: "normal" }, { from: 17, to: 18, type: "normal" }
  ];

  return (
    <div className="page active">
      <div className="page-head" style={{ marginBottom: '15px' }}>
        <h1>Monitoramento de Fibra Óptica (Backbone)</h1>
        <p>Malha Geral de Transporte Interconectada • Totalizadores de Atenuação e Rompimento</p>
      </div>

      <div className="grid-2">
        <div className="card" style={{ padding: '10px', background: '#0f1720', height: '74vh', display: 'flex', flexDirection: 'column' }}>
          <div className="card-head" style={{ padding: '5px' }}>
            <h3>Topologia de Linhas de Longa Distância</h3>
            <span className="chip green">FIBER CORE</span>
          </div>
          <div style={{ flex: 1, background: '#050b10', borderRadius: '8px', overflow: 'hidden' }}>
            <svg style={{ width: '100%', height: '100%' }} viewBox="200 40 650 720">
              <defs>
                <pattern id="grid-fibra" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#0e1620" strokeWidth="1" />
                </pattern>
              </defs>
              <rect x="200" y="40" width="100%" height="100%" fill="url(#grid-fibra)" />

              {/* Desenhar os Cabos/Enlaces */}
              {links.map((link, idx) => {
                const fromNode = cities[link.from];
                const toNode = cities[link.to];
                let strokeColor = "var(--green)";
                let strokeWidth = "2";
                if (link.type === "attenuation") { strokeColor = "var(--amber)"; strokeWidth = "3"; }
                if (link.type === "break") { strokeColor = "var(--red)"; strokeWidth = "4"; }

                return (
                  <line 
                    key={idx}
                    x1={fromNode.x} y1={fromNode.y} 
                    x2={toNode.x} y2={toNode.y} 
                    stroke={strokeColor} 
                    strokeWidth={strokeWidth} 
                    strokeLinecap="round" 
                  />
                );
              })}

              {/* Desenhar os POPs das Cidades */}
              {cities.map((city, idx) => (
                <g key={idx}>
                  <circle cx={city.x} cy={city.y} r={city.status === 'break' ? '8' : '4'} fill={city.status === 'break' ? 'var(--red)' : 'var(--green)'} />
                  <text x={city.x} y={city.y - 8} textAnchor="middle" style={{ fill: '#94a3b8', fontSize: '9px', fontFamily: 'Inter', fontWeight: 'bold' }}>
                    {city.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="card" style={{ height: '74vh', display: 'flex', flexDirection: 'column' }}>
          <div className="card-head">
            <h3>Alertas de Infraestrutura Óptica</h3>
          </div>
          <table className="data-table">
            <thead>
              <tr><th>Enlace</th><th>Tipo</th><th>Status</th><th>Métrica</th></tr>
            </thead>
            <tbody>
              <tr><td>Feira de Santana ↔ Camacan</td><td>Cabo Subterrâneo</td><td><span className="chip red">Rompimento</span></td><td>0 Gbps (Down)</td></tr>
              <tr><td>Salvador ↔ Camacan</td><td>Cabo Aéreo</td><td><span className="chip amber">Atenuação</span></td><td>-28 dBm (Alto)</td></tr>
              <tr><td>Fortaleza ↔ Mossoró</td><td>Oリング Core</td><td><span className="chip green">Normal</span></td><td>-19 dBm (Ideal)</td></tr>
              <tr><td>Pereiro ↔ São Miguel</td><td>Metro Ring</td><td><span className="chip green">Normal</span></td><td>-18 dBm (Ideal)</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Fibra;