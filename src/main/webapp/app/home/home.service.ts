import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../app.constants';
import 'rxjs/add/operator/toPromise';


import {ResponseWrapper, createRequestOption} from '../shared';
import {Project} from "../entities/project/project.model";
import {CountryCount} from "./countrycount";
import {SectorCount} from "./sectorcount";

@Injectable()
export class HomeService {

    private restUrl = SERVER_API_URL + 'api/custom';

    constructor(private http: Http) {
    }

    getCount(): Promise<String> {
        return this.http.get(this.restUrl + '/count')
            .toPromise()
            .then(response => response.json() as String)
            .catch(this.handleError);
    }

    getCountryCount(): Promise<CountryCount[]> {
        return this.http.get(this.restUrl + '/countrycount')
            .toPromise()
            .then(response => response.json() as CountryCount[])
            .catch(this.handleError);
    }

    getSectorCount(): Promise<SectorCount[]> {
        return this.http.get(this.restUrl + '/sectorcount')
            .toPromise()
            .then(response => response.json() as SectorCount[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }


}
