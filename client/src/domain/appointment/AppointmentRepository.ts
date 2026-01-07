import { Appointment } from "./Appointment";

export interface AppointmentRepository {
    list(params?: {
        search?: string;
        date?: string;
        page?: number;
    }): Promise<Appointment[]>;

    getById(id: string): Promise<Appointment | null>;

    create(data: Appointment): Promise<void>;

    update(id: string, data: Partial<Appointment>): Promise<void>;

    delete(id: string): Promise<void>;

    approve(id: string): Promise<void>;

    cancel(id: string): Promise<void>;
}
