import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Student } from '../student/entities/student.entity';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity('lesson')
@ObjectType('Lesson')
export class Lesson {
  @ObjectIdColumn()
  @Field((type) => ID)
  _id: string;

  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  startDate: string;

  @Field()
  @Column()
  endDate: string;

  @Field((type) => [Student], { nullable: true })
  @Column({ nullable: true })
  students: string[];
}
