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
  allowServers=false;

  constructor(private _productService:ProductService) { }

  ngOnInit(): void {
    this.onProductList();
    console.log("allowServers",this.allowServers);
    setTimeout(() => {
      this.allowServers=true;
    }, 5000);
    
  }

  onProductList(){
    this._productService.getProductList().subscribe(
      (response)=>{
        
        this.products=response;
      }
    )
  }

}
