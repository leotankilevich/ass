import { ObjectType } from '@nestjs/graphql';

import { Connection } from '../common/relay/relay-connection';
import { User } from './entities/user.entity';

@ObjectType()
export class UserConnection extends Connection<User>(User) {}
