import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
interface Restaurant {
  id?: string;
  name: string;
  description: string;
  location: string;
  additionalInfo?: string;
}


@Component({
  selector: 'app-restaurant-item',
  standalone: true,
  imports: [
    MatCardModule,
  ],
  templateUrl: './restaurant-item.component.html',
  styleUrl: './restaurant-item.component.scss'
})
export class RestaurantItemComponent {
  @Input() restaurant!: Restaurant;
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onEdit(): void {
    this.edit.emit(this.restaurant.id);
  }

  onDelete(): void {
    this.delete.emit(this.restaurant.id);
  }
}
