import { Component,OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RestaurantFormComponent } from '../restaurant-form/restaurant-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RestaurantItemComponent } from '../restaurant-item/restaurant-item.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

interface Restaurant {
  id?: string;
  name: string;
  description: string;
  location: string;
  additionalInfo?: string;
}


@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    RestaurantItemComponent,
    HttpClientModule,
    CommonModule,
    MatTableModule,
    FormsModule,
    MatPaginatorModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.scss'
})
export class RestaurantListComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['name', 'description', 'location', 'additionalInfo', 'actions'];
  restaurants: Restaurant[] = [
    { id: '1', name: 'The Gourmet Kitchen', description: 'Fine dining with gourmet dishes', location: '123 Culinary Lane,Ghatkopar', additionalInfo: 'Open daily from 6 PM to 11 PM' },
    { id: '2', name: 'Bistro Delight', description: 'Cozy bistro with comfort food', location: '456 Baker Street,Dadar', additionalInfo: 'Open Monday to Friday from 8 AM to 8 PM' },
    { id: '3', name: 'Sushi Haven', description: 'Fresh sushi and sashimi', location: '789 Sushi Blvd,Juhu', additionalInfo: 'Open daily from 11 AM to 10 PM' },
    { id: '4', name: 'Pasta Paradise', description: 'Handcrafted pasta dishes', location: '101 Pasta Lane,Andheri', additionalInfo: 'Open daily from 12 PM to 10 PM' },
    { id: '5', name: 'Vegan Vibes', description: 'Diverse plant-based dishes', location: '202 Green Street, Veggie Village', additionalInfo: 'Open daily from 10 AM to 9 PM' },
    { id: '6', name: 'Grill & Chill', description: 'Grilled meats and sides', location: '03 BBQ Road, Grill Town', additionalInfo: 'pen daily from 11 AM to 11 PM' },
    { id: '7', name: 'Taco Fiesta', description: 'Tacos, burritos, and margaritas', location: '04 Fiesta Avenue, Taco City', additionalInfo: 'Open daily from 11 AM to 10 PM' }
  ];

  dataSource = new MatTableDataSource<Restaurant>(this.restaurants);

  @ViewChild!(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  openForm(restaurant?: Restaurant): void {
    const dialogRef = this.dialog.open(RestaurantFormComponent, {
      width: '500px',
      data: restaurant ? restaurant : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (restaurant) {
          this.updateRestaurant(result);
        } else {
          this.addRestaurant(result);
        }
      }
    });
  }


  addRestaurant(newRestaurant: Restaurant): void {
    this.restaurants.push({ ...newRestaurant, id: (this.restaurants.length + 1).toString() });
    this.dataSource.data = this.restaurants;
  }

  updateRestaurant(updatedRestaurant: Restaurant): void {
    const index = this.restaurants.findIndex(r => r.id === updatedRestaurant.id);
    if (index !== -1) {
      this.restaurants[index] = updatedRestaurant;
      this.dataSource.data = this.restaurants;
    }
  }

  editRestaurant(restaurant: Restaurant): void {
    this.openForm(restaurant);
  }

  deleteRestaurant(id: string): void {
    this.restaurants = this.restaurants.filter(restaurant => restaurant.id !== id);
    this.dataSource.data = this.restaurants;
  }
}
