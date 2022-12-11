import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeesResolver } from './coffees/coffees.resolver';
import { join } from 'path';
import { CoffeesService } from './coffees/coffees.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
    }),
    CoffeesModule,
  ],
  controllers: [AppController],
  providers: [AppService, CoffeesResolver, CoffeesService],
})
export class AppModule {}
