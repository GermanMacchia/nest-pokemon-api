import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose/dist"
import { Document } from "mongoose"

@Schema()
export class Pokemon extends Document {
    //! unicos e indexados para buscarlos
    @Prop( {
        unique: true,
        index: true
    } )
    name: string

    @Prop( {
        unique: true,
        index: true
    } )
    no: number

}

export const PokemonSchema = SchemaFactory.createForClass( Pokemon )