import { ProductService } from './../../services/product.service';
import { Product } from './../../common/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  currentCategoryName: string;
  searchMode: boolean;

  pageNumber: number = 1;
  pageSize: number = 5;
  totalPages:number;
  totalElements: number = 0;

  constructor(
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(() => {
      this.onProductList();
    });
  }

  onProductList() {
    this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handelSearchProduct();
    } else {
      this.handelListProduct();
    }
  }

  handelSearchProduct() {
    const keyword = this._activatedRoute.snapshot.paramMap.get('keyword');
    this._productService
      .getProductListByCategoryName(keyword)
      .subscribe((response) => {
        this.products = response;
      });
  }

  handelListProduct() {
    const hasCategoryId = this._activatedRoute.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId =
        +this._activatedRoute.snapshot.paramMap.get('id');
      this.currentCategoryName =
        this._activatedRoute.snapshot.paramMap.get('name');
    } else {
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log('previousCategoryId: '+this.previousCategoryId,'currentCategoryId: '+this.currentCategoryId);
    

    this._productService
      .getProductListByCategoryIdPagination(
        this.currentCategoryId,
        this.pageNumber - 1,
        this.pageSize
      )
      .subscribe((response) => {
        this.products = response._embedded.products;
        this.pageNumber = response.page.number + 1;
        this.pageSize = response.page.size;
        this.totalPages=response.page.totalPages;
        this.totalElements = response.page.totalElements;
      });
  }

  onPageSelect (pageSize:number){
    this.pageSize=pageSize;
    this.pageNumber=1;
    this.handelListProduct();
  }
}
