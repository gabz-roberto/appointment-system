import { ClientRepository } from "@/src/domain/client/ClientRepository";
import { Client } from "@/src/domain/client/Client";

interface ListClientsParams {
    search?: string;
    page?: number;
}

export class ListClients {
    constructor(private repository: ClientRepository) {}

    async execute(params?: ListClientsParams): Promise<Client[]> {
        return this.repository.list(params);
    }
}
