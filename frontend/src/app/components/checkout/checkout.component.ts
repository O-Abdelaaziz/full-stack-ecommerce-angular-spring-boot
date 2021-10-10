import { CheckoutService } from './../../services/checkout.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  totalQuantity: number = 0;
  totalPrice: number = 0;
  creditCardYear: number[] = [];
  creditCardMonth: number[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this._formBuilder.group({
      customer: this._formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this._formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this._formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this._formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    this.onGetCreditCardYear();
    this.onGetCreditCardMonth();
  }

  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.value
      );
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  onSubmit() {
    console.log(this.checkoutFormGroup.get('customer').value);
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
}
