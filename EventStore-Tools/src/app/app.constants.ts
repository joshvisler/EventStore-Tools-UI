import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server = 'http://localhost:60794/';
    public ApiUrl = 'api/v1';
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}