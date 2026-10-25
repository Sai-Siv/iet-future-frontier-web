/**
 * IET 360° - Microservices Orchestrator Entrypoint
 * Boots the API Gateway along with all MVC Microservices.
 */

import dotenv from 'dotenv';
dotenv.config();

console.log('====================================================');
console.log(' 🚀 Starting IET 360° Microservices Stack 🚀');
console.log('====================================================');

// Start individual MVC microservices
await import('./services/protoplanet-service/server.js');
await import('./services/patn-service/server.js');
await import('./services/startupsphere-service/server.js');
await import('./services/appastral-service/server.js');
await import('./services/innothon-service/server.js');
await import('./services/awards-service/server.js');

// Start API Gateway (Port 5000)
await import('./gateway/server.js');

console.log('====================================================');
console.log(' ✅ All Microservices & API Gateway Active');
console.log('====================================================');
