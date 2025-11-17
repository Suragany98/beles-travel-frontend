// src/types/message.types.ts

export type MessageStatus = 'NEW' | 'READ' | 'REPLIED';

export const MessageStatus = {
  NEW: 'NEW' as const,
  READ: 'READ' as const,
  REPLIED: 'REPLIED' as const,
};

export interface Message {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
}

export interface MessageListParams {
  page?: number;
  limit?: number;
  status?: MessageStatus;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface MessageListResponse {
  messages: Message[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
