import { AppointmentRepository } from "@/src/domain/appointment/AppointmentRepository";
import { Appointment } from "@/src/domain/appointment/Appointment";
import { ApiClient } from "../http/apiClient";

export class AppointmentApiRepository implements AppointmentRepository {
    private api = new ApiClient();

    async list(params?: {
        search?: string;
        date?: string;
        page?: number;
    }): Promise<Appointment[]> {
        const query = new URLSearchParams(params as any).toString();
        return this.api.get<Appointment[]>(`/appointments?${query}`);
    }

    async getById(id: string): Promise<Appointment | null> {
        return this.api.get<Appointment>(`/appointments/${id}`);
    }

    async create(data: Appointment): Promise<void> {
        await this.api.post("/appointments", data);
    }

    async update(id: string, data: Partial<Appointment>): Promise<void> {
        await this.api.put(`/appointments/${id}`, data);
    }

    async delete(id: string): Promise<void> {
        await this.api.delete(`/appointments/${id}`);
    }

    async approve(id: string): Promise<void> {
        await this.api.put(`/appointments/${id}/approve`, {});
    }

    async cancel(id: string): Promise<void> {
        await this.api.put(`/appointments/${id}/cancel`, {});
    }
}
