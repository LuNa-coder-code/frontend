import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Component, OnInit} from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { Boxevent } from '../shared/boxevent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cal',
  templateUrl: './cal.component.html',
  styleUrls: ['./cal.component.css']
})
export class CalComponent implements OnInit {
  viewDate: Date = new Date();
  boxevents!: Boxevent[];
  view: CalendarView = CalendarView.Month;
  transformedEvents: CalendarEvent[] = [];
  //Property für umgewandelte Events, da das Calender-Interface von angular-calendar ein anderes Format erwartet

  constructor(private bs: BackendService, private router: Router) {}

  ngOnInit(): void {
    this.readAll();
  }

  readAll(): void {
    this.bs.getAll().subscribe({
      next: (boxevents: Boxevent[]) => {
        this.transformedEvents = boxevents.map((event: Boxevent) => ({
          title: event.name,
          start: new Date(event.date),
          meta: {
            _id: event._id,
            location: event.location,
            description: event.description
          }
        }));
      },
      error: (err) => console.log(err),
      complete: () => console.log('getAll() completed')
    });
  }

  previousMonth(): void {
    const previousMonth = new Date(this.viewDate);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    this.viewDate = previousMonth;
  }

  nextMonth(): void {
    const nextMonth = new Date(this.viewDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    this.viewDate = nextMonth;
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    const boxeventId = event.meta._id;
    this.router.navigate(['/boxevents', boxeventId]);
  }
  
}
