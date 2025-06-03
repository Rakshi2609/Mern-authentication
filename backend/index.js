import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Proper __dirname replacement for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Test routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/test-cookie', (req, res) => {
  console.log('Cookies:', req.cookies);
  res.send('Check console');
});

app.use('/api/auth', authRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, 'frontend/dist');
  console.log('🌐 Running in production mode');
  console.log('📁 Serving static files from:', distPath);

  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    console.log('💡 Catch-all route hit, serving index.html');
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  console.log('⚠️ Not in production mode. NODE_ENV =', process.env.NODE_ENV);
}

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on ${PORT}`);
  connectDB();
});
