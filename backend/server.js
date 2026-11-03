import './src/config/env.js';
import app from './src/app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`IET 360° API running on port ${PORT}`);
});
