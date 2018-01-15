import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Sector } from './sector.model';
import { SectorService } from './sector.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-sector',
    templateUrl: './sector.component.html'
})
export class SectorComponent implements OnInit, OnDestroy {
sectors: Sector[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private sectorService: SectorService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.sectorService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.sectors = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.sectorService.query().subscribe(
            (res: ResponseWrapper) => {
                this.sectors = res.json;
                this.currentSearch = '';
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSectors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Sector) {
        return item.id;
    }
    registerChangeInSectors() {
        this.eventSubscriber = this.eventManager.subscribe('sectorListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
