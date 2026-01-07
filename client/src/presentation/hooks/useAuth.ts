import { useState } from "react";
import { AuthApiRepository } from "@/src/infrastructure/auth/AuthApiRepository";
import { LoginUser } from "@/src/application/auth/LoginUser";
import { GetCurrentUser } from "@/src/application/auth/GetCurrentUser";
import { LogoutUser } from "@/src/application/auth/LogoutUser";
import { User } from "@/src/domain/auth/User";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const repository = new AuthApiRepository();

    async function login(email: string, password: string) {
        setLoading(true);
        setError(null);

        try {
            const useCase = new LoginUser(repository);
            const { user } = await useCase.execute({ email, password });
            setUser(user);
            return true;
        } catch (err) {
            setError("E-mail ou senha inválidos");
            return false;
        } finally {
            setLoading(false);
        }
    }

    async function loadUser() {
        try {
            const useCase = new GetCurrentUser(repository);
            const user = await useCase.execute();
            setUser(user);
        } catch {
            setUser(null);
        }
    }

    async function logout() {
        const useCase = new LogoutUser(repository);
        await useCase.execute();
        setUser(null);
    }

    return {
        user,
        loading,
        error,
        login,
        logout,
        loadUser,
        isAuthenticated: !!user,
    };
}
