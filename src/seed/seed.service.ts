import { Injectable } from '@nestjs/common'
import { PokeResponse, Result } from './interfaces/poke-response.interfaces'
import { PokemonService } from '../pokemon/pokemon.service'
import { InjectModel } from '@nestjs/mongoose'
import { Pokemon } from '../pokemon/entities/pokemon.entity'
import { Model } from 'mongoose'


@Injectable()
export class SeedService {

  constructor (
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ) { }

  async executeSeed () {
    const response = await fetch( "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0" )
    const data = await response.json()
    const pokemonArray = data.results.map( ( { name, url } ) => {
      const segments = url.split( '/' )
      const no: number = +segments[ segments.length - 2 ]
      return ( {
        name,
        no
      } )
    } )
    await this.pokemonModel.deleteMany( {} )
    await this.pokemonModel.insertMany( pokemonArray )
    return "Seed Executed"
  }
}
