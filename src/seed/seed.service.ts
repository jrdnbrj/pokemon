import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from './../pokemon/pokemon.service';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    private readonly pokemonService: PokemonService
  ) {}

  async executeSeed() {
    await this.pokemonService.removeAll();
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');
    
    const pokemons = data.results.map(({ name, url }) => {
      const id = url.split('/').filter(Boolean).pop();
      return { no: +id, name };
    });

    await this.pokemonService.createInBulk(pokemons);

    return 'Seed executed successfully!';
  }
}
