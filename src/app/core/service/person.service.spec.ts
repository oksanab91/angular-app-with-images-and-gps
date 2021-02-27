import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from "rxjs";
import { Address, PersonMapped, Picture } from 'src/app/models';
import { ApiPersonService, GpsCoordinateService } from '.';

import { PersonService } from './person.service';

const TEST_GPS = {lat: 87878787, lon: 98989898}
const TEST_MAP_URL = 'https://www.google.com/maps/search/?api=1&query=87878787,98989898'
const TEST_PERSON = {
  id: 88881,
  name: 'TEST NAME',
  company: 'TEST COMPANY',
  position: 'TEST POSITION',
  picture: new Picture(),
  shortAddress: 'TEST ADDRESS',
  address: new Address(),
  phone: '9999999',
  gpsCoordinate: null,
  googleMapUrl: 'TEST URL',
}

fdescribe('PersonService', () => {
  let service: PersonService
  let apiPersonService: ApiPersonService
  const gpsSpy = jasmine.createSpyObj('GpsCoordinateService', ['getGps'])

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PersonService, ApiPersonService, GpsCoordinateService
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    apiPersonService = TestBed.inject(ApiPersonService);

    service = TestBed.inject(PersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set person', (done: DoneFn) => {
    const person: PersonMapped = {
      person: TEST_PERSON,
      callGps: gpsSpy.getGps.and.returnValue(of(TEST_GPS))
    }

    const expected = {
      id: 88881,
      name: 'TEST NAME',
      company: 'TEST COMPANY',
      position: 'TEST POSITION',
      picture: new Picture(),
      shortAddress: 'TEST ADDRESS',
      address: new Address(),
      phone: '9999999',
      gpsCoordinate: TEST_GPS,
      googleMapUrl: TEST_MAP_URL,
    }

    const result = service.setPerson(person, TEST_GPS)
    expect(result).toEqual(expected)

    person.callGps()
    .subscribe(val => {
      expect(gpsSpy.getGps).toHaveBeenCalled()      
      expect(val).toEqual(TEST_GPS)

      done()
    })
  });

});
