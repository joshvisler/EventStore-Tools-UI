export class Backup {
    constructor(public backupId: string,
        public date: string,
        public executedDate: string,
        public client: string,
        public status : string) {
    }
}