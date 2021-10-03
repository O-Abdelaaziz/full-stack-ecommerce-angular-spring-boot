import { ProductService } from './../../services/product.service';
import { Product } from './../../common/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[];

  constructor(private _productService:ProductService) { }

  ngOnInit(): void {
    this.onProductList();
  }

  onProductList(){
    this._productService.getProductList().subscribe(
      (response)=>{
        console.log(response);
        
        this.products=response;
      }
    )
  }

}
