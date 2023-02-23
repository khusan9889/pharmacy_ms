import { IsNotEmpty, IsString } from "class-validator"

export class AuthLoginDto {
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    password: string
}
