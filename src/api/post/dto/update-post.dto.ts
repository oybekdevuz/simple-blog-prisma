import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsBoolean } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsBoolean()
    published?: boolean
}
