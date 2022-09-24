import { Component, OnInit } from "@angular/core";
import { ShoppingBasket } from './../models/shopping.baskets.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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


  constructor(private route: ActivatedRoute,
      private router: Router,
      private formBuilder: FormBuilder


  ) {

  }
  ngOnInit(): void {
    this.prepareNewsPortalForm(new ShoppingBasket);
  }


  prepareNewsPortalForm(newShoppingBasketData: ShoppingBasket) {
    newShoppingBasketData = newShoppingBasketData ? newShoppingBasketData : new ShoppingBasket();
      this.newsShoppingBasketForm = this.formBuilder.group({
          productName: [newShoppingBasketData.productName, [Validators.required]],
          quantity: [newShoppingBasketData.quantity, [Validators.required]],
          imported: [newShoppingBasketData.imported, [Validators.required]],
          description: [newShoppingBasketData.description, [Validators.required]],
          price: [newShoppingBasketData.price, [Validators.required]]
      });
  }

    get f() { return this.newsShoppingBasketForm.controls; }

  saveNewsPortalInfo() {
      // this.submitted = true;
      // if (this.newsPortalForm.invalid) {
      //     return;
      // }
      // this.newsPortalInfo = this.newsPortalForm.value;
      // console.log(this.newsPortalInfo)
      // this.adminPanelService.createNewsPortal(this.newsPortalInfo);
      // this.myFunction();
      // this.prepareNewsPortalForm(null);
      // this.back();
  }

  myFunction() {
      alert("You are successfully inserted data.");
  }
  back() {
      this.router.navigate(['/login']);

  }
}
