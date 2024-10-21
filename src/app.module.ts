import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Product} from './entities/product.entity';
import {User} from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: "mongodb+srv://Kelvin:bXrSixPBlxZRVmo4@taphoa.mdtds.mongodb.net/?retryWrites=true&w=majority&appName=TapHoa",
      synchronize: true,
      logging: true,
      entities: [Product, User],
    }),
    TypeOrmModule.forFeature( [Product,User]), // Register for DI in services
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
