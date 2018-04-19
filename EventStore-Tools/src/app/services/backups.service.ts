import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { SearchResult, StreamEvent} from '../models/searchResult.model'
import { SearchRequest } from '../models/searchRequest.model'
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
import { Backup } from '../models/backup.model';

@Injectable()
export class BackupsService{
  
    private baseApiAddres : string;

    constructor(private http: HttpClient, private _configuration: Configuration){
        this.baseApiAddres = _configuration.ServerWithApiUrl + '/backup';
     }

    AllBackups(connectionId : string) :Observable<Backup[]>{
        const params = new HttpParams()
        .set('connectionId', connectionId); 
        const headers = new HttpHeaders({'Authorization':'Bearer '+ localStorage.getItem('auth_token')});
        return this.http.get<Backup[]>(this.baseApiAddres + '/' + connectionId, {headers:headers});
    }
}