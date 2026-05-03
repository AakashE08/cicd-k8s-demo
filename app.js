const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CI/CD Pipeline — Aakash E</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { min-height: 100vh; background: #0f1117; display: flex; align-items: center; justify-content: center; font-family: 'Segoe UI', sans-serif; }
  .card { background: #1a1d27; border: 1px solid #2e3148; border-radius: 20px; padding: 48px 56px; max-width: 600px; width: 90%; text-align: center; }
  .badge { display: inline-block; background: #1e3a5f; color: #60a5fa; font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; padding: 6px 16px; border-radius: 20px; margin-bottom: 32px; }
  .avatar { width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #3b82f6, #8b5cf6); display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 700; color: white; margin: 0 auto 24px; }
  h1 { font-size: 32px; font-weight: 700; color: #f1f5f9; margin-bottom: 8px; }
  .roll { font-size: 14px; color: #64748b; letter-spacing: 1px; margin-bottom: 32px; }
  .divider { height: 1px; background: #2e3148; margin: 32px 0; }
  .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px; }
  .stat { background: #0f1117; border-radius: 12px; padding: 16px; }
  .stat-value { font-size: 20px; font-weight: 700; color: #60a5fa; }
  .stat-label { font-size: 11px; color: #475569; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px; }
  .pipeline { display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap; }
  .step { background: #0f1117; border: 1px solid #2e3148; border-radius: 8px; padding: 8px 14px; font-size: 12px; color: #94a3b8; display: flex; align-items: center; gap: 6px; }
  .step .dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; }
  .arrow { color: #334155; font-size: 12px; }
  .footer { margin-top: 32px; font-size: 12px; color: #334155; }
  .pulse { animation: pulse 2s infinite; }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
</style>
</head>
<body>
<div class="card">
  <div class="badge">CI/CD Pipeline — Live</div>
  <div class="avatar">AE</div>
  <h1>Aakash E</h1>
  <div class="roll">RA2311026010022</div>
  <div class="stats">
    <div class="stat">
      <div class="stat-value">3</div>
      <div class="stat-label">Replicas</div>
    </div>
    <div class="stat">
      <div class="stat-value" id="uptime">0s</div>
      <div class="stat-label">Uptime</div>
    </div>
    <div class="stat">
      <div class="stat-value">v1.0</div>
      <div class="stat-label">Version</div>
    </div>
  </div>
  <div class="divider"></div>
  <div class="pipeline">
    <div class="step"><span class="dot pulse"></span>GitHub</div>
    <div class="arrow">→</div>
    <div class="step"><span class="dot pulse"></span>Jenkins</div>
    <div class="arrow">→</div>
    <div class="step"><span class="dot pulse"></span>Docker Hub</div>
    <div class="arrow">→</div>
    <div class="step"><span class="dot pulse"></span>Kubernetes</div>
  </div>
  <div class="footer">SRM Institute of Science and Technology &nbsp;•&nbsp; DevOps Lab</div>
</div>
<script>
  const start = Date.now();
  setInterval(() => {
    const s = Math.floor((Date.now() - start) / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    document.getElementById('uptime').textContent = h > 0 ? h+'h '+m%60+'m' : m > 0 ? m+'m '+s%60+'s' : s+'s';
  }, 1000);
</script>
</body>
</html>`);
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on port ' + PORT);
});
