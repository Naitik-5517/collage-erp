#!/usr/bin/env node

/**
 * Database Restore Script
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const BACKUP_DIR = path.join(__dirname, '../../backups');

// Get list of backups
const backups = fs.readdirSync(BACKUP_DIR)
  .filter(f => f.startsWith('backup-') && f.endsWith('.sql'))
  .sort()
  .reverse();

if (backups.length === 0) {
  console.error('❌ No backups found in', BACKUP_DIR);
  process.exit(1);
}

console.log('Available backups:\n');
backups.forEach((file, index) => {
  const stat = fs.statSync(path.join(BACKUP_DIR, file));
  console.log(`${index + 1}. ${file} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('\nEnter backup number to restore (or 0 to cancel): ', (answer) => {
  const index = parseInt(answer) - 1;

  if (index < 0 || index >= backups.length) {
    console.log('❌ Invalid selection. Exiting.');
    rl.close();
    return;
  }

  const backupFile = path.join(BACKUP_DIR, backups[index]);

  rl.question('\n⚠️  This will overwrite the current database. Continue? (yes/no): ', (confirm) => {
    if (confirm.toLowerCase() !== 'yes') {
      console.log('❌ Restore cancelled.');
      rl.close();
      return;
    }

    console.log(`\n📥 Restoring from ${backups[index]}...`);

    try {
      require('dotenv').config();
      const dbUrl = process.env.DATABASE_URL;

      if (!dbUrl) {
        throw new Error('DATABASE_URL not found in environment');
      }

      const url = new URL(dbUrl);
      const user = url.username;
      const password = url.password;
      const host = url.hostname;
      const port = url.port || 5432;
      const database = url.pathname.slice(1);

      // Drop and recreate database
      console.log('Dropping database...');
      execSync(`PGPASSWORD="${password}" psql -h ${host} -p ${port} -U ${user} -c "DROP DATABASE IF EXISTS ${database};"`, { stdio: 'inherit' });

      console.log('Creating database...');
      execSync(`PGPASSWORD="${password}" psql -h ${host} -p ${port} -U ${user} -c "CREATE DATABASE ${database};"`, { stdio: 'inherit' });

      console.log('Restoring backup...');
      execSync(`PGPASSWORD="${password}" psql -h ${host} -p ${port} -U ${user} -d ${database} -f ${backupFile}`, { stdio: 'inherit' });

      console.log('✅ Restore completed successfully!');
    } catch (error) {
      console.error('❌ Restore failed:', error.message);
      process.exit(1);
    } finally {
      rl.close();
    }
  });
});
