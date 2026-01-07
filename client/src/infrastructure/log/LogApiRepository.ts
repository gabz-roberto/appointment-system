import { LogRepository } from "@/src/domain/log/LogRepository";
import { Log } from "@/src/domain/log/Log";
import { ApiClient } from "../http/apiClient";

export class LogApiRepository implements LogRepository {
    private api = new ApiClient();

    async list(params?: { userId?: string; page?: number }): Promise<Log[]> {
        const query = new URLSearchParams(params as any).toString();
        return this.api.get<Log[]>(`/logs?${query}`);
    }

    async getById(id: string): Promise<Log | null> {
        return this.api.get<Log>(`/logs/${id}`);
    }
}
