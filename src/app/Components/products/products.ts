import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Iproduct } from '../../Models/iproduct';
import { Icategory } from '../../Models/icategory';
import { FormsModule } from '@angular/forms';
import { SquarePipe } from '../pipes/square-pipe';
import { ProductService } from '../../Services/product.service';
import { CategoryService } from '../../Services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, SquarePipe],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class ProductsComponent implements OnInit, OnChanges {
  products: Iproduct[] = [];
  categories: Icategory[] = [];
  
  @Input() childSelectedCatId: number = 0;
  @Output() onTotalPriceChanged = new EventEmitter<number>();

  searchQuery: string = '';
  isLoading: boolean = false;

  constructor(
    private prdService: ProductService,
    private catService: CategoryService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['childSelectedCatId'] && !changes['childSelectedCatId'].firstChange) {
      this.loadProducts();
    }
  }

  loadCategories(): void {
    this.catService.getAllCategories().subscribe(data => {
      this.categories = data;
      this.cdr.detectChanges();
    });
  }

  // الآن الدالة أصبحت بسيطة جداً كما طلبت
  loadProducts(): void {
    const catId = Number(this.childSelectedCatId);
    this.isLoading = true;
    
    this.prdService.getProductsByCategoryId(catId).subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading products', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  get filteredProducts() {
    if (!this.searchQuery) return this.products;
    return this.products.filter(p => 
      p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  buy(count: string, price: number) {
    const quantity = parseInt(count);
    if (!isNaN(quantity) && quantity > 0) {
      this.onTotalPriceChanged.emit(quantity * price);
    }
  }

  goToDetails(id: number) {
    this.router.navigate(['/product', id]);
  }
}
