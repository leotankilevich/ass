import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Connection as RelayConnection,
  Edge as RelayEdge,
} from 'graphql-relay';
import { PageInfo as RelayPageInfo } from 'nestjs-graphql-relay';

export function Connection<GraphQLObject>(type?: Type<GraphQLObject>): any {
  @ObjectType({ isAbstract: true })
  class PageInfo implements RelayPageInfo {
    @Field(() => String, { nullable: true })
    startCursor: string;

    @Field(() => String, { nullable: true })
    endCursor: string;

    @Field(() => Boolean, { nullable: false })
    hasPreviousPage: boolean;

    @Field(() => Boolean, { nullable: false })
    hasNextPage: boolean;
  }

  @ObjectType({ isAbstract: true })
  abstract class Edge<GraphQLObject> implements RelayEdge<GraphQLObject> {
    @Field(() => type, { nullable: false })
    node: GraphQLObject;

    @Field(() => String, { nullable: false })
    cursor: string;
  }

  @ObjectType({ isAbstract: true })
  abstract class InnerConnection implements RelayConnection<GraphQLObject> {
    @Field(() => [Edge], { nullable: false })
    edges: Array<RelayEdge<GraphQLObject>>;

    @Field(() => PageInfo, { nullable: false })
    pageInfo: PageInfo;
  }

  return InnerConnection;
}
