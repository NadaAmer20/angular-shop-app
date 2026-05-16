import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map, switchMap, tap, of } from 'rxjs';
import { Iproduct } from '../Models/iproduct';
import { environment } from '../../environments/environment';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;
  private localProducts: Iproduct[] = [];

  constructor(private http: HttpClient, private catService: CategoryService) { }

  getAllProducts(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.get<any>(this.apiUrl, httpOptions).pipe(
      map(res => {
        const apiMappedLocal = this.localProducts.map(p => ({
          id: p.id,
          title: p.name,
          price: p.price,
          stock: p.quantity,
          thumbnail: p.imgUrl
        }));
        res.products = [...apiMappedLocal, ...res.products];
        return res;
      })
    );
  }

  getProductsByCategoryId(catId: number): Observable<Iproduct[]> {
    if (catId === 0) {
      return this.getAllProducts().pipe(map(res => this.mapProducts(res.products, 0)));
    }

    return this.catService.getAllCategories().pipe(
      map(categories => categories.find(c => c.id === catId)?.name || ''),
      switchMap(catName => {
        let queryParams = new HttpParams();
        queryParams = queryParams.append("limit", 5);
        queryParams = queryParams.append("select", "title,price,thumbnail");

        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }),
          params: queryParams
        };

        return this.http.get<any>(`${this.apiUrl}/category/${catName}`, httpOptions);
      }),
      map(res => {
        const remoteProducts = this.mapProducts(res.products, catId);
        const filteredLocal = this.localProducts.filter(p => p.catId === catId);
        return [...filteredLocal, ...remoteProducts];
      })
    );
  }

  getProductById(id: number): Observable<Iproduct> {
    const localProd = this.localProducts.find(p => p.id === id);
    if (localProd) {
      return of(localProd);
    }

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
    return this.getAllProducts().pipe(
      map(res => res.products.map((p: any) => p.id))
    );
  }

  private mapProducts(products: any[], catId: number): Iproduct[] {
    return products.map(p => ({
      id: p.id,
      name: p.title || p.name,
      price: p.price,
      quantity: p.stock !== undefined ? p.stock : p.quantity,
      imgUrl: p.thumbnail || p.imgUrl,
      catId: catId
    }));
  }

  addNewProduct(newProd: Iproduct): Observable<any> {
    const apiBody = {
      title: newProd.name,
      price: newProd.price,
      stock: newProd.quantity,
      thumbnail: newProd.imgUrl,
      categoryId: newProd.catId
    };

    return this.http.post<any>(this.apiUrl + '/add', apiBody).pipe(
      tap(res => {
        const productWithId = { ...newProd, id: res.id };
        this.localProducts.push(productWithId);
      })
    );
  }

  updateProduct(id: number, updatedProd: Iproduct): Observable<any> {
    const apiBody = {
      title: updatedProd.name,
      price: updatedProd.price,
      stock: updatedProd.quantity,
      thumbnail: updatedProd.imgUrl,
      categoryId: updatedProd.catId
    };

    return this.http.patch<any>(`${this.apiUrl}/${id}`, apiBody).pipe(
      tap(() => {
        const index = this.localProducts.findIndex(p => p.id === id);
        if (index !== -1) {
          this.localProducts[index] = { ...updatedProd, id };// ...updatedProd << Spread Operator
        } else {
          this.localProducts.push({ ...updatedProd, id });
        }
      })
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.localProducts = this.localProducts.filter(p => p.id !== id);
      })
    );
  }
}
