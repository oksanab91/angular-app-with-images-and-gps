import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '@shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApiAnalyticService } from './service/api-analytic.service';
import { AnalyticInsuranceService } from './service/analytic-insurance.service';
import { AnalyticStore } from '@core/store/analytic.store';
import { HelperService } from '@core/service/helper.service';


@NgModule({
  declarations: [DashboardComponent],
  imports: [    
    SharedModule,
    ChartsModule,        
    RouterModule.forChild([{ path: '', component: DashboardComponent}])
  ],
  providers: [AnalyticStore, ApiAnalyticService, HelperService, AnalyticInsuranceService]
})
export class AnalyticModule { }
