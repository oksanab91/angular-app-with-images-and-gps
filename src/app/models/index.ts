import { Address } from './address';
import { Person, GpsCoordinate, Picture, PersonMapped } from './person';
import { Flight, FlightFilter, City } from './flight';
import { CurrencyQuake } from './analytic';
import { JobRemote, JobFilter, JobGreenhouse } from './job';

export const models = [
    Address, 
    Person, 
    PersonMapped, 
    GpsCoordinate, 
    Picture, 
    Flight, 
    FlightFilter, 
    City,
    CurrencyQuake,
    JobRemote,
    JobFilter,
    JobGreenhouse
];

export * from './address';
export * from './person';
export * from './alert';
export * from './flight';
export * from './analytic';
export * from './analytic-insurance'
export * from './job'