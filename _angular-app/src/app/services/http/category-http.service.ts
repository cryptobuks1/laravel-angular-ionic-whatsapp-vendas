import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Category} from "../../model";
import {HttpResource, SearchParams, SearchParamsBuilder} from "./http-resource";

@Injectable({
  providedIn: 'root'
})
export class CategoryHttpService implements HttpResource<Category> {

  private token: string = window.localStorage.getItem('token');
  private baseUrl: string = 'http://localhost:8000/api/categories';

  constructor(private http: HttpClient) { }

  list(searchParams: SearchParams): Observable<{ data: Array<Category>, meta: any }> {
    const sParams = new SearchParamsBuilder(searchParams).makeObject();
    const params = new HttpParams({
      fromObject: (<any>sParams)
    });
    return this.http.get<{ data: Array<Category>, meta: any }>(`${this.baseUrl}`, {
      params,
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
  }

  get(id: number): Observable<Category> {
    return this.http.get<{ data: Category }>(`${this.baseUrl}/${id}`, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    }).pipe(
      map(response => response.data)
    );
  }

  create(data: Category): Observable<Category> {
    return this.http.post<{ data: Category }>(`${this.baseUrl}`, data, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    }).pipe(
      map(response => response.data)
    );
  }

  update(id: number, data: Category): Observable<Category> {
    return this.http.put<{ data: Category }>(`${this.baseUrl}/${id}`, data, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    }).pipe(
      map(response => response.data)
    );
  }

  destroy(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
  }
}
