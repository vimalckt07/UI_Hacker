import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Story {
  id: number;
  title: string;
  url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {
 
  private baseUrl = 'https://localhost:7183/api/Stories';
  constructor(private http: HttpClient) { }

  /***********Vimalendra* ********** 
   * Fetches the newest stories from the Hacker News API.
   * @returns An observable of an array of Story objects.
   ****END***/  

  getNewestStories(): Observable<Story[]> {
    return this.http.get<Story[]>(this.baseUrl).pipe(
      catchError(error => {
        console.error('Error fetching newest stories:', error);
        return throwError(error);
      })
    );
  }
}
