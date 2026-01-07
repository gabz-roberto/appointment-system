import { AuthRepository } from "@/src/domain/auth/AuthRepository";
import { User } from "@/src/domain/auth/User";

export class GetCurrentUser {
    constructor(private authRepository: AuthRepository) {}

    async execute(): Promise<User | null> {
        return this.authRepository.getCurrentUser();
    }
}
