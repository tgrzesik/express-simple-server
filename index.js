const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/wait10', async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 10000));
    res.status(200).json({ message: 'Timeout 10' });
  });

  server.get('/wait20', async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 20000));
    res.status(200).json({ message: 'Timeout 20' });
  });

  server.get('/wait30', async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 30000));
    res.status(200).json({ message: 'Timeout 30' });
  });

  server.get('/wait90', async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 90000));
    res.status(200).json({ message: 'Timeout 90' });
  });

  server.get('/wait120', async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 120000));
    res.status(200).json({ message: 'Timeout 120' });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 8080;
  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});