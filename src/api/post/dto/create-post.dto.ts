import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";

export class CreatePostDto {
    @ApiProperty({example: "New post", description: "title for content"})
    @IsNotEmpty()
    public title: string;
    
    @ApiProperty({example: "Content of new post", description: "Content of new post"})
    @IsNotEmpty()
    public content: string;

    @ApiProperty({example: "Is published or not", description: "true"})
    @IsBoolean()
    published?: boolean
}
