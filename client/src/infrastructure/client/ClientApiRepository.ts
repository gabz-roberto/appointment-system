import { ClientRepository } from "@/src/domain/client/ClientRepository";
import { Client } from "@/src/domain/client/Client";
import { ApiClient } from "../http/apiClient";

export class ClientApiRepository implements ClientRepository {
    private api = new ApiClient();

    async list(params?: { search?: string; page?: number }): Promise<Client[]> {
        const query = new URLSearchParams(params as any).toString();
        return this.api.get<Client[]>(`/clients?${query}`);
    }

    async getById(id: string): Promise<Client | null> {
        return this.api.get<Client>(`/clients/${id}`);
    }

    async update(id: string, data: Partial<Client>): Promise<void> {
        await this.api.put(`/clients/${id}`, data);
    }

    async toggleStatus(id: string, active: boolean): Promise<void> {
        await this.api.put(`/clients/${id}/status`, { active });
    }
}
