import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { Ng2Webstorage } from 'ngx-webstorage';

import { ClimatefinanceSharedModule, UserRouteAccessService } from './shared';
import { ClimatefinanceAppRoutingModule} from './app-routing.module';
import { ClimatefinanceHomeModule } from './home/home.module';
import { ClimatefinanceAdminModule } from './admin/admin.module';
import { ClimatefinanceAccountModule } from './account/account.module';
import { ClimatefinanceEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ClimatefinanceAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        ClimatefinanceSharedModule,
        ClimatefinanceHomeModule,
        ClimatefinanceAdminModule,
        ClimatefinanceAccountModule,
        ClimatefinanceEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class ClimatefinanceAppModule {}
