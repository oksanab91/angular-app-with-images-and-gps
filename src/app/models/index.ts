import { Address } from './address';
import { Person, GpsCoordinate, Picture, PersonMapped } from './person';
import { Flight, FlightFilter } from './flight';

export const models = [Address, Person, PersonMapped, GpsCoordinate, Picture, Flight, FlightFilter];

export * from './address';
export * from './person';
export * from './alert';
export * from './flight';