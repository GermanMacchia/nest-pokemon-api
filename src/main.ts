import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common/pipes'

async function bootstrap () {
  const app = await NestFactory.create( AppModule )

  app.setGlobalPrefix( 'api/v2' )
  app.useGlobalPipes(
    //validaciones de la carga del cliente, acepta los atr que tiene el dto, rechaza lo que no tiene
    new ValidationPipe( {
      whitelist: true,
      forbidNonWhitelisted: true,
      //transforma las peticiones en los atributos del dto
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    } )
  )
  await app.listen( process.env.PORT )
  console.log( `
    *************************
    App running on Port: ${ process.env.PORT }
    *************************
  ` )
}
bootstrap()
