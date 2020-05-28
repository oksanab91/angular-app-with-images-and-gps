# Person Data Manager Angular App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7. And then it was [migrated to version 9](https://update.angular.io/#8.0:9.0l2) of Angular.

The application displays cards with items' details and allows to manage the data, including add, delete and modify options.

The app builds map links per entered address and it has an option to update item's image.

Widgets bar displays data extracted from the third-party APIs, for example, chip flights, direct flights.

The Dashboard renders analytical charts.


### Main libraries and techniques:

- [Bootstrap 4](https://getbootstrap.com/docs/4.4/getting-started/introduction/) and Font Awesome Web Application icons for   design and styling
- [RxJs](https://angular.io/guide/rx-library) to get and manage data
- In-memory cache technique to improve app performance
- Simple state management with only Services and RxJS
- [Nominatim](https://nominatim.org/release-docs/develop/api/Overview/) to find address longitude and latitude dynamically
- [ngx-xml2json](https://www.npmjs.com/package/ngx-xml2json) package to conver xml data to json
- [ng2-charts](https://www.npmjs.com/package/ng2-charts) - beautiful charts for Angular2 based on Chart.js
- [RapidApi](https://rapidapi.com/olehmirosh/api/plerdy/endpoints) endpoints for widgets dynamically loaded data
- [bituachnet.cma.gov.il](https://bituachnet.cma.gov.il/bituachTsuotUI/Tsuot/UI/dafmakdim.aspx) site data for creating insurance policies analytical charts

## Views:

- Home
- Person List
- Person Edit/Add
- Navigation bar with search panel
- Modal Image selector
- Widgets List
- Dashboard
- Main navigation bar

## Components:

- Home
- PersonList
- Person
- CardPlus
- PersonEdit/Add
- Alert
- NavSearch
- ImageModal
- Widgets
- Dashboard

## Services:

- Person
- GpsCoordinate
- Alert
- Modal
- Widget
- Analytics

## Development server

Run `npm install`

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
