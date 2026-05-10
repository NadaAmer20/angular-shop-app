import { Injectable } from '@angular/core';
import { Icategory } from '../Models/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Icategory[];

  constructor() {
    this.categories = [
      { id: 0, name: 'All Categories' },
      { id: 1, name: 'Laptops' },
      { id: 2, name: 'Smartphones' },
      { id: 3, name: 'Accessories' },
      { id: 4, name: 'Monitors' }
    ];
  }

  getAllCategories(): Icategory[] {
    return this.categories;
  }

  getCategoryById(id: number): Icategory | undefined {
    return this.categories.find(c => c.id === id);
  }
}
