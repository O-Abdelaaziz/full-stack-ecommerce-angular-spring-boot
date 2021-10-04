import { ProductService } from './../../services/product.service';
import { Product } from './../../common/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  currentCategoryId: number;
  currentCategoryName: string;

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
    const hasCategoryId=this._activatedRoute.snapshot.paramMap.has('id');
    if(hasCategoryId){
      this.currentCategoryId=+this._activatedRoute.snapshot.paramMap.get('id');
      this.currentCategoryName = this._activatedRoute.snapshot.paramMap.get('name');
    }else{
      this.currentCategoryId=1;
      this.currentCategoryName="Books"
    }

    this._productService.getProductListByCategoryId(this.currentCategoryId).subscribe((response) => {
      this.products = response;
    });
    
  }
}
