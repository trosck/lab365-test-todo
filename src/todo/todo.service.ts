import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from 'src/todo/schemas/todo.schema';
import { DeleteTodoDto } from './dto/delete-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async createTodo(
    createTodoDto: CreateTodoDto,
    owner: string,
  ): Promise<string> {
    const createdTodo = new this.todoModel({
      ...createTodoDto,
      owner,
    });
    const response = await createdTodo.save();
    return response._id.toString();
  }

  async deleteTodoById(deleteTodoDto: DeleteTodoDto) {
    return this.todoModel.findByIdAndDelete(deleteTodoDto.id).exec();
  }

  async findById(id: string) {
    return this.todoModel.findById(id).exec();
  }

  async findAllByUserId(owner: string) {
    return this.todoModel
      .find({
        owner,
      })
      .exec();
  }
}
