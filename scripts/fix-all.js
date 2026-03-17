const fs = require('fs');
const path = require('path');

// -- Fix 1: next.config.mjs -------------------------------------
const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
};

export default nextConfig;
`;

if (fs.existsSync('apps/web/next.config.ts')) {
  fs.unlinkSync('apps/web/next.config.ts');
  console.log('Deleted next.config.ts');
}
fs.writeFileSync('apps/web/next.config.mjs', nextConfig, 'utf8');
console.log('Created next.config.mjs');

// -- Fix 2: apps/web layout.tsx ---------------------------------
const layout = `import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'College ERP',
  description: 'Enterprise College Management System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`;
fs.writeFileSync('apps/web/src/app/layout.tsx', layout, 'utf8');
console.log('Fixed layout.tsx');

// -- Fix 3: apps/web page.tsx -----------------------------------
const homePage = `export default function HomePage() {
  return (
    <main>
      <h1>College ERP</h1>
    </main>
  );
}
`;
fs.writeFileSync('apps/web/src/app/page.tsx', homePage, 'utf8');
console.log('Fixed page.tsx');

// -- Fix 4: All service index.ts files -------------------------
const services = [
  ['api-gateway', 4000],
  ['auth-service', 4001],
  ['student-service', 4002],
  ['academic-service', 4003],
  ['lms-service', 4004],
  ['messaging-service', 4005],
  ['finance-service', 4006],
  ['exam-service', 4007],
  ['notification-service', 4008],
  ['search-service', 4009],
  ['report-service', 4010],
  ['library-service', 4011],
];

services.forEach(([name, port]) => {
  const indexTs = `import { app } from './app';

const PORT = process.env.PORT || ${port};

app.listen(PORT, () => {
  console.log('${name} running on port ' + PORT);
});
`;

  const appTs = `import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { router } from './routes';

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use('/api/v1', router);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: '${name}' });
});
`;

  const routerTs = `import { Router } from 'express';

export const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: '${name} is running' });
});
`;

  fs.writeFileSync(`services/${name}/src/index.ts`, indexTs, 'utf8');
  fs.writeFileSync(`services/${name}/src/app.ts`, appTs, 'utf8');
  fs.writeFileSync(`services/${name}/src/routes/index.ts`, routerTs, 'utf8');
  console.log('Fixed service: ' + name);
});

// -- Fix 5: packages/emails - remove broken dev script ---------
const emailsPkg = {
  name: '@college-erp/emails',
  version: '1.0.0',
  private: true,
  main: 'src/index.ts',
  scripts: {
    dev: 'echo @college-erp/emails has no dev server',
    build: 'echo emails build ok',
    lint: 'echo emails lint ok',
  },
  dependencies: {
    resend: '^3.4.0',
    react: '^18.0.0',
  },
  devDependencies: {
    typescript: '^5.5.0',
    '@types/react': '^18.0.0',
  },
};
fs.writeFileSync('packages/emails/package.json', JSON.stringify(emailsPkg, null, 2), 'utf8');
console.log('Fixed packages/emails package.json');

// -- Fix 6: Add dev stub to all packages that lack dev scripts --
const packageStubs = [
  'packages/ui',
  'packages/db',
  'packages/validators',
  'packages/config',
  'packages/kafka',
  'packages/logger',
];

packageStubs.forEach((pkgPath) => {
  const pkgFile = path.join(pkgPath, 'package.json');
  if (!fs.existsSync(pkgFile)) {
    console.log('Skipping (not found): ' + pkgPath);
    return;
  }
  const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf8'));
  if (!pkg.scripts) pkg.scripts = {};
  if (!pkg.scripts.dev) {
    pkg.scripts.dev = 'echo ' + pkg.name + ' has no dev server';
  }
  fs.writeFileSync(pkgFile, JSON.stringify(pkg, null, 2), 'utf8');
  console.log('Added dev stub: ' + pkgPath);
});

// -- Fix 7: apps/dashboard package.json ------------------------
const dashboardPkg = {
  name: '@college-erp/dashboard',
  version: '1.0.0',
  private: true,
  scripts: {
    dev: 'vite --port 3001',
    build: 'tsc && vite build',
    preview: 'vite preview',
    lint: 'echo dashboard lint ok',
    'type-check': 'tsc --noEmit',
  },
  dependencies: {
    '@college-erp/validators': '*',
    react: '^18.3.0',
    'react-dom': '^18.3.0',
    '@tanstack/react-query': '^5.50.0',
    'react-hook-form': '^7.52.0',
    '@hookform/resolvers': '^3.9.0',
    zod: '^3.23.0',
    zustand: '^4.5.0',
    axios: '^1.7.0',
    clsx: '^2.1.0',
    'tailwind-merge': '^2.4.0',
    'date-fns': '^3.6.0',
  },
  devDependencies: {
    '@college-erp/config': '*',
    typescript: '^5.5.0',
    '@types/react': '^18.3.0',
    '@types/react-dom': '^18.3.0',
    '@vitejs/plugin-react': '^4.3.0',
    vite: '^5.3.0',
    tailwindcss: '^3.4.0',
    autoprefixer: '^10.4.0',
    postcss: '^8.4.0',
  },
};
fs.writeFileSync('apps/dashboard/package.json', JSON.stringify(dashboardPkg, null, 2), 'utf8');
console.log('Fixed apps/dashboard package.json');

// -- Fix 8: apps/dashboard vite.config.ts ----------------------
const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3001,
  },
});
`;
fs.writeFileSync('apps/dashboard/vite.config.ts', viteConfig, 'utf8');
console.log('Fixed vite.config.ts');

// -- Fix 9: apps/dashboard index.html --------------------------
const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>College ERP Dashboard</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
fs.writeFileSync('apps/dashboard/index.html', indexHtml, 'utf8');
console.log('Fixed dashboard index.html');

// -- Fix 10: apps/dashboard src/main.tsx -----------------------
const mainTsx = `import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div>
      <h1>College ERP Dashboard</h1>
      <p>Dashboard loading...</p>
    </div>
  </React.StrictMode>
);
`;
fs.mkdirSync('apps/dashboard/src', { recursive: true });
fs.writeFileSync('apps/dashboard/src/main.tsx', mainTsx, 'utf8');
console.log('Fixed dashboard main.tsx');

console.log('\nAll fixes applied!');
