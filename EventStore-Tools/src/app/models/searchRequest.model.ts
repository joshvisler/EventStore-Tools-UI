export class SearchRequest{
    constructor(
        public connectionId : string,
        public streamId: string,
        public type: string,
        public eventNumber: string,
        public data : string,
        public from : string,
        public to : string) 
    {
    }
}