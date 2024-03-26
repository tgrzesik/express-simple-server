const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/wait10', async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 10 seconds
    res.status(200).json({ message: 'Timeout completed (10 seconds)' });
  });

  server.get('/wait20', async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 20000)); // Wait for 20 seconds
    res.status(200).json({ message: 'Timeout completed (20 seconds)' });
  });

  server.get('/wait30', async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 30000)); // Wait for 30 seconds
    res.status(200).json({ message: 'Timeout completed (30 seconds)' });
  });

  server.get('/wait90', async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 90000)); // Wait for 90 seconds
    res.status(200).json({ message: 'Timeout completed (90 seconds)' });
  });

  server.get('/', (req, res) => {
    const links = [
      { url: '/wait10', description: '10 seconds' },
      { url: '/wait20', description: '20 seconds' },
      { url: '/wait30', description: '30 seconds' },
      { url: '/wait90', description: '90 seconds' }
    ];
    const body = links.map(link => `<a href="${link.url}">${link.description}</a>`).join('<br>');
    res.status(200).send(body);
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 8080;
  server.listen(PORT, (err) => {
    if (err) {
      console.error('Error starting server:', err);
      return;
    }
    console.log(`Next.js server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Error initializing Next.js:', err);
});