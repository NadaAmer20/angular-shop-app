import { Injectable } from '@angular/core';
import { Iproduct } from '../Models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Iproduct[];

  constructor() {
    this.products = [
      {
        id: 100,
        name: "Dell Laptop Pro",
        price: 50000,
        quantity: 3,
        imgUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop',
        catId: 1
      },
      {
        id: 120,
        name: "Dell Latitude 5520",
        price: 50000,
        quantity: 0,
        imgUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800&auto=format&fit=crop',
        catId: 1
      },
      {
        id: 101,
        name: "HP Pavilion x360",
        price: 42000,
        quantity: 5,
        imgUrl: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
        catId: 1
      },
      {
        id: 102,
        name: "Lenovo ThinkPad X1",
        price: 38000,
        quantity: 2,
        imgUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
        catId: 1
      },
      {
        id: 103,
        name: "iPhone 15 Pro",
        price: 65000,
        quantity: 7,
        imgUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800&auto=format&fit=crop',
        catId: 2
      },
      {
        id: 104,
        name: "Samsung Galaxy S24",
        price: 58000,
        quantity: 4,
        imgUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop',
        catId: 2
      },
      {
        id: 105,
        name: "AirPods Pro Gen 2",
        price: 12000,
        quantity: 10,
        imgUrl: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=800&auto=format&fit=crop',
        catId: 3
      },
      {
        id: 106,
        name: "Sony WH-1000XM5",
        price: 9000,
        quantity: 6,
        imgUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
        catId: 3
      },
      {
        id: 107,
        name: "LG UltraGear Monitor",
        price: 15000,
        quantity: 8,
        imgUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop',
        catId: 4
      },
    ];
  }

  getAllProducts(): Iproduct[] {
    return this.products;
  }

  getProductsByCategoryId(catId: number): Iproduct[] {
    if (catId === 0) {
      return this.getAllProducts();
    }
    return this.products.filter(p => p.catId === catId);
  }

  getProductsByCatIdAndSearch(catId: number, searchQuery: string): Iproduct[] {
    return this.products.filter(prd => {
      const matchCategory = (catId === 0 || prd.catId === catId);
      const matchSearch = prd.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }

  getProductById(id: number): Iproduct | undefined {
    return this.products.find(p => p.id === id);
  }
}
