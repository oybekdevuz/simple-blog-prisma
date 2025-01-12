import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {

    @ApiProperty({example: "John", description: "name of new user"})
    @IsNotEmpty()
    name: string;
    
    @ApiProperty({example: "john@gmail.com", description: "email of new user"})
    @IsNotEmpty()
    email: string;
    
    @ApiProperty({example: "johnPass", description: "password of new user"})
    @IsNotEmpty()
    password: string;
    
}
