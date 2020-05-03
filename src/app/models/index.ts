import { Address } from './address';
import { Person, GpsCoordinate, Picture, PersonMapped } from './person';

export const models: any[] = [Address, Person, PersonMapped, GpsCoordinate, Picture];

export * from './address';
export * from './person';
export * from './alert';