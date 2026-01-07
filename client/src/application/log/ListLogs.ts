import { LogRepository } from "@/src/domain/log/LogRepository";
import { Log } from "@/src/domain/log/Log";

interface ListLogsParams {
    userId?: string;
    page?: number;
}

export class ListLogs {
    constructor(private repository: LogRepository) {}

    async execute(params?: ListLogsParams): Promise<Log[]> {
        return this.repository.list(params);
    }
}
