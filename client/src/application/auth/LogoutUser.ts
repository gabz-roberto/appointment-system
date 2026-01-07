import { AuthRepository } from "@/src/domain/auth/AuthRepository";

export class LogoutUser {
    constructor(private authRepository: AuthRepository) {}

    async execute(): Promise<void> {
        await this.authRepository.logout();
    }
}
