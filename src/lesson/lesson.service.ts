import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './inputs/create-lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  getAllLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  getLesson(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne({ where: { id } });
  }

  createLesson(lesson: CreateLessonInput): Promise<Lesson> {
    lesson = this.lessonRepository.create({
      id: uuid(),
      ...lesson,
    });
    return this.lessonRepository.save(lesson);
  }
}
