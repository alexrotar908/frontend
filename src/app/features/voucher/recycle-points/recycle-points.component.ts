import { Component } from '@angular/core';
import { IVoucher } from '../../../BackendConnection/models/voucher.module';
import { IUser } from '../../../BackendConnection/models/account.module';
import { VoucherService } from '../../../BackendConnection/services/voucher.service';
import jsPDF from 'jspdf';

type MaterialType = 'plastic-bottle' | 'aluminum-can' | 'metal' | 'glass-container' | 'paper-cardboard' | 'e-waste';

@Component({
  selector: 'app-recycle-points',
  standalone: true,
  imports: [],
  templateUrl: './recycle-points.component.html',
  styleUrl: './recycle-points.component.css'
})
export class RecyclePointsComponent {

  typeMaterial:MaterialType='plastic-bottle';

  amount: number=0;
  points: number=0;

  totalPoints: number = 0;

  voucher:IVoucher |undefined;
  user: IUser |undefined;

  materialPointsValues:{[key in MaterialType]: number}={
    'plastic-bottle': 10,
    'aluminum-can': 15,
    'metal': 20,
    'glass-container': 5,
    'paper-cardboard': 2,
    'e-waste': 30,
  }

  constructor(private voucherService: VoucherService) {}
  calculatePoints(): void{
    if(this.typeMaterial && this.amount){
      this.points=this.materialPointsValues[this.typeMaterial]*this.amount;
    }else {
      this.points=0;
    }
  }

  submitRecycling(): void {
    
    this.totalPoints += this.points;
    this.saveTotalPoints();
    console.log(`You have earned ${this.points} points.`);
    this.resetForm();
  }

  resetForm(): void {
    this.typeMaterial; // Restablecer a un valor inicial apropiado
    this.amount = 0;
    this.points = 0;
  }

  onMaterialSelected(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.typeMaterial = target.value as MaterialType;
    }
  }

  onAmountChanged(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.amount = +target.value;
      this.calculatePoints();
    }
  }

  ngOnInit() {
    this.loadTotalPoints();
    this.loadVoucherData();
  }

  loadTotalPoints() {
    const storedPoints = localStorage.getItem('totalPoints');
    if (storedPoints !== null) {
      this.totalPoints = parseInt(storedPoints, 10);
    }
  }

  saveTotalPoints() {
    localStorage.setItem('totalPoints', this.totalPoints.toString());
  }

  loadVoucherData() {
    this.voucherService.getVoucher().subscribe(
      data => {
        if (data && data.length > 0) {
          this.voucher = data[0];  
          if (this.voucher && this.voucher.users && this.voucher.users.length > 0) {
            this.user = this.voucher.users[0]; 
          }
        }
      },
      error => {
        console.error('Error al cargar los datos del cupón', error);
      }
    );
  }

  downloadVoucher():void{
    if (this.voucher && this.user){
    const doc = new jsPDF();

    const exp_date= new Date();

    exp_date.setMonth(exp_date.getMonth()+ 1);

    const voucherData=
    `
    Email: ${this.user.email}
    Name: ${this.user.firstName} ${this.user.name}
    Address: ${this.user.addres}
    Total Points: ${this.totalPoints}
    Expiration Date: ${exp_date.toLocaleDateString()}
    Code: ${Math.random().toString(36).substring(2,9)}
    Redeemable at: Local Recycling centers
    `;

    doc.text(voucherData, 10, 10);
    doc.save('voucher.pdf');
    } else{
      console.error('No voucher or user data available');
    }
  }

}
