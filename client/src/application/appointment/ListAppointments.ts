import { AppointmentRepository } from "@/src/domain/appointment/AppointmentRepository";
import { Appointment } from "@/src/domain/appointment/Appointment";

interface ListAppointmentsParams {
    search?: string;
    date?: string;
    page?: number;
}

export class ListAppointments {
    constructor(private repository: AppointmentRepository) {}

    async execute(params?: ListAppointmentsParams): Promise<Appointment[]> {
        return this.repository.list(params);
    }
}
