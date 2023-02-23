import { IsNotEmpty } from 'class-validator';

export class LoginDTO {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}