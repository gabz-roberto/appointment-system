import { ClientRepository } from "@/src/domain/client/ClientRepository";

interface ToggleClientStatusRequest {
    id: string;
    active: boolean;
}

export class ToggleClientStatus {
    constructor(private repository: ClientRepository) {}

    async execute({ id, active }: ToggleClientStatusRequest): Promise<void> {
        if (!id) {
            throw new Error("ID do cliente é obrigatório");
        }

        await this.repository.toggleStatus(id, active);
    }
}
