import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Restaurant {
  id?: string;
  name: string;
  description: string;
  location: string;
  additionalInfo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
 
}
