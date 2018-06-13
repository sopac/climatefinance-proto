import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Integration } from './integration.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class IntegrationService {

    private resourceUrl =  SERVER_API_URL + 'api/integrations';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/integrations';

    constructor(private http: Http) { }

    create(integration: Integration): Observable<Integration> {
        const copy = this.convert(integration);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(integration: Integration): Observable<Integration> {
        const copy = this.convert(integration);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Integration> {
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
     * Convert a returned JSON object to Integration.
     */
    private convertItemFromServer(json: any): Integration {
        const entity: Integration = Object.assign(new Integration(), json);
        return entity;
    }

    /**
     * Convert a Integration to a JSON which can be sent to the server.
     */
    private convert(integration: Integration): Integration {
        const copy: Integration = Object.assign({}, integration);
        return copy;
    }
}
