import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  findAll() {
    return this.pokemonModel.find();
  }

  async findOne(term: string) {
    let pokemon;

    if (!isNaN(+term))
      pokemon = await this.pokemonModel.findOne({ no: term });
    
    if (!pokemon && isValidObjectId(term))
      pokemon = await this.pokemonModel.findById(term);

    if (!pokemon)
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase() });

    if (!pokemon) 
      throw new NotFoundException('Pokemon not found');

    return pokemon
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      return await this.pokemonModel.findByIdAndUpdate(pokemon._id, updatePokemonDto, { new: true });
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
  
    if (!deletedCount)
      throw new NotFoundException('Pokemon not found');

    return;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) 
      throw new BadRequestException('Pokemon already exists');
    
    throw new InternalServerErrorException('Error creating pokemon');
  }
}
