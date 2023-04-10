import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/services/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService,
        private usersService: UserService

    ) {}

    async validateUser({ username, password }) {
        const hasUser = await this.userRepository.findOne({ where: { username } })
        if (!hasUser)
            return null

        const isPasswordValid = await bcrypt.compare(password, hasUser.password);
        if (!isPasswordValid) {
            return null
        } else return hasUser
    }

    async login(user: any) {
        // console.log(user.user);
        const payload = {
            user: {
                id: user.user.id,
                username: user.user.username,
            }
        };
        // console.log({payload});
        return {
            access_token: this.jwtService.sign(payload),
        };

    }

    async register(data) {
        data.password = await bcrypt.hash(data.password, 10)
        let response = await this.usersService.create(data);
        if (response) {
            const { password, ...result } = response;
            return result;
        }
    }

    decodeToken(token): any {
        return this.jwtService.decode(token)
    }


}
