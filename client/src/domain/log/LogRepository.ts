import { Log } from "./Log";

export interface LogRepository {
    list(params?: { userId?: string; page?: number }): Promise<Log[]>;

    getById(id: string): Promise<Log | null>;
}
