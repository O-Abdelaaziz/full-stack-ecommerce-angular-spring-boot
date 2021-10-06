import { CartService } from './../../services/cart.service';
import { CartItem } from './../../common/cart-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems:CartItem[]=[];
  totalPrice:number=0;
  totalQuantity:number=0;

  constructor(private _cartService:CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    this.cartItems=this._cartService.cartItems;
    this._cartService.totalPrice.subscribe(response=>{
      console.log(response);
      
      this.totalPrice=response;
    });
    this._cartService.totalQuantity.subscribe((response)=>{
      this.totalQuantity=response;
    });

    this._cartService.computeCartTotals();
  }

  incrementQuantity(cartItem:CartItem){
    this._cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem:CartItem){
    this._cartService.decrementQuantity(cartItem);
  }

}
