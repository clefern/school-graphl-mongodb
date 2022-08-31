import { Field, ID, ObjectType } from '@nestjs/graphql';
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
}
