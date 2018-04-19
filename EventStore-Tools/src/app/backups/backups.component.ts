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
import { Backup } from '../models/backup.model';
import { BackupsService } from '../services/backups.service';

@Component({
    selector:'backups',
    templateUrl: './backups.component.html',
    styleUrls: ['./backups.component.css'],
    providers: [BackupsService, Configuration, ConnectionService]
})

  export class Backups {
    userForm: FormGroup;
    connectionId: string = 'a1c47d2c-3127-4352-bde6-5d94de922c5d';
    length = 10;
    pageSize = 10;
    pageSizeOptions = [5, 10, 25, 100]
    paginatorOutput: PageEvent;
    dataSource= new MatTableDataSource(this.dataSource);
    displayedColumns = ['Date', 'Type', 'ExecutedDate', 'BackupPath', 'Status'];
    connections:Connection[];
    selectedValue:string;
    backups:Backup[];

    constructor(private backupsService : BackupsService, private connectionService:ConnectionService){}
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
      
    }

    onChange(newValue) {
      console.log(newValue);
  }

    search(){
        return this.backupsService.AllBackups(this.connectionId).subscribe(res=>
          {
            this.backups = res;
            this.dataSource = new BackupsDataSource(this.backupsService, this.paginator, this.backups);
          });
    }
  }

  export class BackupsDataSource extends DataSource<any> {
      constructor(private backupService: BackupsService,private _paginator: MatPaginator, private events:Backup[]/*private searchRequest:SearchRequest*/) {
        super();
      }

      count:number;

      connect(): Observable<Backup[]> {

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
