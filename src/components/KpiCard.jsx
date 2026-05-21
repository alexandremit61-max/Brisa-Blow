import React from 'react';

function KpiCard({ title, value, subValue, icon, isImage, lineColor, fillId, dPath, dFill, statusClass }) {
  return (
    <div className="kpi card">
      <div className="kpi-top">
        <span className="kpi-label">{title}</span>
        {/* Se for imagem (logo), renderiza a tag img, senão renderiza o ícone do font-awesome */}
        {isImage ? (
          <img src={icon} className="brand-jangada" alt="icon" style={{ width: '18px', height: 'auto' }} />
        ) : (
          <i className={`${icon} ${lineColor}-ic`}></i>
        )}
      </div>
      
      {/* Informações agrupadas no topo de forma limpa e visível */}
      <div>
        <div className="kpi-value">{value}</div>
        <div className={`kpi-foot ${statusClass}`}>{subValue}</div>
      </div>
      
      {/* Gráfico isolado no fundo/chão do card */}
      <svg className="sparkline" viewBox="0 0 100 30" preserveAspectRatio="none" width="100%">
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={`var(--${lineColor})`} stopOpacity="0.3" />
            <stop offset="100%" stopColor={`var(--${lineColor})`} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path d={dFill} fill={`url(#${fillId})`} />
        <path d={dPath} fill="none" stroke={`var(--${lineColor})`} strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default KpiCard;