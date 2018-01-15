import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DetailedSector } from './detailed-sector.model';
import { DetailedSectorService } from './detailed-sector.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-detailed-sector',
    templateUrl: './detailed-sector.component.html'
})
export class DetailedSectorComponent implements OnInit, OnDestroy {
detailedSectors: DetailedSector[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private detailedSectorService: DetailedSectorService,
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
            this.detailedSectorService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.detailedSectors = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.detailedSectorService.query().subscribe(
            (res: ResponseWrapper) => {
                this.detailedSectors = res.json;
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
        this.registerChangeInDetailedSectors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DetailedSector) {
        return item.id;
    }
    registerChangeInDetailedSectors() {
        this.eventSubscriber = this.eventManager.subscribe('detailedSectorListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
