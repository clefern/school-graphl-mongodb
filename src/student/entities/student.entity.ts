import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity('student')
@ObjectType('Student')
export class Student {
  @ObjectIdColumn()
  @Field((type) => ID)
  _id: string;

  @Field()
  @PrimaryColumn()
  id: string;

  @Field((type) => String, { nullable: true })
  @Column()
  firstName: string;

  @Field((type) => String, { nullable: true })
  @Column()
  lastName: string;
}
