import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private readonly router= inject(Router);
  recycleCenter(){
    this.router.navigateByUrl('recycle-table')

  }

  rewards(){
    this.router.navigateByUrl('voucher-points')
  }

}
