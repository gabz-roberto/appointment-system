import { User } from "./User";

export interface AuthRepository {
    login(
        email: string,
        password: string
    ): Promise<{ user: User; token: string }>;
    logout(): Promise<void>;
    getCurrentUser(): Promise<User | null>;
}
