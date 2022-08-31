import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateLessonInput } from './inputs/create-lesson.input';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';

@Resolver((of) => Lesson)
export class LessonResolver {
  constructor(private service: LessonService) {}

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
    @Args('lesson') lesson: CreateLessonInput,
  ): Promise<Lesson> {
    return this.service.update(id, lesson);
  }

  @Mutation(() => Lesson)
  deleteLesson(@Args('id') id: string): Promise<Lesson> {
    console.log(id);

    return this.service.delete(id);
  }
}
