import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Student } from '../student/entities/student.entity';
import { StudentService } from '../student/student.service';
import { AssignStudentsToLesson } from './inputs/assign-students-to-lesson.input';
import { CreateLessonInput } from './inputs/create-lesson.input';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';

@Resolver((of) => Lesson)
export class LessonResolver {
  constructor(
    private service: LessonService,
    private studentService: StudentService,
  ) {}

  @Query(() => [Lesson])
  lessons(): Promise<Lesson[]> {
    return this.service.getAllLessons();
  }

  @Query(() => Lesson)
  lesson(@Args('id') id: string): Promise<Lesson> {
    return this.service.getLesson(id);
  }

  @Mutation(() => Lesson)
  createLesson(@Args('create') lesson: CreateLessonInput): Promise<Lesson> {
    return this.service.create(lesson);
  }

  @Mutation(() => Lesson)
  updateLesson(
    @Args('id') id: string,
    @Args('lesson') input: CreateLessonInput,
  ): Promise<Lesson> {
    return this.service.update(id, input);
  }

  @Mutation(() => Lesson)
  deleteLesson(@Args('id') id: string): Promise<Lesson> {
    console.log(id);

    return this.service.delete(id);
  }

  @Mutation(() => Lesson)
  assignStudentsToLesson(
    @Args('input') input: AssignStudentsToLesson,
  ): Promise<Lesson> {
    return this.service.assignStudentsToLesson(input);
  }

  /**
   * resulve the students of a lesson
   */
  @ResolveField()
  async students(@Parent() lesson: Lesson): Promise<Student[]> {
    return this.studentService.getManyStudents(lesson?.students);
  }
}
