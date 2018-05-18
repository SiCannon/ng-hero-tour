import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HeroService {

    private heroesUrl = 'api/heroes';  // URL to web api

    constructor(
        private httpClient: HttpClient,
        private messageService: MessageService) { }

    getHeroes(): Observable<Hero[]> {
        return this.httpClient.get<Hero[]>(this.heroesUrl)
            .pipe(
                tap(x => this.log(`.getHeroes`)),
                catchError(this.handleError('getHeroes', [{ id: -1, name: 'El Zilcho' }]))
            );
    }

    getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.httpClient.get<Hero>(url)
            .pipe(
                tap(x => this.log(`.getHero(${id})`)),
                catchError(this.handleError(`getHero()`, { id: -1, name: 'El Zilcho' }))
            );
    }

    private log(message: string) {
        this.messageService.add("HeroService" + message);
    }

    private handleError<T>(operation: string, result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`.${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}
