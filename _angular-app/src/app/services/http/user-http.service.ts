import { Injectable } from '@angular/core';
import {User} from "../../model";
import {HttpResource, SearchParams, SearchParamsBuilder} from "./http-resource";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserHttpService implements HttpResource<User> {

  private token: string = window.localStorage.getItem('token');
  private baseUrl: string = 'http://localhost:8000/api/users';

  constructor(private http: HttpClient) { }

  list(searchParams: SearchParams): Observable<{ data: Array<User>, meta: any }> {
    const sParams = new SearchParamsBuilder(searchParams).makeObject();
    const params = new HttpParams({
      fromObject: (<any>sParams)
    });
    return this.http.get<{ data: Array<User>, meta: any }>(`${this.baseUrl}`, {
      params,
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
  }

  get(id: number): Observable<User> {
    return this.http.get<{ data: User }>(`${this.baseUrl}/${id}`, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    }).pipe(
      map(response => response.data)
    );
  }

  create(data: User): Observable<User> {
    return this.http.post<{ data: User }>(`${this.baseUrl}`, data, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    }).pipe(
      map(response => response.data)
    );
  }

  update(id: number, data: User): Observable<User> {
    return this.http.put<{ data: User }>(`${this.baseUrl}/${id}`, data, {
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
