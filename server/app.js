import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3003;

app.use(express.json());

app.get('/api/search', async (req, res) => {
  const { q } = req.query;
  const apiUrl = `https://magneto.api.halodoc.com/api/v1/buy-medicine/products/search/${q}`;
  const apiResponse = await fetch(apiUrl);
  const jsonData = await apiResponse.json();

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(jsonData);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
