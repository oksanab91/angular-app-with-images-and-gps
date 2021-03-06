import { AlertService } from './alert.service';
import { ImageService } from './image.service';
import { PersonService } from './person.service';
import { GpsCoordinateService } from './gps-coordinate.service';
import { PersonStoreService } from './person-store.service';
import { ApiFlightWidgetService } from './api-flight-widget.service';
import { WidgetStoreService } from './widget-store.service';
import { ApiPersonService } from './api-person.service';
import { JobSearchService } from './api-job-search.service';
import { HelperService } from './helper.service';

export const services = [
    AlertService, 
    ImageService, 
    PersonStoreService, 
    PersonService, 
    GpsCoordinateService,
    ApiPersonService,
    ApiFlightWidgetService,
    JobSearchService,
    WidgetStoreService,
    HelperService
];

export * from './alert.service';
export * from './image.service';
export * from './api-person.service';
export * from './person-store.service';
export * from './person.service';
export * from './gps-coordinate.service';
export * from './api-flight-widget.service';
export * from './api-job-search.service';
export * from './widget-store.service';
export * from './helper.service';