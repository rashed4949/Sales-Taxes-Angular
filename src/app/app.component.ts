import { Component, OnInit } from "@angular/core";
import { ShoppingBasket } from './../models/shopping.baskets.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'problem-solving';


  newsShoppingBasketForm: FormGroup;
  submitted = false;
  shoppingBasket: ShoppingBasket = new ShoppingBasket();
  shoppingBaskets:ShoppingBasket[]=[];
  afterAddedTaxList:ShoppingBasket[]=[];
  
  constructor(private route: ActivatedRoute,
      private router: Router,
      private formBuilder: FormBuilder
  ) {

  }
  ngOnInit(): void {
    this.prepareShoppingBasketForm(null);
  }


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

  addItemsShoppingBasket() {
      if (this.newsShoppingBasketForm.invalid) {
          return;
      }
      this.shoppingBasket = this.newsShoppingBasketForm.value;
this.shoppingBaskets=[...this.shoppingBaskets,this.shoppingBasket];
this.prepareShoppingBasketForm(null);
  }


  TotalShoppingBasket(){

  }
  salesTaxesTenPercent:number;
  additionalSalesTax:number;
  salesAndAdditionalTax:number;
  totalSalesTax:number;
  totalAmount:number;
  taxCalculation(){
    this.submitted=true;
    const myClonedArray = cloneDeep(this.shoppingBaskets); 
    this.afterAddedTaxList=myClonedArray.map(c=>{
      if(c.category==="All Goods" && c.imported==true){
        this.salesAndAdditionalTax=((c.price*15)/100);
      c.price+=this.salesAndAdditionalTax;
      }
      else if(c.category==="All Goods"){
      this.salesTaxesTenPercent=((c.price*10)/100);
      c.price+=this.salesTaxesTenPercent;
     }
     else if(c.imported==true){
      this.additionalSalesTax=((c.price*5)/100);
      c.price+=this.additionalSalesTax;
     }
      return c;
   });
this.totalSalesTax=this.additionalSalesTax+this.salesTaxesTenPercent+this.salesAndAdditionalTax;
   this.afterAddedTaxList.map(c=>{
    this.totalAmount+=c.price;
   });
  }

  myFunction() {
      alert("You are successfully inserted data.");
  }

  back() {
      this.router.navigate(['/login']);

  }
}
