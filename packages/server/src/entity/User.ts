import { Entity, ObjectIdColumn, ObjectID, Column, BaseEntity } from "typeorm"
import { Field, ID, InputType, ObjectType, Root } from "type-graphql"
import { Length, IsEmail } from "class-validator"
import { isEmailAlreadyExist } from "../resolvers/user/isEmailAlreadyExist"

@InputType()
export class UserInputType {
  @Field(() => String!)
  @Length(1, 40) //this are validators
  @IsEmail()
  @isEmailAlreadyExist({ message: "User already Exists" }) //THIS IS MY CUSTOM DECORATOR
  email: string
  @Field()
  @Length(5, 60)
  password: string
  @Field({ nullable: true })
  @Length(1, 20)
  firstname: string
  @Field({ nullable: true })
  @Length(1, 20)
  lastname: string
}

@InputType()
export class UserLoginInput {
  @Field(() => String!)
  @Length(1, 40) //this are validators
  @IsEmail()
  email: string
  @Field()
  @Length(5, 60)
  password: string
}

@ObjectType() //Make it an Object type for type-graphql
@Entity() //Make it an Entity for mongodb and typeorm
export class User extends BaseEntity {
  @Field(() => ID) //this is for the Graphql schema to understand
  @ObjectIdColumn() //this is for mongodb and typeorm to understand
  id: ObjectID

  @Field({ nullable: true }) //not all types are recognized by Graphql but strings  are fine
  @Column()
  firstName?: string

  @Field({ nullable: true })
  @Column()
  lastName?: string

  @Field()
  @Column({ unique: true, nullable: false })
  email: string

  @Field(() => Number)
  @Column({ nullable: true })
  count: number

  //dont add field in order to no see it or return it in the Graphql api
  @Column({ nullable: false })
  password: string

  @Column({ nullable: true })
  token: string

  @Field(() => Boolean)
  @Column({ default: false })
  confirmed: boolean

  //this field is only availalbe in the graphql but not in the database so i dont create a column
  //is a custom field that we create and return info in api. we can also create a field resolver "@FieldResolver()" for it the UserResolver for this example.
  @Field()
  name(@Root() parent: User): string {
    return parent.firstName + " " + parent.lastName
  }
}
