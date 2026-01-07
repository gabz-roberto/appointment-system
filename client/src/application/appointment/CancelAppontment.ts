import { AppointmentRepository } from "@/src/domain/appointment/AppointmentRepository";

export class CancelAppointment {
    constructor(private repository: AppointmentRepository) {}

    async execute(id: string): Promise<void> {
        if (!id) {
            throw new Error("ID do agendamento é obrigatório");
        }

        await this.repository.cancel(id);
    }
}
