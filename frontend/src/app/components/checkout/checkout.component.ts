import { Purchase } from './../../common/purchase';
import { OrderItem } from './../../common/order-item';
import { CartItem } from './../../common/cart-item';
import { Order } from './../../common/order';
import { CartService } from './../../services/cart.service';
import { CustomValidators } from './../../validators/custom-validators';
import { State } from './../../common/state';
import { Country } from './../../common/country';
import { CheckoutService } from './../../services/checkout.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  totalQuantity: number = 0.00;
  totalPrice: number = 0;
  creditCardYear: number[] = [];
  creditCardMonth: number[] = [];

  countries:Country[]=[];
  statesShippingAddress:State[]=[];
  statesBillingAddress:State[]=[];

  constructor(
    private _cartService:CartService,
    private _formBuilder: FormBuilder,
    private _checkoutService: CheckoutService,
    private _router:Router,
  ) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this._formBuilder.group({
      customer: this._formBuilder.group({
        firstName: new FormControl('',[Validators.required,Validators.minLength(2),CustomValidators.notOnlyWhiteSpace]),
        lastName: new FormControl('',[Validators.required,Validators.minLength(2),CustomValidators.notOnlyWhiteSpace]),
        email: new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),CustomValidators.notOnlyWhiteSpace]),
      }),
      shippingAddress: this._formBuilder.group({
        street: new FormControl('',[Validators.required,Validators.minLength(2),CustomValidators.notOnlyWhiteSpace]),
        city: new FormControl('',[Validators.required,Validators.minLength(2),CustomValidators.notOnlyWhiteSpace]),
        state: new FormControl('',[Validators.required,Validators.minLength(2)]),
        country: new FormControl('',[Validators.required,Validators.minLength(2)]),
        zipCode: new FormControl('',[Validators.required,Validators.minLength(2),CustomValidators.notOnlyWhiteSpace]),
      }),
      billingAddress: this._formBuilder.group({
        street: new FormControl('',[Validators.required,Validators.minLength(2),CustomValidators.notOnlyWhiteSpace]),
        city: new FormControl('',[Validators.required,Validators.minLength(2),CustomValidators.notOnlyWhiteSpace]),
        state: new FormControl('',[Validators.required,Validators.minLength(2)]),
        country: new FormControl('',[Validators.required,Validators.minLength(2)]),
        zipCode: new FormControl('',[Validators.required,Validators.minLength(2),CustomValidators.notOnlyWhiteSpace]),
      }),
      creditCard: this._formBuilder.group({
        cardType: new FormControl('',[Validators.required,Validators.minLength(2),CustomValidators.notOnlyWhiteSpace]),
        nameOnCard: new FormControl('',[Validators.required,Validators.minLength(2),CustomValidators.notOnlyWhiteSpace]),
        cardNumber: new FormControl('',[Validators.required,Validators.maxLength(16),CustomValidators.notOnlyWhiteSpace]),
        securityCode: new FormControl('',[Validators.required,Validators.minLength(3),CustomValidators.notOnlyWhiteSpace]),
        expirationMonth: new FormControl('',[Validators.required,Validators.minLength(2)]),
        expirationYear: new FormControl('',[Validators.required,Validators.minLength(2)]),
      }),
    });

    this.onGetCreditCardYear();
    this.onGetCreditCardMonth();
    this.onGetCountries();
    this.updateCartStatus();
  }

  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.value
      );

      this.statesBillingAddress=this.statesShippingAddress;

    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.statesBillingAddress=[];
    }
  }

  get firstName(){return this.checkoutFormGroup.get('customer.firstName');}
  get lastName(){ return this.checkoutFormGroup.get('customer.lastName');}
  get email(){return this.checkoutFormGroup.get('customer.email');}

  get shippingAddressStreet(){return this.checkoutFormGroup.get('shippingAddress.street');}
  get shippingAddressCity(){return this.checkoutFormGroup.get('shippingAddress.city');}
  get shippingAddressState(){return this.checkoutFormGroup.get('shippingAddress.state');}
  get shippingAddressCountry(){return this.checkoutFormGroup.get('shippingAddress.country');}
  get shippingAddressZipCode(){return this.checkoutFormGroup.get('shippingAddress.zipCode');}

  get billingAddressStreet(){return this.checkoutFormGroup.get('billingAddress.street');}
  get billingAddressCity(){return this.checkoutFormGroup.get('billingAddress.city');}
  get billingAddressState(){return this.checkoutFormGroup.get('billingAddress.state');}
  get billingAddressCountry(){return this.checkoutFormGroup.get('billingAddress.country');}
  get billingAddressZipCode(){return this.checkoutFormGroup.get('billingAddress.zipCode');}

  get creditCardCardType(){return this.checkoutFormGroup.get('creditCard.cardType');}
  get creditCardNameOnCard(){return this.checkoutFormGroup.get('creditCard.nameOnCard');}
  get creditCardCardNumber(){return this.checkoutFormGroup.get('creditCard.cardNumber');}
  get creditCardSecurityCode(){return this.checkoutFormGroup.get('creditCard.securityCode');}
  get creditCardExpirationMonth(){return this.checkoutFormGroup.get('creditCard.expirationMonth');}
  get creditCardExpirationYear(){return this.checkoutFormGroup.get('creditCard.expirationYear');}



  
  onSubmit() {
    console.log(this.checkoutFormGroup.get('customer').value);
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // set up order
    let order:Order  =new Order();
    order.totalPrice=this.totalPrice;
    order.totalQuantity=this.totalQuantity;
    // get cart items
    const cartItems:CartItem[]= this._cartService.cartItems;
    // create orderItems from cartItems
    //long way
    // let orderItems:OrderItem[]=[];
    // for(let i= 0;i<cartItems.length;i++){
    //   orderItems[i]=new OrderItem(cartItems[i]);
    // }

    //short way
    let orderItems:OrderItem[]=cartItems.map(cartItem =>new OrderItem(cartItem));

    // set up purchase
    let purchase = new Purchase();
    // populate purchase - customer
    purchase.customer=this.checkoutFormGroup.controls['customer'].value;
    
    // populate purchase - shipping address 
    purchase.shippingAddress=this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState:State=JSON.parse(JSON.stringify(purchase.shippingAddress.state))
    const shippingCountry:Country=JSON.parse(JSON.stringify(purchase.shippingAddress.country))
    purchase.shippingAddress.state=shippingState.name;
    purchase.shippingAddress.country=shippingCountry.name;
    // populate purchase - billing address 

    purchase.billingAddress=this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState:State=JSON.parse(JSON.stringify(purchase.billingAddress.state))
    const billingCountry:Country=JSON.parse(JSON.stringify(purchase.billingAddress.country))
    purchase.billingAddress.state=billingState.name;
    purchase.billingAddress.country=billingCountry.name;

    // populate purchase - order & orderItems
    purchase.order=order;
    purchase.orderItems=orderItems;

    // call rest api via the checkout service

    this._checkoutService.placeOrder(purchase).subscribe(

      {
        next: (response)=>{
          console.log(response);
          alert(`Your order has been received .\n order tracking number: ${response.orderTrackingNumber}`)
          this.resetCart();
        },
        error:(response)=>{
          console.log(response.message.error);
        }
      }
    );

  }

  resetCart(){
    this._cartService.cartItems=[];
    this._cartService.totalPrice.next(0);
    this._cartService.totalQuantity.next(0);

    this.checkoutFormGroup.reset();

    this._router.navigateByUrl("/products");
  }

  onGetCreditCardYear() {
    this._checkoutService.getCreditCardYear().subscribe((response) => {
      this.creditCardYear = response;
    });
  }

  onGetCreditCardMonth() {
    const startMonth: number = new Date().getMonth() + 1;
    this._checkoutService
      .getCreditCardMonth(startMonth)
      .subscribe((response) => {
        this.creditCardMonth = response;
      });
  }

  handleMonthAndYear() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup.value.expirationYear
    );

    let startMonth: number = 0;
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this._checkoutService
      .getCreditCardMonth(startMonth)
      .subscribe((response) => {
        this.creditCardMonth = response;
    });
  }

  onGetCountries(){
    this._checkoutService.getCountries().subscribe((response)=>{
      this.countries=response;
    })
  }

  onGetStates(targetAddress){
    const inputCountryCode=this.checkoutFormGroup.get(targetAddress).value.country.code;
    console.log(inputCountryCode);
    
    if(targetAddress==='shippingAddress'){
      this._checkoutService.getState(inputCountryCode).subscribe((response)=>{
        this.statesShippingAddress=response;
      })
    }else if(targetAddress==='billingAddress'){
      this._checkoutService.getState(inputCountryCode).subscribe((response)=>{
        this.statesBillingAddress=response;
      })
    }
    
  }

  onGetStatesPracticalWay(targetAddress:string){
    const formGroup=this.checkoutFormGroup.get(targetAddress);
    const countryName=formGroup.value.country.name;
    const countryCode=formGroup.value.country.code;
    console.log(formGroup+" "+ countryName +" " +countryCode);
    
    this._checkoutService.getState(countryCode).subscribe((response)=>{
      if(targetAddress=='shippingAddress'){
        this.statesShippingAddress=response;
      }else{
        this.statesBillingAddress=response;
      }
      formGroup.get('state').setValue(response[0]);
    });
  }

  updateCartStatus(){

    this._cartService.totalPrice.subscribe(
      (response)=>{
        this.totalPrice=response;
      }
    );

    this._cartService.totalQuantity.subscribe(
      (response)=>{
        this.totalQuantity=response;
      }
    );
  }

}
