import { 
  Person, Alert, Picture, Flight, FlightFilter, 
  City, Iata, CurrConverterFilter, 
  CurrencyConverter, IInsuranceRowSet, 
  JobFilter, JobBasic } from '@models/models';
import { CurrencyQuake } from '@models/models';
import { LineChart } from 'src/app/analytic/line-chart';
import { Color } from 'ng2-charts';

export class PersonListState {
    list: Person[] = [];
    message: Alert = null;
    person: Person = null;
  }

export class PersonState {
    person: Person = null;
    message: Alert = null;
}

export class ModalImageState {
  image: Picture = null;
  show: boolean;
  message: string;
}

export class WidgetFlightState {
  flights: Flight[];  
  filter: FlightFilter;
  cities: City[] = [];
  iata: Iata[] = [];
  citiesLoaded: boolean;
  message: string;
  show: boolean;
}

export class WidgetJobSearchState {
  remoteJobs: JobBasic[]
  greenHousejobs: JobBasic[]
  githubJobs: JobBasic[] 
  filter: JobFilter
  message: Alert = null
  show: boolean; 
}

// to do ========================
export class WidgetSettingsState {
  widgets: IWidget[] = [];
  filter: IWidgetFilter;  
  sort: string;
}

export interface IWidget {
  id: number;
  name: string;
  show: boolean;
}

export interface IWidgetFilter {
  displayCount: number;
}
// ============================

export class CurrencyQuakeState {
  data: CurrencyQuake[]
  filter: string
  displayCount: number
  message: string
}

export class CurrencyConverterState {
  data: CurrencyConverter[]
  filter: CurrConverterFilter  
  message: string
}

export class InsuranceAnalyticState {
  data: IInsuranceRowSet[]
  filter: {dates: string[], chartLabels: string[], options: {}, colors: Color[]}  
  message: string
  chart: LineChart
  chartFilled: boolean
}