import {
  DataSource,
  EntityTarget,
  MongoRepository,
  QueryRunner,
} from 'typeorm';
import { BadRequestException } from '@nestjs/common';

const getMongoRepositoryData = <T>(params: {
  dataSource: DataSource;
  entity: EntityTarget<T>; // constructor type
}): MongoRepository<T> => {
  const { dataSource, entity } = params;
  return dataSource.getMongoRepository<T>(entity);
};

const synchronizeUpdate = async ({ dataSource, promises }) => {
  const queryRunner: QueryRunner = dataSource.createQueryRunner(); // Create a new QueryRunner
  await queryRunner.connect(); // Establish a connection
  await queryRunner.startTransaction(); // Start a transaction
  const promiseExec = [];
  for (const { entity, data, action } of promises) {
    if (action === 'save') {
      promiseExec.push(queryRunner.manager.save(entity, data));
    }
  }
  try {
    if (promiseExec.length) {
      await Promise.all(promiseExec);
    }
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw new BadRequestException(`${err.message}`);
  } finally {
    await queryRunner.release();
  }
};

export { getMongoRepositoryData, synchronizeUpdate };
