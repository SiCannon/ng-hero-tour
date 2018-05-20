import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class HeroService {

    private heroesUrl = 'api/heroes';  // URL to web api

    constructor(
        private http: HttpClient,
        private messageService: MessageService) {
        
            
    }

    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(this.heroesUrl)
            .pipe(
                tap(x => this.log(`.getHeroes`)),
                catchError(this.handleError('getHeroes', [{ id: -1, name: 'El Zilcho' }]))
            );
    }

    getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get<Hero>(url)
            .pipe(
                tap(x => this.log(`.getHero(${id})`)),
                catchError(this.handleError(`getHero()`, { id: -1, name: 'El Zilcho' }))
            );
    }
    
    updateHero(hero: Hero): Observable<any> {
        return this.http.put(this.heroesUrl, hero, httpOptions)
            .pipe(
                tap(x => this.log(`.updateHero(${hero.id})`)),
                catchError(this.handleError<any>('updateHero'))
            );
    }

    newHero(hero: Hero): Observable<Hero> {
        return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
            .pipe(
                tap(x => this.log(`.newHero(${hero.name}) -> ${x.id}`)),
                catchError(this.handleError<any>('newHero'))
            );
    }
    
    deleteHero(hero: Hero): Observable<any> {
        return this.http.delete(`${this.heroesUrl}/${hero.id}`, httpOptions)
            .pipe(
                tap(x => this.log(`.deleteHero(${hero.id})`)),
                catchError(this.handleError<any>('newHero'))
            );
    }
    
    search(term: string): Observable<Hero[]> {
        return this.http.get<Hero[]>(`${this.heroesUrl}?name=${term}`);
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
    
    // private tapAndCatch<T>(o: Observable<T>, message: string, operation: string, result?: T): Observable<T> {
    //     return o.pipe(
    //         tap(x => this.log(message)),
    //         catchError(this.handleError<any>(operation, result))
    //     );  
    // }
}
