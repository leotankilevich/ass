import { Module } from '@nestjs/common';
import { TeasService } from './teas.service';
import { TeaFlavorsResolver } from './tea-flavors.resolver';
import { TeasResolver } from './teas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity/flavor.entity';
import { Tea } from './entities/tea.entity/tea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tea, Flavor])],
  providers: [TeasService, TeaFlavorsResolver, TeasResolver],
})
export class TeasModule {}
