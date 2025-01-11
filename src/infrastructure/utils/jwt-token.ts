import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { config } from "../../config";
import { User } from "@prisma/client";

@Injectable()
export class JwtToken {
    constructor(private readonly jwt: JwtService) { }

    public async generateToken(
        user: User
    ): Promise<string> {

        const payload = {
            id: user.id,
            email: user.email
        };

        return this.jwt.sign(payload, {
            secret: config.ACCESS_SECRET_KEY,
            expiresIn: config.ACCESS_EXPIRE_TIME,
        });
    }

    public async generateAdminToken(admin: any) {
        const payload = {
            id: admin.id,
            role: admin.role,
            phone_number: admin.phone_number,
        };

        const token = await this.jwt.signAsync(payload, {
            secret: config.ACCESS_SECRET_KEY,
            expiresIn: config.ACCESS_EXPIRE_TIME,
        });

        return token;
    }

    public async verifyAccess(token: string) {
        return this.jwt.verifyAsync(token, { publicKey: config.ACCESS_SECRET_KEY });
    }

    // public async verifyRefresh(token: string) {
    // 	return this.jwt.verifyAsync(token, { publicKey: config.REFRESH_SECRET_KEY });
    // }

    // public async generateToken(
    // 	user: UserEntity,
    // 	time: string
    // ): Promise<{ access_token: string; refresh_token: string }> {
    // 	const payload = {
    // 		id: user.id,
    // 		role: user.role,
    // 		email: user.email,
    // 	};

    // 	const [access_token, refresh_token] = await Promise.all([
    // 		this.jwt.sign(payload, {
    // 			secret: config.ACCESS_SECRET_KEY,
    // 			expiresIn: config.ACCESS_SECRET_TIME,
    // 		}),
    // 		this.jwt.sign(payload, {
    // 			secret: config.REFRESH_SECRET_KEY,
    // 			expiresIn: config.REFRESH_SECRET_TIME,
    // 		}),
    // 	]);
    // 	return { access_token, refresh_token };
    // }
}
