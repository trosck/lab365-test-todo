import { Body, Controller, Delete, Get, Post, Request } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';
import { DeleteTodoDto } from './dto/delete-todo.dto';
import { NotAnOwnerException } from 'src/errors/not-an-owner-exception';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create')
  async createTodo(@Request() req, @Body() createTodoDto: CreateTodoDto) {
    return {
      id: await this.todoService.createTodo(createTodoDto, req.user.id),
    };
  }

  @Delete('delete')
  async deleteTodo(@Request() req, @Body() deleteTodoDto: DeleteTodoDto) {
    const todo = await this.todoService.findById(deleteTodoDto.id);

    if (todo.owner !== req.user.id) {
      throw new NotAnOwnerException();
    }

    const deletedTodo = await this.todoService.deleteTodoById(deleteTodoDto);
    return {
      id: deletedTodo._id,
    };
  }

  @Get('get')
  async getTodos(@Request() req) {
    const todoList = await this.todoService.findAllByUserId(req.user.id);
    return todoList.map((todo) => ({
      id: todo._id,
      title: todo.title,
      description: todo.description,
    }));
  }
}
