import { Address } from './address';
import { Person, GpsCoordinate, Picture, PersonMapped } from './person';
import { Flight } from './flight';

export const models = [Address, Person, PersonMapped, GpsCoordinate, Picture, Flight];

export * from './address';
export * from './person';
export * from './alert';
export * from './flight';