import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseMiddleware implements NestMiddleware {
    constructor(@InjectConnection() private readonly connection: Connection) { }

    async use(req: Request, res: Response, next: NextFunction) {
        await this.connection.close();

        console.log(this.connection.readyState)
        this.connection.readyState === 0 ? await this.connection.openUri(process.env.MONGODB_URI) : null;
        console.log(this.connection.readyState)

        // Attach the database connection to the request object
        req['dbConnection'] = this.connection;

        // Continue with the request handling
        next();

        setTimeout(async () => {
            if (this.connection.readyState === 1 && res.writableFinished){
                this.connection.close();
                console.log(res.writableFinished)
                console.log("connection closed")
            }
        }, 1000);
    }
}