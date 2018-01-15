import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DetailedSector } from './detailed-sector.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DetailedSectorService {

    private resourceUrl =  SERVER_API_URL + 'api/detailed-sectors';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/detailed-sectors';

    constructor(private http: Http) { }

    create(detailedSector: DetailedSector): Observable<DetailedSector> {
        const copy = this.convert(detailedSector);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(detailedSector: DetailedSector): Observable<DetailedSector> {
        const copy = this.convert(detailedSector);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<DetailedSector> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to DetailedSector.
     */
    private convertItemFromServer(json: any): DetailedSector {
        const entity: DetailedSector = Object.assign(new DetailedSector(), json);
        return entity;
    }

    /**
     * Convert a DetailedSector to a JSON which can be sent to the server.
     */
    private convert(detailedSector: DetailedSector): DetailedSector {
        const copy: DetailedSector = Object.assign({}, detailedSector);
        return copy;
    }
}
