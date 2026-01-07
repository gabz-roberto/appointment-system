import { useEffect, useState } from "react";
import { Log } from "@/src/domain/log/Log";
import { LogApiRepository } from "@/src/infrastructure/log/LogApiRepository";
import { ListLogs } from "@/src/application/log/ListLogs";

export function useLogs() {
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(false);

    const repository = new LogApiRepository();

    async function load(params?: { userId?: string; page?: number }) {
        setLoading(true);
        try {
            const useCase = new ListLogs(repository);
            const data = await useCase.execute(params);
            setLogs(data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    return {
        logs,
        loading,
        reload: load,
    };
}
