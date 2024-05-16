import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

ConfigModule.forRoot({
  envFilePath: `.${process.env.NODE_ENV}.env`,
});
const configService = new ConfigService
// Obtén el nombre de la migración del segundo argumento pasado al script o usa uno predeterminado
const migrationName = process.argv[3] || 'unnamed_migration';
export const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
  synchronize: true,//cambiar a false en producción 
  migrationsRun: false,//cambiar a true en producción
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const AppDs = new DataSource(dataSourceConfig);


