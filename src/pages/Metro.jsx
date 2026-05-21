import React from 'react';

function Metro() {
  // Lista de 41 cidades calibrada com a imagem tática de referência
  const cities = [
    { name: "Parnaíba", x: 100, y: 80, lat: -2.9161, lng: -41.7761 },
    { name: "Itapipoca", x: 380, y: 110, lat: -3.4944, lng: -39.5856 },
    { name: "Fortaleza", x: 450, y: 130, lat: -3.7319, lng: -38.5267 },
    { name: "Sobral", x: 320, y: 140, lat: -3.6822, lng: -40.3444 },
    { name: "Tianguá", x: 230, y: 160, lat: -3.7308, lng: -40.9911 },
    { name: "Teresina", x: 40, y: 290, lat: -5.0919, lng: -42.8033 },
    { name: "Pacajus", x: 510, y: 190, lat: -4.1722, lng: -38.4611 },
    { name: "Aracati", x: 580, y: 180, lat: -4.4178, lng: -37.7731 },
    { name: "Crateús", x: 250, y: 290, lat: -4.9717, lng: -40.6689 },
    { name: "Quixadá", x: 400, y: 250, lat: -4.9714, lng: -39.0153 },
    { name: "Mossoró", x: 670, y: 240, lat: -5.1878, lng: -37.3442 },
    { name: "Iguatu", x: 380, y: 380, lat: -6.3603, lng: -39.2975 },
    { name: "Juazeiro do Norte", x: 410, y: 510, lat: -7.2244, lng: -39.3111 },
    { name: "Pereiro", x: 490, y: 370, lat: -6.0444, lng: -38.4614 },
    { name: "São Miguel", x: 530, y: 375, lat: -6.2094, lng: -38.4989 },
    { name: "Pau dos Ferros", x: 560, y: 340, lat: -6.1108, lng: -38.2053 },
    { name: "Caicó", x: 630, y: 350, lat: -6.4564, lng: -37.0978 },
    { name: "Sousa", x: 550, y: 410, lat: -6.7611, lng: -38.2253 },
    { name: "Cajazeiras", x: 480, y: 440, lat: -6.8889, lng: -38.5589 },
    { name: "Patos", x: 650, y: 430, lat: -7.0244, lng: -37.2811 },
    { name: "Natal", x: 810, y: 300, lat: -5.7944, lng: -35.2111 },
    { name: "Campina Grande", x: 800, y: 450, lat: -7.2222, lng: -35.8806 },
    { name: "João Pessoa", x: 890, y: 420, lat: -7.1153, lng: -34.8611 },
    { name: "Recife", x: 880, y: 530, lat: -8.0578, lng: -34.8828 },
    { name: "Caruaru", x: 770, y: 540, lat: -8.2833, lng: -35.9761 },
    { name: "Garanhuns", x: 710, y: 610, lat: -8.8903, lng: -36.4964 },
    { name: "Serra Talhada", x: 490, y: 560, lat: -7.9911, lng: -38.2986 },
    { name: "Salgueiro", x: 400, y: 560, lat: -8.0744, lng: -39.1192 },
    { name: "Arcoverde", x: 610, y: 550, lat: -8.4181, dashed: false, lng: -37.0544 },
    { name: "Petrolina", x: 290, y: 640, lat: -9.3986, lng: -40.5008 },
    { name: "Juazeiro-BA", x: 280, y: 670, lat: -9.4122, lng: -40.5033 },
    { name: "Senhor do Bonfim", x: 230, y: 790, lat: -10.4614, lng: -40.1839 },
    { name: "Paulo Afonso", x: 460, y: 680, lat: -9.4075, lng: -38.2156 },
    { name: "Aracaju", x: 620, y: 790, lat: -10.9111, lng: -37.0717 },
    { name: "Arapiraca", x: 640, y: 690, lat: -9.7561, lng: -36.6603 },
    { name: "Maceió", x: 760, y: 680, lat: -9.6658, lng: -35.7353 },
    { name: "Lagarto", x: 550, y: 840, lat: -10.9172, lng: -37.6503 },
    { name: "Feira de Santana", x: 380, y: 860, lat: -12.2664, lng: -38.9661 },
    { name: "Alagoinhas", x: 430, y: 870, lat: -12.1356, lng: -38.4253 },
    { name: "Salvador", x: 450, y: 920, lat: -12.9711, lng: -38.5108 },
    { name: "Camacan", x: 410, y: 1050, lat: -15.4192, lng: -39.4958 }
  ];

  // Malha contínua com a simulação do anel tático regional
  const links = [
    { from: 5, to: 0, type: "normal" }, { from: 0, to: 3, type: "normal" }, { from: 3, to: 4, type: "normal" }, { from: 4, to: 5, type: "normal" },
    { from: 3, to: 1, type: "normal" }, { from: 1, to: 2, type: "normal" }, { from: 2, to: 6, type: "normal" }, { from: 6, to: 7, type: "normal" },
    { from: 7, to: 10, type: "normal" }, { from: 10, to: 20, type: "normal" }, { from: 20, to: 21, type: "normal" }, { from: 21, to: 22, type: "normal" },
    { from: 22, to: 23, type: "normal" }, { from: 23, to: 24, type: "normal" }, { from: 24, to: 25, type: "normal" }, { from: 25, to: 35, type: "normal" },
    { from: 35, to: 34, type: "normal" }, { from: 34, to: 33, type: "normal" }, { from: 33, to: 32, type: "normal" }, { from: 33, to: 36, type: "normal" },
    { from: 36, to: 37, type: "normal" }, { from: 37, to: 38, type: "normal" }, { from: 38, to: 39, type: "normal" }, { from: 39, to: 40, type: "normal" },
    { from: 10, to: 15, type: "normal" }, { from: 15, to: 16, type: "normal" }, { from: 16, to: 14, type: "normal" }, { from: 14, to: 13, type: "normal" },
    { from: 13, to: 17, type: "normal" }, { from: 17, to: 18, type: "normal" }, { from: 18, to: 12, type: "normal" }, { from: 12, to: 11, type: "normal" },
    { from: 11, to: 9, type: "normal" }, { from: 9, to: 8, type: "normal" }, { from: 8, to: 3, type: "normal" }, { from: 17, to: 19, type: "normal" },
    { from: 19, to: 21, type: "normal" }, { from: 12, to: 27, type: "normal" }, { from: 27, to: 26, type: "normal" }, { from: 26, to: 28, type: "normal" },
    { from: 28, to: 24, type: "normal" }, { from: 27, to: 29, type: "normal" }, { from: 29, to: 30, type: "normal" },
    // Simulação do enlace com atenuação urbana local
    { from: 38, to: 39, type: "attenuation" }
  ];

  return (
    <div className="page active">
      <div className="page-head" style={{ marginBottom: '15px' }}>
        <h1>Monitoramento de Redes METRO</h1>
        <p>Distribuição Urbana • Visibilidade de Emendas, Caixas de Passagem e Atenuações</p>
      </div>

      <div className="grid-2">
        {/* Painel do Mapa */}
        <div className="card" style={{ padding: '10px', background: '#0f1720', height: '74vh', display: 'flex', flexDirection: 'column' }}>
          <div className="card-head" style={{ padding: '5px' }}>
            <h3>Topologia de Cabos Urbanos / Última Milha</h3>
            <span className="chip blue">METRO RINGS</span>
          </div>
          <div style={{ flex: 1, background: '#050b10', borderRadius: '8px', overflow: 'hidden' }}>
            <svg style={{ width: '100%', height: '100%' }} viewBox="0 50 950 1020">
              <defs>
                <pattern id="grid-metro" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#0e1620" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-metro)" />

              {/* Desenhar os Cabos Metropolitanos */}
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

              {/* Desenhar as Cidades/Pontos de Distribuição */}
              {cities.map((city, idx) => (
                <g key={idx}>
                  <circle cx={city.x} cy={city.y} r="4.5" fill="var(--green)" stroke="#050b10" strokeWidth="1" />
                  <text x={city.x} y={city.y - 8} textAnchor="middle" style={{ fill: '#94a3b8', fontSize: '9px', fontFamily: 'Inter', fontWeight: 'bold' }}>
                    {city.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Painel de Alertas Lateral */}
        <div className="card" style={{ height: '74vh', display: 'flex', flexDirection: 'column' }}>
          <div className="card-head">
            <h3>Alertas de Infraestrutura METRO</h3>
          </div>
          <table className="data-table">
            <thead>
              <tr><th>Anel / Trajeto</th><th>Infraestrutura</th><th>Status</th><th>Métrica</th></tr>
            </thead>
            <tbody>
              <tr><td>Alagoinhas ↔ Salvador</td><td>Anel Óptico METRO BA</td><td><span className="chip amber">Atenuação</span></td><td>-26.5 dBm (Alto)</td></tr>
              <tr><td>Anel Fortaleza Centro</td><td>Distribuição Caixa 08</td><td><span className="chip green">Normal</span></td><td>-19.1 dBm (Ideal)</td></tr>
              <tr><td>Anel Recife Derby</td><td>Anel METRO Cap</td><td><span className="chip green">Normal</span></td><td>-18.4 dBm (Ideal)</td></tr>
              <tr><td>Anel Pereiro POP</td><td>Cabo Urbano Distribuição</td><td><span className="chip green">Normal</span></td><td>-17.9 dBm (Ideal)</td></tr>
            </tbody>
          </table>
          
          <div style={{ marginTop: 'auto', padding: '15px', background: 'rgba(0,191,255,0.02)', border: '1px dashed var(--border)', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '12px', color: 'var(--blue)', marginBottom: '5px' }}>ℹ️ Monitoramento Urbano</h4>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Os anéis METRO dependem da integridade física de ponta a ponta. Atenuações locais na última milha indicam necessidade de verificação preventiva nas caixas de emenda (CEO).</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Metro;