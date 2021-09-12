import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct | undefined;

  constructor(private shopService: ShopService, 
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProduct()
  }

  loadProduct() {
    
     let id = +this.activateRoute.snapshot.paramMap.get('id')!;
     console.log(id);
    this.shopService.getProduct(id).subscribe(productResp => {
      this.product = productResp;
    },
    error=>{
      console.log(error)
    })
  }

}
