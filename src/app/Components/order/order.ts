import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Icategory } from '../../Models/icategory';
import { ProductsComponent } from '../products/products';
import { CategoryService } from '../../Services/category.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductsComponent],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class Order implements AfterViewInit {
  categories: Icategory[];
  selectedCatId: number = 0;
  totalOrderPrice: number = 0;
  @ViewChild('userNameInp') myInp!: ElementRef;
  @ViewChild(ProductsComponent) prdComponentObj!: ProductsComponent;
  constructor(private catService: CategoryService) {
    this.categories = this.catService.getAllCategories();
  }
  ngAfterViewInit(): void {
    this.myInp.nativeElement.value = "nada";
  }

  updateTotalPrice(price: number) {
    this.totalOrderPrice += price;
  }
}
