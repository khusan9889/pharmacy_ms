import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { CountriesModule } from './countries/countries.module';
import { VendorsModule } from './vendors/vendors.module';
import { PurchasesModule } from './purchases/purchases.module';
import { ProductsPurchaseModule } from './products_purchase/products_purchase.module';
import { PaymentDetailsModule } from './payment_details/payment_details.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import entities from './typeorm';
import { UserController } from './users/controllers/users/users.controller';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      database: configService.get('DB_NAME'),
      host: configService.get('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      entities: entities,
      synchronize: true,

    }),
    inject: [ConfigService],
  }),

    ProductsModule,
    CategoriesModule,
    CountriesModule,
    VendorsModule,
    PurchasesModule,
    ProductsPurchaseModule,
    PaymentDetailsModule,
    UsersModule,
    RolesModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
