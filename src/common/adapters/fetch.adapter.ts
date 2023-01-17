import { HttpAdapter } from '../interfaces/http-adapte.interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FetchAdapter implements HttpAdapter {
    //Funcion Generica
    async get<T> ( url: string ): Promise<T> {
        try {
            const response = await fetch( "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0" )
            const data = await response.json()
            return data
        } catch ( e ) {
            throw new Error( 'HTTP Adapter error' )
        }
    }
}