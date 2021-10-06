import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {
  totalPriceValue:number=0.00;
  totalQuantityValue:number=0;
  
  constructor(private _cartService:CartService) { }

  ngOnInit(): void {   
    this.updateCartStatus();
  }


  updateCartStatus() {
    this._cartService.totalPrice.subscribe(response=>{
      console.log(response);
      
      this.totalPriceValue=response;
    });
    this._cartService.totalQuantity.subscribe((response)=>{
      this.totalQuantityValue=response;
    });
  }

}
