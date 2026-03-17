#!/usr/bin/env node

/**
 * Database Backup Script
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BACKUP_DIR = path.join(__dirname, '../../backups');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupFile = path.join(BACKUP_DIR, `backup-${timestamp}.sql`);

// Create backup directory if it doesn't exist
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

console.log('📦 Creating database backup...');
console.log(`Backup file: ${backupFile}`);

try {
  // Get database URL from environment
  require('dotenv').config();
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    throw new Error('DATABASE_URL not found in environment');
  }

  // Parse database URL
  const url = new URL(dbUrl);
  const user = url.username;
  const password = url.password;
  const host = url.hostname;
  const port = url.port || 5432;
  const database = url.pathname.slice(1);

  // Run pg_dump
  const command = `PGPASSWORD="${password}" pg_dump -h ${host} -p ${port} -U ${user} -d ${database} -F p -f ${backupFile}`;
  execSync(command, { stdio: 'inherit' });

  console.log('✅ Backup created successfully!');
  console.log(`File: ${backupFile}`);

  // Clean up old backups (keep last 30)
  const files = fs.readdirSync(BACKUP_DIR)
    .filter(f => f.startsWith('backup-'))
    .sort()
    .reverse();

  if (files.length > 30) {
    console.log('\n🧹 Cleaning up old backups...');
    files.slice(30).forEach(file => {
      fs.unlinkSync(path.join(BACKUP_DIR, file));
      console.log(`Deleted: ${file}`);
    });
  }
} catch (error) {
  console.error('❌ Backup failed:', error.message);
  process.exit(1);
}
