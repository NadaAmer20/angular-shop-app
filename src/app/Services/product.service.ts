import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { Iproduct } from '../Models/iproduct';
import { environment } from '../../environments/environment';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private catService: CategoryService) {}

  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getProductsByCategoryId(catId: number): Observable<Iproduct[]> {
    if (catId === 0) {
      return this.getAllProducts().pipe(map(res => this.mapProducts(res.products, 0)));
    }

    return this.catService.getAllCategories().pipe(
      map(categories => categories.find(c => c.id === catId)?.name || ''),
      switchMap(catName => this.http.get<any>(`${this.apiUrl}/category/${catName}`)),
      map(res => this.mapProducts(res.products, catId))
    );
  }

  // الآن هذه الدالة تعيد منتجاً جاهزاً ومنسقاً
  getProductById(id: number): Observable<Iproduct> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(res => ({
        id: res.id,
        name: res.title,
        price: res.price,
        quantity: res.stock,
        imgUrl: res.thumbnail,
        catId: 0
      }))
    );
  }

  getProductIds(): Observable<number[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => res.products.map((p: any) => p.id))
    );
  }

  private mapProducts(products: any[], catId: number): Iproduct[] {
    return products.map(p => ({
      id: p.id,
      name: p.title,
      price: p.price,
      quantity: p.stock,
      imgUrl: p.thumbnail,
      catId: catId
    }));
  }
}
