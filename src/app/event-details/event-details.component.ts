import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../shared/backend.service';
import { Boxevent } from '../shared/boxevent';
import { Location } from '@angular/common';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit{

    id: string = '';
    boxevent!: Boxevent ;
    form = new FormGroup({
          nameControl : new FormControl<string>(''),
          dateControl: new FormControl<string>(''),
          locationControl: new FormControl<string>(''),
          descriptionControl: new FormControl<string>(''),
    });
  
    constructor(
      private route: ActivatedRoute,
      private bs: BackendService,
      private location: Location,
      private router: Router
    ) { }
  
    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id') || '';
      this.readOne(this.id);
  
    }
  
    readOne(id: string): void {
        this.bs.getOne(id).subscribe(
        {
          next: (response) => {
                  this.boxevent = response;
                  console.log('boxevent', this.boxevent);
                  this.form.patchValue({
                    nameControl: this.boxevent?.name,
                    dateControl: this.boxevent?.date,
                    locationControl: this.boxevent?.location,
                    descriptionControl: this.boxevent?.description
                  })
                  return this.boxevent;
          },
          error: (err) => console.log(err),
          complete: () => console.log('getOne() completed')
        });
  
    }
  
    update(): void {
      const values = this.form.value;
      this.boxevent.name = values.nameControl!;
      this.boxevent.date = values.dateControl!;
      this.boxevent.location = values.locationControl!;
      this.boxevent.description = values.descriptionControl!;
      this.bs.update(this.id, this.boxevent)
        .subscribe({
          next: (response) => {
            console.log(response);
            console.log(response._id);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => console.log('update() completed')
        }
        );
      this.router.navigateByUrl('/calendar');
    }
  
    cancel(): void {
      this.location.back();
  
    }
  
  }
  
