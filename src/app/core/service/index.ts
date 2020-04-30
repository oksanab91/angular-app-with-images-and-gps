import { AlertService } from './alert.service';
import { ImageService } from './image.service';
import { ModalService } from './modal.service';
import { PersonService } from './person.service';
import { GpsCoordinateService } from './gps-coordinate.service';

export const services: any[] = [AlertService, ImageService, ModalService, PersonService, GpsCoordinateService];

export * from './alert.service';
export * from './image.service';
export * from './modal.service';
export * from './person.service';
export * from './gps-coordinate.service';