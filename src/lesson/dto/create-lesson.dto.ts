import { IsNotEmpty } from 'class-validator';

export class CreateLessonDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  endDate: string;
}
