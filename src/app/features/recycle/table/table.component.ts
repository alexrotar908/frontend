import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ICity, ICountry, IRecyleCenter, IMaterial, IRecycle, IRecycleCenterRow } from '../../../BackendConnection/models/recycle.module';
import { CommonModule } from '@angular/common';
import { RecycleService } from '../../../BackendConnection/services/recycle.service';
import { CityService } from '../../../BackendConnection/services/city.service';
import { CountryService } from '../../../BackendConnection/services/country.service';
import { MaterialService } from '../../../BackendConnection/services/material.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{

  private readonly router= inject(Router);
  
    add_center(){
      this.router.navigateByUrl('add-center');
    }

    centers: IRecycleCenterRow[]=[];
    cities:ICity[]=[];
    countries:ICountry[]=[];
    materials:IMaterial[]=[];
    constructor(
      private recycleService: RecycleService,
    private cityService:CityService,
    private countryService:CountryService,
    private materialService: MaterialService){}
    ngOnInit() {
      this.loadCenters();
    }

    loadCenters(){
      this.recycleService.getRecycle().subscribe((data) => {
        this.centers = data;
        console.log(data);
      });

      this.cityService.getCity().subscribe((data) => {
        this.cities = data;
        console.log(data);
      });
      this.countryService.getCountry().subscribe((data) => {
        this.countries = data;
        console.log(data);
      });
      this.materialService.getMaterial().subscribe((data) => {
        this.materials = data;
        console.log(data);
      });

      

    }



}
