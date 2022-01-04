import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { CATEGORIES } from '../models/categories.model';
import { BOOKS } from '../models/books.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CATEGORIES[]> {
      return this.http.get<CATEGORIES[]>('https://61167dbc1c592d0017bb7f4c.mockapi.io/categories');
  }

  removeCategories(id: number): Observable<{}> {
      return this.http.delete(`https://61167dbc1c592d0017bb7f4c.mockapi.io/categories/${id}`);
  }

  addCategories(categoryName: any): Observable<CATEGORIES> {
   
      return this.http.post<CATEGORIES>('https://61167dbc1c592d0017bb7f4c.mockapi.io/categories', categoryName).pipe(map((res: CATEGORIES) => {
          return res;
          }));
  }

  updateCategories(categoryName: any, id: number): Observable<CATEGORIES> {
      return this.http.put<CATEGORIES>(`https://61167dbc1c592d0017bb7f4c.mockapi.io/categories/${id}`, categoryName).pipe(map((res: CATEGORIES) => {
          return res;
          }));
  }

  //books api routes
    getBooks(): Observable<BOOKS[]> {
      return this.http.get<BOOKS[]>('https://61167dbc1c592d0017bb7f4c.mockapi.io/books');
  }

  removeBooks(id: number): Observable<{}> {
      return this.http.delete(`https://61167dbc1c592d0017bb7f4c.mockapi.io/books/${id}`);
  }

  addBooks(bookName: any): Observable<BOOKS> {
  
      return this.http.post<BOOKS>('https://61167dbc1c592d0017bb7f4c.mockapi.io/books', bookName).pipe(map((res: BOOKS) => {
          return res;
          }));
  }

    updateBooks(bookName: any, id: number): Observable<BOOKS> {
        return this.http.put<BOOKS>(`https://61167dbc1c592d0017bb7f4c.mockapi.io/books/${id}`, bookName).pipe(map((res: BOOKS) => {
            return res;
            }));
    }

    changeFavorite(bookFav:any, id: number): Observable<BOOKS> {
      return this.http.put<BOOKS>(`https://61167dbc1c592d0017bb7f4c.mockapi.io/books/${id}`, bookFav).pipe(map((res: BOOKS) => {
          return res;
          }));
  }

    favoriteBooks(): Observable<BOOKS> {
      return this.http.get<BOOKS>(`https://61167dbc1c592d0017bb7f4c.mockapi.io/books?isFavorite=true`).pipe(map((res: BOOKS) => {
          return res;
          }));
  }
    
  }

 

