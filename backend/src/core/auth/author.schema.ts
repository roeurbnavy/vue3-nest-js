import { User } from "../users/schema/user.schama";

export class Author {
  expiresIn: string;
  accessToken: string;
  user: User;
}
