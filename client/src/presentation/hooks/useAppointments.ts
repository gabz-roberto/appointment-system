import { useEffect, useState } from "react";
import { Appointment } from "@/src/domain/appointment/Appointment";
import { AppointmentApiRepository } from "@/src/infrastructure/appointment/AppointmentApiRepository";
import { ListAppointments } from "@/src/application/appointment/ListAppointments";
import { CreateAppointment } from "@/src/application/appointment/CreateAppointment";
import { ApproveAppointment } from "@/src/application/appointment/ApproveAppointment";
import { CancelAppointment } from "@/src/application/appointment/CancelAppointment";

export function useAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const repository = new AppointmentApiRepository();

    async function load(params?: {
        search?: string;
        date?: string;
        page?: number;
    }) {
        setLoading(true);
        setError(null);

        try {
            const useCase = new ListAppointments(repository);
            const data = await useCase.execute(params);
            setAppointments(data);
        } catch {
            setError("Erro ao carregar agendamentos");
        } finally {
            setLoading(false);
        }
    }

    async function create(data: Appointment) {
        try {
            const useCase = new CreateAppointment(repository);
            await useCase.execute(data);
            await load();
        } catch {
            setError("Erro ao criar agendamento");
        }
    }

    async function approve(id: string) {
        try {
            const useCase = new ApproveAppointment(repository);
            await useCase.execute(id);
            await load();
        } catch {
            setError("Erro ao aprovar agendamento");
        }
    }

    async function cancel(id: string) {
        try {
            const useCase = new CancelAppointment(repository);
            await useCase.execute({ id });
            await load();
        } catch {
            setError("Erro ao cancelar agendamento");
        }
    }

    useEffect(() => {
        load();
    }, []);

    return {
        appointments,
        loading,
        error,
        reload: load,
        create,
        approve,
        cancel,
    };
}
