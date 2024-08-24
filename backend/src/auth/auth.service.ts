import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService,
        private readonly configService: ConfigService
    ) {}

    async refreshToken(req: Request, res: Response) {
        const refreshToken = req.cookies['refreshToken'];
        if (!refreshToken) {
            throw new Error('Refresh token not found');
        }

        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            
            })

            const user = await this.prismaService.user.findUnique({
                where: {
                    id: payload.userId
                }
            })

            if (!user) {
                throw new Error('User not found');
            }

            const accessToken = await this.jwtService.signAsync({
                userId: user.id
            }, {


            }

        // Implement your logic here

    }

    catch (error) {
        

}
