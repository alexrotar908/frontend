import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddCenterComponent } from './features/recycle/add-center/add-center.component';
import { TableComponent } from './features/recycle/table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddCenterComponent, TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RecycleNow';
}
