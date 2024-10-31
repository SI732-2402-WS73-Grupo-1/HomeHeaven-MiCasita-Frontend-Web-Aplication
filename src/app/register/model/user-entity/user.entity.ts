export class User {
  id: number;
  name: string;
  dni: string;
  email: string;
  password: string;
  phone: string;
  address: string;

  constructor() {
    this.id = 0;
    this.name = "";
    this.dni = "";
    this.email = "";
    this.password = "";
    this.phone = "";
    this.address = "";
  }
}