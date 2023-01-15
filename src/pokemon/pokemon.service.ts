import { Injectable } from '@nestjs/common'
import { CreatePokemonDto } from './dto/create-pokemon.dto'
import { UpdatePokemonDto } from './dto/update-pokemon.dto'
import { Model, isValidObjectId } from 'mongoose'
import { Pokemon } from './entities/pokemon.entity'
import { InjectModel } from '@nestjs/mongoose'
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common/exceptions'

@Injectable()
export class PokemonService {

  constructor (
    // implimentacion de inyección que hizo nest
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ) { }


  async create ( createPokemonDto: CreatePokemonDto ) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase()
    try {
      const pokemon = await this.pokemonModel.create( createPokemonDto )
      return pokemon
    } catch ( error ) {
      this.handleExceptions( error )
    }
  }

  findAll () {
    return this.pokemonModel.find( {} )
  }

  async findOne ( term: string ) {

    let pokemon: Pokemon
    // reviso que el string devuelto a nro sea efectivament un numero
    if ( !isNaN( +term ) ) {
      pokemon = await this.pokemonModel.findOne( { no: term } )
    }
    // buscar por mongoID
    if ( !pokemon && isValidObjectId( term ) ) {
      pokemon = await this.pokemonModel.findById( term )
    }

    // buscar por nombre
    if ( !pokemon ) {
      pokemon = await this.pokemonModel.findOne( { name: term.toLowerCase() } )
    }

    if ( !pokemon ) throw new NotFoundException( `Pokemon with id, name or no "${ term } not found` )

    return pokemon
  }

  async update ( term: string, updatePokemonDto: UpdatePokemonDto ) {

    const pokemon = await this.findOne( term )

    if ( updatePokemonDto.name ) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase()
    }

    try {
      await pokemon.updateOne( updatePokemonDto )
      return { ...pokemon.toJSON(), ...updatePokemonDto }
    } catch ( error ) {
      this.handleExceptions( error )
    }
  }

  async remove ( id: string ) {
    // const pokemon = await this.findOne( term )
    // await pokemon.deleteOne()
    // const result = await this.pokemonModel.findByIdAndDelete( term )
    const { deletedCount } = await this.pokemonModel.deleteOne( { _id: id } )
    if ( deletedCount === 0 ) throw new BadRequestException( `Pokemon with id "${ id }" not found` )
  }

  private handleExceptions ( error: any ) {
    // manejo el error que ya existe
    if ( error.code === 11000 ) {
      throw new BadRequestException( `Pokemon already exist in db ${ JSON.stringify( error.keyValue ) }` )
    }
    // aca manejo cualquier otro error posible
    throw new InternalServerErrorException()
  }
}