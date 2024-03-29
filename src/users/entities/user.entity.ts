import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  username: string;

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  dob: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
