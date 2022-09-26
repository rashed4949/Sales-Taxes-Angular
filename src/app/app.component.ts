import { Component, OnInit } from "@angular/core";
import { ShoppingBasket } from './../models/shopping.baskets.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'SALES TAXES APPLICATION';
  newsShoppingBasketForm: FormGroup;
  submitted = false;
  shoppingBasket: ShoppingBasket = new ShoppingBasket();
  shoppingBaskets:ShoppingBasket[]=[];
  afterAddedTaxList:ShoppingBasket[]=[];
  salesTaxesTenPercent:number=0;
  additionalSalesTax:number=0;
  salesAndAdditionalTax:number=0;
  totalSalesTax:number=0;
  totalAmount:number=0;
  
  constructor(
      private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.prepareShoppingBasketForm(null);
  }

//form initialization
  prepareShoppingBasketForm(newShoppingBasketData: any) {
    newShoppingBasketData = newShoppingBasketData ? newShoppingBasketData : new ShoppingBasket();
      this.newsShoppingBasketForm = this.formBuilder.group({
          productName: [newShoppingBasketData.productName, [Validators.required]],
          quantity: [newShoppingBasketData.quantity, [Validators.required]],
          imported: [newShoppingBasketData.imported],
          category: [newShoppingBasketData.category, [Validators.required]],
          price: [newShoppingBasketData.price, [Validators.required]]
      });
  }

    get f() { return this.newsShoppingBasketForm.controls; }


//this function check the form validation and add items in the receipt section
  addItemsShoppingBasket() {
      if (this.newsShoppingBasketForm.invalid) {
          return;
      }
      this.shoppingBasket = this.newsShoppingBasketForm.value;
      this.shoppingBaskets=[...this.shoppingBaskets,this.shoppingBasket];
      this.prepareShoppingBasketForm(null);
  }

  //calculate taxes for different product (all goods tax and additional tax for imported items)
  //usually this kind of calculation happen in service. 
  taxCalculation(){
    this.submitted=true;
    this.afterAddedTaxList=[];
    const myClonedArray = cloneDeep(this.shoppingBaskets); 
    myClonedArray.map(c=>{
      if(c.category==="All Goods" && c.imported==true){
        this.salesAndAdditionalTax=((c.price*15)/100);
        this.salesAndAdditionalTax=+(Math.ceil(this.salesAndAdditionalTax*20)/20).toFixed(2);
      c.price+=+this.salesAndAdditionalTax;
      }
      else if(c.category==="All Goods"){
      this.salesTaxesTenPercent=((c.price*10)/100);
      this.salesTaxesTenPercent=+(Math.ceil(this.salesTaxesTenPercent*20)/20).toFixed(2);
      c.price+=+this.salesTaxesTenPercent;
     }
     else if(c.imported==true){
      this.additionalSalesTax=((c.price*5)/100);
      this.additionalSalesTax=+(Math.ceil(this.additionalSalesTax*20)/20).toFixed(2);
      c.price+=+this.additionalSalesTax;
     }
     this.afterAddedTaxList.push(c);
     this.TotalSalesTaxAndAmount()
   });
  }
  
  //this function calculate the total amount and the total tax.
  TotalSalesTaxAndAmount(){
    this.totalAmount=0;
    this.afterAddedTaxList.map(c=>{
      this.totalAmount=this.totalAmount+ +c.price;
      this.totalSalesTax=(+this.additionalSalesTax+ +this.salesTaxesTenPercent+ +this.salesAndAdditionalTax);
     });
  }

  //print the total output 
  printReceipt(){
    window.print();
  }
}
