import { CartItem } from './../common/cart-item';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  storage:Storage=sessionStorage;

  constructor() {
    let retrievedData =JSON.parse(this.storage.getItem('cartItems'));
    if(retrievedData != null){
      this.cartItems=retrievedData;

      this.computeCartTotals();
    }
  }

  addToCart(cartItem: CartItem) {
    //check if we have already the item in our cart
    let alreadyExistInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      // for (let tempCartItem of this.cartItems) {
      //   if (tempCartItem.id === cartItem.id) {
      //     existingCartItem = tempCartItem;
      //     break;
      //   }
      // }
      existingCartItem=this.cartItems.find(tempCartItem => tempCartItem.id === cartItem.id);
      alreadyExistInCart = existingCartItem != undefined;
    }

    if (alreadyExistInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }

    

    this.computeCartTotals();
  }


  computeCartTotals() {
    let totalPriceValue = 0;
    let totalQuantityValue = 0;

    for (let cartItem of this.cartItems) {
      totalPriceValue += cartItem.quantity * cartItem.unitPrice;
      totalQuantityValue += cartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.persistCartItems();
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;

    if(cartItem.quantity ===0){
      this.remove(cartItem);
    }else{
      this.computeCartTotals();
    }
  }


  remove(cartItem: CartItem) {
    const itemIndex=this.cartItems.findIndex(cartItemTemp=> cartItemTemp.id===cartItem.id);
    if(itemIndex>-1){
      this.cartItems.splice(itemIndex,1);
      this.computeCartTotals();
    }
  }

  persistCartItems(){
    this.storage.setItem('cartItems',JSON.stringify(this.cartItems));
  }
}
