import { ProductService } from './../../services/product.service';
import { ProductCategory } from './../../common/product-category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'],
})
export class ProductCategoryComponent implements OnInit {
  productCategory: ProductCategory[];

  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this.onGetProductCategoryList();
  }

  onGetProductCategoryList() {
    this._productService
      .getProductCategoryList()
      .subscribe((response) => (this.productCategory = response));
  }
}
