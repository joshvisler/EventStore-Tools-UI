import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { SearchResult, StreamEvent} from '../models/searchResult.model'
import { SearchRequest } from '../models/searchRequest.model'
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
import { Connection } from '../models/connection.model';

@Injectable()
export class ConnectionService{
  
    private baseApiAddres : string;

    constructor(private http: HttpClient, private _configuration: Configuration){
        
        this.baseApiAddres = _configuration.ServerWithApiUrl + '/connection';
     }

    connections() :Observable<Connection[]>{
        const params = new HttpParams()
        return this.http.get<Connection[]>(this.baseApiAddres);
    }
}