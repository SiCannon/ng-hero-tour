import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

    constructor(private heroService: HeroService) { }

    ngOnInit() {
        this.getHeroes();
    }

    heroes: Hero[];

    getHeroes() {
        this.heroService.getHeroes().subscribe(x => this.heroes = x);
    }

    add(name: string) {
        name = name.trim();
        if (!name) {
             return;
        }
        this.heroService.newHero({ name } as Hero)
            //.subscribe(x => this.heroes.push(x));
            .subscribe(x => this.getHeroes());
    }

    delete(hero: Hero) {
        this.heroService.deleteHero(hero).subscribe(x => this.getHeroes());
    }
    
}
