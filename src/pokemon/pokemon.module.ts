import { Module } from '@nestjs/common'
import { PokemonService } from './pokemon.service'
import { PokemonController } from './pokemon.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Pokemon, PokemonSchema } from './entities/pokemon.entity'
import { ConfigModule } from '@nestjs/config'

@Module( {
  controllers: [ PokemonController ],
  providers: [ PokemonService ],
  exports: [ MongooseModule ],
  imports: [
    //env. variables config dentro de service y ademeas segun su tipo
    ConfigModule,
    MongooseModule.forFeature( [ {
      name: Pokemon.name,
      schema: PokemonSchema,
    } ] )
  ]
} )
export class PokemonModule { }
