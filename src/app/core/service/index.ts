import { AlertService } from './alert.service';
import { ImageService } from './image.service';
import { PersonService } from './person.service';
import { GpsCoordinateService } from './gps-coordinate.service';
import { PersonStoreService } from './person-store.service';
import { FlightWidgetService } from './flight-widget.service';

export const services = [AlertService, ImageService, PersonStoreService, PersonService, GpsCoordinateService, FlightWidgetService];

export * from './alert.service';
export * from './image.service';
export * from './person-store.service';
export * from './person.service';
export * from './gps-coordinate.service';
export * from './flight-widget.service';