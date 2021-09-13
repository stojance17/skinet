import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct | undefined;
  quantity = 1;

  constructor(private shopService: ShopService, 
    private activateRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService) { 
      this.bcService.set('@productDetails', ' ')
    }
    

  ngOnInit(): void {
    this.loadProduct()
  }

  loadProduct() {
    
     let id = +this.activateRoute.snapshot.paramMap.get('id')!;
     console.log(id);
    this.shopService.getProduct(id).subscribe(productResp => {
      this.product = productResp;
      this.bcService.set('@productDetails',productResp.name);
    },
    error=>{
      console.log(error)
    })
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product!,this.quantity)
  }

  incrementQuantity(){
    this.quantity++;
  }
  decrementQuantity(){
    if(this.quantity>0){this.quantity--;}
    
  }

}
