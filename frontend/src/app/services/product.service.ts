import { ProductCategory } from './../common/product-category';
import { Product } from './../common/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) {}

  getProductListByCategoryId(categoryId: number): Observable<Product[]> {
    const url = `${this.baseUrl}/products/search/findByCategoryId?id=${categoryId}`;
    return this.httpClient
      .get<GetResponseProduct>(url)
      .pipe(map((response) => response._embedded.products));
  }

  getProductCategoryList(): Observable<ProductCategory[]> {
    const url = `${this.baseUrl}/product-category`;
    return this.httpClient
      .get<GetResponseProductCategory>(url)
      .pipe(map((response) => response._embedded.productCategory));
  }
}

interface GetResponseProduct {
  _embedded: {
    products: Product[];
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
