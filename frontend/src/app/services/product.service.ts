import { ProductCategory } from './../common/product-category';
import { Product } from './../common/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.backendUrl;

  constructor(private httpClient: HttpClient) {}

  getProductListByCategoryId(categoryId: number): Observable<Product[]> {
    const url = `${this.baseUrl}/products/search/findByCategoryId?id=${categoryId}`;
    return this.httpClient
      .get<GetResponseProduct>(url)
      .pipe(map((response) => response._embedded.products));
  }

  getProductListByCategoryIdPagination(categoryId: number,page:number,size:number): Observable<GetResponseProduct> {
    const url = `${this.baseUrl}/products/search/findByCategoryId?id=${categoryId}&page=${page}&size=${size}`;
    return this.httpClient
      .get<GetResponseProduct>(url);
  }

  getProductListByCategoryName(categoryName: string,page:number,size:number): Observable<GetResponseProduct> {
    const url = `${this.baseUrl}/products/search/findByNameContainingIgnoreCase?name=${categoryName}&page=${page}&size=${size}`;
    return this.httpClient
      .get<GetResponseProduct>(url);
  }

  getProductCategoryList(): Observable<ProductCategory[]> {
    const url = `${this.baseUrl}/product-category`;
    return this.httpClient
      .get<GetResponseProductCategory>(url)
      .pipe(map((response) => response._embedded.productCategory));
  }

  getProduct(theProductId: number): Observable<Product> {
    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/products/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }
}

interface GetResponseProduct {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number;
    totalElements:number;
    totalPages: number;
    number: number;
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
