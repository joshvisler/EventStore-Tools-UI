import { Component, ViewChild, ElementRef } from '@angular/core'
import {DataSource} from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';
import { SearchService } from '../services/search.service';
import { SearchResult, StreamEvent} from '../models/searchResult.model'
import { SearchRequest } from '../models/searchRequest.model'
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import { Connection } from '../models/connection.model';
import { ConnectionService } from '../services/connection.service';

@Component({
    selector:'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    providers: [SearchService, Configuration, ConnectionService]
})

  export class Search {

    connectionId: string = 'a1c47d2c-3127-4352-bde6-5d94de922c5d';
    to = '';
    from = '';
    type: string = '';
    streamId: string = 'd3ed8d92-78e3-4887-a158-2f86a17ff12d';
    eventNumber: string = '';
    data: string = '';
    length = 10;
    pageSize = 10;
    pageSizeOptions = [5, 10, 25, 100]
    paginatorOutput: PageEvent;
    dataSource= new MatTableDataSource(this.dataSource);
    displayedColumns = ['streamId', 'dateCreated', 'type', 'eventNumber', 'data'];
    connections:Connection[];
    selectedValue:string;

    constructor(private searchService : SearchService, private connectionService:ConnectionService){}
    @ViewChild(MatPaginator) paginator: MatPaginator;

    setFrom(param:string){
      this.from = new Date(param).toISOString();
    }

    setTo(param:string){
      this.to = new Date(param).toISOString();
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    ngOnInit() {
        this.connectionService.connections().subscribe(res=>
        {
          this.connections = res;
        });

      this.paginator.pageIndex = 0;
      this.dataSource.connect().subscribe(res=>
        {
          this.length = 10;
        });
    }

    handlePaginator(pageEvent: PageEvent) {
      this.paginatorOutput = pageEvent;
      this.search();
    }

    search(){
      this.dataSource = new UserDataSource(this.searchService, this.paginator, new SearchRequest(this.connectionId, this.streamId, this.type, this.eventNumber, this.data, this.from, this.to));
    }
  }

  export class UserDataSource extends DataSource<any> {
      constructor(private searchService: SearchService,private _paginator: MatPaginator, private searchRequest:SearchRequest) {
        super();
      }

      count:number;

      connect(): Observable<StreamEvent[]> {
        return this.searchService.search(this.searchRequest).map(res=>
          {
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            console.info(startIndex, this._paginator.pageSize);
            this._paginator._length = res.length;
            return res.slice(startIndex, startIndex+this._paginator.pageSize);
          });
      }

      setSearchRequest(request:SearchRequest){
        this.searchRequest = request;
      }

    
      disconnect() {}
    }
