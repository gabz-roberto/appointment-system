import { AuthRepository } from "@/src/domain/auth/AuthRepository";
import { User } from "@/src/domain/auth/User";
import { ApiClient } from "../http/apiClient";

interface LoginResponseDTO {
    user: User;
    token: string;
}

export class AuthApiRepository implements AuthRepository {
    private api = new ApiClient();

    async login(
        email: string,
        password: string
    ): Promise<{ user: User; token: string }> {
        const response = await this.api.post<LoginResponseDTO>("/auth/login", {
            email,
            password,
        });

        if (typeof window !== "undefined") {
            localStorage.setItem("token", response.token);
        }

        return response;
    }

    async logout(): Promise<void> {
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
        }
    }

    async getCurrentUser(): Promise<User | null> {
        try {
            return await this.api.get<User>("/auth/me");
        } catch {
            return null;
        }
    }
}
