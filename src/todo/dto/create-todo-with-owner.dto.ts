import { IsString } from 'class-validator';
import { CreateTodoDto } from './create-todo.dto';

export class CreateTodoWithOwnerDto extends CreateTodoDto {
  @IsString()
  owner: string;
}
