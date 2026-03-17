# Monitoring Infrastructure

This directory contains monitoring and observability configurations for College ERP.

## Components

### Prometheus
- Metrics collection and storage
- Alerting rules
- Service discovery
- Config: `prometheus/prometheus.yml`

### Grafana
- Metrics visualization
- Dashboards
- Alerting
- Config: `grafana/`

### Loki
- Log aggregation
- Log querying
- Integration with Grafana

### Jaeger
- Distributed tracing
- Performance monitoring
- Request flow visualization

## Setup

### With Docker Compose

```bash
cd infra/monitoring
docker-compose up -d
```

### With Kubernetes

```bash
kubectl apply -f k8s/monitoring/
```

## Access

- **Grafana**: http://localhost:3000
  - Default credentials: admin/admin
- **Prometheus**: http://localhost:9090
- **Jaeger**: http://localhost:16686

## Dashboards

### Application Dashboards
- API Gateway Overview
- Service Performance
- Error Rates
- Request Latency

### Infrastructure Dashboards
- Kubernetes Cluster
- Node Metrics
- Pod Metrics
- Database Performance

### Business Dashboards
- Student Enrollments
- API Usage
- System Health

## Alerts

Alerts are configured in `prometheus/rules/alerts.yml`:

- Service down
- High error rate
- High response time
- Resource exhaustion
- Database issues
- Kafka lag

Alerts are sent to Slack/Email via Alertmanager.

## Metrics

### Application Metrics
- `http_requests_total` - Total HTTP requests
- `http_request_duration_seconds` - Request duration
- `http_request_size_bytes` - Request size
- `http_response_size_bytes` - Response size

### Database Metrics
- `db_query_duration_seconds` - Query duration
- `db_pool_active_connections` - Active connections
- `db_pool_idle_connections` - Idle connections

### Kafka Metrics
- `kafka_messages_sent_total` - Messages sent
- `kafka_messages_received_total` - Messages received
- `kafka_consumer_lag` - Consumer lag

## Best Practices

1. **Alert on symptoms, not causes**
2. **Set appropriate thresholds**
3. **Avoid alert fatigue**
4. **Document runbooks for alerts**
5. **Regular dashboard reviews**
6. **Archive old metrics**

## Troubleshooting

### Prometheus not scraping
- Check service endpoints
- Verify network connectivity
- Check Prometheus logs

### Missing metrics
- Verify service exports metrics
- Check metric names
- Review Prometheus config

### High cardinality
- Review label values
- Aggregate where possible
- Use recording rules
