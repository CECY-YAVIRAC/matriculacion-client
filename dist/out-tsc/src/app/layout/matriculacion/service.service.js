var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
var ServiceService = /** @class */ (function () {
    function ServiceService(_http) {
        this._http = _http;
    }
    ServiceService.prototype.get = function (url) {
        this.headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token').replace('"', ''));
        return this._http.get(environment.API_URL + url, { headers: this.headers });
    };
    ServiceService.prototype.post = function (url, data) {
        url = environment.API_URL + url;
        this.headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token').replace('"', ''));
        return this._http.post(url, data, { headers: this.headers });
    };
    ServiceService.prototype.update = function (url, data) {
        url = environment.API_URL + url;
        this.headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token').replace('"', ''));
        return this._http.put(url, data, { headers: this.headers });
    };
    ServiceService.prototype.delete = function (url) {
        url = environment.API_URL + url;
        this.headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token').replace('"', ''));
        return this._http.delete(url, { headers: this.headers });
    };
    ServiceService.prototype.upload = function (url, data) {
        url = environment.API_URL + url;
        this.headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token').replace('"', ''));
        return this._http.post(url, data, { headers: this.headers });
    };
    ServiceService.prototype.postPublic = function (url, data) {
        url = environment.API_URL_PUBLIC + url;
        this.headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(url, data, { headers: this.headers });
    };
    ServiceService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], ServiceService);
    return ServiceService;
}());
export { ServiceService };
//# sourceMappingURL=service.service.js.map