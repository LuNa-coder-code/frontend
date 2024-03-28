import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Boxevent } from './boxevent';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Boxevent[]>{
    return this.http.get<Boxevent[]>(this.baseUrl);
  }
  getOne(id: string): Observable<Boxevent>{
    return this.http.get<Boxevent>(this.baseUrl + '/' + id);
  }

  update(id: string, data: Boxevent): Observable<Boxevent> {
    return this.http.patch<Boxevent>(this.baseUrl + '/' + id, data);
  }
  
  deleteOne(id: string): Observable<any>{
    return this.http.delete<any>(this.baseUrl + '/' + id, {observe: 'response'});
  }   
}