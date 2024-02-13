import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from './../pokemon/pokemon.service';
import { AxiosAdapter } from './../common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly http: AxiosAdapter
  ) {}

  async executeSeed() {
    await this.pokemonService.removeAll();
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');
    
    const pokemons = data.results.map(({ name, url }) => {
      const id = url.split('/').filter(Boolean).pop();
      return { no: +id, name };
    });

    await this.pokemonService.createInBulk(pokemons);

    return 'Seed executed successfully!';
  }
}
