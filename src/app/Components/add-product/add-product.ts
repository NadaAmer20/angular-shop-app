import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { CategoryService } from '../../Services/category.service';
import { Icategory } from '../../Models/icategory';
import { Iproduct } from '../../Models/iproduct';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProductComponent implements OnInit {
  categories: Icategory[] = [];
  imagePreview: string | ArrayBuffer | null = null;
  isEditMode: boolean = false;
  currentProductId: number = 0;

  newProduct: Iproduct = {
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
    imgUrl: '',
    catId: 0
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (cats: Icategory[]) => {
        this.categories = cats.filter(c => c.id !== 0);
      }
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.currentProductId = Number(id);
        this.loadProductForEdit(this.currentProductId);
      }
    });
  }

  loadProductForEdit(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (prod) => {
        this.newProduct = { ...prod };
        this.imagePreview = prod.imgUrl;
      },
      error: (err) => console.error('Error loading product', err)
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.newProduct.imgUrl = reader.result as string;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    const productToSave: Iproduct = {
      ...this.newProduct,
      price: Number(this.newProduct.price),
      quantity: Number(this.newProduct.quantity),
      catId: Number(this.newProduct.catId),
      imgUrl: this.newProduct.imgUrl.toString().startsWith('data:') ? 'https://i.dummyjson.com/data/products/1/thumbnail.jpg' : this.newProduct.imgUrl
    };

    if (this.isEditMode) {
      this.productService.updateProduct(this.currentProductId, productToSave).subscribe({
        next: () => {
          alert('Product updated successfully!');
          this.router.navigate(['/products']);
        },
        error: (err) => alert('Failed to update product')
      });
    } else {
      this.productService.addNewProduct(productToSave).subscribe({
        next: () => {
          alert('Product added successfully!');
          this.router.navigate(['/products']);
        },
        error: (err) => alert('Failed to add product')
      });
    }
  }
}
