import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DetailedSector } from './detailed-sector.model';
import { DetailedSectorService } from './detailed-sector.service';

@Component({
    selector: 'jhi-detailed-sector-detail',
    templateUrl: './detailed-sector-detail.component.html'
})
export class DetailedSectorDetailComponent implements OnInit, OnDestroy {

    detailedSector: DetailedSector;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private detailedSectorService: DetailedSectorService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDetailedSectors();
    }

    load(id) {
        this.detailedSectorService.find(id).subscribe((detailedSector) => {
            this.detailedSector = detailedSector;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDetailedSectors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'detailedSectorListModification',
            (response) => this.load(this.detailedSector.id)
        );
    }
}
