const express = require('express');
const expressWs = require('express-ws');

const app = express();
const wsInstance = expressWs(app);

app.ws('/ws', (ws, req) => {
  let start = Date.now();

  const interval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - start) / 1000);
    ws.send(JSON.stringify({ seconds: elapsed }));
  }, 1000);

  setTimeout(() => {
    clearInterval(interval);
    ws.close();
  }, 90000); // Zamykamy połączenie po 90 sekundach
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
