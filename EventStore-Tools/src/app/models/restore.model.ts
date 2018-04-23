export class Restore {
    constructor(
        public restoreId: string,
        public backupId: string,
        public date: string,
        public executedDate: string,
        public client: string,
        public status : string) {
    }
}