import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { NgxChartsModule } from '@swimlane/ngx-charts';


import { Account, LoginModalService, Principal } from '../shared';
import {HomeService} from "./home.service";
import {CountryCount} from "./countrycount";
import {SectorCount} from "./sectorcount";

import {Router} from "@angular/router";
import {GenericCount} from "./genericcount";
import {Validcountry} from "./validcountry";


@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    count: String;
    countryCounts: CountryCount[];
    sectorCount: SectorCount[];
    sourceCount: GenericCount[];
    validCountries: Validcountry[];




    //pie chart
    viewPie: any[] = [800, 500];
    showLegend = true;
    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };
    showLabels = true;
    explodeSlices = false;
    doughnut = false;

    //bar chart
    viewBar: any[] = [1400, 700];
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showXAxisLabel = true;
    xAxisLabel = 'Country';
    showYAxisLabel = true;
    yAxisLabel = 'Population';


    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private homeService: HomeService,
        private router: Router

    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();

        //stats
        this.getCount();
        this.getCountryCount();
        this.getSectorCount();
        this.getSourceCount();
        this.getValidCountries();


    }

    onSelectSector(data) {
        //alert(data.name);
        this.router.navigateByUrl("/project;search=sector.name:" + data.name)
    }

    onSelectSource(data) {
        //alert(data.name);
        this.router.navigateByUrl("/project;search=principalSource:" + data.name)
    }


    getCount(): void {
        this.homeService.getCount().then(count => this.count = count);
    }

    getSectorCount(): void {
        this.homeService.getSectorCount().then(sectorCount => this.sectorCount = sectorCount);
    }

    getSectorCountByCountry(countryId): void {
        //this.sectorCount = null;
        this.homeService.getSectorCountByCountry(countryId).then(sectorCount => this.sectorCount = sectorCount);
    }

    getSourceCount(): void {
        //this.sectorCount = null;
        this.homeService.getSourceCount().then(sourceCount => this.sourceCount = sourceCount);
    }

    getCountryCount(): void {
        this.homeService.getCountryCount().then(countryCounts => this.countryCounts = countryCounts);
    }

    getValidCountries(): void {
        this.homeService.getValidCountries().then(validCountries => this.validCountries = validCountries);
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;

                //stats
                this.getCount();
                this.getCountryCount();
                this.getSectorCount();
                this.getSourceCount();
                this.getValidCountries();



            });
        });



    }

    isAuthenticated():Boolean {
        return this.principal.isAuthenticated();
        //if (this.principal.isAuthenticated()) return "yes";
        //if (!this.principal.isAuthenticated()) return "no";
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
