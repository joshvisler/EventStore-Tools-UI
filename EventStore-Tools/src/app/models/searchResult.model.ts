export class StreamEvent {
    constructor(public streamid: string,
        public dateCreated: string,
        public type: string,
        public eventNumber: string,
        public data : string) {
    }
}

export class SearchResult {
    constructor(public events:StreamEvent[], public count:number) {
    }
}