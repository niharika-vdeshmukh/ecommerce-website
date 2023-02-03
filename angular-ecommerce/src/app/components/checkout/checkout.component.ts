import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { ShoppingFormService } from 'src/app/services/shopping-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private formBuilder: FormBuilder,
              private shoppingFormService: ShoppingFormService
              ) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group( {
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode:['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode:['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth:[''],
        expirationYear: ['']
      })
      
    });

    const startMonth: number = new Date().getMonth() + 1;
    this.shoppingFormService.getCreditCardMonths(startMonth).subscribe(
      data=> {this.creditCardMonths = data;}
    );

    this.shoppingFormService.getCreditCardYears().subscribe(
      data=> {this.creditCardYears = data;}
    );

    this.shoppingFormService.getCountries().subscribe(
      data=> {this.countries = data;}
    );



  }

  onSubmit() {
    console.log(this.checkoutFormGroup.get('customer').value);
  }

  

  copyShippingAddressToBillingAddress(event){
    if(event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress']
      .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

      this.billingAddressStates = this.shippingAddressStates;

    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);
    let startMonth: number;
    if(currentYear==selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    this.shoppingFormService.getCreditCardMonths(startMonth).subscribe(
      data=> {
        this.creditCardMonths = data;
      }
    )
  }

  getSatates(formGroupName: string) {
    console.log("formGroup")
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const theCountryCode = formGroup.value.country.code;
    this.shoppingFormService.getStates(theCountryCode).subscribe(
      data=> {
        if(formGroupName == 'shippingAddress') {
          this.shippingAddressStates = data;
        } else {
          this.billingAddressStates = data;
        }

        formGroup.get('state').setValue(data[0]);

      }
    )

  }

}
