import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateLessonInput } from './inputs/create-lesson.input';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';

@Resolver((of) => Lesson)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}

  @Query((returns) => Lesson)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Query((returns) => [Lesson])
  lessons() {
    return this.lessonService.getAllLessons();
  }

  @Mutation((returns) => Lesson)
  createLesson(@Args('create') lesson: CreateLessonInput): Promise<Lesson> {
    return this.lessonService.createLesson(lesson);
  }
}
