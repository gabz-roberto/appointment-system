import { Appointment } from "@/src/domain/appointment/Appointment";
import { AppointmentRepository } from "@/src/domain/appointment/AppointmentRepository";

export class CreateAppointment {
    constructor(private repository: AppointmentRepository) {}

    async execute(data: Appointment): Promise<void> {
        if (!data.clientId || !data.date || !data.time || !data.room) {
            throw new Error(
                "Dados obrigatórios do agendamento não preenchidos"
            );
        }

        await this.repository.create(data);
    }
}
