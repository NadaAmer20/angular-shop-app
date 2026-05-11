import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Icategory } from '../Models/icategory';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/category-list`;

  constructor(private http: HttpClient) { }

  getCategoryNames(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }

  getAllCategories(): Observable<Icategory[]> {
    return this.getCategoryNames().pipe(
      map(names => {
        const categories = names.map((name, index) => ({
          id: index + 1,
          name: name
        }));
        return [{ id: 0, name: 'All Categories' }, ...categories];
      })
    );
  }
}
