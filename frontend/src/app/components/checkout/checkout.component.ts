import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup :FormGroup;

  constructor(private _formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.checkoutFormGroup=this._formBuilder.group({
      customer:this._formBuilder.group({
        firstName:[''],
        lastName:[''],
        email:[''],
      }),
      shippingAddress:this._formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:[''],
      }),
      billingAddress: this._formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard:this._formBuilder.group({
        cardType:[''],
        nameOnCard:[''],
        cardNumber:[''],
        securityCode:[''],
        expirationMonth:[''],
        expirationYear:[''],
      })
    })
  }

  copyShippingAddressToBillingAddress(event){
    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    }else{
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  onSubmit(){
    console.log(this.checkoutFormGroup.get('customer').value);
    
  }

}
