import { CommonModule } from '@angular/common';
import { Component, NgIterable, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { RecycleService } from '../../../BackendConnection/services/recycle.service';
import { ICreateBoardCenter } from '../../../BackendConnection/models/recycle.module';

type CountryCode = 'ro' | 'es' | 'it'; 
type CityList = {
  [key in CountryCode]: any;
};

@Component({
  selector: 'app-add-center',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButton, RouterModule, MatSelectModule, CommonModule],
  templateUrl: './add-center.component.html',
  styleUrl: './add-center.component.css'
})
export class AddCenterComponent implements OnInit{
  private readonly recycleService=inject(RecycleService)
  private readonly fb = inject(NonNullableFormBuilder);
  addCenterForm=this.fb.group({
    name:this.fb.control('',[Validators.required]),
   nameCity:this.fb.control('',Validators.required),
    nameCountry:this.fb.control('',Validators.required),
    material:this.fb.control('',Validators.required),
    hours:this.fb.control('',Validators.required),
    address:this.fb.control('',Validators.required)
  });

  countries=[
    {id: 'ro', title: 'Romania'},
    {id: 'es', title: 'Spain'},
    {id: 'it', title: 'Italy'},
  ];

  cities: CityList={
    ro: ['Cluj Napoca', 'Bucharest', 'Alba Iulia'],
    es: ['Madrid', 'Barcelona', 'Valencia'],
    it: ['Milan', 'Rome', 'Napoli'],
  };
  filteredCities: string[] = [];
  
  materialsList: string []=[];
  materials=['Plastic bottles', 'Aluminun cans', 'Metals', 'Glass containers', 'Paper and cardboard', 'Electronic waste (e-waste)'];

  ngOnInit() {
    this.addCenterForm.get('nameCountry')?.valueChanges.subscribe(countryId => {
      this.addCenterForm.get('nameCity')?.setValue('');
      this.filteredCities = countryId ? this.cities[countryId as CountryCode] : [];
    });
    const selectedCountry = this.addCenterForm.get('nameCountry')?.value as CountryCode;
    this.filteredCities = selectedCountry ? this.cities[selectedCountry] : [];
  }
  createBoardCenter(){
    console.log("click")
    if(this.addCenterForm.invalid){
      console.log("invalid");
      return;
    
    }
    console.log(this.addCenterForm.value);
    this.recycleService.createBoardCenter(this.addCenterForm.value as ICreateBoardCenter)
    .subscribe({
      next:(response)=> {

        console.log('Center created successfully', response);
      },
      error: (error: any) => {
        console.error('Error creating center', error);
      },
    });
  }

}
