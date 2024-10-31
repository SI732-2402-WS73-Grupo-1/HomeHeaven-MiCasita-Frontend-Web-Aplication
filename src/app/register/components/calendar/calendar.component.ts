import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ReservationDialogComponent } from '../reserve/reservation-dialog.component';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FullCalendarModule
  ]
})
export class CalendarComponent implements OnInit {

  calendarOptions: any;
  events: any[] = [];

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      dateClick: this.handleDateClick.bind(this),
      events: this.events
    };
  }

  handleDateClick(arg: any) {
    const dialogRef = this.dialog.open(ReservationDialogComponent, {
      width: '400px',
      data: { date: arg.dateStr }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Reserva realizada para la fecha:', result.date);
        console.log('Propiedad seleccionada:', result.estate);

        this.addEvent({
          title: `Reserve: ${result.estate.title}`,
          start: result.date,
          allDay: true,
          color: 'purple'
        });

        this.snackBar.open('Reserva exitosa', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  addEvent(event: any) {
    this.events = [...this.events, event];
    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.events
    };
  }
}
