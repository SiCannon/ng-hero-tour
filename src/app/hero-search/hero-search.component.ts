import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

    constructor(private heroService: HeroService) { }

    heroes$: Observable<Hero[]>;
    private searchTerms = new Subject<string>();

    ngOnInit() {
        this.heroes$ = this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(x => this.heroService.search(x))
        );
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }

}
