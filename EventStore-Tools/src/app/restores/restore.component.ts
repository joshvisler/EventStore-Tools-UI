import { Component, ViewChild, ElementRef } from '@angular/core'
import {DataSource} from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import 'rxjs/add/observable/of';
import { Connection } from '../models/connection.model';
import { ConnectionService } from '../services/connection.service';
import { Restore } from '../models/restore.model';
import { RestorsService } from '../services/restore.service';

@Component({
    selector:'restors',
    templateUrl: './restore.component.html',
    styleUrls: ['./restore.component.css'],
    providers: [RestorsService, Configuration, ConnectionService]
})

  export class Restors {
    userForm: FormGroup;
    connectionId: string = 'a1c47d2c-3127-4352-bde6-5d94de922c5d';
    length = 10;
    pageSize = 10;
    pageSizeOptions = [5, 10, 25, 100]
    paginatorOutput: PageEvent;
    dataSource= new MatTableDataSource(this.dataSource);
    displayedColumns = ['date', 'executedDate', 'client', 'status', 'create'];
    connections:Connection[];
    selectedValue:string;
    restors:Restore[];

    constructor(private restorsService : RestorsService, private connectionService:ConnectionService){}
    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
       this.dataSource.paginator = this.paginator;
    }

    ngOnInit() {
        this.connectionService.connections().subscribe(res=>
        {
          this.connections = res;
        });

      this.paginator.pageIndex = 0;
    }

    handlePaginator(pageEvent: PageEvent) {
      this.paginatorOutput = pageEvent;
      this.dataSource = this.dataSource = new RestorsDataSource(this.restorsService, this.paginator, this.restors);
    }

    onChange(newValue) {
      console.log(newValue);
      this.restorsService.allRestors(this.connectionId).subscribe(res=>
        {
          this.restors = res;
          this.dataSource = new RestorsDataSource(this.restorsService, this.paginator, this.restors);
        });
    }

    create(connectionId:string, backupId:string){
      console.log(connectionId, backupId);        
        return this.restorsService.Restore(connectionId, backupId).subscribe(res=>
          {
            this.restorsService.allRestors(this.connectionId).subscribe(res=>
              {
                this.restors = res;
                this.dataSource = new RestorsDataSource(this.restorsService, this.paginator, this.restors);
              });
          });
    }
  }

  export class RestorsDataSource extends DataSource<any> {
      constructor(private restorsService: RestorsService,private _paginator: MatPaginator, private events:Restore[]) {
        super();
      }

      count:number;

      connect(): Observable<Restore[]> {

        return Observable.of(this.events).map(res=>
              {
                const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
                console.info(startIndex, this._paginator.pageSize);
                this._paginator._length = res.length;
                return res.slice(startIndex, startIndex+this._paginator.pageSize);
              });
      }
    
      disconnect() {}
    }
