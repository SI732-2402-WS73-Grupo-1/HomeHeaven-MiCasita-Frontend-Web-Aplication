export enum ReservationStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED'
}

export class Reservation {
    id?: number;
    userId: number;
    propertyId: number;
    dateTime: string;  // Ensure this is a string
    status: ReservationStatus;

    constructor(userId: number, propertyId: number, dateTime: string, status: ReservationStatus) {
        this.userId = userId;
        this.propertyId = propertyId;
        this.dateTime = dateTime;
        this.status = status;
    }
}
