import { AuthRepository } from "@/src/domain/auth/AuthRepository";
import { User } from "@/src/domain/auth/User";

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    user: User;
    token: string;
}

export class LoginUser {
    constructor(private authRepository: AuthRepository) {}

    async execute({ email, password }: LoginRequest): Promise<LoginResponse> {
        if (!email || !password) {
            throw new Error("E-mail e senha são obrigatórios");
        }

        return this.authRepository.login(email, password);
    }
}
