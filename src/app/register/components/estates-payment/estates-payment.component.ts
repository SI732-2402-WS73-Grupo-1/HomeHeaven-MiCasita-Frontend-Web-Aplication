import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaymentService} from "../../services/payment-service/payment-service.service";
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import {PaymentEntity} from "../../model/payment-entity/payment-entity.entity";
import {Estate} from "../../model/estate-entity/estate.entity";
import { Subscription } from 'rxjs';
import {Router, RouterLink} from '@angular/router';
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import { ActivatedRoute } from '@angular/router';
import {EstatesService} from "../../services/estates-service/estates.service";
import {MatCard} from "@angular/material/card";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-estates-payment',
  standalone: true,
  imports: [RouterLink, FormsModule, MatFormField, MatInput, MatButton, MatCard, NgIf],
  templateUrl: './estates-payment.component.html',
  styleUrls: ['./estates-payment.component.css']
})
export class EstatesPaymentComponent implements OnInit, OnDestroy {
  paymentData: PaymentEntity = new PaymentEntity();
  private paymentSubscription: Subscription | undefined;
  estate: Estate | undefined;
  paymentAmount: string | undefined;
  selectedPaymentMethod: string | undefined;  // Variable para almacenar el método de pago seleccionado

  constructor(
      private registerService: PaymentService,
      private router: Router,
      private snackBar: MatSnackBar,
      private route: ActivatedRoute,
      private estatesService: EstatesService
  ) {}

  submitForm(formData: any) {
    delete this.paymentData.id;
    this.paymentSubscription = this.registerService.create(this.paymentData).subscribe({
      next: (response) => {
        this.snackBar.open('Metodo de Pago Correcto', 'Cerrar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });

        // Navegación después de que el formulario ha sido enviado
        this.router.navigateByUrl(`/estates/voucher/${this.estate?.Id}`);
      },
      error: (error) => {
        this.snackBar.open('Error al implementar el Metodo de Pago: ' + error.message, 'Cerrar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    });
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(Number(id))) {
      const numericId = Number(id);
      this.estatesService.getEstateById(numericId).subscribe({
        next: data => {
          this.estate = data;
          this.paymentAmount = this.estate?.price;
        },
        error: error => {
          console.error('Error al obtener el precio de la propiedad', error);
        }
      });
    } else {
      console.error('El ID de la propiedad no es un número válido');
    }
  }

  ngOnDestroy() {
    if (this.paymentSubscription) {
      this.paymentSubscription.unsubscribe();
    }
  }

  // Función para seleccionar el método de pago
  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
  }
}
