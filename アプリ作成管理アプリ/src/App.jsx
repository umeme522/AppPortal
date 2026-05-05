import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { apps } from './data/apps';
import './App.css';

const AppCard = ({ app, index }) => {
  const Icon = Icons[app.icon] || Icons.AppWindow;

  return (
    <motion.div
      className="app-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => window.open(app.externalLink, '_blank')}
    >
      <div 
        className="icon-wrapper" 
        style={{ background: `linear-gradient(135deg, ${app.color}dd, ${app.color})` }}
      >
        <Icon size={28} color="white" />
      </div>
      
      <h2 className="app-title">{app.title}</h2>
      <p className="app-description">{app.description}</p>
      
      <div className="update-info">
        <div className="date-row">
          <div className="date-item">
            <span className="date-label">Created</span>
            <span className="date-value">{app.createdAt}</span>
          </div>
          <div className="date-item">
            <span className="date-label">Last Update</span>
            <span className="date-value">{app.updatedAt}</span>
          </div>
        </div>
        <div className="update-content">
          {app.updateSummary}
        </div>
      </div>
    </motion.div>
  );
};

function App() {
  return (
    <div className="container">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>App Collection</h1>
        <p className="subtitle">
          これまでに開発したアプリケーションの記録とポートフォリオ。
          各カードをクリックすると、アプリのページへ移動します。
        </p>
      </motion.header>

      <div className="app-grid">
        {apps.map((app, index) => (
          <AppCard key={app.id} app={app} index={index} />
        ))}
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{ marginTop: '4rem', color: '#64748b', fontSize: '0.875rem' }}
      >
        © 2026 Antigravity Portfolio
      </motion.footer>
    </div>
  );
}

export default App;
