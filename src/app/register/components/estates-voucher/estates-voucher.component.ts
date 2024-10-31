import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {EstatesService} from "../../services/estates-service/estates.service";
import {Estate} from "../../model/estate-entity/estate.entity";

@Component({
  selector: 'app-estates-voucher',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    RouterLink
  ],
  templateUrl: './estates-voucher.component.html',
  styleUrl: './estates-voucher.component.css'
})
export class EstatesVoucherComponent implements OnInit {
  estate: Estate | undefined;
  paymentAmountVoucher: string | undefined;

  constructor(
      private estatesService: EstatesService,
      private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(Number(id))) {
      const numericId = Number(id);
      this.estatesService.getEstateById(numericId).subscribe({
        next: data => {
          this.estate = data;
        },
        error: error => {
          console.error('Error al obtener la propiedad', error);
        }
      });
    } else {
      console.error('El ID de la propiedad no es un número válido');
    }
  }
}
