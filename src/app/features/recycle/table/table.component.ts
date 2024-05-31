import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

 // private readonly diaLog =inject(MatDialog);
 // private readonly recycleService= inject(RecycleCenterService);
  private readonly router= inject(Router);
    //recycles= toSignal(this.recycleService.getRecycle().pipe());

    add_center(){
      this.router.navigateByUrl('add-center');
    }
}
