import { metrics } from '@opentelemetry/api';

const meter = metrics.getMeter('college-erp');

/**
 * Counter metric
 */
export class Counter {
  private counter;

  constructor(name: string, description?: string) {
    this.counter = meter.createCounter(name, { description });
  }

  increment(value = 1, attributes?: Record<string, any>) {
    this.counter.add(value, attributes);
  }
}

/**
 * Histogram metric
 */
export class Histogram {
  private histogram;

  constructor(name: string, description?: string) {
    this.histogram = meter.createHistogram(name, { description });
  }

  record(value: number, attributes?: Record<string, any>) {
    this.histogram.record(value, attributes);
  }
}

/**
 * Observable Gauge metric
 */
export class Gauge {
  private gauge;

  constructor(name: string, callback: () => number, description?: string) {
    this.gauge = meter.createObservableGauge(name, {
      description,
    });

    this.gauge.addCallback((observableResult) => {
      observableResult.observe(callback());
    });
  }
}

// Pre-defined metrics
export const httpRequestsTotal = new Counter('http_requests_total', 'Total HTTP requests');
export const httpRequestDuration = new Histogram('http_request_duration_seconds', 'HTTP request duration');
export const databaseQueryDuration = new Histogram('database_query_duration_seconds', 'Database query duration');
export const kafkaMessagesSent = new Counter('kafka_messages_sent_total', 'Total Kafka messages sent');
export const kafkaMessagesReceived = new Counter('kafka_messages_received_total', 'Total Kafka messages received');
