// import { InjectDataSource } from '@nestjs/typeorm';
// import {
//   ValidationArguments,
//   ValidatorConstraintInterface,
// } from 'class-validator';
// import {
//   DataSource,
//   EntitySchema,
//   FindOptionsWhere,
//   ObjectType,
// } from 'typeorm';

// export class UniqueValidator implements ValidatorConstraintInterface {
//   constructor(@InjectDataSource() private readonly connection: DataSource) {}

//   public async validate<E>(value: string, args: UniqueValidationArguments<E>) {
//     const [EntityClass, findCondition = args.property] = args.constraints;

//     return (
//       (await this.connection.getRepository(EntityClass).count({
//         where:
//           typeof findCondition === 'function'
//             ? findCondition(args)
//             : { [findCondition || args.property]: value },
//       })) <= 0
//     );
//   }

//   public defaultMessage(args: ValidationArguments) {
//     const [EntityClass] = args.constraints;
//     const entity = EntityClass.name || 'Entity';

//     return `${entity} with the same '${args.property}' already exist`;
//   }
// }

// type UniqueValidationConstrains<E> = [
//   ObjectType<E> | EntitySchema<E> | string,
//   (validationArguments: ValidationArguments) => FindOptionsWhere<E> | keyof E,
// ];

// interface UniqueValidationArguments<E> extends ValidationArguments {
//   constraints: UniqueValidationConstrains<E>;
// }
