import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://vgomez:1234@test-mongo:27017/nestjs?retryWrites=true&serverSelectionTimeoutMS=2000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1'),
    // MongooseModule.forRoot('mongodb+srv://victod53:pUBI5kC5WtHxoZ3J@users.3vktmvv.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
})
export class DatabaseModule {}