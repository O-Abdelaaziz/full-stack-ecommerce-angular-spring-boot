import { CustomValidators } from './../../validators/custom-validators';
import { State } from './../../common/state';
import { Country } from './../../common/country';
import { CheckoutService } from './../../services/checkout.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  countries:Country[]=[];
  statesShippingAddress:State[]=[];
  statesBillingAddress:State[]=[];

  constructor(
    private _formBuilder: FormBuilder,
    private _checkoutService: CheckoutService
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
        state: new FormControl('',[Validators.required,Validators.minLength(2),CustomValidators.notOnlyWhiteSpace]),
        country: new FormControl('',[Validators.required,Validators.minLength(2),CustomValidators.notOnlyWhiteSpace]),
        zipCode: new FormControl('',[Validators.required,Validators.minLength(2),CustomValidators.notOnlyWhiteSpace]),
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
    this.onGetCountries();
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

  onSubmit() {
    console.log(this.checkoutFormGroup.get('customer').value);
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    }
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
      if(targetAddress==='shippingAddress'){
        this.statesShippingAddress=response;
      }else{
        this.statesBillingAddress=response;
      }
      formGroup.get('state').setValue(response[0]);
    });
  }

}
