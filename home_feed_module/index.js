const express = require('express');
const routes = require('./api/routes');

const app = express();
app.use(express.json()); // Parse JSON bodies

// Mount routes under /api/v1
app.use('/api/v1', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Home Feed Module server running on port ${PORT}`);
});