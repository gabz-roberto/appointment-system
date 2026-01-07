import { useEffect, useState } from "react";
import { Client } from "@/src/domain/client/Client";
import { ClientApiRepository } from "@/src/infrastructure/client/ClientApiRepository";
import { ListClients } from "@/src/application/client/ListClients";
import { ToggleClientStatus } from "@/src/application/client/ToggleClientStatus";

export function useClients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const repository = new ClientApiRepository();

    async function load(params?: { search?: string; page?: number }) {
        setLoading(true);
        setError(null);

        try {
            const useCase = new ListClients(repository);
            const data = await useCase.execute(params);
            setClients(data);
        } catch {
            setError("Erro ao carregar clientes");
        } finally {
            setLoading(false);
        }
    }

    async function toggleStatus(id: string, active: boolean) {
        try {
            const useCase = new ToggleClientStatus(repository);
            await useCase.execute({ id, active });
            await load();
        } catch {
            setError("Erro ao atualizar status");
        }
    }

    useEffect(() => {
        load();
    }, []);

    return {
        clients,
        loading,
        error,
        reload: load,
        toggleStatus,
    };
}
