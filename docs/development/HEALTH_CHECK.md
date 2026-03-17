# Health Check

Basic health check endpoint for all services.

## Usage

```typescript
import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version,
    dependencies: {
      database: {
        status: 'up',
        latency: 5,
      },
      redis: {
        status: 'up',
        latency: 2,
      },
    },
  });
});

export default router;
```

## Response Format

```json
{
  "status": "healthy" | "unhealthy" | "degraded",
  "timestamp": "2026-03-17T10:00:00.000Z",
  "uptime": 12345,
  "version": "1.0.0",
  "dependencies": {
    "database": {
      "status": "up" | "down",
      "latency": 5
    },
    "redis": {
      "status": "up" | "down",
      "latency": 2
    }
  }
}
```

## Kubernetes Liveness/Readiness

Add to your deployment:

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
```
