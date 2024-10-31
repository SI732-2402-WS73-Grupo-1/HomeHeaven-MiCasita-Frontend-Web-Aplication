export class PaymentEntity {
  id?: number;
  name: string;
  dni: string;
  phoneNumber: string;
  email: string;
  buyAmount: number;
  idProperty: number;

  constructor() {
    this.name = "";
    this.dni = "";
    this.phoneNumber = "";
    this.email="";
    this.buyAmount=0;
    this.idProperty = 0;
  }
}