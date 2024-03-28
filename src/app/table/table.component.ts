import { Component, OnInit } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { Boxevent } from '../shared/boxevent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  boxevents!: Boxevent[];
  deleted = false;

  constructor(private bs: BackendService, private router: Router) { }

  ngOnInit(): void {
    this.readAll();
  }

  readAll(): void {
    this.bs.getAll().subscribe(
          {
            next: (response) => {
                  this.boxevents = response;
                  console.log(this.boxevents);
                  return this.boxevents;
                },
            error: (err) => console.log(err),
            complete: () => console.log('getAll() completed')
          })
  }
 
  delete(id: string): void {
    this.bs.deleteOne(id).subscribe(
      {
        next: (response: any) => {
          console.log('response : ', response);
          if(response.status == 204){
                  console.log(response.status);
                  this.reload(true);
                } else {
                  console.log(response.status);
                  console.log(response.error);
                  this.reload(false);
                }
        },
        error: (err) => console.log(err),
        complete: () => console.log('deleteOne() completed')
    });
  }

  reload(deleted: boolean)
  {
    this.deleted = deleted;
    this.readAll();
    this.router.navigateByUrl('/table');
  }
}