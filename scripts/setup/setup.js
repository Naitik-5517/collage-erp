#!/usr/bin/env node

/**
 * Project Setup Script
 *
 * This script helps with initial project setup
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up College ERP...\n');

// Check Node version
const nodeVersion = process.version;
const requiredVersion = 'v20.0.0';
if (nodeVersion < requiredVersion) {
  console.error(`❌ Node.js ${requiredVersion} or higher is required. Current: ${nodeVersion}`);
  process.exit(1);
}
console.log(`✅ Node.js version: ${nodeVersion}`);

// Check if .env exists
if (!fs.existsSync('.env')) {
  console.log('📝 Creating .env file from .env.example...');
  fs.copyFileSync('.env.example', '.env');
  console.log('✅ .env file created. Please update it with your configuration.');
} else {
  console.log('✅ .env file already exists');
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed');
} catch (error) {
  console.error('❌ Failed to install dependencies');
  process.exit(1);
}

// Check if Docker is running
console.log('\n🐳 Checking Docker...');
try {
  execSync('docker --version', { stdio: 'pipe' });
  console.log('✅ Docker is available');

  console.log('\n🐳 Starting infrastructure services...');
  console.log('(PostgreSQL, Redis, Elasticsearch, Kafka)');
  execSync('docker-compose -f infra/docker/docker-compose.dev.yml up -d', { stdio: 'inherit' });
  console.log('✅ Infrastructure services started');

  // Wait for services to be ready
  console.log('\n⏳ Waiting for services to be ready (10 seconds)...');
  execSync('sleep 10', { stdio: 'inherit', shell: true });
} catch (error) {
  console.warn('⚠️  Docker is not available or not running. Please start Docker and run infrastructure manually.');
}

// Run database migrations
console.log('\n🗄️  Running database migrations...');
try {
  execSync('npm run db:migrate', { stdio: 'inherit' });
  console.log('✅ Database migrations completed');
} catch (error) {
  console.warn('⚠️  Failed to run migrations. You may need to run them manually later.');
}

// Seed database
console.log('\n🌱 Seeding database...');
try {
  execSync('npm run db:seed', { stdio: 'inherit' });
  console.log('✅ Database seeded');
} catch (error) {
  console.warn('⚠️  Failed to seed database. You may need to run it manually later.');
}

console.log('\n✨ Setup complete! ✨\n');
console.log('To start development:');
console.log('  npm run dev\n');
console.log('Or using Makefile:');
console.log('  make dev\n');
console.log('Services will be available at:');
console.log('  - API Gateway: http://localhost:8080');
console.log('  - Web App: http://localhost:3000');
console.log('  - Dashboard: http://localhost:3001');
console.log('  - Drizzle Studio: npm run db:studio\n');
console.log('Happy coding! 🎉');
