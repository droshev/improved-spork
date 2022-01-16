import {Component, Input} from '@angular/core';
import {
  WizardGeneratorFormsValue,
  WizardGeneratorItem
} from "@fundamental-ngx/platform";
import {Validators} from "@angular/forms";
import {ProductItem} from "../../store.service";
import uniq from 'lodash-es/uniq';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  @Input()
  set selectedProducts(value: ProductItem[]) {
    this._selectedProducts = uniq(value);

    if (this._availableProducts.length > 0 && this._selectedProducts.length > 0) {
      this.setStepItems();
    }
  };

  get selectedProducts(): ProductItem[] {
    return this._selectedProducts;
  }

  @Input()
  set availableProducts(value: ProductItem[]) {
    this._availableProducts = value;

    if (this._availableProducts.length > 0 && this._selectedProducts.length > 0) {
      this.setStepItems();
    }
  };

  get availableProducts(): ProductItem[] {
    return this._availableProducts;
  }

  wizardValue!: WizardGeneratorFormsValue;

  stepItems!: WizardGeneratorItem[];

  private _availableProducts: ProductItem[] = [];
  private _selectedProducts: ProductItem[] = [];

  constructor() {}

  wizardFinished(wizardValue: WizardGeneratorFormsValue): void {
    this.wizardValue = wizardValue;
  }

  setStepItems(): void {
    this.stepItems = this.getStepItems();
  }

  getStepItems(): WizardGeneratorItem[] {

    const availableProductsSelectItems: string[] = this.availableProducts.map(item => item.title);

    const selectedProducts: string[] = uniq(this.selectedProducts.map(item => item.title));

    return [
      {
        name: 'Products in your cart',
        id: 'productsInCartStep',
        icon: 'notes',
        formGroups: [
          {
            title: '1. Products in your cart',
            id: 'productsInCart',
            formItems: [
              {
                name: 'products',
                message: 'Review products in your cart and modify if needed',
                type: 'multi-input',
                placeholder: 'Search for products...',
                choices: availableProductsSelectItems,
                default: selectedProducts,
                validators: [Validators.required]
              }
            ]
          }
        ]
      },
      {
        name: 'Billing address',
        id: 'billingAddressStep',
        icon: 'retail-store',
        formGroups: [
          {
            title: '2. Billing Address',
            id: 'billingAddress',
            formItems: [
              {
              name: 'name',
              message: 'Name',
              type: 'input',
              validators: [Validators.required]
            },
              {
                name: 'address',
                message: 'Address Line 1',
                type: 'input',
                validators: [Validators.required]
              },
              {
                name: 'address2',
                message: 'Address Line 2',
                type: 'input'
              },
              {
                type: 'switch',
                name: 'shippingAddressIgnored',
                message: 'Shipping address equals to billing address',
                default: false,
                guiOptions: {
                  additionalData: {
                    semantic: true
                  }
                }
              }
            ]
          }
        ]
      },
      {
        name: 'Shipping address',
        id: 'shippingAddressStep',
        icon: 'retail-store',
        when: (data, value) => {
          return value.billingAddressStep?.billingAddress?.shippingAddressIgnored !== true;
        },
        dependencyFields: {
          billingAddressStep: {
            billingAddress: ['shippingAddressIgnored']
          }
        },
        formGroups: [
          {
            title: '2. Shipping Information',
            id: 'shippingAddress',
            formItems: [
              {
                name: 'name',
                message: 'Name',
                type: 'input',
                validators: [Validators.required]
              },
              {
                name: 'address',
                message: 'Address Line 1',
                type: 'input',
                validators: [Validators.required]
              },
              {
                name: 'address2',
                message: 'Address Line 2',
                type: 'input',
              }
            ]
          }
        ]
      },
      {
        name: 'Payment method',
        id: 'paymentMethodStep',
        icon: 'money-bills',
        formGroups: [
          {
            title: '3. Payment method',
            id: 'paymentMethodForm',
            formItems: [
              {
                name: 'paymentMethod',
                message: 'Select appropriate payment method',
                type: 'select',
                choices: ['Credit Card', 'Bank Transfer'],
                validators: [Validators.required]
              }
            ]
          }
        ]
      },
      {
        name: 'Credit Card Details',
        id: 'creditCardStep',
        icon: 'credit-card',
        when: (_completedSteps: any, answers: any) =>
          answers.paymentMethodStep?.paymentMethodForm?.paymentMethod === 'Credit Card',
        dependencyFields: {
          paymentMethodStep: {
            paymentMethodForm: ['paymentMethod']
          }
        },
        formGroups: [
          {
            title: '4. Credit Card Details',
            id: 'cardPayment',
            formItems: [
              {
                name: 'creditCardNumber',
                message: 'Enter your credit card details',
                type: 'input',
                validators: [Validators.required]
              }
            ]
          }
        ]
      },
      {
        name: 'Bank Details',
        id: 'bankDetailsStep',
        icon: 'payment-approval',
        when: (_completedSteps: any, answers: any) =>
          answers.paymentMethodStep?.paymentMethodForm?.paymentMethod === 'Bank Transfer',
        dependencyFields: {
          paymentMethodStep: {
            paymentMethodForm: ['paymentMethod']
          }
        },
        formGroups: [
          {
            title: '4. Bank Details',
            id: 'bankDetailsForm',
            formItems: [
              {
                name: 'bankDetails',
                message: 'Enter your bank details',
                type: 'input',
                validators: [Validators.required]
              }
            ]
          }
        ]
      },
      {
        name: 'Discount',
        id: 'discountStep',
        icon: 'batch-payments',
        when: (_completedSteps: any, answers: any) =>
          answers.paymentMethodStep?.paymentMethodForm?.paymentMethod === 'Bank Transfer' ||
          answers.paymentMethodStep?.paymentMethodForm?.paymentMethod === 'Credit Card',
        formGroups: [
          {
            title: '5. Discount details',
            id: 'discountForm',
            formItems: [
              {
                name: 'discount',
                message: 'Enter your discount coupon code',
                type: 'input'
              }
            ]
          }
        ]
      },
      {
        name: 'Review order',
        id: 'summary',
        icon: 'task',
        summary: true
      }
    ];
  }

}
