#!/usr/bin/env node

/**
 * Deployment Validation Script
 *
 * Validates that the application is ready for deployment
 */

const fs = require('fs');
const { execSync } = require('child_process');

const checks = [];

function addCheck(name, fn) {
  checks.push({ name, fn });
}

// Check 1: All tests pass
addCheck('Tests', () => {
  execSync('npm run test', { stdio: 'pipe' });
});

// Check 2: No linting errors
addCheck('Linting', () => {
  execSync('npm run lint', { stdio: 'pipe' });
});

// Check 3: No type errors
addCheck('Type Checking', () => {
  execSync('npm run type-check', { stdio: 'pipe' });
});

// Check 4: Build succeeds
addCheck('Build', () => {
  execSync('npm run build', { stdio: 'pipe' });
});

// Check 5: Required environment variables are present
addCheck('Environment Variables', () => {
  const required = [
    'DATABASE_URL',
    'REDIS_URL',
    'JWT_SECRET',
    'JWT_REFRESH_SECRET',
  ];

  require('dotenv').config();

  const missing = required.filter(key => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
});

// Check 6: No security vulnerabilities
addCheck('Security Audit', () => {
  execSync('npm audit --audit-level=high', { stdio: 'pipe' });
});

console.log('🚀 Validating deployment readiness...\n');

let passed = 0;
let failed = 0;

for (const check of checks) {
  process.stdout.write(`Checking ${check.name}... `);

  try {
    check.fn();
    console.log('✅ PASS');
    passed++;
  } catch (error) {
    console.log('❌ FAIL');
    console.error(`  ${error.message}`);
    failed++;
  }
}

console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  console.error('\n❌ Deployment validation failed!');
  process.exit(1);
} else {
  console.log('\n✅ All checks passed! Ready to deploy.');
}
