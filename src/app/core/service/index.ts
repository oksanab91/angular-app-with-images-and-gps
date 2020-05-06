import { AlertService } from './alert.service';
import { ImageService } from './image.service';
import { PersonService } from './person.service';
import { GpsCoordinateService } from './gps-coordinate.service';
import { StoreService } from './store.service';

export const services = [AlertService, ImageService, StoreService, PersonService, GpsCoordinateService];

export * from './alert.service';
export * from './image.service';
export * from './store.service';
export * from './person.service';
export * from './gps-coordinate.service';