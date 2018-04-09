import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { SearchResult, StreamEvent} from '../models/searchResult.model'
import { SearchRequest } from '../models/searchRequest.model'
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';

@Injectable()
export class SearchService{
  
    private baseApiAddres : string;

    constructor(private http: HttpClient, private _configuration: Configuration){
        this.baseApiAddres = _configuration.ServerWithApiUrl + '/search';
     }

    search(searchRequest: SearchRequest) :Observable<StreamEvent[]>{
        const params = new HttpParams()
        .set('data', searchRequest.data)
        .set('eventNumber', searchRequest.eventNumber)
        .set('from', searchRequest.from)
        .set('to', searchRequest.to)
        .set('type', searchRequest.type)
        .set('connectionId', searchRequest.connectionId); 
        return this.http.get<StreamEvent[]>(this.baseApiAddres+ '/' + searchRequest.streamId, {params : params});
    }
}