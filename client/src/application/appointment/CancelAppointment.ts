import { AppointmentRepository } from "@/src/domain/appointment/AppointmentRepository";

interface CancelAppointmentRequest {
    id: string;
}

export class CancelAppointment {
    constructor(private repository: AppointmentRepository) {}

    async execute({ id }: CancelAppointmentRequest): Promise<void> {
        if (!id) {
            throw new Error("ID do agendamento é obrigatório");
        }

        await this.repository.cancel(id);
    }
}
