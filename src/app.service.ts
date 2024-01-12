import { Injectable, } from '@nestjs/common';

@Injectable()
export class AppService {

  // onModuleInit() {
  //   this.connectToDatabase()
  // }

  // private client = new MongoClient(process.env.MONGODB_URI);

  // async connectToDatabase() {
  //   try {
  //     await this.client.connect();
  //     console.log('Connected to MongoDB');
  //   } catch (error) {
  //     console.error('Error connecting to MongoDB:', error.message);
  //   }
  // }

  // onModuleDestroy() {
  //   console.log('Application is shutting down. Closing connections...');
  //   this.client.close().then(() => {
  //     console.log('MongoDB connection closed. Exiting...');
  //     process.exit(0);
  //   });

  // }
  
  getHello(): string[] {
    return ['Hello World!', 'VGOMEZ'];
  }
  getSaludate(name: string): string {
    return `Hola ${name}`;
  }
}
