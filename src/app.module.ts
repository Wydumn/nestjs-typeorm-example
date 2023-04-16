import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'inventory',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'sql_inventory',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      name: 'hr',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'sql_hr',
      // autoLoadEntities: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      name: 'invoicing',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'sql_invoicing',
      // autoLoadEntities: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      name: 'store',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'sql_store',
      // autoLoadEntities: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
