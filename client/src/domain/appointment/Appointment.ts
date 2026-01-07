import { AppointmentStatus } from "./AppointmentStatus";

export class Appointment {
    constructor(
        public id: string,
        public clientId: string,
        public clientName: string,
        public date: string,
        public time: string,
        public room: string,
        public status: AppointmentStatus
    ) {}
}
