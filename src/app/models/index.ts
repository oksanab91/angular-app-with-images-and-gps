import { Address } from './address';
import { Person, GpsCoordinate, PersonMapped, Picture } from './person';

export const models: any[] = [Address, Person, GpsCoordinate, PersonMapped, Picture];

export * from './address';
export * from './person';
export * from './alert';