import { ConsoleLogger, Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { PokemonModule } from './pokemon/pokemon.module'
import { MongooseModule } from '@nestjs/mongoose'
import { CommonModule } from './common/common.module'
import { SeedModule } from './seed/seed.module'
import { ConfigModule } from '@nestjs/config'
import { EnvConfiguration } from './config/env.config'
import { joiValidationSchema } from './config/joi.validation'

@Module( {
  imports: [
    //para leer variables de entorno, siempre arriba
    ConfigModule.forRoot( {
      load: [ EnvConfiguration ],
      validationSchema: joiValidationSchema
    } ),
    // manda lo que esta en la direccion por default
    ServeStaticModule.forRoot( {
      rootPath: join( __dirname, '..', 'public' ),
    } ),
    MongooseModule.forRoot( process.env.MONGODB ),
    PokemonModule,
    CommonModule,
    SeedModule
  ],
  controllers: [],
  providers: []
} )
export class AppModule { }