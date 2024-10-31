import {Component, OnInit} from '@angular/core';
import { Estate } from '../../model/estate-entity/estate.entity';
import { EstatesService } from '../../services/estates-service/estates.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import {Router, RouterLink} from "@angular/router";

import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";

import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatRadioButton, MatRadioGroup, MatRadioModule} from "@angular/material/radio";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {StorageService} from "../../services/storage/storage.service";
import {EstateImg} from "../../model/estate-img-entity/estate-img.entity";
import {EstatesImageService} from "../../services/estates-service/estates-image.service";

@Component({
    selector: 'app-create-estates',
    standalone: true,
    imports: [
        FormsModule,
        MatCard,
        NgForOf,
        MatButton,
        RouterLink,
        MatRadioGroup,
        MatRadioButton,
        MatFormField,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect, MatRadioModule, MatStepper, MatStep, ReactiveFormsModule, MatStepLabel, MatStepperNext, MatStepperPrevious, MatCardHeader, MatCardContent, MatError, NgIf
    ],
    templateUrl: './create-estates.component.html',
    styleUrl: './create-estates.component.css'
})
export class CreateEstatesComponent implements OnInit{
    estate: Estate = new Estate();
    years: number[] = [];
    imageSrc: string = '';

    personalDataForm: FormGroup;
    OperationTypeForm: FormGroup;
    locationForm: FormGroup;
    featuresForm: FormGroup;

    constructor(private estatesService: EstatesService,private estatesImageService: EstatesImageService, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder, private storageService: StorageService) {
        // Initialize the form groups
        this.personalDataForm = this.formBuilder.group({
            owner: ['', Validators.required]
        });

        this.OperationTypeForm = this.formBuilder.group({
            status: ['', Validators.required],
            type: ['', Validators.required]
        });

        this.locationForm = this.formBuilder.group({
            location: ['', Validators.required]
        });

        this.featuresForm = this.formBuilder.group({
            yearBuilt: ['', Validators.required],
            currency: ['', Validators.required],
            price: ['', Validators.required],
            //thumbnail: ['', Validators.required],
            image: ['', Validators.required],
            size: ['', Validators.required],
            bedrooms: ['', Validators.required],
            bathrooms: ['', Validators.required],
            garageSpace: ['', Validators.required],
            title: ['', Validators.required],
            description: ['', Validators.required]
        });
    }

    onFileSelected(event: any) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.onload = e => {
                if (reader.result) {
                    this.imageSrc = reader.result as string;
                    if (this.featuresForm) {
                        const imageControl = this.featuresForm.get('image');
                        if (imageControl) {
                            imageControl.setValue({url: this.imageSrc}); // Set the Data URL string to the form control
                        }
                    }
                }
            };
            reader.readAsDataURL(file);
        }
    }
    onClickAddFiles(id:string ) {
        const fileInput = document.getElementById(id);
        if (fileInput) {
            fileInput.click();
        }
    }
    onSubmit(): void {
        // Combine the values from all form groups into a single object
        this.estate = {...this.personalDataForm.value, ...this.OperationTypeForm.value, ...this.locationForm.value, ...this.featuresForm.value};
        this.estate.size = `${this.estate.size} m²`;

        this.estatesService.createEstate(this.estate).subscribe((createdEstate: Estate) => {
            this.storageService.uploadImage('estates', createdEstate.title + "_" + createdEstate.Id, this.estate.image.url).then((value: Object | null | undefined) => {
                const urlImage = value as string | null;
                if (urlImage) {
                    console.log("Url de la imagen : ", urlImage);
                    this.estate.image.url = urlImage;

                    // Crear una nueva entidad EstateImg y guardar la URL de la imagen
                    let estateImg = new EstateImg();
                    estateImg.url = urlImage;
                    estateImg.propertyId = createdEstate.Id; // Ahora este es el ID correcto
                    this.estatesImageService.createEstateImage(estateImg).subscribe();
                } else {
                    this.estate.image.url = 'gs://micasita2024-01.appspot.com';
                }
                this.toastr.success('Tu propiedad se creó satisfactoriamente', 'Propiedad agregada', {
                    timeOut: 3000,
                });
                this.router.navigate(['/estates']);
            });
        });
    }
    ngOnInit(): void {
        const currentYear = new Date().getFullYear();
        for (let year = 2000; year <= currentYear; year++) {
            this.years.push(year);
        }

        if (!this.estate.image.url) {
            this.estate.image.url = 'default_thumbnail.png';
        }
    }

}