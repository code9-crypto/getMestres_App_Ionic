import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'cards-dashboard',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './cards-dashboard.component.html',
  styleUrl: './cards-dashboard.component.scss'
})
export class CardsDashboardComponent {

}
