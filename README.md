# Person Data Manager Angular App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7. And then it was [migrated to version 9](https://update.angular.io/#8.0:9.0l2) of Angular.

The application displays cards with items' details and allows to manage the data, including add, delete and modify options.

The app creates links with gps coordinates per entered address.

Also, it has an option to find and update item's image.


### Main libraries and techniques:

- [Bootstrap 4](https://getbootstrap.com/docs/4.4/getting-started/introduction/) and Font Awesome Web Application icons for   design and styling
- In-memory cache technique to improve app performance
- [RxJs](https://angular.io/guide/rx-library) to get and manage data
- [Nominatim](https://nominatim.org/release-docs/develop/api/Overview/) to find address longitude and latitude dynamically

## Views:

- Home
- Person List
- Person Edit/Add
- Navigation bar with search panel
- Modal Image selector

## Components:

- Home
- PersonList
- Person
- CardPlus
- PersonEdit/Add
- Alert
- NavSearch
- ImageModal

## Services:

- Person
- GpsCoordinate
- Alert
- Modal

## Development server

Run `npm install`

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
