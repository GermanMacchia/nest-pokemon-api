import { MinLength, IsString, IsInt, IsPositive, Min } from "class-validator"
import { } from "class-validator/types/decorator/decorators"


export class CreatePokemonDto {

    @IsInt()
    @IsPositive()
    @Min( 1 )
    no: number

    @IsString()
    @MinLength( 3 )
    name: string

}
