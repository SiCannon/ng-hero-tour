import { InMemoryDbService } from 'angular-in-memory-web-api';
import { HEROES } from './mock-heroes';
import { Hero } from './hero';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        return { heroes: HEROES };
    }
    
    genId(heroes: Hero[]): number {
        return heroes.length > 0 ? Math.max(...heroes.map(x => x.id)) + 1 : 11;
    }
}