import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import { ClimatefinanceSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import {HomeService} from "./home.service";

@NgModule({
    imports: [
        ClimatefinanceSharedModule,
        RouterModule.forChild([ HOME_ROUTE ]),
        NgxChartsModule
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
        HomeService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClimatefinanceHomeModule {}
