export class ApiClient {
    private baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

    private getHeaders() {
        const token =
            typeof window !== "undefined"
                ? localStorage.getItem("token")
                : null;

        return {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        };
    }

    async get<T>(url: string): Promise<T> {
        const res = await fetch(`${this.baseUrl}${url}`, {
            method: "GET",
            headers: this.getHeaders(),
        });

        if (!res.ok) throw new Error("Erro ao buscar dados");
        return res.json();
    }

    async post<T>(url: string, body: any): Promise<T> {
        const res = await fetch(`${this.baseUrl}${url}`, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify(body),
        });

        if (!res.ok) throw new Error("Erro ao enviar dados");
        return res.json();
    }

    async put<T>(url: string, body: any): Promise<T> {
        const res = await fetch(`${this.baseUrl}${url}`, {
            method: "PUT",
            headers: this.getHeaders(),
            body: JSON.stringify(body),
        });

        if (!res.ok) throw new Error("Erro ao atualizar dados");
        return res.json();
    }

    async delete(url: string): Promise<void> {
        const res = await fetch(`${this.baseUrl}${url}`, {
            method: "DELETE",
            headers: this.getHeaders(),
        });

        if (!res.ok) throw new Error("Erro ao remover registro");
    }
}
