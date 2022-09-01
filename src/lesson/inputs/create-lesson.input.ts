import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsUUID,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateLessonInput {
  @Field()
  @MinLength(1)
  name: string;

  @Field()
  @IsDateString()
  startDate: string;

  @Field()
  @IsDateString()
  endDate: string;

  @IsUUID('4', { each: true })
  @Field((type) => [ID], { defaultValue: [] })
  @IsArray()
  students: string[];
}
