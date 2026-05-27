import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Metro from './pages/Metro';
import Dwdm from './pages/Dwdm';
import Sites5G from './pages/Sites5G';
import Alarms from './pages/Alarms';
import Analytics from './pages/Analytics';
import AiAssistant from './components/AiAssistant';

function App() {
  const [page, setPage] = useState('dashboard');
  const [theme, setTheme] = useState('dark'); 
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard />;
      case 'metro': return <Metro />;
      case 'dwdm': return <Dwdm />;
      case '5g': return <Sites5G />;
      case 'alarms': return <Alarms />; 
      case 'analytics': return <Analytics />; 
      case 'settings': return <div className="page active"><h1>Configurações do Sistema</h1></div>;
      default: return <Dashboard />;
    }
  };

  return (
    <div className={`app-shell ${theme}`}>
      <Sidebar 
        onPageChange={setPage} 
        currentPage={page} 
        isCollapsed={isSidebarCollapsed} 
        toggleSidebar={toggleSidebar}
      />

      <div className="main">
        <Topbar 
          currentPage={page} 
          toggleTheme={toggleTheme} 
          currentTheme={theme} 
        />

        <section className="view" id="view">
          {renderPage()}
        </section>

        <AiAssistant />
        <div className="system-footer-line"></div>
      </div>
    </div>
  );
}

export default App;