import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { Account, LoginModalService, Principal } from '../shared';
import {HomeService} from "./home.service";
import {CountryCount} from "./countrycount";
import {SectorCount} from "./sectorcount";


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

    //pie
    view: any[] = [800, 500];
    showLegend = true;
    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };
    showLabels = true;
    explodeSlices = false;
    doughnut = false;


    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private homeService: HomeService
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.getCount();
        this.getCountryCount();
        this.getSectorCount();

    }

    getCount(): void {
        this.homeService.getCount().then(count => this.count = count);
    }

    getSectorCount(): void {
        this.homeService.getSectorCount().then(sectorCount => this.sectorCount = sectorCount);
    }

    getCountryCount(): void {
        this.homeService.getCountryCount().then(countryCounts => this.countryCounts = countryCounts);
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
