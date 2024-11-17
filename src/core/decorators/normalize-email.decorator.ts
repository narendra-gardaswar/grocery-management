import { Transform } from 'class-transformer';

export function NormalizeEmail(): PropertyDecorator {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim().toLowerCase();
    }
    return value;
  });
}
