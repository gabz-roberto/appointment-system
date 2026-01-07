import { ClientPermission } from "./ClientPermission";

export class Client {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public address: string,
        public permissions: ClientPermission[],
        public active: boolean,
        public createdAt: string
    ) {}
}
