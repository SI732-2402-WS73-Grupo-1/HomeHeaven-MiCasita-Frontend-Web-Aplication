import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { EstatesService } from '../../services/estates-service/estates.service';
import { Estate } from '../../model/estate-entity/estate.entity';
import { Reservation, ReservationStatus } from '../../model/reservation-entity/reservation.entity';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [EstatesService]
})
export class ReservationDialogComponent implements OnInit {
  estates: Estate[] = [];
  selectedEstate: Estate | null = null;
  userId: number = 1; // Replace with actual user ID

  constructor(
      public dialogRef: MatDialogRef<ReservationDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { date: string },
      private estatesService: EstatesService
  ) {}

  ngOnInit(): void {
    this.estatesService.getEstates().subscribe((data: Estate[]) => {
      this.estates = data;
    });
  }

  onReserve(): void {
    if (this.selectedEstate) {
      // Ensure date is in the correct format
      const formattedDate = `${this.data.date}T00:00:00`;

      const reservation = new Reservation(
          this.userId,
          this.selectedEstate.Id!, // Use non-null assertion operator
          formattedDate,
          ReservationStatus.PENDING
      );

      this.estatesService.createReservation(reservation).subscribe(
          response => {
            console.log('Reservation created successfully');
            this.dialogRef.close({ date: this.data.date, estate: this.selectedEstate });
          },
          error => {
            console.error('Error creating reservation', error);
          }
      );
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
