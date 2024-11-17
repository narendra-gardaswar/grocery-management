import { UserRole } from '@users/entities/users.entity';

export class UserTokens {
  id: string;
  role: UserRole;
  access_token: string;
  token_type: string;
  expires_in: number;
}
