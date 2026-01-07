export class Log {
    constructor(
        public id: string,
        public userId: string,
        public action: string,
        public description: string,
        public createdAt: string
    ) {}
}
