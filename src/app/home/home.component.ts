import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    ButtonModule,
    HttpClientModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) {}
  newArrivals: any[] = [];

  featuredProducts: any[] = [];
  featuredProductsLimit: number = 6;

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    const apiUrl = 'https://api.escuelajs.co/api/v1/products';
    let params = new HttpParams().set(
      'limit',
      this.featuredProductsLimit.toString()
    );
    this.http.get<any[]>(apiUrl, { params: params }).subscribe(
      (data) => {
        this.featuredProducts = data.slice(0, this.featuredProductsLimit);
        this.newArrivals = data.slice(10, 16);
        
      },
      (error) => {
        console.error('featured products error:', error);
      }
    );
  }
}
