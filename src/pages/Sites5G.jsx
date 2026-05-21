import React, { useState, useMemo, useRef } from 'react';

function Sites5G() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  
  const svgRef = useRef(null);

  // Mapeamento expandido contendo os clusters de cidades e seus micro-sites
  const cityClusters = useMemo(() => [
    {
      name: "Fortaleza", x: 450, y: 130, status: "up",
      sites: [
        { id: "FLA0002", name: "Fortaleza Aldeota", type: "Urbano", structure: "Greenfield", lat: -3.705108, lng: -38.576142, status: "up" },
        { id: "FLA0003", name: "Fortaleza Meireles", type: "Urbano", structure: "Greenfield", lat: -3.70816,  lng: -38.570194, status: "up" },
        { id: "FLA0004", name: "Fortaleza Cocó", type: "Urbano", structure: "Greenfield", lat: -3.711361, lng: -38.559861, status: "up" },
        { id: "FLA0005", name: "Fortaleza Benfica", type: "Urbano", structure: "Greenfield", lat: -3.707875, lng: -38.590655, status: "up" },
        { id: "FLA0006", name: "Fortaleza Fátima", type: "Urbano", structure: "Greenfield", lat: -3.70796,  lng: -38.581451, status: "up" },
        { id: "FLA0007", name: "Fortaleza Centro Hub", type: "Urbano", structure: "Greenfield", lat: -3.715517, lng: -38.573089, status: "up" },
        { id: "FLA0008", name: "Fortaleza Parangaba", type: "Urbano", structure: "Greenfield", lat: -3.71094,  lng: -38.599943, status: "up" },
        { id: "FLA0009", name: "Fortaleza Montese", type: "Urbano", structure: "Greenfield", lat: -3.713956, lng: -38.592475, status: "up" },
        { id: "FLA0010", name: "Fortaleza Papicu", type: "Urbano", structure: "Greenfield", lat: -3.716648, lng: -38.586696, status: "up" },
        { id: "FLA0011", name: "Fortaleza Dionísio T.", type: "Urbano", structure: "Greenfield", lat: -3.717241, lng: -38.579696, status: "up" },
        { id: "FLA0012", name: "Fortaleza Bezerra", type: "Urbano", structure: "Greenfield", lat: -3.716864, lng: -38.605323, status: "up" },
        { id: "FLA0015", name: "Fortaleza Água Fria", type: "Urbano", structure: "Greenfield", lat: -3.726056, lng: -38.58249, status: "up" },
        { id: "FLA0020", name: "Fortaleza Passaré", type: "Urbano", structure: "Greenfield", lat: -3.715889, lng: -38.565972, status: "up" }
      ]
    },
    {
      name: "Juazeiro-BA", x: 280, y: 670, status: "down",
      sites: [
        { id: "JUO0001", name: "Juazeiro Centro 01", type: "Urbana", structure: "Greenfield", lat: -9.414363, lng: -40.505306, status: "down", incidente: "Falha Concessionária Coelba • Queda de AC" },
        { id: "JUO0002", name: "Juazeiro Cais 02", type: "Urbana", structure: "Greenfield", lat: -9.415721, lng: -40.497048, status: "up" },
        { id: "JUO0003", name: "Juazeiro Base 03", type: "Urbana", structure: "Greenfield", lat: -9.423257, lng: -40.501605, status: "up" },
        { id: "JUO0004", name: "Juazeiro Norte Node", type: "Urbana", structure: "Greenfield", lat: -9.433099, lng: -40.505011, status: "up" },
        { id: "JUO0005", name: "Juazeiro Oeste Rf", type: "Urbana", structure: "Greenfield", lat: -9.425072, lng: -40.511901, status: "up" }
      ]
    },
    {
      name: "Mossoró", x: 670, y: 240, status: "down",
      sites: [
        { id: "MRO0004", name: "Mossoro Centro Roof", type: "Urbano", structure: "Rooftop", lat: -5.193039, lng: -37.344475, status: "up" },
        { id: "MRO0005", name: "Mossoro Alto Base", type: "Urbano", structure: "Greenfield", lat: -5.186772, lng: -37.335981, status: "down", incidente: "Banco de Baterias Crítico • Falta de AC Cosern" },
        { id: "MRO0006", name: "Mossoro Nova Betânia", type: "Urbano", structure: "Greenfield", lat: -5.177198, lng: -37.336221, status: "up" },
        { id: "MRO0007", name: "Mossoro Aeroporto Gsm", type: "Urbano", structure: "Greenfield", lat: -5.169339, lng: -37.330694, status: "up" },
        { id: "MRO0008", name: "Mossoro Leste Micro", type: "Urbano", structure: "Greenfield", lat: -5.161979, lng: -37.337308, status: "up" }
      ]
    },
    {
      name: "Aracati", x: 580, y: 180, status: "up",
      sites: [
        { id: "ACA0001", name: "Aracati Macro", type: "Urbano", structure: "Greenfield", lat: -4.572731, lng: -37.656439, status: "up" },
        { id: "ACA0002", name: "Aracati Base", type: "Urbano", structure: "Greenfield", lat: -4.557036, lng: -37.673945, status: "up" },
        { id: "ACA0003", name: "Aracati Node", type: "Urbano", structure: "Greenfield", lat: -4.52679, lng: -37.703486, status: "up" },
        { id: "ACA0004", name: "Aracati Sul 5G", type: "Urbano", structure: "Greenfield", lat: -4.557086, lng: -37.766806, status: "up" },
        { id: "ACA0010", name: "Tabuleiro/Cabreiro", type: "Rural", structure: "Poste de Concreto", lat: -4.629571, lng: -37.826168, status: "up" }
      ]
    },
    {
      name: "Aracoiaba", x: 400, y: 250, status: "up",
      sites: [
        { id: "AAB0003", name: "Vazantes Site", type: "Rural", structure: "Greenfield", lat: -4.409889, lng: -38.685163, status: "up" },
        { id: "AAB0004", name: "Jaguarão Site", type: "Rural", structure: "Greenfield", lat: -4.470395, lng: -38.750311, status: "up" },
        { id: "AAB0005", name: "Agrovila Capivara Node", type: "Rural", structure: "Greenfield", lat: -4.456004, lng: -38.652004, status: "up" }
      ]
    },
    {
      name: "Acaraú", x: 380, y: 110, status: "up",
      sites: [
        { id: "AAU0001", name: "Acaraú Centro 5G", type: "Urbano", structure: "Greenfield", lat: -2.906611, lng: -40.116725, status: "up" },
        { id: "AAU0002", name: "Acaraú Hub Rf", type: "Urbano", structure: "Greenfield", lat: -2.884282, lng: -40.117278, status: "up" },
        { id: "AAU0003", name: "Juritianha 5G", type: "Rural", structure: "Greenfield", lat: -2.89897,  lng: -40.004163, status: "up" },
        { id: "AAU0005", name: "Ilha dos Coqueiros", type: "Rural", structure: "Greenfield", lat: -2.858136, lng: -40.04786, status: "up" },
        { id: "AAU0007", name: "Santa Fé Base", type: "Rural", structure: "Greenfield", lat: -3.278738, lng: -39.962598, status: "up" }
      ]
    },
    {
      name: "João Pessoa", x: 890, y: 420, status: "up",
      sites: [
        { id: "JPA0006", name: "Manaíra Rooftop", type: "Urbano", structure: "Rooftop", lat: -7.086725, lng: -34.836288, status: "up" },
        { id: "JPA0007", name: "Bessa Core Tower", type: "Urbano", structure: "Greenfield", lat: -7.08569,  lng: -34.845724, status: "up" },
        { id: "JPA0008", name: "Cabo Branco Macro", type: "Urbano", structure: "Greenfield", lat: -7.095111, lng: -34.837222, status: "up" },
        { id: "JPA0009", name: "Tambau Roof Node", type: "Urbano", structure: "Rooftop", lat: -7.097782, lng: -34.8465, status: "up" },
        { id: "JPA0012", name: "Torre Hub Base", type: "Urbano", structure: "Greenfield", lat: -7.101027, lng: -34.869411, status: "up" }
      ]
    },
    {
      name: "Pereiro", x: 490, y: 370, status: "up",
      sites: [
        { id: "PEO0001", name: "Pereiro Alto Serra", type: "Urbano", structure: "Greenfield", lat: -6.046389, lng: -38.460917, status: "up" },
        { id: "PEO0002", name: "Pereiro Rural Sul", type: "Rural", structure: "Greenfield", lat: -6.168953, lng: -38.49033, status: "up" },
        { id: "PEO0003", name: "Crioulas Station", type: "Rural", structure: "Greenfield", lat: -6.201061, lng: -38.538694, status: "up" }
      ]
    },
    {
      name: "Pau dos Ferros", x: 560, y: 340, status: "up",
      sites: [
        { id: "PFR0001", name: "Pau dos Ferros Pop 1", type: "Urbano", structure: "Greenfield", lat: -6.108028, lng: -38.209472, status: "up" },
        { id: "PFR0002", name: "Pau dos Ferros Pop 2", type: "Urbano", structure: "Greenfield", lat: -6.118361, lng: -38.203056, status: "up" },
        { id: "PFR0003", name: "Pau dos Ferros Pop 3", type: "Urbano", structure: "Greenfield", lat: -6.126306, lng: -38.205694, status: "up" }
      ]
    },
    {
      name: "Juazeiro do Norte", x: 410, y: 510, status: "up",
      sites: [
        { id: "JNE0015", name: "Juazeiro Triângulo Hub", type: "Urbano", structure: "Greenfield", lat: -7.239775, lng: -39.324107, status: "up" },
        { id: "JNE0016", name: "Juazeiro Shopping Base", type: "Urbano", structure: "Greenfield", lat: -7.181361, lng: -39.330222, status: "up" },
        { id: "JNE0017", name: "Juazeiro Centro Roof", type: "Urbano", structure: "Rooftop", lat: -7.251868, lng: -39.324699, status: "up" },
        { id: "JNE0018", name: "Juazeiro Norte Macro", type: "Urbano", structure: "Greenfield", lat: -7.174083, lng: -39.304222, status: "up" }
      ]
    },
    {
      name: "Pacajus", x: 510, y: 190, status: "up",
      sites: [
        { id: "PJS0001", name: "Pacajus Core Base", type: "Urbano", structure: "Greenfield", lat: -4.173533, lng: -38.463392, status: "up" },
        { id: "PJS0002", name: "Pacajus Industrial", type: "Urbano", structure: "Greenfield", lat: -4.177672, lng: -38.474178, status: "up" },
        { id: "PJS0003", name: "Pacajus Sul Node", type: "Urbano", structure: "Greenfield", lat: -4.184574, lng: -38.459677, status: "up" }
      ]
    },
    {
      name: "Parnaíba", x: 100, y: 80, status: "up",
      sites: [
        { id: "PNA0001", name: "Parnaiba Central", type: "Urbano", structure: "Greenfield", lat: -2.920251, lng: -41.743074, status: "up" },
        { id: "PNA0002", name: "Parnaiba Hub Norte", type: "Urbano", structure: "Greenfield", lat: -2.916472, lng: -41.751556, status: "up" }
      ]
    }
  ], []);

  // Coleta automática dos sites críticos em falha de energia
  const alarmSites = useMemo(() => {
    let list = [];
    cityClusters.forEach(c => {
      c.sites.forEach(s => {
        if (s.status === 'down') {
          list.push({ ...s, cityName: c.name });
        }
      });
    });
    return list;
  }, [cityClusters]);

  // Motor Gráfico do Scroll Zoom baseado na posição do ponteiro
  const handleWheel = (e) => {
    e.preventDefault();
    const scaleFactor = 1.15;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newZoom = e.deltaY < 0 
      ? Math.min(zoom * scaleFactor, 15) 
      : Math.max(zoom / scaleFactor, 1);

    if (newZoom === 1) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
      return;
    }

    const xs = (mouseX - pan.x) / zoom;
    const ys = (mouseY - pan.y) / zoom;

    setZoom(newZoom);
    setPan({
      x: mouseX - xs * newZoom,
      y: mouseY - ys * newZoom
    });
  };

  const handleMouseDown = (e) => {
    setIsPanning(true);
    setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isPanning) return;
    setPan({
      x: e.clientX - startPan.x,
      y: e.clientY - startPan.y
    });
  };

  const handleMouseUp = () => setIsPanning(false);
  const handleDoubleClick = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

  return (
    <div className="page active" onMouseUp={handleMouseUp}>
      <div className="page-head" style={{ marginBottom: '15px' }}>
        <h1>Central de Células de Transmissão (Sites 5G)</h1>
        <p>Visão Descentralizada por Cidades • Use o <b>Scroll do Mouse</b> para expandir amplamente os pontos</p>
      </div>

      <div className="grid-2">
        {/* Painel do Mapa Interativo */}
        <div className="card" style={{ padding: '10px', background: '#0f1720', height: '74vh', display: 'flex', flexDirection: 'column' }}>
          <div className="card-head" style={{ padding: '5px' }}>
            <h3>Topologia Sítio RF por Cidades</h3>
            <span className="chip purple" style={{ fontFamily: 'monospace' }}>Zoom Otimizado - {zoom.toFixed(1)}x</span>
          </div>

          <div 
            ref={svgRef}
            style={{ 
              flex: 1, 
              background: '#050b10', 
              borderRadius: '8px', 
              overflow: 'hidden', 
              cursor: isPanning ? 'grabbing' : 'grab',
              position: 'relative'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onWheel={handleWheel}
            onDoubleClick={handleDoubleClick}
          >
            <svg style={{ width: '100%', height: '100%' }} viewBox="0 40 950 1020">
              <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
                
                <defs>
                  <pattern id="grid-5g-dense" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#101724" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-5g-dense)" />

                {cityClusters.map((city, idx) => {
                  const isCitySelected = selectedCity?.name === city.name;
                  
                  return (
                    <g key={idx}>
                      {city.status === 'down' && (
                        <circle cx={city.x} cy={city.y} r={16 / (zoom * 0.8)} fill="var(--red)" opacity="0.4">
                          <animate attributeName="r" values={`${8/zoom};${24/zoom};${8/zoom}`} dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
                        </circle>
                      )}

                      {/* Ponto Central da Cidade Polo */}
                      <circle 
                        cx={city.x} 
                        cy={city.y} 
                        r={isCitySelected ? 8 / (zoom * 0.8) : 5.5 / (zoom * 0.9)} 
                        fill={city.status === 'down' ? 'var(--red)' : 'var(--green)'} 
                        stroke="#ffffff"
                        strokeWidth={0.7 / zoom}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCity(city);
                          setSelectedSite(city.sites[0]);
                        }}
                        style={{ cursor: 'pointer' }}
                      />

                      {/* Nome da Cidade Polo */}
                      <text 
                        x={city.x} 
                        y={city.y - (11 / zoom)} 
                        textAnchor="middle" 
                        style={{ 
                          fill: '#ffffff', 
                          fontSize: `${11 / (zoom * 0.85)}px`, 
                          fontFamily: 'Inter', 
                          fontWeight: 'bold',
                          textShadow: '0px 1px 4px rgba(0,0,0,0.95)',
                          pointerEvents: 'none'
                        }}
                      >
                        {city.name}
                      </text>

                      {/* Micro-sites: Ativam mais cedo (zoom >= 1.4) e abrem bem mais espalhados (offsetDist ampliado) */}
                      {zoom >= 1.4 && city.sites.map((site, sIdx) => {
                        const angle = (sIdx * 2 * Math.PI) / city.sites.length;
                        
                        // RAIO DE EXPLOSÃO AMPLIADO: Multiplicado para espalhar bem na tela sem encavalar
                        const offsetDist = (48 + (city.sites.length * 3)) / zoom; 
                        
                        const siteX = city.x + Math.cos(angle) * offsetDist;
                        const siteY = city.y + Math.sin(angle) * offsetDist;
                        const isSiteSelected = selectedSite?.id === site.id;

                        return (
                          <g key={site.id} style={{ cursor: 'pointer' }} onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCity(city);
                            setSelectedSite(site);
                          }}>
                            {/* Linha pontilhada de acoplamento */}
                            <line x1={city.x} y1={city.y} x2={siteX} y2={siteY} stroke="#334155" strokeWidth={0.6 / zoom} strokeDasharray="3,3" />
                            
                            {/* Ponto do micro-site */}
                            <circle 
                              cx={siteX} 
                              cy={siteY} 
                              r={4.5 / zoom} 
                              fill={site.status === 'down' ? 'var(--red)' : 'var(--blue)'} 
                              stroke="#ffffff"
                              strokeWidth={0.5 / zoom}
                            />

                            {/* Sigla do Site bem nítida com sombra forte para leitura de NOC */}
                            <text 
                              x={siteX} 
                              y={siteY - (7 / zoom)} 
                              textAnchor="middle" 
                              style={{ 
                                fill: isSiteSelected ? '#22d3ee' : '#cbd5e1', 
                                fontSize: `${9 / zoom}px`, 
                                fontFamily: 'monospace',
                                fontWeight: 'bold',
                                textShadow: '0px 1px 3px rgba(0,0,0,1), 0px 0px 2px rgba(0,0,0,1)'
                              }}
                            >
                              {site.id}
                            </text>
                          </g>
                        );
                      })}
                    </g>
                  );
                })}
              </g>
            </svg>

            <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(0,0,0,0.85)', padding: '6px 12px', borderRadius: '4px', fontSize: '11px', color: '#94a3b8', pointerEvents: 'none', border: '1px solid #1e293b' }}>
              🖱️ <b>Scroll do Mouse:</b> Zoom In/Out • <b>Clique e Arraste:</b> Mover • <b>Dois Cliques:</b> Reset
            </div>
          </div>
        </div>

        {/* Lado Direito: Painel Operacional */}
        <div className="card" style={{ height: '74vh', display: 'flex', flexDirection: 'column', gap: '15px', overflowY: 'auto' }}>
          
          <div>
            <div className="card-head" style={{ marginBottom: '8px' }}>
              <h3 style={{ fontSize: '11px', color: 'var(--red)' }}>⚠️ Incidentes de Falta de Energia AC Detectados</h3>
            </div>
            <table className="data-table">
              <thead>
                <tr><th>ID Antena</th><th>Cidade Hub</th><th>Diagnóstico de Campo</th></tr>
              </thead>
              <tbody>
                {alarmSites.map(s => (
                  <tr key={s.id} onClick={() => {
                    const foundCity = cityClusters.find(c => c.name === s.cityName);
                    setSelectedCity(foundCity);
                    setSelectedSite(s);
                  }} style={{ cursor: 'pointer', background: selectedSite?.id === s.id ? 'rgba(255,49,49,0.06)' : 'transparent' }}>
                    <td style={{ fontWeight: 'bold', color: 'var(--red)' }}>{s.id}</td>
                    <td>{s.cityName}</td>
                    <td style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{s.incidente}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontStyle: 'normal', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>
                📋 Painel de Auditoria e Despacho Técnico
              </h3>
              
              {selectedSite ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ color: '#fff', margin: 0, fontFamily: 'monospace' }}>{selectedSite.id}</h2>
                    <span className={`chip ${selectedSite.status === 'down' ? 'red' : 'green'}`}>
                      {selectedSite.status === 'down' ? 'FALTA DE AC' : 'OPERACIONAL'}
                    </span>
                  </div>

                  <div className="grid-2" style={{ gap: '10px' }}>
                    <div>
                      <span style={{ fontSize: '9px', color: '#64748b', display: 'block' }}>ESTAÇÃO BASE</span>
                      <strong style={{ color: '#e6edf5', fontSize: '13px' }}>{selectedSite.name || selectedCity?.name}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '9px', color: '#64748b', display: 'block' }}>LOCALIDADE</span>
                      <strong style={{ color: '#e6edf5', fontSize: '13px' }}>{selectedCity?.name} ({selectedSite.type || 'Urbano'})</strong>
                    </div>
                  </div>

                  <div className="grid-2" style={{ gap: '10px' }}>
                    <div>
                      <span style={{ fontSize: '9px', color: '#64748b', display: 'block' }}>INFRAESTRUTURA</span>
                      <span style={{ color: '#94a3b8', fontSize: '12px' }}>{selectedSite.structure || 'Greenfield'}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '9px', color: '#64748b', display: 'block' }}>STATUS ELÉTRICO</span>
                      <span style={{ color: selectedSite.status === 'down' ? 'var(--amber)' : 'var(--green)', fontSize: '12px', fontWeight: 'bold' }}>
                        {selectedSite.status === 'down' ? 'Operando por Baterias / Crítico' : 'Rede Elétrica Normal'}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '15px', background: '#050b10', padding: '10px', borderRadius: '6px' }}>
                    <div>
                      <span style={{ fontSize: '9px', color: '#64748b', display: 'block' }}>LATITUDE REAL</span>
                      <code style={{ color: 'var(--blue)', fontSize: '12px' }}>{selectedSite.lat}</code>
                    </div>
                    <div>
                      <span style={{ fontSize: '9px', color: '#64748b', display: 'block' }}>LONGITUDE REAL</span>
                      <code style={{ color: 'var(--blue)', fontSize: '12px' }}>{selectedSite.lng}</code>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '25px', color: '#64748b', fontSize: '12px' }}>
                  <p>Nenhuma estação inspecionada.</p>
                  <p style={{ fontSize: '11px' }}>Aproxime o mapa com o scroll para abrir os IDs e clique diretamente em um ponto para auditá-lo.</p>
                </div>
              )}
            </div>

            {selectedSite && (
              <div style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${selectedSite.lat},${selectedSite.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    display: 'block', 
                    textAlign: 'center', 
                    textDecoration: 'none', 
                    fontWeight: 'bold', 
                    background: selectedSite.status === 'down' ? 'var(--red)' : 'var(--blue)', 
                    color: '#fff', 
                    padding: '10px', 
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                >
                  🗺️ Despachar Plantão Técnico (Google Maps)
                </a>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Sites5G;