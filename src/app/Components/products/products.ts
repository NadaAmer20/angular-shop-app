import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Iproduct } from '../../Models/iproduct';
import { FormsModule } from '@angular/forms';
import { SquarePipe } from '../pipes/square-pipe';
import { ProductService } from '../../Services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, SquarePipe],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class ProductsComponent implements OnInit {
  products: Iproduct[] = [];
  @Input() childSelectedCatId: number = 0;
  @Output() onTotalPriceChanged = new EventEmitter<number>();

  searchQuery: string = '';
  num: number = 5;

  constructor(private prdService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.products = this.prdService.getAllProducts();
  }

  get filteredProducts() {
    return this.prdService.getProductsByCatIdAndSearch(Number(this.childSelectedCatId), this.searchQuery);
  }

  buy(count: string, price: number) {
    this.onTotalPriceChanged.emit(parseInt(count) * price);
  }

  goToDetails(id: number) {
    this.router.navigate(['/product', id]);
  }

  trackItem(index: number, item: Iproduct) {
    return item.id;
  }
}
