#!/usr/bin/env node

/**
 * Dependency Checker
 *
 * Checks for outdated dependencies and security vulnerabilities
 */

const { execSync } = require('child_process');

console.log('🔍 Checking dependencies...\n');

// Check for outdated packages
console.log('📦 Checking for outdated packages...');
try {
  execSync('npm outdated', { stdio: 'inherit' });
} catch (error) {
  // npm outdated exits with 1 if there are outdated packages
}

// Run security audit
console.log('\n🔒 Running security audit...');
try {
  execSync('npm audit', { stdio: 'inherit' });
  console.log('✅ No security vulnerabilities found');
} catch (error) {
  console.error('⚠️  Security vulnerabilities found. Run "npm audit fix" to fix them.');
}

console.log('\n✨ Dependency check complete');
