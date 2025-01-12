import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginDto {

    @ApiProperty({example: "john@gmail.com", description: "email of user"})
    @IsNotEmpty()
    email: string;
    
    @ApiProperty({example: "johnPass", description: "password of user"})
    @IsNotEmpty()
    password: string;
}
