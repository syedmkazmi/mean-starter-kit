import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import {IAuthToken} from "../interfaces/userToken";
import {Router} from "@angular/router";
import {Subject} from 'rxjs/Subject';
import * as moment from "moment";

@Injectable()
export class AuthenticationService {
  private subject = new Subject<any>();

  constructor(private _http: HttpClient, private _router: Router) {
  }

  login(body): Observable<IAuthToken> {
    const BASE_URL = "http://localhost:3000";

    return this._http.post<IAuthToken>(BASE_URL + '/api/login', body)
      .do(data => console.log(JSON.stringify(data)))
      .map(data => {

        const token = data.token;
        const expiresIn = moment().add(data.expiresIn, 'second');

        if (token) {
          localStorage.setItem("token", JSON.stringify(token));
          localStorage.setItem("expiresIn", JSON.stringify(expiresIn));
          this._router.navigate(['/'])
        }
        return token;
      })
      .catch(err => {
        // do whatever you want when error occurs
        console.log(err);

        // re-throw error so you can catch it when subscribing, fallback to generic error code
        return Observable.throw(err || 'API_ERROR');
      });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  public isLoggedIn(): boolean {
    return moment().isBefore(AuthenticationService.getExpiration());
  }

  static getExpiration() {
    const expiration = localStorage.getItem('expiresIn');
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }

  sendMessage(message: any) {
    this.subject.next(message);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}
