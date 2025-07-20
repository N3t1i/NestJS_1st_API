import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

//PartialType позволяет создать DTO, где все свойства опциональны, что удобно для операций обновления.