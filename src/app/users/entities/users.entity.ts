export const USER_ROLE = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export const CHAT_STATUS = {
  INACTIVE: 'INACTIVE',
  ACTIVE: 'ACTIVE',
  RESOLVED: 'RESOLVED',
  DISABLE: 'DISABLE',
} as const;

export type ObjectValue<T> = T[keyof T];
export type UserRole = ObjectValue<typeof USER_ROLE>;

export class UserEntity {
  id: string;
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
