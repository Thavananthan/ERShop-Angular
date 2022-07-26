import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { IProduct } from '../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  constructor(
    private shopService: ShopService,
    private activateRoute: ActivatedRoute,
    private bcService: BreadcrumbService
  ) {
    this.bcService.set('@productDetails', 'loading..');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.shopService
      .getProudct(+this.activateRoute.snapshot.paramMap.get('id'))
      .subscribe(
        (product) => {
          this.product = product;
          this.bcService.set('@productDetails', product.name);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
