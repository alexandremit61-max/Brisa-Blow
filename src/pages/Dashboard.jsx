import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import KpiCard from '../components/KpiCard';

function Dashboard() {
  useEffect(() => {
    // Gráficos (Chart.js)
    const ctxPizza = document.getElementById('chartPizza');
    let chartPizza;
    if (ctxPizza) {
      chartPizza = new Chart(ctxPizza, {
        type: 'doughnut',
        data: {
          labels: ['Online', 'Alerta', 'Crítico'],
          datasets: [{
            data: [1432, 11, 2],
            backgroundColor: ['#00ff9d', '#ffae00', '#ff3131'],
            borderWidth: 0,
            cutout: '80%'
          }]
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: '#94a3b8', font: { family: 'Inter' } }
            }
          }
        }
      });
    }

    const ctxLinha = document.getElementById('chartLinha');
    let chartLinha;
    if (ctxLinha) {
      chartLinha = new Chart(ctxLinha, {
        type: 'line',
        data: {
          labels: ['00h', '04h', '08h', '12h', '16h', '20h', '24h'],
          datasets: [{
            label: 'Latência ms',
            data: [25, 32, 28, 45, 38, 52, 35],
            borderColor: '#ff4500',
            fill: true,
            backgroundColor: 'rgba(255, 69, 0, 0.05)',
            tension: 0.4,
            pointRadius: 2,
            pointBackgroundColor: '#ff4500'
          }]
        },
        options: {
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { color: '#1a2533' }, ticks: { color: '#94a3b8' } },
            y: { grid: { color: '#1a2533' }, ticks: { color: '#94a3b8' } }
          }
        }
      });
    }

    const ctxWireless = document.getElementById('chartWireless');
    let chartWireless;
    if (ctxWireless) {
      chartWireless = new Chart(ctxWireless, {
        type: 'bar',
        data: {
          labels: ['4G', '5G', '6E', 'Mesh', 'Backhaul'],
          datasets: [{
            data: [400, 950, 1300, 650, 1100],
            backgroundColor: ['#ff4500', '#00bfff', '#7c3aed', '#00ff9d', '#ffae00'],
            borderRadius: 6
          }]
        },
        options: {
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
            y: { grid: { color: '#1a2533' }, ticks: { color: '#94a3b8' } }
          }
        }
      });
    }

    return () => {
      if (chartPizza) chartPizza.destroy();
      if (chartLinha) chartLinha.destroy();
      if (chartWireless) chartWireless.destroy();
    };
  }, []);

  return (
    <div className="page active">
      <div className="page-head">
        <h1>Visão Operacional</h1>
        <p>Monitoramento em tempo real • 1,945 redes conectadas</p>
      </div>

      <div className="kpi-grid">
        <KpiCard 
          title="REDES TOTAIS." 
          value="1.248" 
          subValue="+2.4% contra o início"
          icon="/jangada-brisanet.png"
          isImage={true}
          lineColor="blue"
          fillId="fill-blue"
          dPath="M 0,25 Q 25,20 50,26 T 100,22"
          dFill="M 0,25 Q 25,20 50,26 T 100,22 L 100,30 L 0,30 Z"
          statusClass="up"
        />

        <KpiCard 
          title="SITES ONLINE" 
          value="2.654/176" 
          subValue="Estável • 88.9%" 
          icon="fa-solid fa-circle-check" 
          isImage={false}
          lineColor="green"
          fillId="fill-green"
          dPath="M 0,26 Q 30,22 60,27 T 100,24"
          dFill="M 0,26 Q 30,22 60,27 T 100,24 L 100,30 L 0,30 Z"
          statusClass="up"
        />

        <KpiCard 
          title="EM ALERTA" 
          value="1" 
          subValue="1 link com jitter alto" 
          icon="fa-solid fa-triangle-exclamation" 
          isImage={false}
          lineColor="amber"
          fillId="fill-amber"
          dPath="M 0,24 Q 25,27 50,23 T 100,25"
          dFill="M 0,24 Q 25,27 50,23 T 100,25 L 100,30 L 0,30 Z"
          statusClass="warn"
        />

        <KpiCard 
          title="CRÍTICOS" 
          value="0" 
          subValue="Nenhum incidente" 
          icon="fa-solid fa-circle-xmark" 
          isImage={false}
          lineColor="red"
          fillId="fill-red"
          dPath="M 0,27 L 100,27"
          dFill="M 0,27 L 100,27 L 100,30 L 0,30 Z"
          statusClass="ok"
        />

        <KpiCard 
          title="LATÊNCIA MÉDIA" 
          value="28ms" 
          subValue="Linha de base < 50ms" 
          icon="fa-solid fa-stopwatch" 
          isImage={false}
          lineColor="blue"
          fillId="fill-latency"
          dPath="M 0,23 Q 20,20 40,25 T 100,22"
          dFill="M 0,23 Q 20,20 40,25 T 100,22 L 100,30 L 0,30 Z"
          statusClass="ok"
        />

        <KpiCard 
          title="PERFORMANCE IA" 
          value="98%" 
          subValue="+1.2% precisão" 
          icon="fa-solid fa-brain" 
          isImage={false}
          lineColor="purple"
          fillId="fill-purple"
          dPath="M 0,25 Q 30,27 60,22 T 100,23"
          dFill="M 0,25 Q 30,27 60,22 T 100,23 L 100,30 L 0,30 Z"
          statusClass="up"
        />
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-head">
            <h3>Status Geral Sites</h3>
            <span className="chip green">Operacional</span>
          </div>
          <div className="canvas-wrap">
            <canvas id="chartPizza"></canvas>
          </div>
        </div>
        
        <div className="card">
          <div className="card-head">
            <h3>Latência & Performance</h3>
            <span className="chip blue">Realtime</span>
          </div>
          <div className="canvas-wrap">
            <canvas id="chartLinha"></canvas>
          </div>
        </div>
      </div>
      
      <div className="grid-2 mt">
        <div className="card">
          <div className="card-head">
            <h3>Health Summary</h3>
            <button className="btn-link" style={{ background: 'none', border: 'none', color: 'var(--orange)', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>
              Ver todas <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Rede</th>
                <th>Health</th>
                <th>Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fortaleza</td>
                <td><span className="chip green">Fair</span></td>
                <td>91</td>
                <td>Stable</td>
              </tr>
              <tr>
                <td>Recife</td>
                <td><span className="chip green">OK</span></td>
                <td>95</td>
                <td>Online</td>
              </tr>
              <tr>
                <td>Natal</td>
                <td><span className="chip amber">Watch</span></td>
                <td>82</td>
                <td>Investigating</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="card">
          <div className="card-head">
            <h3>Wireless Load</h3>
            <span className="chip purple">Analytics</span>
          </div>
          <div className="canvas-wrap">
            <canvas id="chartWireless"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;