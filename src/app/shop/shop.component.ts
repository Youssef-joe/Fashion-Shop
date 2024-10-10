import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
    ButtonModule,
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    ButtonModule,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  providers: [HttpClient],
})
export class ShopComponent {
  constructor(private productServices: ProductsService) {}

  @ViewChild('paginator') paginator: Paginator | undefined;

  products: Product[] = [];
  totalRecords: number = 0;
  rows: number = 5;

  displayEditPopup: boolean = false;
  didsplayAddPopup: boolean = false;

  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleDeletePopup(product: Product) {
    if (!product.id) {
      return;
    }
    this.deleteProduct(product.id);
  }

  toggleAddPopup() {
    this.didsplayAddPopup = true;
  }

  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  onConfirmEdit(product: Product) {
    this.editProduct(
      product,
      this.selectedProduct.id ? this.selectedProduct.id : 0
    );
    this.displayEditPopup = false;
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.didsplayAddPopup = false;
  }

  onProductOutput(product: Product) {
    console.log(product, 'Output');
  }

  onPageChange(event: any) {
    this.fetchProduct(event.page, event.rows);
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }

  fetchProduct(page: number, perPage: number) {
    this.productServices
      .getProducts('server-deployment-production.up.railway.app/clothes', { page, perPage })
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (er) => {
          console.log(er);
        },
      });
  }

  editProduct(product: Product, id: number) {
    this.productServices
      .editProduct(`server-deployment-production.up.railway.app/clothes/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProduct(0, this.rows);
          this.resetPaginator();
        },
        error: (er) => {
          console.log(er);
        },
      });
  }

  deleteProduct(id: number) {
    this.productServices
      .deleteProduct(`server-deployment-production.up.railway.app/clothes/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.resetPaginator();
        },
        error: (er) => {
          console.log(er);
        },
      });
  }

  addProduct(product: Product) {
    this.productServices
      .addProduct(`server-deployment-production.up.railway.app/clothes`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.resetPaginator();
        },
        error: (er) => {
          console.log(er);
        },
      });
  }

  ngOnInit() {
    this.fetchProduct(0, this.rows);
  }
}
