export interface KafkaMessage<T = unknown> {
  topic: string;
  key?: string;
  value: T;
  timestamp?: number;
  headers?: Record<string, string>;
}

export interface UserCreatedEvent {
  userId: string;
  email: string;
  name: string;
  role: string;
  timestamp: string;
}

export interface UserLoggedInEvent {
  userId: string;
  email: string;
  ipAddress?: string | undefined;
  deviceInfo?: string | undefined;
  timestamp: string;
}

export interface PasswordResetRequestedEvent {
  userId: string;
  email: string;
  timestamp: string;
}

export interface PasswordChangedEvent {
  userId: string;
  email: string;
  timestamp: string;
}
