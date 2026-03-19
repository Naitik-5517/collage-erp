import { Consumer, Kafka, Producer } from "kafkajs";

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || "college-erp",
  brokers: (process.env.KAFKA_BROKERS || "localhost:9092").split(","),
});

export const producer: Producer = kafka.producer();
export const consumer: Consumer = kafka.consumer({
  groupId: process.env.KAFKA_GROUP_ID || "college-erp-group",
});

export async function connectProducer(): Promise<void> {
  await producer.connect();
  console.log("Kafka producer connected");
}

export async function disconnectProducer(): Promise<void> {
  await producer.disconnect();
  console.log("Kafka producer disconnected");
}

export async function connectConsumer(): Promise<void> {
  await consumer.connect();
  console.log("Kafka consumer connected");
}

export async function disconnectConsumer(): Promise<void> {
  await consumer.disconnect();
  console.log("Kafka consumer disconnected");
}

export { kafka };

