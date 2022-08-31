import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly service: StudentService) {}

  @Query(() => [Student])
  students(): Promise<Student[]> {
    return this.service.findAll();
  }

  @Query(() => Student)
  student(@Args('id') id: string): Promise<Student> {
    return this.service.findOne(id);
  }

  @Mutation(() => Student)
  createStudent(@Args('create') lesson: CreateStudentInput): Promise<Student> {
    return this.service.create(lesson);
  }

  @Mutation(() => Student)
  updateStudent(
    @Args('id') id: string,
    @Args('update') student: UpdateStudentInput,
  ): Promise<Student> {
    return this.service.update(id, student);
  }

  @Mutation(() => Student)
  removeStudent(@Args('id') id: string): Promise<Student> {
    return this.service.remove(id);
  }
}
