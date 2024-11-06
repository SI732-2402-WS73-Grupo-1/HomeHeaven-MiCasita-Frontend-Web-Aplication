import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle, MatCardTitle
} from "@angular/material/card";
import { Estate } from "../../model/estate-entity/estate.entity";
import { EstatesService } from '../../services/estates-service/estates.service';
import {EstatesImageService} from "../../services/estates-service/estates-image.service";
import {EstateImg} from "../../model/estate-img-entity/estate-img.entity";
const defaultId = 1;

@Component({
  selector: 'app-estate-details',
  standalone: true,
  imports: [
    NgIf,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle,
    NgForOf,
    RouterLink
  ],
  templateUrl: './estate-details.component.html',
  styleUrl: './estate-details.component.css'
})
export class EstateDetailsComponent implements OnInit{
  estate: Estate | undefined;

  constructor(
      private route: ActivatedRoute,
      private estatesService: EstatesService,
      private estatesImageService: EstatesImageService, // Add this line
  ) { }
  getCurrencySymbol(currency: string): string {
    switch (currency) {
      case 'Dolar':
        return '$';
      case 'Sol':
        return 'S/.';
      default:
        return currency;
    }
  }


  ngOnInit(): void {
    const id = defaultId;
    if (id && !isNaN(Number(id))) {
      const numericId = defaultId;
      this.estatesService.getEstateById(numericId).subscribe({
        next: data => {
          this.estate = data;
          // After fetching the estate data, fetch the image data
          if (this.estate.Id !== undefined) {
            this.estatesImageService.getEstateImagebyPropertyId(this.estate.Id).subscribe((estateImg: EstateImg) => {
              if (this.estate) {
                this.estate.image = estateImg;
              }
            });
          }
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
