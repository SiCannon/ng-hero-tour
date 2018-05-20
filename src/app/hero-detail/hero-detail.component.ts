import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

    hero: Hero;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private heroService: HeroService
    ) { }

    ngOnInit() {
        this.getHero();
    }

    getHero(): void {
        const id = this.getHeroIdFromRoute();
        this.heroService.getHero(id).subscribe(x => { this.hero = x; });
    }

    getHeroIdFromRoute = (): number => +this.route.snapshot.paramMap.get('id');

    save() {
        this.heroService.updateHero(this.hero).subscribe(x => this.goBack());
    }
    
    goBack() {
        this.location.back();
    }
}
