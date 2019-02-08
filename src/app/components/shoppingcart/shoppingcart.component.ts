import { Component, OnInit } from "@angular/core";
import { ItemsService } from "../../services/items.service";
import { ShoppingcartService } from "../../services/shoppingcart.service";
import { DiscountService } from "../../services/discount.service";
import { FlashMessagesService } from "angular2-flash-messages";

import { Item } from "../../models/Item";
import { Shoppingcart } from "../../models/Shoppingcart";

@Component({
  selector: "app-shoppintcart",
  templateUrl: "./shoppingcart.component.html",
  styleUrls: ["./shoppingcart.component.css"]
})
export class ShoppingcartComponent implements OnInit {
  items: Item[];
  item: Item = {
    productId: "",
    productName: "",
    price: 0
  };
  cartItems: Shoppingcart[];
  totalCart: number;
  discountPrice: number = 0;
  priceAfterDiscount: number;
  appliedCoupon: string;
  previousCoupon: string;

  constructor(
    private itemsService: ItemsService,
    private shoppingcartService: ShoppingcartService,
    private discountService: DiscountService,
    private flashMessageService: FlashMessagesService
  ) {}

  ngOnInit() {
    this.itemsService.getItems().subscribe(items => (this.items = items));
    this.shoppingcartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.totalCart = this.getTotalCart();
    });

    this.priceAfterDiscount = this.discountService.generateDiscount(
      this.totalCart,
      this.cartItems
    );
    if (this.priceAfterDiscount > this.totalCart) {
      this.priceAfterDiscount = this.totalCart;
    }

    this.discountService.discountPrice.subscribe(discountPrice => {
      if (discountPrice > 0) {
        this.discountPrice = discountPrice;
      }
    });
    if (this.discountPrice === 0 && !this.appliedCoupon) {
      this.flashMessageService.show(
        "Error has occured , please click on any item to continue",
        {
          cssClass: "alert-danger",
          timeout: 2000
        }
      );
    }
    this.discountService.appliedCoupon.subscribe(appliedCoupon => {
      this.appliedCoupon = appliedCoupon;
    });
  }

  addItemToCart(item: Item) {
    this.shoppingcartService.addItem(item);
    this.shoppingcartService.getCartLength();
    this.ngOnInit();
    // this.item.countInCart = this.getItemCountinCart(item);
  }
  removeItemFromCart(item: Item) {
    this.shoppingcartService.removeItem(item);
    this.shoppingcartService.getCartLength();
    this.ngOnInit();
    // this.item.countInCart = this.getItemCountinCart(item);
  }

  getTotalCart(): number {
    const total = this.cartItems.reduce((total, item) => {
      return total + parseFloat(item.itemPrice.toString());
    }, 0);
    return total;
  }
}
