const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
require('dotenv').load();

const API_BASE_URL='https://api.unsplash.com';
const API_RANDOM_URL=`${API_BASE_URL}/photos/random`;
const API_KEY=process.env.UNSPLASH_API_KEY;
const API_URL=`${API_RANDOM_URL}?client_id=${API_KEY}`

router.get('/', async (req, res, next) => {
  const { w, h } = req.query;
  const err = {error: "missing 'w' and/or 'h' query parameters"}
  if (!w || !h) {
    return res.status(400).send(err);
  };
  const fetchUrl = `${API_URL}&w=${w}&h=${h}`;
  try {
    const response = await fetch(fetchUrl).then(r => r.json());
    const img_url = response.urls.custom;
    res.send({ img_url });
  }
  catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
