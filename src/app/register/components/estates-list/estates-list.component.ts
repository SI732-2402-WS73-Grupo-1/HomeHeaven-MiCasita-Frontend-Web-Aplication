import {Component, ChangeDetectorRef, OnInit} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {NgClass, NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

import { Estate } from "../../model/estate-entity/estate.entity";
import { EstatesService } from '../../services/estates-service/estates.service';
import {EstatesImageService} from "../../services/estates-service/estates-image.service";
import {EstateImg} from "../../model/estate-img-entity/estate-img.entity";

@Component({
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatCardModule, MatButton, NgForOf, RouterLink, NgClass],
  selector: 'app-estates-list',
  standalone: true,
  styleUrl: './estates-list.component.css',
  templateUrl: './estates-list.component.html'
})
export class EstatesListComponent implements OnInit{
  estates:Array<Estate> = [];
  filteredEstates: Array<Estate> = [];
  dataSource: any;
  selectedFilter: string = '';

  constructor(
      private estatesService: EstatesService,
      private estatesImageService: EstatesImageService,
      private changeDetectorRef: ChangeDetectorRef) {}

  loadImages(): void {
    for (let estate of this.estates) {
      if (estate.Id !== undefined) {
        this.estatesImageService.getEstateImagebyPropertyId(estate.Id).subscribe((estateImg: EstateImg) => {
          estate.image = estateImg;
        });
      }
    }
  }
  ngOnInit(): void {
    this.estatesService.getEstates().subscribe((data: any) => {
      this.estates = data;
      this.filteredEstates = data;
      this.dataSource = new MatTableDataSource(this.estates);
      this.loadImages();
    });
  }
  filterEstates(filterValue: string): void {
    if (this.selectedFilter === filterValue) {
      // If the selected filter is the same as the current filter, reset the filter
      this.selectedFilter = '';
      this.filteredEstates = this.estates;
    } else {
      // Otherwise, apply the new filter
      this.selectedFilter = filterValue;
      this.filteredEstates = this.estates.filter(estate => estate.status === filterValue);
    }
    this.changeDetectorRef.markForCheck();
  }
}
