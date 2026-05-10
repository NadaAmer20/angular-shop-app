import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { Iproduct } from '../../Models/iproduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetailsComponent implements OnInit {
  productId: number = 0;
  product: Iproduct | undefined;

  constructor(
    private route: ActivatedRoute,
    private prdService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.prdService.getProductById(this.productId);
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
