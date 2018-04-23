import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { SearchResult, StreamEvent} from '../models/searchResult.model'
import { SearchRequest } from '../models/searchRequest.model'
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
import { Restore } from '../models/restore.model';

@Injectable()
export class RestorsService{
  
    private baseApiAddres : string;

    constructor(private http: HttpClient, private _configuration: Configuration){
        this.baseApiAddres = _configuration.ServerWithApiUrl + '/restore';
     }

    allRestors(connectionId : string) :Observable<Restore[]>{
        const params = new HttpParams()
        .set('connectionId', connectionId); 
        const headers = new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('auth_token')});
        return this.http.get<Restore[]>(this.baseApiAddres + '/' + connectionId, {headers:headers});
    }

    Restore(connectionId : string, backupId:string) :Observable<Object>{
        const headers = new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('auth_token')});
        return this.http.post(this.baseApiAddres + '/' + connectionId, backupId, { headers:headers});
    }
}