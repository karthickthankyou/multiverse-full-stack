import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { ConfigModule } from '@nestjs/config'
import { NodesModule } from './models/nodes/nodes.module'
import { StoriesModule } from './models/stories/stories.module'
import { UsersModule } from './models/users/users.module'
import { PrismaModule } from './common/prisma/prisma.module'
import { FirebaseModule } from './common/firebase/firebase.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      fieldResolverEnhancers: ['guards'],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
    }),
    ConfigModule.forRoot(),

    PrismaModule,
    FirebaseModule,

    NodesModule,
    StoriesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
