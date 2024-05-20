import { Hash } from '@/util/Hash';
import { ValueTransformer } from 'typeorm';

export class PasswordTransformer implements ValueTransformer {
  to(value: any) {
    return Hash.make(value);
  }

  from(value: any) {
    return value;
  }
}
