import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  productIds: number[] = [];
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private prdService: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.prdService.getProductIds().subscribe(ids => {
      this.productIds = ids;
      this.cdr.detectChanges();
    });

    this.route.paramMap.subscribe((params) => {
      this.productId = Number(params.get('id'));
      this.isLoading = true;
      
      this.prdService.getProductById(this.productId).subscribe({
        next: (data) => {
          this.product = data; 
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.isLoading = false;
          this.product = undefined;
          this.cdr.detectChanges();
        }
      });
    });
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  goToNext() {
    const currentIndex = this.productIds.indexOf(this.productId);
    if (currentIndex < this.productIds.length - 1) {
      const nextId = this.productIds[currentIndex + 1];
      this.router.navigate(['/product', nextId]);
    }
  }

  goToPrevious() {
    const currentIndex = this.productIds.indexOf(this.productId);
    if (currentIndex > 0) {
      const prevId = this.productIds[currentIndex - 1];
      this.router.navigate(['/product', prevId]);
    }
  }

  isFirst(): boolean {
    return this.productIds.indexOf(this.productId) === 0;
  }

  isLast(): boolean {
    return this.productIds.indexOf(this.productId) === this.productIds.length - 1;
  }
}
