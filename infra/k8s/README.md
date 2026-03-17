# Kubernetes Deployment Guide

## Prerequisites

- Kubernetes cluster (1.24+)
- kubectl configured
- Helm 3.x
- Docker registry access

## Deployment Steps

### 1. Create Namespace

```bash
kubectl create namespace college-erp
```

### 2. Create Secrets

```bash
# Create database secret
kubectl create secret generic postgres-secret \
  --from-literal=username=college_erp_user \
  --from-literal=password=your-password \
  --from-literal=database=college_erp \
  -n college-erp

# Create JWT secret
kubectl create secret generic jwt-secret \
  --from-literal=secret=your-jwt-secret \
  --from-literal=refresh-secret=your-refresh-secret \
  -n college-erp

# Create external API keys
kubectl create secret generic api-keys \
  --from-literal=resend-api-key=your-key \
  --from-literal=twilio-sid=your-sid \
  --from-literal=twilio-token=your-token \
  -n college-erp
```

### 3. Apply ConfigMaps

```bash
kubectl apply -f infra/k8s/configmaps/
```

### 4. Deploy Storage

```bash
kubectl apply -f infra/k8s/storage/
```

### 5. Deploy Services

```bash
# Deploy infrastructure services first
kubectl apply -f infra/k8s/deployments/postgres.yml
kubectl apply -f infra/k8s/deployments/redis.yml
kubectl apply -f infra/k8s/deployments/kafka.yml

# Wait for infrastructure to be ready
kubectl wait --for=condition=ready pod -l app=postgres -n college-erp --timeout=300s

# Deploy application services
kubectl apply -f infra/k8s/deployments/
kubectl apply -f infra/k8s/services/
```

### 6. Setup Ingress

```bash
# Install ingress-nginx controller (if not already installed)
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace

# Apply ingress rules
kubectl apply -f infra/k8s/ingress/
```

### 7. Setup HPA (Horizontal Pod Autoscaler)

```bash
kubectl apply -f infra/k8s/hpa/
```

### 8. Setup Monitoring

```bash
# Install Prometheus Operator
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace

# Apply custom monitoring configs
kubectl apply -f infra/monitoring/k8s/
```

## Verification

```bash
# Check all pods are running
kubectl get pods -n college-erp

# Check services
kubectl get svc -n college-erp

# Check ingress
kubectl get ingress -n college-erp

# View logs
kubectl logs -f deployment/api-gateway -n college-erp
```

## Scaling

### Manual Scaling

```bash
kubectl scale deployment api-gateway --replicas=5 -n college-erp
```

### Auto Scaling

HPA is configured to scale between 2-10 replicas based on CPU/Memory usage.

```bash
kubectl get hpa -n college-erp
```

## Updates

### Rolling Update

```bash
kubectl set image deployment/api-gateway \
  api-gateway=your-registry/api-gateway:v1.1.0 \
  -n college-erp
```

### Rollback

```bash
kubectl rollout undo deployment/api-gateway -n college-erp
```

## Monitoring

### View Metrics

```bash
kubectl top pods -n college-erp
kubectl top nodes
```

### Access Grafana

```bash
kubectl port-forward -n monitoring svc/prometheus-grafana 3000:80
```

Then open http://localhost:3000

## Troubleshooting

### Pod Not Starting

```bash
kubectl describe pod <pod-name> -n college-erp
kubectl logs <pod-name> -n college-erp
```

### Service Not Accessible

```bash
kubectl get endpoints -n college-erp
kubectl describe svc <service-name> -n college-erp
```

### Database Connection Issues

```bash
# Test database connectivity
kubectl run -it --rm debug --image=postgres:16 --restart=Never -- \
  psql -h postgres -U college_erp_user -d college_erp
```

## Backup & Restore

### Database Backup

```bash
kubectl exec -it <postgres-pod> -n college-erp -- \
  pg_dump -U college_erp_user college_erp > backup.sql
```

### Database Restore

```bash
kubectl exec -i <postgres-pod> -n college-erp -- \
  psql -U college_erp_user college_erp < backup.sql
```

## Cleanup

```bash
kubectl delete namespace college-erp
```

## Production Checklist

- [ ] SSL certificates configured
- [ ] Secrets properly secured
- [ ] Resource limits set
- [ ] HPA configured
- [ ] Monitoring setup
- [ ] Logging configured
- [ ] Backup strategy in place
- [ ] Disaster recovery plan
- [ ] Security policies applied
- [ ] Network policies configured
