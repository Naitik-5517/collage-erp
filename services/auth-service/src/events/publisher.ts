import type {
    PasswordChangedEvent,
    PasswordResetRequestedEvent,
    UserCreatedEvent,
    UserLoggedInEvent,
} from "@college-erp/kafka";
import { connectProducer, producer, TOPICS } from "@college-erp/kafka";

class EventPublisher {
  private isConnected = false;

  async connect(): Promise<void> {
    if (!this.isConnected) {
      await connectProducer();
      this.isConnected = true;
    }
  }

  async publishUserCreated(event: UserCreatedEvent): Promise<void> {
    await this.connect();
    await producer.send({
      topic: TOPICS.USER_CREATED,
      messages: [
        {
          key: event.userId,
          value: JSON.stringify(event),
          headers: {
            eventType: "USER_CREATED",
            timestamp: new Date().toISOString(),
          },
        },
      ],
    });
  }

  async publishUserLoggedIn(event: UserLoggedInEvent): Promise<void> {
    await this.connect();
    await producer.send({
      topic: TOPICS.USER_LOGGED_IN,
      messages: [
        {
          key: event.userId,
          value: JSON.stringify(event),
          headers: {
            eventType: "USER_LOGGED_IN",
            timestamp: new Date().toISOString(),
          },
        },
      ],
    });
  }

  async publishPasswordResetRequested(
    event: PasswordResetRequestedEvent
  ): Promise<void> {
    await this.connect();
    await producer.send({
      topic: TOPICS.PASSWORD_RESET_REQUESTED,
      messages: [
        {
          key: event.userId,
          value: JSON.stringify(event),
          headers: {
            eventType: "PASSWORD_RESET_REQUESTED",
            timestamp: new Date().toISOString(),
          },
        },
      ],
    });
  }

  async publishPasswordChanged(event: PasswordChangedEvent): Promise<void> {
    await this.connect();
    await producer.send({
      topic: TOPICS.PASSWORD_CHANGED,
      messages: [
        {
          key: event.userId,
          value: JSON.stringify(event),
          headers: {
            eventType: "PASSWORD_CHANGED",
            timestamp: new Date().toISOString(),
          },
        },
      ],
    });
  }
}

export const eventPublisher = new EventPublisher();
