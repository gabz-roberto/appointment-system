import { Client } from "./Client";

export interface ClientRepository {
    list(params?: { search?: string; page?: number }): Promise<Client[]>;

    getById(id: string): Promise<Client | null>;

    update(id: string, data: Partial<Client>): Promise<void>;

    toggleStatus(id: string, active: boolean): Promise<void>;
}
