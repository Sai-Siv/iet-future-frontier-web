export const corsOptions = {
  origin: [
    'http://localhost:8081',
    'http://localhost:8080',
    'http://localhost:3000',
    'http://localhost:5173',
    'https://iet-future-frontier-web.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposedHeaders: ['Content-Type'],
  credentials: true
};
