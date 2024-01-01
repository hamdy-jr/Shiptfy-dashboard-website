/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
} from 'rxjs/operators';
import {
  Observable,
  throwError as _observableThrow,
  of as _observableOf,
} from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpResponseBase,
  HttpContext,
} from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root',
})
export class VirtualExpoPostsClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : 'http://localhost:4476';
  }

  getAppViewPage(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfVirtualExpoAppView> {
    let url_ = this.baseUrl + '/virtual-expo-posts/app-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfVirtualExpoAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfVirtualExpoAppView>;
        }),
      );
  }

  protected processGetAppViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfVirtualExpoAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfVirtualExpoAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getAppViewById(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfVirtualExpoAppView> {
    let url_ = this.baseUrl + '/virtual-expo-posts/{id}/app-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewById(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfVirtualExpoAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfVirtualExpoAppView>;
        }),
      );
  }

  protected processGetAppViewById(
    response: HttpResponseBase,
  ): Observable<DataResponseOfVirtualExpoAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfVirtualExpoAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewPage(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfVirtualExpoDashboardView> {
    let url_ = this.baseUrl + '/virtual-expo-posts/dashboard-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfVirtualExpoDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfVirtualExpoDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfVirtualExpoDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfVirtualExpoDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewById(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfVirtualExpoDashboardView> {
    let url_ = this.baseUrl + '/virtual-expo-posts/{id}/dashboard-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewById(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfVirtualExpoDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfVirtualExpoDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewById(
    response: HttpResponseBase,
  ): Observable<DataResponseOfVirtualExpoDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfVirtualExpoDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  add(
    order: number | undefined,
    title: string | null | undefined,
    description: string | null | undefined,
    link: string | null | undefined,
    photos: AddVirtualExpoPostPhoto[] | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IdMessageResponseOfGuid> {
    let url_ = this.baseUrl + '/virtual-expo-posts';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (order === null || order === undefined)
      throw new Error("The parameter 'order' cannot be null.");
    else content_.append('Order', order.toString());
    if (title !== null && title !== undefined)
      content_.append('Title', title.toString());
    if (description !== null && description !== undefined)
      content_.append('Description', description.toString());
    if (link !== null && link !== undefined)
      content_.append('Link', link.toString());
    if (photos !== null && photos !== undefined)
      photos.forEach((item_, index) => {
        content_.append(`Photos[${index}].Order`, item_.order.toString());

        content_.append(
          `Photos[${index}].Photo`,
          item_.photo.data,
          item_.photo.fileName,
        );

        if (item_.title !== null && item_.title !== undefined)
          content_.append(`Photos[${index}].Title`, item_.title.toString());

        if (item_.caption !== null && item_.caption !== undefined)
          content_.append(`Photos[${index}].Caption`, item_.caption.toString());
      });

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processAdd(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processAdd(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IdMessageResponseOfGuid>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IdMessageResponseOfGuid>;
        }),
      );
  }

  protected processAdd(
    response: HttpResponseBase,
  ): Observable<IdMessageResponseOfGuid> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IdMessageResponseOfGuid);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  update(
    request: UpdateVirtualExpoPost,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/virtual-expo-posts';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdate(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdate(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processUpdate(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  softDelete(
    id: string,
    isDeleted: boolean,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/virtual-expo-posts/{id}/{isDeleted}';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    if (isDeleted === undefined || isDeleted === null)
      throw new Error("The parameter 'isDeleted' must be defined.");
    url_ = url_.replace('{isDeleted}', encodeURIComponent('' + isDeleted));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSoftDelete(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSoftDelete(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processSoftDelete(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  addPhotos(
    virtualExpoPostId: string,
    photos: AddVirtualExpoPhotoItem[] | null | undefined,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/virtual-expo-posts/{virtualExpoPostId}/photos';
    if (virtualExpoPostId === undefined || virtualExpoPostId === null)
      throw new Error("The parameter 'virtualExpoPostId' must be defined.");
    url_ = url_.replace(
      '{virtualExpoPostId}',
      encodeURIComponent('' + virtualExpoPostId),
    );
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (photos !== null && photos !== undefined)
      photos.forEach((item_, index) => {
        content_.append(`Photos[${index}].Order`, item_.order.toString());

        content_.append(
          `Photos[${index}].Photo`,
          item_.photo.data,
          item_.photo.fileName,
        );

        if (item_.title !== null && item_.title !== undefined)
          content_.append(`Photos[${index}].Title`, item_.title.toString());

        if (item_.caption !== null && item_.caption !== undefined)
          content_.append(`Photos[${index}].Caption`, item_.caption.toString());
      });

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processAddPhotos(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processAddPhotos(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processAddPhotos(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  updatePhotos(
    virtualExpoPostId: string,
    photos: UpdateVirtualExpoPhotosItem[] | null | undefined,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/virtual-expo-posts/{virtualExpoPostId}/photos';
    if (virtualExpoPostId === undefined || virtualExpoPostId === null)
      throw new Error("The parameter 'virtualExpoPostId' must be defined.");
    url_ = url_.replace(
      '{virtualExpoPostId}',
      encodeURIComponent('' + virtualExpoPostId),
    );
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (photos !== null && photos !== undefined)
      photos.forEach((item_, index) => {
        content_.append(`Photos[${index}].Id`, item_.id.toString());
        content_.append(`Photos[${index}].Order`, item_.order.toString());

        content_.append(
          `Photos[${index}].UpdatePhoto`,
          item_.updatePhoto.toString(),
        );

        if (item_.photo !== null && item_.photo !== undefined)
          content_.append(
            `Photos[${index}].Photo`,
            item_.photo.data,
            item_.photo.fileName,
          );

        if (item_.title !== null && item_.title !== undefined)
          content_.append(`Photos[${index}].Title`, item_.title.toString());

        if (item_.caption !== null && item_.caption !== undefined)
          content_.append(`Photos[${index}].Caption`, item_.caption.toString());
      });

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdatePhotos(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdatePhotos(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processUpdatePhotos(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  softDeletePhotos(
    virtualExpoPostId: string,
    request: DeleteVirtualExpoPhotos,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/virtual-expo-posts/{virtualExpoPostId}/photos';
    if (virtualExpoPostId === undefined || virtualExpoPostId === null)
      throw new Error("The parameter 'virtualExpoPostId' must be defined.");
    url_ = url_.replace(
      '{virtualExpoPostId}',
      encodeURIComponent('' + virtualExpoPostId),
    );
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSoftDeletePhotos(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSoftDeletePhotos(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processSoftDeletePhotos(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthorizationsClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : 'http://localhost:4476';
  }

  credentialLogin(
    request: CredentialLogin,
    httpContext?: HttpContext,
  ): Observable<CredentialLoginResponse> {
    let url_ = this.baseUrl + '/authentications/credentials-login';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processCredentialLogin(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processCredentialLogin(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<CredentialLoginResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<CredentialLoginResponse>;
        }),
      );
  }

  protected processCredentialLogin(
    response: HttpResponseBase,
  ): Observable<CredentialLoginResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as CredentialLoginResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  refresh(
    request: RefreshAccessToken,
    httpContext?: HttpContext,
  ): Observable<RefreshAccessTokenResponse> {
    let url_ = this.baseUrl + '/authentications/refresh';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processRefresh(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processRefresh(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<RefreshAccessTokenResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<RefreshAccessTokenResponse>;
        }),
      );
  }

  protected processRefresh(
    response: HttpResponseBase,
  ): Observable<RefreshAccessTokenResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as RefreshAccessTokenResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: 'root',
})
export class UsersClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : 'http://localhost:4476';
  }

  getDashboardViewPage(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    isDeleted: boolean | null | undefined,
    dateCreatedTo: string | null | undefined,
    dateCreatedFrom: string | null | undefined,
    dateLastLoginTo: string | null | undefined,
    dateLastLoginFrom: string | null | undefined,
    gender: Gender | null | undefined,
    type: UserType | null | undefined,
    status: UserStatus | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfUserDashboardView> {
    let url_ = this.baseUrl + '/users?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    if (isDeleted !== undefined && isDeleted !== null)
      url_ += 'IsDeleted=' + encodeURIComponent('' + isDeleted) + '&';
    if (dateCreatedTo !== undefined && dateCreatedTo !== null)
      url_ += 'DateCreatedTo=' + encodeURIComponent('' + dateCreatedTo) + '&';
    if (dateCreatedFrom !== undefined && dateCreatedFrom !== null)
      url_ +=
        'DateCreatedFrom=' + encodeURIComponent('' + dateCreatedFrom) + '&';
    if (dateLastLoginTo !== undefined && dateLastLoginTo !== null)
      url_ +=
        'DateLastLoginTo=' + encodeURIComponent('' + dateLastLoginTo) + '&';
    if (dateLastLoginFrom !== undefined && dateLastLoginFrom !== null)
      url_ +=
        'DateLastLoginFrom=' + encodeURIComponent('' + dateLastLoginFrom) + '&';
    if (gender !== undefined && gender !== null)
      url_ += 'Gender=' + encodeURIComponent('' + gender) + '&';
    if (type !== undefined && type !== null)
      url_ += 'Type=' + encodeURIComponent('' + type) + '&';
    if (status !== undefined && status !== null)
      url_ += 'Status=' + encodeURIComponent('' + status) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfUserDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfUserDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfUserDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfUserDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  delete(
    request: DeleteUser | undefined,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/users';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processDelete(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processDelete(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processDelete(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewById(
    id: string,
    httpContext?: HttpContext,
  ): Observable<UserDashboardView> {
    let url_ = this.baseUrl + '/users/{id}';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewById(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<UserDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<UserDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewById(
    response: HttpResponseBase,
  ): Observable<UserDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as UserDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  checkExistEmail(
    email: string | undefined,
    httpContext?: HttpContext,
  ): Observable<CheckExistEmailResponse> {
    let url_ = this.baseUrl + '/users/check-exist-email?';
    if (email === null)
      throw new Error("The parameter 'email' cannot be null.");
    else if (email !== undefined)
      url_ += 'Email=' + encodeURIComponent('' + email) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processCheckExistEmail(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processCheckExistEmail(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<CheckExistEmailResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<CheckExistEmailResponse>;
        }),
      );
  }

  protected processCheckExistEmail(
    response: HttpResponseBase,
  ): Observable<CheckExistEmailResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as CheckExistEmailResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  checkExistPhoneNumber(
    phoneNumber_Code: number | undefined,
    phoneNumber_Number: string | undefined,
    httpContext?: HttpContext,
  ): Observable<CheckExistPhoneNumberResponse> {
    let url_ = this.baseUrl + '/users/check-exist-phone-number?';
    if (phoneNumber_Code === null)
      throw new Error("The parameter 'phoneNumber_Code' cannot be null.");
    else if (phoneNumber_Code !== undefined)
      url_ +=
        'PhoneNumber.Code=' + encodeURIComponent('' + phoneNumber_Code) + '&';
    if (phoneNumber_Number === null)
      throw new Error("The parameter 'phoneNumber_Number' cannot be null.");
    else if (phoneNumber_Number !== undefined)
      url_ +=
        'PhoneNumber.Number=' +
        encodeURIComponent('' + phoneNumber_Number) +
        '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processCheckExistPhoneNumber(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processCheckExistPhoneNumber(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<CheckExistPhoneNumberResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<CheckExistPhoneNumberResponse>;
        }),
      );
  }

  protected processCheckExistPhoneNumber(
    response: HttpResponseBase,
  ): Observable<CheckExistPhoneNumberResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as CheckExistPhoneNumberResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getUserProfile(httpContext?: HttpContext): Observable<UserProfile> {
    let url_ = this.baseUrl + '/users/profile';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetUserProfile(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetUserProfile(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<UserProfile>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<UserProfile>;
        }),
      );
  }

  protected processGetUserProfile(
    response: HttpResponseBase,
  ): Observable<UserProfile> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as UserProfile);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDeleteAccountReasons(
    httpContext?: HttpContext,
  ): Observable<CollectionResponseOfDeleteAccountReason> {
    let url_ = this.baseUrl + '/users/delete-account-reasons';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDeleteAccountReasons(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDeleteAccountReasons(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<CollectionResponseOfDeleteAccountReason>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<CollectionResponseOfDeleteAccountReason>;
        }),
      );
  }

  protected processGetDeleteAccountReasons(
    response: HttpResponseBase,
  ): Observable<CollectionResponseOfDeleteAccountReason> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as CollectionResponseOfDeleteAccountReason);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  block(
    request: BlockUser,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/users/block';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processBlock(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processBlock(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processBlock(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  unblock(
    request: UnblockUser,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/users/unblock';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUnblock(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUnblock(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processUnblock(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  resendEmailConfirmation(
    request: ResendEmailConfirmation,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/users/resend-email-confirmation';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processResendEmailConfirmation(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processResendEmailConfirmation(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processResendEmailConfirmation(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  requestChangeEmail(
    request: RequestChangeEmail,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/users/change-email';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processRequestChangeEmail(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processRequestChangeEmail(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processRequestChangeEmail(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  confirmEmail(
    request: ConfirmEmail,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/users/confirm-email';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfirmEmail(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfirmEmail(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processConfirmEmail(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  setEmail(
    request: SetEmail,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/users/set-email';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSetEmail(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSetEmail(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processSetEmail(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  forgetPasswordByEmail(
    request: ForgetPasswordByEmail,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/users/forget-password-by-email';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processForgetPasswordByEmail(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processForgetPasswordByEmail(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processForgetPasswordByEmail(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  resetPassword(
    request: ResetPasswordByEmail,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/users/reset-password';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processResetPassword(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processResetPassword(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processResetPassword(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  changePassword(
    request: ChangePassword,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/users/change-password';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processChangePassword(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processChangePassword(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processChangePassword(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: 'root',
})
export class UnlockOpportunitiesClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : 'http://localhost:4476';
  }

  getAppViewById(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfUnlockOpportunityItemAppView> {
    let url_ = this.baseUrl + '/unlock-opportunities/{id}/app-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewById(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfUnlockOpportunityItemAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfUnlockOpportunityItemAppView>;
        }),
      );
  }

  protected processGetAppViewById(
    response: HttpResponseBase,
  ): Observable<DataResponseOfUnlockOpportunityItemAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfUnlockOpportunityItemAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getAppViewPage(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    subCategoryId: string | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfUnlockOpportunityItemAppView> {
    let url_ = this.baseUrl + '/unlock-opportunities/app-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    if (subCategoryId !== undefined && subCategoryId !== null)
      url_ += 'SubCategoryId=' + encodeURIComponent('' + subCategoryId) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfUnlockOpportunityItemAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfUnlockOpportunityItemAppView>;
        }),
      );
  }

  protected processGetAppViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfUnlockOpportunityItemAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfUnlockOpportunityItemAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewById(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfUnlockOpportunityItemDashboardView> {
    let url_ = this.baseUrl + '/unlock-opportunities/{id}/dashboard-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewById(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfUnlockOpportunityItemDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfUnlockOpportunityItemDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewById(
    response: HttpResponseBase,
  ): Observable<DataResponseOfUnlockOpportunityItemDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfUnlockOpportunityItemDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewPage(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    isDeleted: boolean | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfUnlockOpportunityItemDashboardView> {
    let url_ = this.baseUrl + '/unlock-opportunities/dashboard-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    if (isDeleted !== undefined && isDeleted !== null)
      url_ += 'IsDeleted=' + encodeURIComponent('' + isDeleted) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfUnlockOpportunityItemDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfUnlockOpportunityItemDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfUnlockOpportunityItemDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfUnlockOpportunityItemDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  addPost(
    subCategoryId: string | undefined,
    title: string | undefined,
    description: string | null | undefined,
    photo: FileParameter | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IdMessageResponseOfGuid> {
    let url_ = this.baseUrl + '/unlock-opportunities/post';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (subCategoryId === null || subCategoryId === undefined)
      throw new Error("The parameter 'subCategoryId' cannot be null.");
    else content_.append('SubCategoryId', subCategoryId.toString());
    if (title === null || title === undefined)
      throw new Error("The parameter 'title' cannot be null.");
    else content_.append('Title', title.toString());
    if (description !== null && description !== undefined)
      content_.append('Description', description.toString());
    if (photo !== null && photo !== undefined)
      content_.append(
        'Photo',
        photo.data,
        photo.fileName ? photo.fileName : 'Photo',
      );

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processAddPost(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processAddPost(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IdMessageResponseOfGuid>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IdMessageResponseOfGuid>;
        }),
      );
  }

  protected processAddPost(
    response: HttpResponseBase,
  ): Observable<IdMessageResponseOfGuid> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IdMessageResponseOfGuid);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  updatePost(
    id: string | undefined,
    subCategoryId: string | undefined,
    title: string | undefined,
    description: string | null | undefined,
    photo: FileParameter | null | undefined,
    updatePhoto: boolean | undefined,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/unlock-opportunities/post';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (id === null || id === undefined)
      throw new Error("The parameter 'id' cannot be null.");
    else content_.append('Id', id.toString());
    if (subCategoryId === null || subCategoryId === undefined)
      throw new Error("The parameter 'subCategoryId' cannot be null.");
    else content_.append('SubCategoryId', subCategoryId.toString());
    if (title === null || title === undefined)
      throw new Error("The parameter 'title' cannot be null.");
    else content_.append('Title', title.toString());
    if (description !== null && description !== undefined)
      content_.append('Description', description.toString());
    if (photo !== null && photo !== undefined)
      content_.append(
        'Photo',
        photo.data,
        photo.fileName ? photo.fileName : 'Photo',
      );
    if (updatePhoto === null || updatePhoto === undefined)
      throw new Error("The parameter 'updatePhoto' cannot be null.");
    else content_.append('UpdatePhoto', updatePhoto.toString());

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdatePost(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdatePost(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processUpdatePost(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  addFigure(
    subCategoryId: string | undefined,
    avatar: FileParameter | null | undefined,
    name_First: string | null | undefined,
    name_Last: string | null | undefined,
    jobTitle: string | null | undefined,
    bio: string | null | undefined,
    email: string | null | undefined,
    phoneNumber_Code: number | undefined,
    phoneNumber_Number: string | null | undefined,
    countryId: number | null | undefined,
    cityId: number | null | undefined,
    areaId: number | null | undefined,
    addressDetails: string | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IdMessageResponseOfGuid> {
    let url_ = this.baseUrl + '/unlock-opportunities/figure';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (subCategoryId === null || subCategoryId === undefined)
      throw new Error("The parameter 'subCategoryId' cannot be null.");
    else content_.append('SubCategoryId', subCategoryId.toString());
    if (avatar !== null && avatar !== undefined)
      content_.append(
        'Avatar',
        avatar.data,
        avatar.fileName ? avatar.fileName : 'Avatar',
      );
    if (name_First !== null && name_First !== undefined)
      content_.append('Name.First', name_First.toString());
    if (name_Last !== null && name_Last !== undefined)
      content_.append('Name.Last', name_Last.toString());
    if (jobTitle !== null && jobTitle !== undefined)
      content_.append('JobTitle', jobTitle.toString());
    if (bio !== null && bio !== undefined)
      content_.append('Bio', bio.toString());
    if (email !== null && email !== undefined)
      content_.append('Email', email.toString());
    if (phoneNumber_Code === null || phoneNumber_Code === undefined)
      throw new Error("The parameter 'phoneNumber_Code' cannot be null.");
    else content_.append('PhoneNumber.Code', phoneNumber_Code.toString());
    if (phoneNumber_Number !== null && phoneNumber_Number !== undefined)
      content_.append('PhoneNumber.Number', phoneNumber_Number.toString());
    if (countryId !== null && countryId !== undefined)
      content_.append('CountryId', countryId.toString());
    if (cityId !== null && cityId !== undefined)
      content_.append('CityId', cityId.toString());
    if (areaId !== null && areaId !== undefined)
      content_.append('AreaId', areaId.toString());
    if (addressDetails !== null && addressDetails !== undefined)
      content_.append('AddressDetails', addressDetails.toString());

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processAddFigure(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processAddFigure(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IdMessageResponseOfGuid>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IdMessageResponseOfGuid>;
        }),
      );
  }

  protected processAddFigure(
    response: HttpResponseBase,
  ): Observable<IdMessageResponseOfGuid> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IdMessageResponseOfGuid);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  updateFigure(
    id: string | undefined,
    subCategoryId: string | undefined,
    updateAvatar: boolean | undefined,
    avatar: FileParameter | null | undefined,
    name_First: string | null | undefined,
    name_Last: string | null | undefined,
    jobTitle: string | null | undefined,
    bio: string | null | undefined,
    email: string | null | undefined,
    phoneNumber_Code: number | undefined,
    phoneNumber_Number: string | null | undefined,
    countryId: number | null | undefined,
    cityId: number | null | undefined,
    areaId: number | null | undefined,
    addressDetails: string | null | undefined,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/unlock-opportunities/figure';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (id === null || id === undefined)
      throw new Error("The parameter 'id' cannot be null.");
    else content_.append('Id', id.toString());
    if (subCategoryId === null || subCategoryId === undefined)
      throw new Error("The parameter 'subCategoryId' cannot be null.");
    else content_.append('SubCategoryId', subCategoryId.toString());
    if (updateAvatar === null || updateAvatar === undefined)
      throw new Error("The parameter 'updateAvatar' cannot be null.");
    else content_.append('UpdateAvatar', updateAvatar.toString());
    if (avatar !== null && avatar !== undefined)
      content_.append(
        'Avatar',
        avatar.data,
        avatar.fileName ? avatar.fileName : 'Avatar',
      );
    if (name_First !== null && name_First !== undefined)
      content_.append('Name.First', name_First.toString());
    if (name_Last !== null && name_Last !== undefined)
      content_.append('Name.Last', name_Last.toString());
    if (jobTitle !== null && jobTitle !== undefined)
      content_.append('JobTitle', jobTitle.toString());
    if (bio !== null && bio !== undefined)
      content_.append('Bio', bio.toString());
    if (email !== null && email !== undefined)
      content_.append('Email', email.toString());
    if (phoneNumber_Code === null || phoneNumber_Code === undefined)
      throw new Error("The parameter 'phoneNumber_Code' cannot be null.");
    else content_.append('PhoneNumber.Code', phoneNumber_Code.toString());
    if (phoneNumber_Number !== null && phoneNumber_Number !== undefined)
      content_.append('PhoneNumber.Number', phoneNumber_Number.toString());
    if (countryId !== null && countryId !== undefined)
      content_.append('CountryId', countryId.toString());
    if (cityId !== null && cityId !== undefined)
      content_.append('CityId', cityId.toString());
    if (areaId !== null && areaId !== undefined)
      content_.append('AreaId', areaId.toString());
    if (addressDetails !== null && addressDetails !== undefined)
      content_.append('AddressDetails', addressDetails.toString());

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdateFigure(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdateFigure(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processUpdateFigure(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  softDelete(
    id: string,
    isDeleted: boolean,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/unlock-opportunities/{id}/{isDeleted}';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    if (isDeleted === undefined || isDeleted === null)
      throw new Error("The parameter 'isDeleted' must be defined.");
    url_ = url_.replace('{isDeleted}', encodeURIComponent('' + isDeleted));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSoftDelete(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSoftDelete(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processSoftDelete(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: 'root',
})
export class UnlockOpportunityCategoriesClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : 'http://localhost:4476';
  }

  getAppViewById(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfUnlockOpportunityCategoryAppView> {
    let url_ = this.baseUrl + '/unlock-opportunity-categories/{id}/app-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewById(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfUnlockOpportunityCategoryAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfUnlockOpportunityCategoryAppView>;
        }),
      );
  }

  protected processGetAppViewById(
    response: HttpResponseBase,
  ): Observable<DataResponseOfUnlockOpportunityCategoryAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfUnlockOpportunityCategoryAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getAppViewPage(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfUnlockOpportunityCategoryAppView> {
    let url_ = this.baseUrl + '/unlock-opportunity-categories/app-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfUnlockOpportunityCategoryAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfUnlockOpportunityCategoryAppView>;
        }),
      );
  }

  protected processGetAppViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfUnlockOpportunityCategoryAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfUnlockOpportunityCategoryAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewById(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfUnlockOpportunityCategoryDashboardView> {
    let url_ =
      this.baseUrl + '/unlock-opportunity-categories/{id}/dashboard-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewById(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfUnlockOpportunityCategoryDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfUnlockOpportunityCategoryDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewById(
    response: HttpResponseBase,
  ): Observable<DataResponseOfUnlockOpportunityCategoryDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfUnlockOpportunityCategoryDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewPage(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    isDeleted: boolean | null | undefined,
    isSubCategoryDeleted: boolean | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfUnlockOpportunityCategoryDashboardView> {
    let url_ = this.baseUrl + '/unlock-opportunity-categories/dashboard-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    if (isDeleted !== undefined && isDeleted !== null)
      url_ += 'IsDeleted=' + encodeURIComponent('' + isDeleted) + '&';
    if (isSubCategoryDeleted !== undefined && isSubCategoryDeleted !== null)
      url_ +=
        'IsSubCategoryDeleted=' +
        encodeURIComponent('' + isSubCategoryDeleted) +
        '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfUnlockOpportunityCategoryDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfUnlockOpportunityCategoryDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfUnlockOpportunityCategoryDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfUnlockOpportunityCategoryDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  add(
    name: string | undefined,
    description: string | null | undefined,
    photo: FileParameter | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IdMessageResponseOfGuid> {
    let url_ = this.baseUrl + '/unlock-opportunity-categories';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (name === null || name === undefined)
      throw new Error("The parameter 'name' cannot be null.");
    else content_.append('Name', name.toString());
    if (description !== null && description !== undefined)
      content_.append('Description', description.toString());
    if (photo !== null && photo !== undefined)
      content_.append(
        'Photo',
        photo.data,
        photo.fileName ? photo.fileName : 'Photo',
      );

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processAdd(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processAdd(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IdMessageResponseOfGuid>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IdMessageResponseOfGuid>;
        }),
      );
  }

  protected processAdd(
    response: HttpResponseBase,
  ): Observable<IdMessageResponseOfGuid> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IdMessageResponseOfGuid);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  update(
    id: string | undefined,
    name: string | undefined,
    description: string | null | undefined,
    updatePhoto: boolean | undefined,
    photo: FileParameter | null | undefined,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/unlock-opportunity-categories';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (id === null || id === undefined)
      throw new Error("The parameter 'id' cannot be null.");
    else content_.append('Id', id.toString());
    if (name === null || name === undefined)
      throw new Error("The parameter 'name' cannot be null.");
    else content_.append('Name', name.toString());
    if (description !== null && description !== undefined)
      content_.append('Description', description.toString());
    if (updatePhoto === null || updatePhoto === undefined)
      throw new Error("The parameter 'updatePhoto' cannot be null.");
    else content_.append('UpdatePhoto', updatePhoto.toString());
    if (photo !== null && photo !== undefined)
      content_.append(
        'Photo',
        photo.data,
        photo.fileName ? photo.fileName : 'Photo',
      );

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdate(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdate(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processUpdate(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  softDelete(
    id: string,
    isDeleted: boolean,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/unlock-opportunity-categories/{id}/{isDeleted}';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    if (isDeleted === undefined || isDeleted === null)
      throw new Error("The parameter 'isDeleted' must be defined.");
    url_ = url_.replace('{isDeleted}', encodeURIComponent('' + isDeleted));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSoftDelete(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSoftDelete(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processSoftDelete(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: 'root',
})
export class UnlockOpportunitySubCategoriesClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : 'http://localhost:4476';
  }

  getAppViewById(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfUnlockOpportunitySubCategoryAppView> {
    let url_ =
      this.baseUrl + '/unlock-opportunity-sub-categories/{id}/app-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewById(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfUnlockOpportunitySubCategoryAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfUnlockOpportunitySubCategoryAppView>;
        }),
      );
  }

  protected processGetAppViewById(
    response: HttpResponseBase,
  ): Observable<DataResponseOfUnlockOpportunitySubCategoryAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfUnlockOpportunitySubCategoryAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getAppViewPage(
    index: number | undefined,
    size: number | undefined,
    categoryId: string | null | undefined,
    search: string | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfUnlockOpportunitySubCategoryAppView> {
    let url_ = this.baseUrl + '/unlock-opportunity-sub-categories/app-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (categoryId !== undefined && categoryId !== null)
      url_ += 'CategoryId=' + encodeURIComponent('' + categoryId) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfUnlockOpportunitySubCategoryAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfUnlockOpportunitySubCategoryAppView>;
        }),
      );
  }

  protected processGetAppViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfUnlockOpportunitySubCategoryAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfUnlockOpportunitySubCategoryAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  add(
    categoryId: string | undefined,
    name: string | undefined,
    description: string | null | undefined,
    photo: FileParameter | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IdMessageResponseOfGuid> {
    let url_ = this.baseUrl + '/unlock-opportunity-sub-categories';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (categoryId === null || categoryId === undefined)
      throw new Error("The parameter 'categoryId' cannot be null.");
    else content_.append('CategoryId', categoryId.toString());
    if (name === null || name === undefined)
      throw new Error("The parameter 'name' cannot be null.");
    else content_.append('Name', name.toString());
    if (description !== null && description !== undefined)
      content_.append('Description', description.toString());
    if (photo !== null && photo !== undefined)
      content_.append(
        'Photo',
        photo.data,
        photo.fileName ? photo.fileName : 'Photo',
      );

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processAdd(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processAdd(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IdMessageResponseOfGuid>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IdMessageResponseOfGuid>;
        }),
      );
  }

  protected processAdd(
    response: HttpResponseBase,
  ): Observable<IdMessageResponseOfGuid> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IdMessageResponseOfGuid);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  update(
    id: string | undefined,
    name: string | undefined,
    description: string | null | undefined,
    updatePhoto: boolean | undefined,
    photo: FileParameter | null | undefined,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/unlock-opportunity-sub-categories';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (id === null || id === undefined)
      throw new Error("The parameter 'id' cannot be null.");
    else content_.append('Id', id.toString());
    if (name === null || name === undefined)
      throw new Error("The parameter 'name' cannot be null.");
    else content_.append('Name', name.toString());
    if (description !== null && description !== undefined)
      content_.append('Description', description.toString());
    if (updatePhoto === null || updatePhoto === undefined)
      throw new Error("The parameter 'updatePhoto' cannot be null.");
    else content_.append('UpdatePhoto', updatePhoto.toString());
    if (photo !== null && photo !== undefined)
      content_.append(
        'Photo',
        photo.data,
        photo.fileName ? photo.fileName : 'Photo',
      );

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdate(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdate(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processUpdate(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  softDelete(
    id: string,
    isDeleted: boolean,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ =
      this.baseUrl + '/unlock-opportunity-sub-categories/{id}/{isDeleted}';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    if (isDeleted === undefined || isDeleted === null)
      throw new Error("The parameter 'isDeleted' must be defined.");
    url_ = url_.replace('{isDeleted}', encodeURIComponent('' + isDeleted));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSoftDelete(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSoftDelete(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processSoftDelete(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: 'root',
})
export class InvoicesClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : 'http://localhost:4476';
  }

  getDashboardViewPage(
    index: number | undefined,
    size: number | undefined,
    status: InvoiceStatus | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfInvoiceDashboardView> {
    let url_ = this.baseUrl + '/invoices/dashboard-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (status !== undefined && status !== null)
      url_ += 'Status=' + encodeURIComponent('' + status) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfInvoiceDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfInvoiceDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfInvoiceDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfInvoiceDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewById(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfInvoiceDashboardView> {
    let url_ = this.baseUrl + '/invoices/{id}/dashboard-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewById(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfInvoiceDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfInvoiceDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewById(
    response: HttpResponseBase,
  ): Observable<DataResponseOfInvoiceDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfInvoiceDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  markAsPaid(
    id: string,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/invoices/{id}/mark-as-paid';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processMarkAsPaid(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processMarkAsPaid(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processMarkAsPaid(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  markAsUnpaid(
    id: string,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/invoices/{id}/mark-as-unpaid';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processMarkAsUnpaid(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processMarkAsUnpaid(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processMarkAsUnpaid(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : 'http://localhost:4476';
  }

  getDashboardViewPage(
    index: number | undefined,
    size: number | undefined,
    status: SubscriptionStatus | null | undefined,
    billingScheduleInterval: BillingScheduleInterval | null | undefined,
    subscriptionPackageId: string | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfSubscriptionDashboardView> {
    let url_ = this.baseUrl + '/subscriptions/dashboard-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (status !== undefined && status !== null)
      url_ += 'Status=' + encodeURIComponent('' + status) + '&';
    if (
      billingScheduleInterval !== undefined &&
      billingScheduleInterval !== null
    )
      url_ +=
        'BillingScheduleInterval=' +
        encodeURIComponent('' + billingScheduleInterval) +
        '&';
    if (subscriptionPackageId !== undefined && subscriptionPackageId !== null)
      url_ +=
        'SubscriptionPackageId=' +
        encodeURIComponent('' + subscriptionPackageId) +
        '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfSubscriptionDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfSubscriptionDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfSubscriptionDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfSubscriptionDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewById(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfSubscriptionDashboardView> {
    let url_ = this.baseUrl + '/subscriptions/{id}/dashboard-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewById(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfSubscriptionDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfSubscriptionDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewById(
    response: HttpResponseBase,
  ): Observable<DataResponseOfSubscriptionDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfSubscriptionDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  renew(
    request: RenewSubscription,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/subscriptions/renew';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processRenew(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processRenew(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processRenew(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  deactivate(
    request: DeactivateSubscription,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/subscriptions/deactivate';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processDeactivate(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processDeactivate(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processDeactivate(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: 'root',
})
export class SubscriptionRequestsClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : 'http://localhost:4476';
  }

  getDashboardViewPage(
    index: number | undefined,
    size: number | undefined,
    status: SubscriptionRequestStatus | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfSubscriptionRequestDashboardView> {
    let url_ = this.baseUrl + '/subscription-requests/dashboard-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (status !== undefined && status !== null)
      url_ += 'Status=' + encodeURIComponent('' + status) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfSubscriptionRequestDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfSubscriptionRequestDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfSubscriptionRequestDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfSubscriptionRequestDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewById(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfSubscriptionRequestDashboardView> {
    let url_ = this.baseUrl + '/subscription-requests/{id}/dashboard-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewById(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfSubscriptionRequestDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfSubscriptionRequestDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewById(
    response: HttpResponseBase,
  ): Observable<DataResponseOfSubscriptionRequestDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfSubscriptionRequestDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  approve(
    request: ApproveSubscriptionRequest,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/subscription-requests/approve';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processApprove(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processApprove(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processApprove(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: 'root',
})
export class SubscriptionPackagesClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : 'http://localhost:4476';
  }

  getAppViewById(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfSubscriptionPackageAppView> {
    let url_ = this.baseUrl + '/subscription-packages/{id}/app-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewById(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfSubscriptionPackageAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfSubscriptionPackageAppView>;
        }),
      );
  }

  protected processGetAppViewById(
    response: HttpResponseBase,
  ): Observable<DataResponseOfSubscriptionPackageAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfSubscriptionPackageAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getAppViewPage(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfSubscriptionPackageAppView> {
    let url_ = this.baseUrl + '/subscription-packages/app-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfSubscriptionPackageAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfSubscriptionPackageAppView>;
        }),
      );
  }

  protected processGetAppViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfSubscriptionPackageAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfSubscriptionPackageAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewById(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfSubscriptionPackageDashboardView> {
    let url_ = this.baseUrl + '/subscription-packages/{id}/dashboard-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewById(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfSubscriptionPackageDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfSubscriptionPackageDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewById(
    response: HttpResponseBase,
  ): Observable<DataResponseOfSubscriptionPackageDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfSubscriptionPackageDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewPage(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfSubscriptionPackageDashboardView> {
    let url_ = this.baseUrl + '/subscription-packages/dashboard-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfSubscriptionPackageDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfSubscriptionPackageDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfSubscriptionPackageDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfSubscriptionPackageDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  add(
    order: number | undefined,
    name: string | null | undefined,
    description: string | null | undefined,
    photo: FileParameter | null | undefined,
    features: AddSubscriptionPackagePurchaseFeature[] | null | undefined,
    purchaseOptions: AddSubscriptionPackagePurchaseOption[] | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IdMessageResponseOfGuid> {
    let url_ = this.baseUrl + '/subscription-packages';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (order === null || order === undefined)
      throw new Error("The parameter 'order' cannot be null.");
    else content_.append('Order', order.toString());
    if (name !== null && name !== undefined)
      content_.append('Name', name.toString());
    if (description !== null && description !== undefined)
      content_.append('Description', description.toString());
    if (photo !== null && photo !== undefined)
      content_.append(
        'Photo',
        photo.data,
        photo.fileName ? photo.fileName : 'Photo',
      );
    if (features !== null && features !== undefined)
      features.forEach((item_, index) => {
        content_.append(
          `Features[${index}].FeatureId`,
          item_.featureId.toString(),
        );
      });
    if (purchaseOptions !== null && purchaseOptions !== undefined)
      purchaseOptions.forEach((item_, index) => {
        content_.append(
          `PurchaseOptions[${index}].Name`,
          item_.name.toString(),
        );
        content_.append(
          `PurchaseOptions[${index}].OriginalPrice`,
          item_.originalPrice.toString(),
        );
        content_.append(
          `PurchaseOptions[${index}].SalePrice`,
          item_.salePrice.toString(),
        );
        content_.append(
          `PurchaseOptions[${index}].BillingSchedule`,
          item_.billingSchedule.toString(),
        );
      });

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processAdd(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processAdd(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IdMessageResponseOfGuid>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IdMessageResponseOfGuid>;
        }),
      );
  }

  protected processAdd(
    response: HttpResponseBase,
  ): Observable<IdMessageResponseOfGuid> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IdMessageResponseOfGuid);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  update(
    id: string | undefined,
    order: number | undefined,
    name: string | null | undefined,
    description: string | null | undefined,
    photo: FileParameter | null | undefined,
    updatePhoto: boolean | undefined,
    features: UpdateSubscriptionPackagePurchaseFeature[] | null | undefined,
    purchaseOptions:
      | UpdateSubscriptionPackagePurchaseOption[]
      | null
      | undefined,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/subscription-packages';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (id === null || id === undefined)
      throw new Error("The parameter 'id' cannot be null.");
    else content_.append('Id', id.toString());
    if (order === null || order === undefined)
      throw new Error("The parameter 'order' cannot be null.");
    else content_.append('Order', order.toString());
    if (name !== null && name !== undefined)
      content_.append('Name', name.toString());
    if (description !== null && description !== undefined)
      content_.append('Description', description.toString());
    if (photo !== null && photo !== undefined)
      content_.append(
        'Photo',
        photo.data,
        photo.fileName ? photo.fileName : 'Photo',
      );
    if (updatePhoto === null || updatePhoto === undefined)
      throw new Error("The parameter 'updatePhoto' cannot be null.");
    else content_.append('UpdatePhoto', updatePhoto.toString());
    if (features !== null && features !== undefined)
      features.forEach((item_, index) => {
        content_.append(
          `Features[${index}].FeatureId`,
          item_.featureId.toString(),
        );
      });
    if (purchaseOptions !== null && purchaseOptions !== undefined)
      purchaseOptions.forEach((item_, index) => {
        content_.append(
          `PurchaseOptions[${index}].Name`,
          item_.name.toString(),
        );
        content_.append(
          `PurchaseOptions[${index}].OriginalPrice`,
          item_.originalPrice.toString(),
        );
        content_.append(
          `PurchaseOptions[${index}].SalePrice`,
          item_.salePrice.toString(),
        );
        content_.append(
          `PurchaseOptions[${index}].BillingSchedule`,
          item_.billingSchedule.toString(),
        );
      });

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdate(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdate(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processUpdate(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  active(
    request: ActiveSubscriptionPackage,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/subscription-packages/active';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processActive(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processActive(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processActive(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: 'root',
})
export class SponsorshipClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : 'http://localhost:4476';
  }

  getAppView(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfSponsorshipAppView> {
    let url_ = this.baseUrl + '/sponsorship/{id}/app-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppView(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppView(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfSponsorshipAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfSponsorshipAppView>;
        }),
      );
  }

  protected processGetAppView(
    response: HttpResponseBase,
  ): Observable<DataResponseOfSponsorshipAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfSponsorshipAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getAppViewPage(
    index: number | undefined,
    size: number | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfSponsorshipAppView> {
    let url_ = this.baseUrl + '/sponsorship/app-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfSponsorshipAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfSponsorshipAppView>;
        }),
      );
  }

  protected processGetAppViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfSponsorshipAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfSponsorshipAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  add(
    photo: FileParameter | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IdMessageResponseOfString> {
    let url_ = this.baseUrl + '/sponsorship';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (photo !== null && photo !== undefined)
      content_.append(
        'Photo',
        photo.data,
        photo.fileName ? photo.fileName : 'Photo',
      );

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processAdd(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processAdd(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IdMessageResponseOfString>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IdMessageResponseOfString>;
        }),
      );
  }

  protected processAdd(
    response: HttpResponseBase,
  ): Observable<IdMessageResponseOfString> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IdMessageResponseOfString);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: 'root',
})
export class SkillsClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : 'http://localhost:4476';
  }

  getDashboardViewPage(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfSkillView> {
    let url_ = this.baseUrl + '/skills/dashboard-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfSkillView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfSkillView>;
        }),
      );
  }

  protected processGetDashboardViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfSkillView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfSkillView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewById(
    id: string,
    httpContext?: HttpContext,
  ): Observable<SkillView> {
    let url_ = this.baseUrl + '/skills/{id}/dashboard-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewById(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<SkillView>;
            }
          } else
            return _observableThrow(response_) as any as Observable<SkillView>;
        }),
      );
  }

  protected processGetDashboardViewById(
    response: HttpResponseBase,
  ): Observable<SkillView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(_responseText, this.jsonParseReviver) as SkillView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getAppViewPage(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfSkillView> {
    let url_ = this.baseUrl + '/skills/app-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfSkillView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfSkillView>;
        }),
      );
  }

  protected processGetAppViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfSkillView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfSkillView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getAppViewById(id: string, httpContext?: HttpContext): Observable<SkillView> {
    let url_ = this.baseUrl + '/skills/{id}/app-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewById(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<SkillView>;
            }
          } else
            return _observableThrow(response_) as any as Observable<SkillView>;
        }),
      );
  }

  protected processGetAppViewById(
    response: HttpResponseBase,
  ): Observable<SkillView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(_responseText, this.jsonParseReviver) as SkillView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  post(
    request: AddSkill,
    httpContext?: HttpContext,
  ): Observable<IdMessageResponseOfGuid> {
    let url_ = this.baseUrl + '/skills';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processPost(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processPost(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IdMessageResponseOfGuid>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IdMessageResponseOfGuid>;
        }),
      );
  }

  protected processPost(
    response: HttpResponseBase,
  ): Observable<IdMessageResponseOfGuid> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IdMessageResponseOfGuid);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  update(
    request: UpdateSkill,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/skills';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdate(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdate(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processUpdate(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  active(
    request: ActiveSkill,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/skills/active';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processActive(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processActive(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processActive(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserDeviceTokensClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : 'http://localhost:4476';
  }

  upsert(
    request: UpsertUserDeviceToken,
    httpContext?: HttpContext,
  ): Observable<void> {
    let url_ = this.baseUrl + '/user-device-tokens';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpsert(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpsert(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<void>;
            }
          } else return _observableThrow(response_) as any as Observable<void>;
        }),
      );
  }

  protected processUpsert(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return _observableOf(null as any);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: 'root',
})
export class MaritimeProfessionalFiguresClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : 'http://localhost:4476';
  }

  getAppView(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfMaritimeProfessionalFigureAppView> {
    let url_ = this.baseUrl + '/maritime-professional-figures/{id}/app-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppView(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppView(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfMaritimeProfessionalFigureAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfMaritimeProfessionalFigureAppView>;
        }),
      );
  }

  protected processGetAppView(
    response: HttpResponseBase,
  ): Observable<DataResponseOfMaritimeProfessionalFigureAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfMaritimeProfessionalFigureAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getAppViewPage(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    category: MaritimeProfessionalFigureCategory | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfMaritimeProfessionalFigureAppView> {
    let url_ = this.baseUrl + '/maritime-professional-figures/app-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    if (category !== undefined && category !== null)
      url_ += 'Category=' + encodeURIComponent('' + category) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfMaritimeProfessionalFigureAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfMaritimeProfessionalFigureAppView>;
        }),
      );
  }

  protected processGetAppViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfMaritimeProfessionalFigureAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfMaritimeProfessionalFigureAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardView(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfMaritimeProfessionalFigureDashboardView> {
    let url_ =
      this.baseUrl + '/maritime-professional-figures/{id}/dashboard-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardView(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardView(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfMaritimeProfessionalFigureDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfMaritimeProfessionalFigureDashboardView>;
        }),
      );
  }

  protected processGetDashboardView(
    response: HttpResponseBase,
  ): Observable<DataResponseOfMaritimeProfessionalFigureDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfMaritimeProfessionalFigureDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewPage(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    hidden: boolean | null | undefined,
    deleted: boolean | null | undefined,
    areaId: number | null | undefined,
    cityId: number | null | undefined,
    countryId: number | null | undefined,
    contactBy: MaritimeProfessionalFigureContactBy | null | undefined,
    category: MaritimeProfessionalFigureCategory | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfMaritimeProfessionalFigureDashboardView> {
    let url_ = this.baseUrl + '/maritime-professional-figures/dashboard-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    if (hidden !== undefined && hidden !== null)
      url_ += 'Hidden=' + encodeURIComponent('' + hidden) + '&';
    if (deleted !== undefined && deleted !== null)
      url_ += 'Deleted=' + encodeURIComponent('' + deleted) + '&';
    if (areaId !== undefined && areaId !== null)
      url_ += 'AreaId=' + encodeURIComponent('' + areaId) + '&';
    if (cityId !== undefined && cityId !== null)
      url_ += 'CityId=' + encodeURIComponent('' + cityId) + '&';
    if (countryId !== undefined && countryId !== null)
      url_ += 'CountryId=' + encodeURIComponent('' + countryId) + '&';
    if (contactBy !== undefined && contactBy !== null)
      url_ += 'ContactBy=' + encodeURIComponent('' + contactBy) + '&';
    if (category !== undefined && category !== null)
      url_ += 'Category=' + encodeURIComponent('' + category) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfMaritimeProfessionalFigureDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfMaritimeProfessionalFigureDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfMaritimeProfessionalFigureDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfMaritimeProfessionalFigureDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  add(
    name: string | undefined,
    order: number | undefined,
    jobTitle: string | undefined,
    category: MaritimeProfessionalFigureCategory | undefined,
    bio: string | null | undefined,
    description: string | null | undefined,
    email: string | null | undefined,
    phoneNumber_Code: number | undefined,
    phoneNumber_Number: string | null | undefined,
    contactBy: MaritimeProfessionalFigureContactBy | undefined,
    address: string | null | undefined,
    countryId: number | null | undefined,
    cityId: number | null | undefined,
    areaId: number | null | undefined,
    avatar: FileParameter | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IdMessageResponseOfGuid> {
    let url_ = this.baseUrl + '/maritime-professional-figures';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (name === null || name === undefined)
      throw new Error("The parameter 'name' cannot be null.");
    else content_.append('Name', name.toString());
    if (order === null || order === undefined)
      throw new Error("The parameter 'order' cannot be null.");
    else content_.append('Order', order.toString());
    if (jobTitle === null || jobTitle === undefined)
      throw new Error("The parameter 'jobTitle' cannot be null.");
    else content_.append('JobTitle', jobTitle.toString());
    if (category === null || category === undefined)
      throw new Error("The parameter 'category' cannot be null.");
    else content_.append('Category', category.toString());
    if (bio !== null && bio !== undefined)
      content_.append('Bio', bio.toString());
    if (description !== null && description !== undefined)
      content_.append('Description', description.toString());
    if (email !== null && email !== undefined)
      content_.append('Email', email.toString());
    if (phoneNumber_Code === null || phoneNumber_Code === undefined)
      throw new Error("The parameter 'phoneNumber_Code' cannot be null.");
    else content_.append('PhoneNumber.Code', phoneNumber_Code.toString());
    if (phoneNumber_Number !== null && phoneNumber_Number !== undefined)
      content_.append('PhoneNumber.Number', phoneNumber_Number.toString());
    if (contactBy === null || contactBy === undefined)
      throw new Error("The parameter 'contactBy' cannot be null.");
    else content_.append('ContactBy', contactBy.toString());
    if (address !== null && address !== undefined)
      content_.append('Address', address.toString());
    if (countryId !== null && countryId !== undefined)
      content_.append('CountryId', countryId.toString());
    if (cityId !== null && cityId !== undefined)
      content_.append('CityId', cityId.toString());
    if (areaId !== null && areaId !== undefined)
      content_.append('AreaId', areaId.toString());
    if (avatar !== null && avatar !== undefined)
      content_.append(
        'Avatar',
        avatar.data,
        avatar.fileName ? avatar.fileName : 'Avatar',
      );

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processAdd(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processAdd(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IdMessageResponseOfGuid>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IdMessageResponseOfGuid>;
        }),
      );
  }

  protected processAdd(
    response: HttpResponseBase,
  ): Observable<IdMessageResponseOfGuid> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IdMessageResponseOfGuid);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  update(
    id: string | undefined,
    order: number | undefined,
    name: string | undefined,
    jobTitle: string | undefined,
    category: MaritimeProfessionalFigureCategory | undefined,
    bio: string | null | undefined,
    description: string | null | undefined,
    email: string | null | undefined,
    phoneNumber_Code: number | undefined,
    phoneNumber_Number: string | null | undefined,
    contactBy: MaritimeProfessionalFigureContactBy | undefined,
    address: string | null | undefined,
    countryId: number | null | undefined,
    cityId: number | null | undefined,
    areaId: number | null | undefined,
    avatar: FileParameter | null | undefined,
    updateAvatar: boolean | undefined,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/maritime-professional-figures';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (id === null || id === undefined)
      throw new Error("The parameter 'id' cannot be null.");
    else content_.append('Id', id.toString());
    if (order === null || order === undefined)
      throw new Error("The parameter 'order' cannot be null.");
    else content_.append('Order', order.toString());
    if (name === null || name === undefined)
      throw new Error("The parameter 'name' cannot be null.");
    else content_.append('Name', name.toString());
    if (jobTitle === null || jobTitle === undefined)
      throw new Error("The parameter 'jobTitle' cannot be null.");
    else content_.append('JobTitle', jobTitle.toString());
    if (category === null || category === undefined)
      throw new Error("The parameter 'category' cannot be null.");
    else content_.append('Category', category.toString());
    if (bio !== null && bio !== undefined)
      content_.append('Bio', bio.toString());
    if (description !== null && description !== undefined)
      content_.append('Description', description.toString());
    if (email !== null && email !== undefined)
      content_.append('Email', email.toString());
    if (phoneNumber_Code === null || phoneNumber_Code === undefined)
      throw new Error("The parameter 'phoneNumber_Code' cannot be null.");
    else content_.append('PhoneNumber.Code', phoneNumber_Code.toString());
    if (phoneNumber_Number !== null && phoneNumber_Number !== undefined)
      content_.append('PhoneNumber.Number', phoneNumber_Number.toString());
    if (contactBy === null || contactBy === undefined)
      throw new Error("The parameter 'contactBy' cannot be null.");
    else content_.append('ContactBy', contactBy.toString());
    if (address !== null && address !== undefined)
      content_.append('Address', address.toString());
    if (countryId !== null && countryId !== undefined)
      content_.append('CountryId', countryId.toString());
    if (cityId !== null && cityId !== undefined)
      content_.append('CityId', cityId.toString());
    if (areaId !== null && areaId !== undefined)
      content_.append('AreaId', areaId.toString());
    if (avatar !== null && avatar !== undefined)
      content_.append(
        'Avatar',
        avatar.data,
        avatar.fileName ? avatar.fileName : 'Avatar',
      );
    if (updateAvatar === null || updateAvatar === undefined)
      throw new Error("The parameter 'updateAvatar' cannot be null.");
    else content_.append('UpdateAvatar', updateAvatar.toString());

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdate(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdate(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processUpdate(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  hide(
    request: HideMaritimeProfessionalFigure,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/maritime-professional-figures/hide';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processHide(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processHide(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processHide(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  softDelete(
    id: string,
    isDeleted: boolean,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/maritime-professional-figures/{id}/{isDeleted}';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    if (isDeleted === undefined || isDeleted === null)
      throw new Error("The parameter 'isDeleted' must be defined.");
    url_ = url_.replace('{isDeleted}', encodeURIComponent('' + isDeleted));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSoftDelete(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSoftDelete(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processSoftDelete(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: 'root',
})
export class MaritimeInfluencerPostsClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : 'http://localhost:4476';
  }

  getAppView(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfMaritimeInfluencerPostAppView> {
    let url_ = this.baseUrl + '/maritime-influencers/posts/{id}/app-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppView(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppView(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfMaritimeInfluencerPostAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfMaritimeInfluencerPostAppView>;
        }),
      );
  }

  protected processGetAppView(
    response: HttpResponseBase,
  ): Observable<DataResponseOfMaritimeInfluencerPostAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfMaritimeInfluencerPostAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getAppViewPage(
    index: number | undefined,
    size: number | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfMaritimeInfluencerPostAppView> {
    let url_ = this.baseUrl + '/maritime-influencers/posts/app-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfMaritimeInfluencerPostAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfMaritimeInfluencerPostAppView>;
        }),
      );
  }

  protected processGetAppViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfMaritimeInfluencerPostAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfMaritimeInfluencerPostAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getCommentAppViewPage(
    postId: string,
    index: number | undefined,
    size: number | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfMaritimeInfluencerPostCommentAppView> {
    let url_ =
      this.baseUrl + '/maritime-influencers/posts/{postId}/comments/app-view?';
    if (postId === undefined || postId === null)
      throw new Error("The parameter 'postId' must be defined.");
    url_ = url_.replace('{postId}', encodeURIComponent('' + postId));
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetCommentAppViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetCommentAppViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfMaritimeInfluencerPostCommentAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfMaritimeInfluencerPostCommentAppView>;
        }),
      );
  }

  protected processGetCommentAppViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfMaritimeInfluencerPostCommentAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfMaritimeInfluencerPostCommentAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getCommentAppViewById(
    postId: string,
    commentId: number,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfMaritimeInfluencerPostCommentAppView> {
    let url_ =
      this.baseUrl +
      '/maritime-influencers/posts/{postId}/comments/{commentId}/app-view';
    if (postId === undefined || postId === null)
      throw new Error("The parameter 'postId' must be defined.");
    url_ = url_.replace('{postId}', encodeURIComponent('' + postId));
    if (commentId === undefined || commentId === null)
      throw new Error("The parameter 'commentId' must be defined.");
    url_ = url_.replace('{commentId}', encodeURIComponent('' + commentId));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetCommentAppViewById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetCommentAppViewById(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfMaritimeInfluencerPostCommentAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfMaritimeInfluencerPostCommentAppView>;
        }),
      );
  }

  protected processGetCommentAppViewById(
    response: HttpResponseBase,
  ): Observable<DataResponseOfMaritimeInfluencerPostCommentAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfMaritimeInfluencerPostCommentAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardView(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfMaritimeInfluencerPostDashboardView> {
    let url_ = this.baseUrl + '/maritime-influencers/posts/{id}/dashboard-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardView(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardView(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfMaritimeInfluencerPostDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfMaritimeInfluencerPostDashboardView>;
        }),
      );
  }

  protected processGetDashboardView(
    response: HttpResponseBase,
  ): Observable<DataResponseOfMaritimeInfluencerPostDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfMaritimeInfluencerPostDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewPage(
    index: number | undefined,
    size: number | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfMaritimeInfluencerPostDashboardView> {
    let url_ = this.baseUrl + '/maritime-influencers/posts/dashboard-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfMaritimeInfluencerPostDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfMaritimeInfluencerPostDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfMaritimeInfluencerPostDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfMaritimeInfluencerPostDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  add(
    text: string | null | undefined,
    medias: AddMaritimeInfluencerPostMedia[] | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IdMessageResponseOfGuid> {
    let url_ = this.baseUrl + '/maritime-influencers/posts';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (text !== null && text !== undefined)
      content_.append('Text', text.toString());
    if (medias !== null && medias !== undefined)
      medias.forEach((item_, index) => {
        content_.append(`Medias[${index}].Order`, item_.order.toString());
        content_.append(`Medias[${index}].Type`, item_.type.toString());

        content_.append(
          `Medias[${index}].File`,
          item_.file.data,
          item_.file.fileName,
        );
      });

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processAdd(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processAdd(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IdMessageResponseOfGuid>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IdMessageResponseOfGuid>;
        }),
      );
  }

  protected processAdd(
    response: HttpResponseBase,
  ): Observable<IdMessageResponseOfGuid> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IdMessageResponseOfGuid);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  update(
    request: UpdateMaritimeInfluencerPost,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/maritime-influencers/posts';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdate(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdate(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processUpdate(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  like(postId: string, httpContext?: HttpContext): Observable<void> {
    let url_ = this.baseUrl + '/maritime-influencers/posts/{postId}/like';
    if (postId === undefined || postId === null)
      throw new Error("The parameter 'postId' must be defined.");
    url_ = url_.replace('{postId}', encodeURIComponent('' + postId));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({}),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processLike(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processLike(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<void>;
            }
          } else return _observableThrow(response_) as any as Observable<void>;
        }),
      );
  }

  protected processLike(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return _observableOf(null as any);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  unlike(postId: string, httpContext?: HttpContext): Observable<void> {
    let url_ = this.baseUrl + '/maritime-influencers/posts/{postId}/unlike';
    if (postId === undefined || postId === null)
      throw new Error("The parameter 'postId' must be defined.");
    url_ = url_.replace('{postId}', encodeURIComponent('' + postId));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({}),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUnlike(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUnlike(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<void>;
            }
          } else return _observableThrow(response_) as any as Observable<void>;
        }),
      );
  }

  protected processUnlike(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return _observableOf(null as any);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  comment(
    postId: string,
    request: CommentOnMaritimeInfluencerPost | undefined,
    httpContext?: HttpContext,
  ): Observable<void> {
    let url_ = this.baseUrl + '/maritime-influencers/posts/{postId}/comment';
    if (postId === undefined || postId === null)
      throw new Error("The parameter 'postId' must be defined.");
    url_ = url_.replace('{postId}', encodeURIComponent('' + postId));
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processComment(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processComment(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<void>;
            }
          } else return _observableThrow(response_) as any as Observable<void>;
        }),
      );
  }

  protected processComment(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return _observableOf(null as any);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  softDelete(
    id: string,
    isDeleted: boolean,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/maritime-influencers/posts/{id}/{isDeleted}';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    if (isDeleted === undefined || isDeleted === null)
      throw new Error("The parameter 'isDeleted' must be defined.");
    url_ = url_.replace('{isDeleted}', encodeURIComponent('' + isDeleted));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSoftDelete(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSoftDelete(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processSoftDelete(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: 'root',
})
export class HeadhuntClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : 'http://localhost:4476';
  }

  getAppView(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfHeadhuntJobAppView> {
    let url_ = this.baseUrl + '/headhunt/{id}/app-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppView(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppView(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfHeadhuntJobAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfHeadhuntJobAppView>;
        }),
      );
  }

  protected processGetAppView(
    response: HttpResponseBase,
  ): Observable<DataResponseOfHeadhuntJobAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfHeadhuntJobAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getAppViewPage(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfHeadhuntJobAppView> {
    let url_ = this.baseUrl + '/headhunt/app-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfHeadhuntJobAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfHeadhuntJobAppView>;
        }),
      );
  }

  protected processGetAppViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfHeadhuntJobAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfHeadhuntJobAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardView(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfHeadhuntJobDashboardView> {
    let url_ = this.baseUrl + '/headhunt/{id}/dashboard-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardView(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardView(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfHeadhuntJobDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfHeadhuntJobDashboardView>;
        }),
      );
  }

  protected processGetDashboardView(
    response: HttpResponseBase,
  ): Observable<DataResponseOfHeadhuntJobDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfHeadhuntJobDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewPage(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    yearOfExperience: number | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfHeadhuntJobDashboardView> {
    let url_ = this.baseUrl + '/headhunt/dashboard-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    if (yearOfExperience !== undefined && yearOfExperience !== null)
      url_ +=
        'YearOfExperience=' + encodeURIComponent('' + yearOfExperience) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfHeadhuntJobDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfHeadhuntJobDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfHeadhuntJobDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfHeadhuntJobDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getApplicationsDashboardViewPage(
    index: number | undefined,
    size: number | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfHeadhuntJobApplicationDashboardView> {
    let url_ = this.baseUrl + '/headhunt/applications/dashboard-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetApplicationsDashboardViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetApplicationsDashboardViewPage(
                response_ as any,
              );
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfHeadhuntJobApplicationDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfHeadhuntJobApplicationDashboardView>;
        }),
      );
  }

  protected processGetApplicationsDashboardViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfHeadhuntJobApplicationDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfHeadhuntJobApplicationDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getApplicantView(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfHeadhuntJobApplicantView> {
    let url_ = this.baseUrl + '/headhunt/{id}/applicant-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetApplicantView(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetApplicantView(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfHeadhuntJobApplicantView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfHeadhuntJobApplicantView>;
        }),
      );
  }

  protected processGetApplicantView(
    response: HttpResponseBase,
  ): Observable<DataResponseOfHeadhuntJobApplicantView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfHeadhuntJobApplicantView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getApplicantViewPage(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfHeadhuntJobApplicantView> {
    let url_ = this.baseUrl + '/headhunt/applicant-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetApplicantViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetApplicantViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfHeadhuntJobApplicantView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfHeadhuntJobApplicantView>;
        }),
      );
  }

  protected processGetApplicantViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfHeadhuntJobApplicantView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfHeadhuntJobApplicantView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getOwnerView(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfHeadhuntJobOwnerView> {
    let url_ = this.baseUrl + '/headhunt/{id}/owner-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetOwnerView(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetOwnerView(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfHeadhuntJobOwnerView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfHeadhuntJobOwnerView>;
        }),
      );
  }

  protected processGetOwnerView(
    response: HttpResponseBase,
  ): Observable<DataResponseOfHeadhuntJobOwnerView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfHeadhuntJobOwnerView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getOwnerViewPage(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfHeadhuntJobOwnerView> {
    let url_ = this.baseUrl + '/headhunt/owner-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetOwnerViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetOwnerViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfHeadhuntJobOwnerView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfHeadhuntJobOwnerView>;
        }),
      );
  }

  protected processGetOwnerViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfHeadhuntJobOwnerView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfHeadhuntJobOwnerView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getApplicationsOwnerViewPage(
    index: number | undefined,
    size: number | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfHeadhuntJobApplicationOwnerView> {
    let url_ = this.baseUrl + '/headhunt/applications/owner-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetApplicationsOwnerViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetApplicationsOwnerViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfHeadhuntJobApplicationOwnerView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfHeadhuntJobApplicationOwnerView>;
        }),
      );
  }

  protected processGetApplicationsOwnerViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfHeadhuntJobApplicationOwnerView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfHeadhuntJobApplicationOwnerView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  postJob(
    request: PostHeadhuntJob,
    httpContext?: HttpContext,
  ): Observable<IdMessageResponseOfGuid> {
    let url_ = this.baseUrl + '/headhunt/post-job';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processPostJob(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processPostJob(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IdMessageResponseOfGuid>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IdMessageResponseOfGuid>;
        }),
      );
  }

  protected processPostJob(
    response: HttpResponseBase,
  ): Observable<IdMessageResponseOfGuid> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IdMessageResponseOfGuid);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  applyToJob(
    jobId: string | undefined,
    phoneNumber_Code: number | undefined,
    phoneNumber_Number: string | null | undefined,
    email: string | null | undefined,
    coverLetter: string | null | undefined,
    cv: FileParameter | null | undefined,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/headhunt/apply-to-job';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (jobId === null || jobId === undefined)
      throw new Error("The parameter 'jobId' cannot be null.");
    else content_.append('JobId', jobId.toString());
    if (phoneNumber_Code === null || phoneNumber_Code === undefined)
      throw new Error("The parameter 'phoneNumber_Code' cannot be null.");
    else content_.append('PhoneNumber.Code', phoneNumber_Code.toString());
    if (phoneNumber_Number !== null && phoneNumber_Number !== undefined)
      content_.append('PhoneNumber.Number', phoneNumber_Number.toString());
    if (email !== null && email !== undefined)
      content_.append('Email', email.toString());
    if (coverLetter !== null && coverLetter !== undefined)
      content_.append('CoverLetter', coverLetter.toString());
    if (cv !== null && cv !== undefined)
      content_.append('Cv', cv.data, cv.fileName ? cv.fileName : 'Cv');

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processApplyToJob(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processApplyToJob(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processApplyToJob(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  cancelJob(
    request: CancelHeadhuntJob,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/headhunt/cancel-job';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processCancelJob(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processCancelJob(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processCancelJob(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  softDelete(
    id: string,
    isDeleted: boolean,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/headhunt/{id}/{isDeleted}';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    if (isDeleted === undefined || isDeleted === null)
      throw new Error("The parameter 'isDeleted' must be defined.");
    url_ = url_.replace('{isDeleted}', encodeURIComponent('' + isDeleted));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSoftDelete(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSoftDelete(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processSoftDelete(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: 'root',
})
export class FeaturesClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : 'http://localhost:4476';
  }

  getAppViewPage(
    httpContext?: HttpContext,
  ): Observable<CollectionResponseOfFeatureAppView> {
    let url_ = this.baseUrl + '/features/app-view';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<CollectionResponseOfFeatureAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<CollectionResponseOfFeatureAppView>;
        }),
      );
  }

  protected processGetAppViewPage(
    response: HttpResponseBase,
  ): Observable<CollectionResponseOfFeatureAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as CollectionResponseOfFeatureAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewPage(
    httpContext?: HttpContext,
  ): Observable<CollectionResponseOfFeatureDashboardView> {
    let url_ = this.baseUrl + '/features/dashboard-view';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<CollectionResponseOfFeatureDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<CollectionResponseOfFeatureDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewPage(
    response: HttpResponseBase,
  ): Observable<CollectionResponseOfFeatureDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as CollectionResponseOfFeatureDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: 'root',
})
export class ETalkEventsClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : 'http://localhost:4476';
  }

  getAppViewPage(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfETalkEventAppView> {
    let url_ = this.baseUrl + '/e-talk-events/app-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfETalkEventAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfETalkEventAppView>;
        }),
      );
  }

  protected processGetAppViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfETalkEventAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfETalkEventAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getAppViewById(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfETalkEventAppView> {
    let url_ = this.baseUrl + '/e-talk-events/{id}/app-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewById(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfETalkEventAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfETalkEventAppView>;
        }),
      );
  }

  protected processGetAppViewById(
    response: HttpResponseBase,
  ): Observable<DataResponseOfETalkEventAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfETalkEventAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewPage(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    isDeleted: boolean | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfETalkEventDashboardView> {
    let url_ = this.baseUrl + '/e-talk-events/dashboard-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    if (isDeleted !== undefined && isDeleted !== null)
      url_ += 'IsDeleted=' + encodeURIComponent('' + isDeleted) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfETalkEventDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfETalkEventDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfETalkEventDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfETalkEventDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewById(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfETalkEventDashboardView> {
    let url_ = this.baseUrl + '/e-talk-events/{id}/dashboard-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewById(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfETalkEventDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfETalkEventDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewById(
    response: HttpResponseBase,
  ): Observable<DataResponseOfETalkEventDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfETalkEventDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  add(
    name: string | undefined,
    description: string | null | undefined,
    dateOfEvent: string | undefined,
    eventUrl: string | null | undefined,
    photo: FileParameter | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IdMessageResponseOfGuid> {
    let url_ = this.baseUrl + '/e-talk-events';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (name === null || name === undefined)
      throw new Error("The parameter 'name' cannot be null.");
    else content_.append('Name', name.toString());
    if (description !== null && description !== undefined)
      content_.append('Description', description.toString());
    if (dateOfEvent === null || dateOfEvent === undefined)
      throw new Error("The parameter 'dateOfEvent' cannot be null.");
    else content_.append('DateOfEvent', dateOfEvent.toString());
    if (eventUrl !== null && eventUrl !== undefined)
      content_.append('EventUrl', eventUrl.toString());
    if (photo !== null && photo !== undefined)
      content_.append(
        'Photo',
        photo.data,
        photo.fileName ? photo.fileName : 'Photo',
      );

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processAdd(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processAdd(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IdMessageResponseOfGuid>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IdMessageResponseOfGuid>;
        }),
      );
  }

  protected processAdd(
    response: HttpResponseBase,
  ): Observable<IdMessageResponseOfGuid> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IdMessageResponseOfGuid);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  update(
    id: string | undefined,
    name: string | undefined,
    description: string | null | undefined,
    eventUrl: string | null | undefined,
    photo: FileParameter | null | undefined,
    updatePhoto: boolean | undefined,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/e-talk-events';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (id === null || id === undefined)
      throw new Error("The parameter 'id' cannot be null.");
    else content_.append('Id', id.toString());
    if (name === null || name === undefined)
      throw new Error("The parameter 'name' cannot be null.");
    else content_.append('Name', name.toString());
    if (description !== null && description !== undefined)
      content_.append('Description', description.toString());
    if (eventUrl !== null && eventUrl !== undefined)
      content_.append('EventUrl', eventUrl.toString());
    if (photo !== null && photo !== undefined)
      content_.append(
        'Photo',
        photo.data,
        photo.fileName ? photo.fileName : 'Photo',
      );
    if (updatePhoto === null || updatePhoto === undefined)
      throw new Error("The parameter 'updatePhoto' cannot be null.");
    else content_.append('UpdatePhoto', updatePhoto.toString());

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdate(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdate(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processUpdate(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  sendInvitations(
    request: SendETalkEventInvitations,
    httpContext?: HttpContext,
  ): Observable<SendETalkEventInvitationsResponse> {
    let url_ = this.baseUrl + '/e-talk-events/send-invitations';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSendInvitations(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSendInvitations(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<SendETalkEventInvitationsResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<SendETalkEventInvitationsResponse>;
        }),
      );
  }

  protected processSendInvitations(
    response: HttpResponseBase,
  ): Observable<SendETalkEventInvitationsResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as SendETalkEventInvitationsResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  cancel(id: string, httpContext?: HttpContext): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/e-talk-events/cancel/{id}';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processCancel(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processCancel(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processCancel(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  softDelete(
    id: string,
    isDeleted: boolean,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/e-talk-events/{id}/{isDeleted}';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    if (isDeleted === undefined || isDeleted === null)
      throw new Error("The parameter 'isDeleted' must be defined.");
    url_ = url_.replace('{isDeleted}', encodeURIComponent('' + isDeleted));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSoftDelete(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSoftDelete(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processSoftDelete(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  addSpeakers(
    eTalkEventId: string | undefined,
    speakers: AddETalkEventSpeakersSpeaker[] | null | undefined,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/e-talk-events/speakers';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (eTalkEventId === null || eTalkEventId === undefined)
      throw new Error("The parameter 'eTalkEventId' cannot be null.");
    else content_.append('ETalkEventId', eTalkEventId.toString());
    if (speakers !== null && speakers !== undefined)
      speakers.forEach((item_, index) => {
        content_.append(`Speakers[${index}].Name`, item_.name);

        if (item_.description !== null && item_.description !== undefined)
          content_.append(`Speakers[${index}].Description`, item_.description);

        if (item_.title !== null && item_.title !== undefined)
          content_.append(`Speakers[${index}].Title`, item_.title);

        if (item_.avatar !== null && item_.avatar !== undefined)
          content_.append(
            `Speakers[${index}].Avatar`,
            item_.avatar.data,
            item_.avatar.fileName,
          );
      });

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processAddSpeakers(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processAddSpeakers(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processAddSpeakers(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  updateSpeaker(
    eTalkEventId: string | undefined,
    eTalkEventSpeakerId: number | undefined,
    name: string | undefined,
    title: string | null | undefined,
    description: string | null | undefined,
    avatar: FileParameter | null | undefined,
    updateAvatar: boolean | undefined,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/e-talk-events/speakers';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (eTalkEventId === null || eTalkEventId === undefined)
      throw new Error("The parameter 'eTalkEventId' cannot be null.");
    else content_.append('ETalkEventId', eTalkEventId.toString());
    if (eTalkEventSpeakerId === null || eTalkEventSpeakerId === undefined)
      throw new Error("The parameter 'eTalkEventSpeakerId' cannot be null.");
    else content_.append('ETalkEventSpeakerId', eTalkEventSpeakerId.toString());
    if (name === null || name === undefined)
      throw new Error("The parameter 'name' cannot be null.");
    else content_.append('Name', name.toString());
    if (title !== null && title !== undefined)
      content_.append('Title', title.toString());
    if (description !== null && description !== undefined)
      content_.append('Description', description.toString());
    if (avatar !== null && avatar !== undefined)
      content_.append(
        'Avatar',
        avatar.data,
        avatar.fileName ? avatar.fileName : 'Avatar',
      );
    if (updateAvatar === null || updateAvatar === undefined)
      throw new Error("The parameter 'updateAvatar' cannot be null.");
    else content_.append('UpdateAvatar', updateAvatar.toString());

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdateSpeaker(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdateSpeaker(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processUpdateSpeaker(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  softDeleteSpeaker(
    eTalkEventId: string,
    request: DeleteETalkEventSpeaker,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/e-talk-events/{eTalkEventId}/speakers';
    if (eTalkEventId === undefined || eTalkEventId === null)
      throw new Error("The parameter 'eTalkEventId' must be defined.");
    url_ = url_.replace(
      '{eTalkEventId}',
      encodeURIComponent('' + eTalkEventId),
    );
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSoftDeleteSpeaker(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSoftDeleteSpeaker(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processSoftDeleteSpeaker(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: 'root',
})
export class CustomersClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : 'http://localhost:4476';
  }

  getDashboardViewPage(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    status: UserStatus | null | undefined,
    gender: Gender | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfCustomerDashboardView> {
    let url_ = this.baseUrl + '/customers/dashboard-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    if (status !== undefined && status !== null)
      url_ += 'Status=' + encodeURIComponent('' + status) + '&';
    if (gender !== undefined && gender !== null)
      url_ += 'Gender=' + encodeURIComponent('' + gender) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfCustomerDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfCustomerDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfCustomerDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfCustomerDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewById(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfCustomerDashboardView> {
    let url_ = this.baseUrl + '/customers/{id}/dashboard-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewById(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfCustomerDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfCustomerDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewById(
    response: HttpResponseBase,
  ): Observable<DataResponseOfCustomerDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfCustomerDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  create(
    name_First: string | null | undefined,
    name_Last: string | null | undefined,
    gender: Gender | undefined,
    field: CustomerField | undefined,
    email: string | undefined,
    phoneNumber_Code: number | undefined,
    phoneNumber_Number: string | null | undefined,
    password: string | undefined,
    jobTitle: string | undefined,
    bio: string | null | undefined,
    website: string | null | undefined,
    linkedIn: string | null | undefined,
    address: string | null | undefined,
    areaId: number | null | undefined,
    cityId: number | null | undefined,
    countryId: number | undefined,
    avatar: FileParameter | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IdMessageResponseOfGuid> {
    let url_ = this.baseUrl + '/customers';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (name_First !== null && name_First !== undefined)
      content_.append('Name.First', name_First.toString());
    if (name_Last !== null && name_Last !== undefined)
      content_.append('Name.Last', name_Last.toString());
    if (gender === null || gender === undefined)
      throw new Error("The parameter 'gender' cannot be null.");
    else content_.append('Gender', gender.toString());
    if (field === null || field === undefined)
      throw new Error("The parameter 'field' cannot be null.");
    else content_.append('Field', field.toString());
    if (email === null || email === undefined)
      throw new Error("The parameter 'email' cannot be null.");
    else content_.append('Email', email.toString());
    if (phoneNumber_Code === null || phoneNumber_Code === undefined)
      throw new Error("The parameter 'phoneNumber_Code' cannot be null.");
    else content_.append('PhoneNumber.Code', phoneNumber_Code.toString());
    if (phoneNumber_Number !== null && phoneNumber_Number !== undefined)
      content_.append('PhoneNumber.Number', phoneNumber_Number.toString());
    if (password === null || password === undefined)
      throw new Error("The parameter 'password' cannot be null.");
    else content_.append('Password', password.toString());
    if (jobTitle === null || jobTitle === undefined)
      throw new Error("The parameter 'jobTitle' cannot be null.");
    else content_.append('JobTitle', jobTitle.toString());
    if (bio !== null && bio !== undefined)
      content_.append('Bio', bio.toString());
    if (website !== null && website !== undefined)
      content_.append('Website', website.toString());
    if (linkedIn !== null && linkedIn !== undefined)
      content_.append('LinkedIn', linkedIn.toString());
    if (address !== null && address !== undefined)
      content_.append('Address', address.toString());
    if (areaId !== null && areaId !== undefined)
      content_.append('AreaId', areaId.toString());
    if (cityId !== null && cityId !== undefined)
      content_.append('CityId', cityId.toString());
    if (countryId === null || countryId === undefined)
      throw new Error("The parameter 'countryId' cannot be null.");
    else content_.append('CountryId', countryId.toString());
    if (avatar !== null && avatar !== undefined)
      content_.append(
        'Avatar',
        avatar.data,
        avatar.fileName ? avatar.fileName : 'Avatar',
      );

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processCreate(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processCreate(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IdMessageResponseOfGuid>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IdMessageResponseOfGuid>;
        }),
      );
  }

  protected processCreate(
    response: HttpResponseBase,
  ): Observable<IdMessageResponseOfGuid> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IdMessageResponseOfGuid);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  update(
    id: string | undefined,
    name_First: string | null | undefined,
    name_Last: string | null | undefined,
    gender: Gender | undefined,
    field: CustomerField | undefined,
    email: string | undefined,
    phoneNumber_Code: number | undefined,
    phoneNumber_Number: string | null | undefined,
    jobTitle: string | undefined,
    bio: string | null | undefined,
    website: string | null | undefined,
    linkedIn: string | null | undefined,
    address: string | null | undefined,
    areaId: number | null | undefined,
    cityId: number | null | undefined,
    countryId: number | undefined,
    avatar: FileParameter | null | undefined,
    updateAvatar: boolean | undefined,
    concurrencyStamp: string | undefined,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/customers';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (id === null || id === undefined)
      throw new Error("The parameter 'id' cannot be null.");
    else content_.append('Id', id.toString());
    if (name_First !== null && name_First !== undefined)
      content_.append('Name.First', name_First.toString());
    if (name_Last !== null && name_Last !== undefined)
      content_.append('Name.Last', name_Last.toString());
    if (gender === null || gender === undefined)
      throw new Error("The parameter 'gender' cannot be null.");
    else content_.append('Gender', gender.toString());
    if (field === null || field === undefined)
      throw new Error("The parameter 'field' cannot be null.");
    else content_.append('Field', field.toString());
    if (email === null || email === undefined)
      throw new Error("The parameter 'email' cannot be null.");
    else content_.append('Email', email.toString());
    if (phoneNumber_Code === null || phoneNumber_Code === undefined)
      throw new Error("The parameter 'phoneNumber_Code' cannot be null.");
    else content_.append('PhoneNumber.Code', phoneNumber_Code.toString());
    if (phoneNumber_Number !== null && phoneNumber_Number !== undefined)
      content_.append('PhoneNumber.Number', phoneNumber_Number.toString());
    if (jobTitle === null || jobTitle === undefined)
      throw new Error("The parameter 'jobTitle' cannot be null.");
    else content_.append('JobTitle', jobTitle.toString());
    if (bio !== null && bio !== undefined)
      content_.append('Bio', bio.toString());
    if (website !== null && website !== undefined)
      content_.append('Website', website.toString());
    if (linkedIn !== null && linkedIn !== undefined)
      content_.append('LinkedIn', linkedIn.toString());
    if (address !== null && address !== undefined)
      content_.append('Address', address.toString());
    if (areaId !== null && areaId !== undefined)
      content_.append('AreaId', areaId.toString());
    if (cityId !== null && cityId !== undefined)
      content_.append('CityId', cityId.toString());
    if (countryId === null || countryId === undefined)
      throw new Error("The parameter 'countryId' cannot be null.");
    else content_.append('CountryId', countryId.toString());
    if (avatar !== null && avatar !== undefined)
      content_.append(
        'Avatar',
        avatar.data,
        avatar.fileName ? avatar.fileName : 'Avatar',
      );
    if (updateAvatar === null || updateAvatar === undefined)
      throw new Error("The parameter 'updateAvatar' cannot be null.");
    else content_.append('UpdateAvatar', updateAvatar.toString());
    if (concurrencyStamp === null || concurrencyStamp === undefined)
      throw new Error("The parameter 'concurrencyStamp' cannot be null.");
    else content_.append('ConcurrencyStamp', concurrencyStamp.toString());

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdate(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdate(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processUpdate(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  register(
    name_First: string | null | undefined,
    name_Last: string | null | undefined,
    gender: Gender | undefined,
    field: CustomerField | undefined,
    email: string | undefined,
    phoneNumber_Code: number | undefined,
    phoneNumber_Number: string | null | undefined,
    password: string | undefined,
    jobTitle: string | null | undefined,
    bio: string | null | undefined,
    website: string | null | undefined,
    linkedIn: string | null | undefined,
    address: string | null | undefined,
    areaId: number | null | undefined,
    cityId: number | null | undefined,
    countryId: number | undefined,
    avatar: FileParameter | null | undefined,
    coordinate_Latitude: number | undefined,
    coordinate_Longitude: number | undefined,
    subscriptionPackageId: string | undefined,
    subscriptionPackagePurchaseOptionId: string | undefined,
    httpContext?: HttpContext,
  ): Observable<IdMessageResponseOfGuid> {
    let url_ = this.baseUrl + '/customers/register';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (name_First !== null && name_First !== undefined)
      content_.append('Name.First', name_First.toString());
    if (name_Last !== null && name_Last !== undefined)
      content_.append('Name.Last', name_Last.toString());
    if (gender === null || gender === undefined)
      throw new Error("The parameter 'gender' cannot be null.");
    else content_.append('Gender', gender.toString());
    if (field === null || field === undefined)
      throw new Error("The parameter 'field' cannot be null.");
    else content_.append('Field', field.toString());
    if (email === null || email === undefined)
      throw new Error("The parameter 'email' cannot be null.");
    else content_.append('Email', email.toString());
    if (phoneNumber_Code === null || phoneNumber_Code === undefined)
      throw new Error("The parameter 'phoneNumber_Code' cannot be null.");
    else content_.append('PhoneNumber.Code', phoneNumber_Code.toString());
    if (phoneNumber_Number !== null && phoneNumber_Number !== undefined)
      content_.append('PhoneNumber.Number', phoneNumber_Number.toString());
    if (password === null || password === undefined)
      throw new Error("The parameter 'password' cannot be null.");
    else content_.append('Password', password.toString());
    if (jobTitle !== null && jobTitle !== undefined)
      content_.append('JobTitle', jobTitle.toString());
    if (bio !== null && bio !== undefined)
      content_.append('Bio', bio.toString());
    if (website !== null && website !== undefined)
      content_.append('Website', website.toString());
    if (linkedIn !== null && linkedIn !== undefined)
      content_.append('LinkedIn', linkedIn.toString());
    if (address !== null && address !== undefined)
      content_.append('Address', address.toString());
    if (areaId !== null && areaId !== undefined)
      content_.append('AreaId', areaId.toString());
    if (cityId !== null && cityId !== undefined)
      content_.append('CityId', cityId.toString());
    if (countryId === null || countryId === undefined)
      throw new Error("The parameter 'countryId' cannot be null.");
    else content_.append('CountryId', countryId.toString());
    if (avatar !== null && avatar !== undefined)
      content_.append(
        'Avatar',
        avatar.data,
        avatar.fileName ? avatar.fileName : 'Avatar',
      );
    if (coordinate_Latitude === null || coordinate_Latitude === undefined)
      throw new Error("The parameter 'coordinate_Latitude' cannot be null.");
    else content_.append('Coordinate.Latitude', coordinate_Latitude.toString());
    if (coordinate_Longitude === null || coordinate_Longitude === undefined)
      throw new Error("The parameter 'coordinate_Longitude' cannot be null.");
    else
      content_.append('Coordinate.Longitude', coordinate_Longitude.toString());
    if (subscriptionPackageId === null || subscriptionPackageId === undefined)
      throw new Error("The parameter 'subscriptionPackageId' cannot be null.");
    else
      content_.append(
        'SubscriptionPackageId',
        subscriptionPackageId.toString(),
      );
    if (
      subscriptionPackagePurchaseOptionId === null ||
      subscriptionPackagePurchaseOptionId === undefined
    )
      throw new Error(
        "The parameter 'subscriptionPackagePurchaseOptionId' cannot be null.",
      );
    else
      content_.append(
        'SubscriptionPackagePurchaseOptionId',
        subscriptionPackagePurchaseOptionId.toString(),
      );

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processRegister(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processRegister(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IdMessageResponseOfGuid>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IdMessageResponseOfGuid>;
        }),
      );
  }

  protected processRegister(
    response: HttpResponseBase,
  ): Observable<IdMessageResponseOfGuid> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IdMessageResponseOfGuid);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  updateMyAccount(
    request: UpdateMyCustomerAccount,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/customers/my';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdateMyAccount(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdateMyAccount(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processUpdateMyAccount(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  updateAvatar(
    customerId: string,
    avatar: FileParameter | null | undefined,
    httpContext?: HttpContext,
  ): Observable<UpdateCustomerAvatarResponse> {
    let url_ = this.baseUrl + '/customers/{customerId}/avatar';
    if (customerId === undefined || customerId === null)
      throw new Error("The parameter 'customerId' must be defined.");
    url_ = url_.replace('{customerId}', encodeURIComponent('' + customerId));
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (avatar !== null && avatar !== undefined)
      content_.append(
        'Avatar',
        avatar.data,
        avatar.fileName ? avatar.fileName : 'Avatar',
      );

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdateAvatar(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdateAvatar(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<UpdateCustomerAvatarResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<UpdateCustomerAvatarResponse>;
        }),
      );
  }

  protected processUpdateAvatar(
    response: HttpResponseBase,
  ): Observable<UpdateCustomerAvatarResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as UpdateCustomerAvatarResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  removeAvatar(
    customerId: string,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/customers/{customerId}/avatar';
    if (customerId === undefined || customerId === null)
      throw new Error("The parameter 'customerId' must be defined.");
    url_ = url_.replace('{customerId}', encodeURIComponent('' + customerId));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processRemoveAvatar(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processRemoveAvatar(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processRemoveAvatar(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  addSkill(
    customerId: string,
    skills: AddCustomerSkillsItem[],
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/customers/{customerId}/skills';
    if (customerId === undefined || customerId === null)
      throw new Error("The parameter 'customerId' must be defined.");
    url_ = url_.replace('{customerId}', encodeURIComponent('' + customerId));
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(skills);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processAddSkill(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processAddSkill(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processAddSkill(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  deleteSkill(
    customerId: string,
    request: DeleteCustomerSkill,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/customers/{customerId}/skills';
    if (customerId === undefined || customerId === null)
      throw new Error("The parameter 'customerId' must be defined.");
    url_ = url_.replace('{customerId}', encodeURIComponent('' + customerId));
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processDeleteSkill(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processDeleteSkill(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processDeleteSkill(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: 'root',
})
export class CountriesClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : 'http://localhost:4476';
  }

  getAppViewPage(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfCountryAppView> {
    let url_ = this.baseUrl + '/countries/app-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfCountryAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfCountryAppView>;
        }),
      );
  }

  protected processGetAppViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfCountryAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfCountryAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getAppViewById(
    id: number,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfCountryAppView> {
    let url_ = this.baseUrl + '/countries/{id}/app-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewById(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfCountryAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfCountryAppView>;
        }),
      );
  }

  protected processGetAppViewById(
    response: HttpResponseBase,
  ): Observable<DataResponseOfCountryAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfCountryAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getAppViewCountryCities(
    countryId: number,
    index: number | null | undefined,
    size: number | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfCityAppView> {
    let url_ = this.baseUrl + '/countries/{countryId}/cities/app-view?';
    if (countryId === undefined || countryId === null)
      throw new Error("The parameter 'countryId' must be defined.");
    url_ = url_.replace('{countryId}', encodeURIComponent('' + countryId));
    if (index !== undefined && index !== null)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewCountryCities(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewCountryCities(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfCityAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfCityAppView>;
        }),
      );
  }

  protected processGetAppViewCountryCities(
    response: HttpResponseBase,
  ): Observable<IndexPageOfCityAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfCityAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewPage(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfCountryDashboardView> {
    let url_ = this.baseUrl + '/countries/dashboard-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfCountryDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfCountryDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfCountryDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfCountryDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewById(
    id: number,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfCountryDashboardView> {
    let url_ = this.baseUrl + '/countries/{id}/dashboard-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewById(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfCountryDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfCountryDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewById(
    response: HttpResponseBase,
  ): Observable<DataResponseOfCountryDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfCountryDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewCountryCities(
    countryId: number,
    index: number | null | undefined,
    size: number | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfCityDashboardView> {
    let url_ = this.baseUrl + '/countries/{countryId}/cities/dashboard-view?';
    if (countryId === undefined || countryId === null)
      throw new Error("The parameter 'countryId' must be defined.");
    url_ = url_.replace('{countryId}', encodeURIComponent('' + countryId));
    if (index !== undefined && index !== null)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewCountryCities(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewCountryCities(
                response_ as any,
              );
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfCityDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfCityDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewCountryCities(
    response: HttpResponseBase,
  ): Observable<IndexPageOfCityDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfCityDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getPhoneCodesList(
    httpContext?: HttpContext,
  ): Observable<CollectionResponseOfGetPhoneCodesResponseItem> {
    let url_ = this.baseUrl + '/countries/phone-codes';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetPhoneCodesList(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetPhoneCodesList(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<CollectionResponseOfGetPhoneCodesResponseItem>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<CollectionResponseOfGetPhoneCodesResponseItem>;
        }),
      );
  }

  protected processGetPhoneCodesList(
    response: HttpResponseBase,
  ): Observable<CollectionResponseOfGetPhoneCodesResponseItem> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as CollectionResponseOfGetPhoneCodesResponseItem);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  add(
    request: AddCountry,
    httpContext?: HttpContext,
  ): Observable<IdMessageResponseOfInteger> {
    let url_ = this.baseUrl + '/countries';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processAdd(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processAdd(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IdMessageResponseOfInteger>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IdMessageResponseOfInteger>;
        }),
      );
  }

  protected processAdd(
    response: HttpResponseBase,
  ): Observable<IdMessageResponseOfInteger> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IdMessageResponseOfInteger);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  update(
    request: UpdateCountry,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/countries';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdate(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdate(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processUpdate(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  softDelete(
    id: number,
    isDeleted: boolean,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/countries/{id}/{isDeleted}';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    if (isDeleted === undefined || isDeleted === null)
      throw new Error("The parameter 'isDeleted' must be defined.");
    url_ = url_.replace('{isDeleted}', encodeURIComponent('' + isDeleted));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSoftDelete(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSoftDelete(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processSoftDelete(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: 'root',
})
export class CitiesClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : 'http://localhost:4476';
  }

  getAppViewById(
    id: number,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfCityAppView> {
    let url_ = this.baseUrl + '/cities/{id}/app-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewById(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfCityAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfCityAppView>;
        }),
      );
  }

  protected processGetAppViewById(
    response: HttpResponseBase,
  ): Observable<DataResponseOfCityAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfCityAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewById(
    id: number,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfCityDashboardView> {
    let url_ = this.baseUrl + '/cities/{id}/dashboard-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewById(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfCityDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfCityDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewById(
    response: HttpResponseBase,
  ): Observable<DataResponseOfCityDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfCityDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getAppViewCityAreas(
    cityId: number,
    index: number | null | undefined,
    size: number | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfAreaAppView> {
    let url_ = this.baseUrl + '/cities/{cityId}/areas/app-view?';
    if (cityId === undefined || cityId === null)
      throw new Error("The parameter 'cityId' must be defined.");
    url_ = url_.replace('{cityId}', encodeURIComponent('' + cityId));
    if (index !== undefined && index !== null)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewCityAreas(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewCityAreas(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfAreaAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfAreaAppView>;
        }),
      );
  }

  protected processGetAppViewCityAreas(
    response: HttpResponseBase,
  ): Observable<IndexPageOfAreaAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfAreaAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewCityAreas(
    cityId: number,
    index: number | null | undefined,
    size: number | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfAreaDashboardView> {
    let url_ = this.baseUrl + '/cities/{cityId}/areas/dashboard-view?';
    if (cityId === undefined || cityId === null)
      throw new Error("The parameter 'cityId' must be defined.");
    url_ = url_.replace('{cityId}', encodeURIComponent('' + cityId));
    if (index !== undefined && index !== null)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewCityAreas(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewCityAreas(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfAreaDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfAreaDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewCityAreas(
    response: HttpResponseBase,
  ): Observable<IndexPageOfAreaDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfAreaDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  add(
    request: AddCity,
    httpContext?: HttpContext,
  ): Observable<IdMessageResponseOfInteger> {
    let url_ = this.baseUrl + '/cities';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processAdd(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processAdd(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IdMessageResponseOfInteger>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IdMessageResponseOfInteger>;
        }),
      );
  }

  protected processAdd(
    response: HttpResponseBase,
  ): Observable<IdMessageResponseOfInteger> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IdMessageResponseOfInteger);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  update(
    request: UpdateCity,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/cities';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdate(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdate(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processUpdate(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  softDelete(
    id: number,
    isDeleted: boolean,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/cities/{id}/{isDeleted}';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    if (isDeleted === undefined || isDeleted === null)
      throw new Error("The parameter 'isDeleted' must be defined.");
    url_ = url_.replace('{isDeleted}', encodeURIComponent('' + isDeleted));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSoftDelete(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSoftDelete(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processSoftDelete(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: 'root',
})
export class BreakingClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : 'http://localhost:4476';
  }

  getAppView(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfBreakingPostAppView> {
    let url_ = this.baseUrl + '/breaking/{id}/app-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppView(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppView(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfBreakingPostAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfBreakingPostAppView>;
        }),
      );
  }

  protected processGetAppView(
    response: HttpResponseBase,
  ): Observable<DataResponseOfBreakingPostAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfBreakingPostAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getAppViewPage(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    category: BreakingPostCategory | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfBreakingPostAppView> {
    let url_ = this.baseUrl + '/breaking/app-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    if (category !== undefined && category !== null)
      url_ += 'Category=' + encodeURIComponent('' + category) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfBreakingPostAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfBreakingPostAppView>;
        }),
      );
  }

  protected processGetAppViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfBreakingPostAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfBreakingPostAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardView(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfBreakingPostDashboardView> {
    let url_ = this.baseUrl + '/breaking/{id}/dashboard-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardView(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardView(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfBreakingPostDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfBreakingPostDashboardView>;
        }),
      );
  }

  protected processGetDashboardView(
    response: HttpResponseBase,
  ): Observable<DataResponseOfBreakingPostDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfBreakingPostDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewPage(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    category: BreakingPostCategory | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfBreakingPostDashboardView> {
    let url_ = this.baseUrl + '/breaking/dashboard-view?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    if (category !== undefined && category !== null)
      url_ += 'Category=' + encodeURIComponent('' + category) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfBreakingPostDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfBreakingPostDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfBreakingPostDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfBreakingPostDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  add(
    category: BreakingPostCategory | undefined,
    title: string | null | undefined,
    content: string | null | undefined,
    photo: FileParameter | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IdMessageResponseOfString> {
    let url_ = this.baseUrl + '/breaking';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (category === null || category === undefined)
      throw new Error("The parameter 'category' cannot be null.");
    else content_.append('Category', category.toString());
    if (title !== null && title !== undefined)
      content_.append('Title', title.toString());
    if (content !== null && content !== undefined)
      content_.append('Content', content.toString());
    if (photo !== null && photo !== undefined)
      content_.append(
        'Photo',
        photo.data,
        photo.fileName ? photo.fileName : 'Photo',
      );

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processAdd(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processAdd(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IdMessageResponseOfString>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IdMessageResponseOfString>;
        }),
      );
  }

  protected processAdd(
    response: HttpResponseBase,
  ): Observable<IdMessageResponseOfString> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IdMessageResponseOfString);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  update(
    id: string | null | undefined,
    title: string | null | undefined,
    content: string | null | undefined,
    category: BreakingPostCategory | undefined,
    photo: FileParameter | null | undefined,
    updatePhoto: boolean | undefined,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/breaking';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (id !== null && id !== undefined) content_.append('Id', id.toString());
    if (title !== null && title !== undefined)
      content_.append('Title', title.toString());
    if (content !== null && content !== undefined)
      content_.append('Content', content.toString());
    if (category === null || category === undefined)
      throw new Error("The parameter 'category' cannot be null.");
    else content_.append('Category', category.toString());
    if (photo !== null && photo !== undefined)
      content_.append(
        'Photo',
        photo.data,
        photo.fileName ? photo.fileName : 'Photo',
      );
    if (updatePhoto === null || updatePhoto === undefined)
      throw new Error("The parameter 'updatePhoto' cannot be null.");
    else content_.append('UpdatePhoto', updatePhoto.toString());

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdate(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdate(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processUpdate(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  softDelete(
    id: string,
    isDeleted: boolean,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/breaking/{id}/{isDeleted}';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    if (isDeleted === undefined || isDeleted === null)
      throw new Error("The parameter 'isDeleted' must be defined.");
    url_ = url_.replace('{isDeleted}', encodeURIComponent('' + isDeleted));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSoftDelete(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSoftDelete(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processSoftDelete(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  webhook(
    envelop: WebhookBreakingPostEnvelop,
    httpContext?: HttpContext,
  ): Observable<void> {
    let url_ = this.baseUrl + '/breaking/webhook';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(envelop);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processWebhook(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processWebhook(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<void>;
            }
          } else return _observableThrow(response_) as any as Observable<void>;
        }),
      );
  }

  protected processWebhook(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return _observableOf(null as any);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: 'root',
})
export class AreasClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : 'http://localhost:4476';
  }

  getAppViewById(
    id: number,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfAreaAppView> {
    let url_ = this.baseUrl + '/areas/{id}/app-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAppViewById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAppViewById(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfAreaAppView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfAreaAppView>;
        }),
      );
  }

  protected processGetAppViewById(
    response: HttpResponseBase,
  ): Observable<DataResponseOfAreaAppView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfAreaAppView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getDashboardViewById(
    id: number,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfAreaDashboardView> {
    let url_ = this.baseUrl + '/areas/{id}/dashboard-view';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetDashboardViewById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetDashboardViewById(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfAreaDashboardView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfAreaDashboardView>;
        }),
      );
  }

  protected processGetDashboardViewById(
    response: HttpResponseBase,
  ): Observable<DataResponseOfAreaDashboardView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfAreaDashboardView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  add(
    request: AddArea,
    httpContext?: HttpContext,
  ): Observable<IdMessageResponseOfInteger> {
    let url_ = this.baseUrl + '/areas';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processAdd(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processAdd(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IdMessageResponseOfInteger>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IdMessageResponseOfInteger>;
        }),
      );
  }

  protected processAdd(
    response: HttpResponseBase,
  ): Observable<IdMessageResponseOfInteger> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IdMessageResponseOfInteger);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  update(
    request: UpdateArea,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/areas';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(request);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdate(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdate(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processUpdate(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  softDelete(
    id: number,
    isDeleted: boolean,
    httpContext?: HttpContext,
  ): Observable<MessageResponse> {
    let url_ = this.baseUrl + '/areas/{id}/{isDeleted}';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    if (isDeleted === undefined || isDeleted === null)
      throw new Error("The parameter 'isDeleted' must be defined.");
    url_ = url_.replace('{isDeleted}', encodeURIComponent('' + isDeleted));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSoftDelete(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSoftDelete(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<MessageResponse>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<MessageResponse>;
        }),
      );
  }

  protected processSoftDelete(
    response: HttpResponseBase,
  ): Observable<MessageResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as MessageResponse);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable({
  providedIn: 'root',
})
export class AdministratorsClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : 'http://localhost:4476';
  }

  getPage(
    index: number | undefined,
    size: number | undefined,
    search: string | null | undefined,
    isDeleted: boolean | null | undefined,
    dateCreatedTo: string | null | undefined,
    dateCreatedFrom: string | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IndexPageOfAdministratorView> {
    let url_ = this.baseUrl + '/administrators?';
    if (index === null)
      throw new Error("The parameter 'index' cannot be null.");
    else if (index !== undefined)
      url_ += 'Index=' + encodeURIComponent('' + index) + '&';
    if (size === null) throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
      url_ += 'Size=' + encodeURIComponent('' + size) + '&';
    if (search !== undefined && search !== null)
      url_ += 'Search=' + encodeURIComponent('' + search) + '&';
    if (isDeleted !== undefined && isDeleted !== null)
      url_ += 'IsDeleted=' + encodeURIComponent('' + isDeleted) + '&';
    if (dateCreatedTo !== undefined && dateCreatedTo !== null)
      url_ += 'DateCreatedTo=' + encodeURIComponent('' + dateCreatedTo) + '&';
    if (dateCreatedFrom !== undefined && dateCreatedFrom !== null)
      url_ +=
        'DateCreatedFrom=' + encodeURIComponent('' + dateCreatedFrom) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetPage(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetPage(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IndexPageOfAdministratorView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IndexPageOfAdministratorView>;
        }),
      );
  }

  protected processGetPage(
    response: HttpResponseBase,
  ): Observable<IndexPageOfAdministratorView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IndexPageOfAdministratorView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  create(
    name_First: string | null | undefined,
    name_Last: string | null | undefined,
    phoneNumber_Code: number | undefined,
    phoneNumber_Number: string | null | undefined,
    email: string | null | undefined,
    password: string | null | undefined,
    avatar: FileParameter | null | undefined,
    httpContext?: HttpContext,
  ): Observable<IdMessageResponseOfGuid> {
    let url_ = this.baseUrl + '/administrators';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (name_First !== null && name_First !== undefined)
      content_.append('Name.First', name_First.toString());
    if (name_Last !== null && name_Last !== undefined)
      content_.append('Name.Last', name_Last.toString());
    if (phoneNumber_Code === null || phoneNumber_Code === undefined)
      throw new Error("The parameter 'phoneNumber_Code' cannot be null.");
    else content_.append('PhoneNumber.Code', phoneNumber_Code.toString());
    if (phoneNumber_Number !== null && phoneNumber_Number !== undefined)
      content_.append('PhoneNumber.Number', phoneNumber_Number.toString());
    if (email !== null && email !== undefined)
      content_.append('Email', email.toString());
    if (password !== null && password !== undefined)
      content_.append('Password', password.toString());
    if (avatar !== null && avatar !== undefined)
      content_.append(
        'Avatar',
        avatar.data,
        avatar.fileName ? avatar.fileName : 'Avatar',
      );

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processCreate(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processCreate(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<IdMessageResponseOfGuid>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<IdMessageResponseOfGuid>;
        }),
      );
  }

  protected processCreate(
    response: HttpResponseBase,
  ): Observable<IdMessageResponseOfGuid> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as IdMessageResponseOfGuid);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }

  getById(
    id: string,
    httpContext?: HttpContext,
  ): Observable<DataResponseOfAdministratorView> {
    let url_ = this.baseUrl + '/administrators/{id}';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetById(response_);
        }),
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetById(response_ as any);
            } catch (e) {
              return _observableThrow(
                e,
              ) as any as Observable<DataResponseOfAdministratorView>;
            }
          } else
            return _observableThrow(
              response_,
            ) as any as Observable<DataResponseOfAdministratorView>;
        }),
      );
  }

  protected processGetById(
    response: HttpResponseBase,
  ): Observable<DataResponseOfAdministratorView> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver,
                ) as DataResponseOfAdministratorView);
          return _observableOf(result200);
        }),
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers,
          );
        }),
      );
    }
    return _observableOf(null as any);
  }
}

export interface IndexPageOfVirtualExpoAppView {
  items: VirtualExpoAppView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface VirtualExpoAppView {
  id: string;
  order: number;
  title: string;
  description: string | null;
  link: string | null;
  photos: VirtualExpoAppViewPhoto[];
}

export interface VirtualExpoAppViewPhoto {
  id: number;
  virtualExpoPostId: string;
  order: number;
  photoUrl: string;
  title: string | null;
  caption: string | null;
}

export interface DataResponseOfVirtualExpoAppView {
  data: VirtualExpoAppView;
}

export interface IndexPageOfVirtualExpoDashboardView {
  items: VirtualExpoDashboardView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface VirtualExpoDashboardView {
  id: string;
  order: number;
  title: string;
  description: string | null;
  link: string | null;
  isDeleted: boolean;
  dateCreated: string;
  createdBy: ByView | null;
  dateUpdated: string | null;
  updatedBy: ByView | null;
  dateDeleted: string | null;
  deletedBy: ByView | null;
  photos: VirtualExpoDashboardViewPhoto[];
}

export interface ByView {
  id: string;
  name: NameResponse;
}

export interface NameResponse {
  first: string;
  last: string;
  displayName: string;
}

export interface VirtualExpoDashboardViewPhoto {
  id: number;
  virtualExpoPostId: string;
  order: number;
  photoUrl: string;
  title: string | null;
  caption: string | null;
  isDeleted: boolean;
  dateCreated: string;
  createdBy: ByView | null;
  dateUpdated: string | null;
  updatedBy: ByView | null;
  dateDeleted: string | null;
  deletedBy: ByView | null;
}

export interface DataResponseOfVirtualExpoDashboardView {
  data: VirtualExpoDashboardView;
}

export interface IdMessageResponseOfGuid {
  id: string;
  message: MessageDescriptor;
}

export interface MessageDescriptor {
  code: string;
  description: string;
}

export interface AddVirtualExpoPostPhoto {
  order: number;
  photo: FileParameter;
  title: string | null;
  caption: string | null;
}

export interface MessageResponse {
  message: MessageDescriptor;
}

export interface UpdateVirtualExpoPost {
  id: string;
  order: number;
  title: string;
  description: string | null;
  link: string | null;
}

export interface AddVirtualExpoPhotoItem {
  order: number;
  photo: FileParameter;
  title: string | null;
  caption: string | null;
}

export interface UpdateVirtualExpoPhotosItem {
  id: number;
  order: number;
  updatePhoto: boolean;
  photo: FileParameter | null;
  title: string | null;
  caption: string | null;
}

export interface DeleteVirtualExpoPhotos {
  photos: DeleteVirtualExpoPhotosItem[];
}

export interface DeleteVirtualExpoPhotosItem {
  virtualExpoPhotoId: number;
  isDeleted: boolean;
}

export interface CredentialLoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
  message: MessageDescriptor;
}

export interface UserProfile {
  id: string;
  name: NameResponse;
  dateCreated: string;
  birthday: string | null;
  userName: string | null;
  email: string;
  emailVerified: boolean;
  phoneNumber: PhoneNumberResponse | null;
  phoneNumberVerified: boolean;
  hasPassword: boolean;
  type: UserType;
  gender: Gender;
  logins: UserProfileLogin[];
  roles: UserProfileRole[];
  permissions: UserProfilePermission[];
  features: UserProfileFeature[];
}

export interface PhoneNumberResponse {
  code: number;
  number: string;
}

export enum UserType {
  Administrator = 'administrator',
  Customer = 'customer',
}

export enum Gender {
  None = 'none',
  Male = 'male',
  Female = 'female',
}

export interface UserProfileLogin {
  name: string;
}

export interface UserProfileRole {
  name: string;
}

export interface UserProfilePermission {
  name: string;
}

export interface UserProfileFeature {
  id: string;
  code: string;
  name: string;
}

export interface CredentialLogin {
  identifier: string;
  password: string;
  remember: boolean;
}

export interface RefreshAccessTokenResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
}

export interface RefreshAccessToken {
  token: string;
}

export interface IndexPageOfUserDashboardView {
  items: UserDashboardView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface UserDashboardView {
  id: string;
  name: NameResponse;
  email: string;
  emailConfirmed: boolean;
  phoneNumber: PhoneNumberResponse | null;
  phoneNumberConfirmed: boolean;
  status: UserStatus;
  gender: Gender;
  dateLastLogin: string | null;
  concurrencyStamp: string | null;
  isDeleted: boolean;
  dateCreated: string;
  createdBy: ByView | null;
  dateUpdated: string | null;
  updatedBy: ByView | null;
  dateDeleted: string | null;
  deletedBy: ByView | null;
}

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export interface CheckExistEmailResponse {
  isExist: boolean;
}

export interface CheckExistPhoneNumberResponse {
  isExist: boolean;
}

export interface CollectionResponseOfDeleteAccountReason {
  items: DeleteAccountReason[];
}

export interface DeleteAccountReason {
  id: string;
  reason: string;
}

export interface BlockUser {
  id: string;
}

export interface UnblockUser {
  id: string;
}

export interface ResendEmailConfirmation {
  email: string;
}

export interface RequestChangeEmail {
  email: string;
  password: string;
}

export interface ConfirmEmail {
  userId: string;
  email: string;
  token: string;
}

export interface SetEmail {
  userId: string;
  email: string;
}

export interface ForgetPasswordByEmail {
  email: string;
}

export interface ResetPasswordByEmail {
  email: string;
  password: string;
  token: string;
}

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
}

export interface DeleteUser {
  reasonId: string;
  comment: string | null;
}

export interface DataResponseOfUnlockOpportunityItemAppView {
  data: UnlockOpportunityItemAppView;
}

export interface UnlockOpportunityItemAppView {
  id: string;
  categoryId: string;
  subCategoryId: string;
  type: UnlockOpportunityItemType;
  post: UnlockOpportunityPostAppView | null;
  figure: UnlockOpportunityFigureAppView | null;
}

export enum UnlockOpportunityItemType {
  Figure = 'figure',
  Post = 'post',
}

export interface UnlockOpportunityPostAppView {
  title: string;
  description: string | null;
  photoUrl: string | null;
}

export interface UnlockOpportunityFigureAppView {
  name: NameResponse;
  jobTitle: string | null;
  bio: string | null;
  avatarUrl: string | null;
  email: string | null;
  phoneNumber: PhoneNumberResponse | null;
  country: AddressCountryView | null;
  city: AddressCityView | null;
  area: AddressAreaView | null;
  addressDetails: string | null;
}

export interface AddressCountryView {
  id: number;
  name: LocalizedString;
}

export interface LocalizedString {
  en: string;
  ar: string;
}

export interface AddressCityView {
  id: number;
  name: LocalizedString;
}

export interface AddressAreaView {
  id: number;
  name: LocalizedString;
}

export interface IndexPageOfUnlockOpportunityItemAppView {
  items: UnlockOpportunityItemAppView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface DataResponseOfUnlockOpportunityItemDashboardView {
  data: UnlockOpportunityItemDashboardView;
}

export interface UnlockOpportunityItemDashboardView {
  id: string;
  categoryId: string;
  subCategoryId: string;
  type: UnlockOpportunityItemType;
  post: UnlockOpportunityPostDashboardView | null;
  figure: UnlockOpportunityFigureDashboardView | null;
  isDeleted: boolean;
  dateCreated: string;
  createdBy: ByView | null;
  dateUpdated: string | null;
  updatedBy: ByView | null;
  dateDeleted: string | null;
  deletedBy: ByView | null;
}

export interface UnlockOpportunityPostDashboardView {
  title: string;
  description: string | null;
  photoUrl: string | null;
}

export interface UnlockOpportunityFigureDashboardView {
  name: NameResponse;
  jobTitle: string | null;
  bio: string | null;
  avatarUrl: string | null;
  email: string | null;
  phoneNumber: PhoneNumberResponse | null;
  country: AddressCountryView | null;
  city: AddressCityView | null;
  area: AddressAreaView | null;
  addressDetails: string | null;
}

export interface IndexPageOfUnlockOpportunityItemDashboardView {
  items: UnlockOpportunityItemDashboardView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface DataResponseOfUnlockOpportunityCategoryAppView {
  data: UnlockOpportunityCategoryAppView;
}

export interface UnlockOpportunityCategoryAppView {
  id: string;
  name: string;
  photoUrl: string | null;
  description: string | null;
}

export interface IndexPageOfUnlockOpportunityCategoryAppView {
  items: UnlockOpportunityCategoryAppView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface DataResponseOfUnlockOpportunityCategoryDashboardView {
  data: UnlockOpportunityCategoryDashboardView;
}

export interface UnlockOpportunityCategoryDashboardView {
  id: string;
  name: string;
  photoUrl: string | null;
  description: string | null;
  subCategories: UnlockOpportunitySubCategoryDashboardView[];
  isDeleted: boolean;
  dateCreated: string;
  createdBy: ByView | null;
  dateUpdated: string | null;
  updatedBy: ByView | null;
  dateDeleted: string | null;
  deletedBy: ByView | null;
}

export interface UnlockOpportunitySubCategoryDashboardView {
  id: string;
  categoryId: string;
  name: string;
  photoUrl: string | null;
  description: string | null;
  isDeleted: boolean;
  dateCreated: string;
  createdBy: ByView | null;
  dateUpdated: string | null;
  updatedBy: ByView | null;
  dateDeleted: string | null;
  deletedBy: ByView | null;
}

export interface IndexPageOfUnlockOpportunityCategoryDashboardView {
  items: UnlockOpportunityCategoryDashboardView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface DataResponseOfUnlockOpportunitySubCategoryAppView {
  data: UnlockOpportunitySubCategoryAppView;
}

export interface UnlockOpportunitySubCategoryAppView {
  id: string;
  categoryId: string;
  name: string;
  photoUrl: string | null;
  description: string | null;
}

export interface IndexPageOfUnlockOpportunitySubCategoryAppView {
  items: UnlockOpportunitySubCategoryAppView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface IndexPageOfInvoiceDashboardView {
  items: InvoiceDashboardView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface InvoiceDashboardView {
  id: string;
  number: number;
  subscriptionId: string;
  status: InvoiceStatus;
  discount: number;
  subTotal: number;
  grandTotal: number;
  /** Start date of the subscription billing period for the invoice. */
  datePeriodStart: string;
  /** End date of the subscription billing period for the invoice. */
  datePeriodEnd: string;
  /** Internal admin notes, not visible to the customer. */
  notes: string | null;
  /** A message describing the last payment error, if one occurred. */
  paymentError: string | null;
  /** The number of times automatic payment has been attempted. */
  paymentRetryCount: number;
  /** Date the next automatic payment will be attempted. */
  datePaymentRetry: string | null;
}

export enum InvoiceStatus {
  Pending = 'pending',
  Paid = 'paid',
  Unpaid = 'unpaid',
}

export interface DataResponseOfInvoiceDashboardView {
  data: InvoiceDashboardView;
}

export interface IndexPageOfSubscriptionDashboardView {
  items: SubscriptionDashboardView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface SubscriptionDashboardView {
  id: string;
  number: number;
  originalPrice: number;
  discount: number;
  price: number;
  billingScheduleInterval: BillingScheduleInterval;
  billingScheduleIntervalCount: number;
  cancelAtEnd: boolean;
  status: SubscriptionStatus;
  completedPeriods: number;
  /** Start date of the subscription cycle. */
  dateCycleStart: string;
  /** End date of the current billing period. */
  dateCurrentPeriodEnd: string;
  /** Start date of the current billing period. */
  dateCurrentPeriodStart: string;
  /** Indicates the subscription plan has completed all cycles. */
  completed: boolean;
  /** Date the subscription was canceled, if applicable. */
  dateCanceled: string | null;
  cancelReason: string | null;
  dateCreated: string;
  createdBy: ByView | null;
  dateUpdated: string | null;
  updatedBy: ByView | null;
  billing: SubscriptionDashboardViewBilling;
  subscriptionPackage: SubscriptionDashboardViewSubscriptionPackage;
}

export enum BillingScheduleInterval {
  Yearly = 'yearly',
  Monthly = 'monthly',
}

export enum SubscriptionStatus {
  Active = 'active',
  Unpaid = 'unpaid',
  Canceled = 'canceled',
}

export interface SubscriptionDashboardViewBilling {
  id: string;
  customerId: string;
  name: string;
  phone: PhoneNumberResponse | null;
  email: string | null;
  address: string | null;
  areaName: string | null;
  cityName: string | null;
  countryName: string | null;
}

export interface SubscriptionDashboardViewSubscriptionPackage {
  id: string;
  name: string;
}

export interface DataResponseOfSubscriptionDashboardView {
  data: SubscriptionDashboardView;
}

export interface RenewSubscription {
  id: string;
  dateStart: string;
  interval: BillingScheduleInterval;
  intervalCount: number;
}

export interface DeactivateSubscription {
  id: string;
  deactivate: boolean;
}

export interface IndexPageOfSubscriptionRequestDashboardView {
  items: SubscriptionRequestDashboardView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface SubscriptionRequestDashboardView {
  id: string;
  dateCreated: string;
  status: SubscriptionRequestStatus;
  billing: SubscriptionRequestDashboardViewBilling;
  subscriptionPackage: SubscriptionRequestDashboardViewSubscriptionPackage;
}

export enum SubscriptionRequestStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

export interface SubscriptionRequestDashboardViewBilling {
  id: string;
  name: string;
  phone: PhoneNumberResponse | null;
  email: string | null;
  address: string | null;
  areaName: string | null;
  cityName: string | null;
  countryName: string | null;
}

export interface SubscriptionRequestDashboardViewSubscriptionPackage {
  id: string;
  number: number;
  name: string;
  purchaseOption: SubscriptionRequestDashboardViewPurchaseOption;
}

export interface SubscriptionRequestDashboardViewPurchaseOption {
  id: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  sale: boolean;
  saleAmount: number;
  currentPrice: number;
  billingSchedule: BillingScheduleInterval;
}

export interface DataResponseOfSubscriptionRequestDashboardView {
  data: SubscriptionRequestDashboardView;
}

export interface ApproveSubscriptionRequest {
  id: string;
  subscriptionPackageId: string | null;
  purchaseOptionId: string | null;
  intervalCount: number;
  extraDiscount: number;
}

export interface DataResponseOfSubscriptionPackageAppView {
  data: SubscriptionPackageAppView;
}

export interface SubscriptionPackageAppView {
  id: string;
  order: number;
  number: number;
  name: string;
  description: string | null;
  photoUrl: string | null;
  features: SubscriptionPackageAppViewFeature[];
  purchaseOptions: SubscriptionPackageAppViewPurchaseOption[];
}

export interface SubscriptionPackageAppViewFeature {
  id: string;
  code: string;
  name: string;
  description: string | null;
  photoUrl: string | null;
  iconUrl: string | null;
}

export interface SubscriptionPackageAppViewPurchaseOption {
  id: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  billingSchedule: BillingScheduleInterval;
  sale: boolean;
}

export interface IndexPageOfSubscriptionPackageAppView {
  items: SubscriptionPackageAppView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface DataResponseOfSubscriptionPackageDashboardView {
  data: SubscriptionPackageDashboardView;
}

export interface SubscriptionPackageDashboardView {
  id: string;
  order: number;
  number: number;
  name: string;
  description: string | null;
  photoUrl: string | null;
  active: boolean;
  isDeleted: boolean;
  dateCreated: string;
  createdBy: ByView | null;
  dateUpdated: string | null;
  updatedBy: ByView | null;
  dateDeleted: string | null;
  deletedBy: ByView | null;
  features: SubscriptionPackageDashboardViewFeature[];
  purchaseOptions: SubscriptionPackageDashboardViewPurchaseOption[];
}

export interface SubscriptionPackageDashboardViewFeature {
  id: string;
  code: string;
  name: string;
  description: string | null;
  photoUrl: string | null;
  iconUrl: string | null;
  isDeleted: boolean;
  dateCreated: string;
  createdBy: ByView | null;
  dateUpdated: string | null;
  updatedBy: ByView | null;
  dateDeleted: string | null;
  deletedBy: ByView | null;
}

export interface SubscriptionPackageDashboardViewPurchaseOption {
  id: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  billingSchedule: BillingScheduleInterval;
  sale: boolean;
  isDeleted: boolean;
  dateCreated: string;
  createdBy: ByView | null;
  dateUpdated: string | null;
  updatedBy: ByView | null;
  dateDeleted: string | null;
  deletedBy: ByView | null;
}

export interface IndexPageOfSubscriptionPackageDashboardView {
  items: SubscriptionPackageDashboardView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface AddSubscriptionPackagePurchaseFeature {
  featureId: string;
}

export interface AddSubscriptionPackagePurchaseOption {
  name: string;
  originalPrice: number;
  salePrice: number;
  billingSchedule: BillingScheduleInterval;
}

export interface UpdateSubscriptionPackagePurchaseFeature {
  featureId: string;
}

export interface UpdateSubscriptionPackagePurchaseOption {
  name: string;
  originalPrice: number;
  salePrice: number;
  billingSchedule: BillingScheduleInterval;
}

export interface ActiveSubscriptionPackage {
  id: string;
  active: boolean;
}

export interface DataResponseOfSponsorshipAppView {
  data: SponsorshipAppView;
}

export interface SponsorshipAppView {
  id: string;
  photoUrl: string | null;
  dateCreated: string;
  dateUpdated: string | null;
}

export interface IndexPageOfSponsorshipAppView {
  items: SponsorshipAppView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface IdMessageResponseOfString {
  id: string;
  message: MessageDescriptor;
}

export interface IndexPageOfSkillView {
  items: SkillView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface SkillView {
  id: string;
  name: string;
  description: string | null;
  dateCreated: string;
  active: boolean;
}

export interface AddSkill {
  name: string;
  description: string | null;
}

export interface UpdateSkill {
  id: string;
  name: string;
  description: string | null;
}

export interface ActiveSkill {
  id: string;
  active: boolean;
}

export interface UpsertUserDeviceToken {
  deviceToken: string;
  deviceModel: string;
}

export interface DataResponseOfMaritimeProfessionalFigureAppView {
  data: MaritimeProfessionalFigureAppView;
}

export interface MaritimeProfessionalFigureAppView {
  id: string;
  number: number;
  order: number;
  name: string;
  jobTitle: string;
  avatarUrl: string | null;
  bio: string | null;
  description: string | null;
  email: string | null;
  contactBy: MaritimeProfessionalFigureContactBy;
  category: MaritimeProfessionalFigureCategory | null;
  phoneNumber: PhoneNumberResponse | null;
  address: AddressView | null;
}

export enum MaritimeProfessionalFigureContactBy {
  PhoneNumber = 'phoneNumber',
  Email = 'email',
  Both = 'both',
}

export enum MaritimeProfessionalFigureCategory {
  Classification = 'classification',
  Dredging = 'dredging',
  Education = 'education',
  Government = 'government',
  Insurance = 'insurance',
  Legal = 'legal',
  Logistics = 'logistics',
  MediaAndMagazines = 'mediaAndMagazines',
  Finance = 'finance',
  OilAndGas = 'oilAndGas',
  Ports = 'ports',
  Shipping = 'shipping',
  Shipyards = 'shipyards',
  Technologies = 'technologies',
  Yachts = 'yachts',
}

export interface AddressView {
  country: AddressCountryView | null;
  city: AddressCityView | null;
  area: AddressAreaView | null;
  details: string | null;
}

export interface IndexPageOfMaritimeProfessionalFigureAppView {
  items: MaritimeProfessionalFigureAppView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface DataResponseOfMaritimeProfessionalFigureDashboardView {
  data: MaritimeProfessionalFigureDashboardView;
}

export interface MaritimeProfessionalFigureDashboardView {
  id: string;
  number: number;
  order: number;
  name: string;
  jobTitle: string;
  avatarUrl: string | null;
  bio: string | null;
  description: string | null;
  email: string | null;
  contactBy: MaritimeProfessionalFigureContactBy;
  category: MaritimeProfessionalFigureCategory | null;
  phoneNumber: PhoneNumberResponse | null;
  address: AddressView | null;
  isHidden: boolean;
  isDeleted: boolean;
  dateCreated: string;
  createdBy: ByView | null;
  dateUpdated: string | null;
  updatedBy: ByView | null;
  dateDeleted: string | null;
  deletedBy: ByView | null;
}

export interface IndexPageOfMaritimeProfessionalFigureDashboardView {
  items: MaritimeProfessionalFigureDashboardView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface HideMaritimeProfessionalFigure {
  id: string;
  hide: boolean;
}

export interface DataResponseOfMaritimeInfluencerPostAppView {
  data: MaritimeInfluencerPostAppView;
}

export interface MaritimeInfluencerPostAppView {
  id: string;
  dateCreated: string;
  text: string | null;
  mediaCount: number;
  likesCount: number;
  hasLike: boolean;
  author: MaritimeInfluencerPostAppViewAuthor;
  medias: MaritimeInfluencerPostAppViewMedia[];
}

export interface MaritimeInfluencerPostAppViewAuthor {
  id: string;
  name: NameResponse;
  avatarUrl: string | null;
}

export interface MaritimeInfluencerPostAppViewMedia {
  id: number;
  postId: string;
  order: number;
  type: InfluencerPostMediaType;
  url: string;
}

export enum InfluencerPostMediaType {
  Image = 'image',
  Video = 'video',
}

export interface IndexPageOfMaritimeInfluencerPostAppView {
  items: MaritimeInfluencerPostAppView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface IndexPageOfMaritimeInfluencerPostCommentAppView {
  items: MaritimeInfluencerPostCommentAppView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface MaritimeInfluencerPostCommentAppView {
  id: number;
  dateCreated: string;
  postId: string;
  userId: string;
  name: NameResponse;
  avatarUrl: string | null;
  text: string;
}

export interface DataResponseOfMaritimeInfluencerPostCommentAppView {
  data: MaritimeInfluencerPostCommentAppView;
}

export interface DataResponseOfMaritimeInfluencerPostDashboardView {
  data: MaritimeInfluencerPostDashboardView;
}

export interface MaritimeInfluencerPostDashboardView {
  id: string;
  text: string | null;
  mediaCount: number;
  likesCount: number;
  medias: MaritimeInfluencerPostDashboardViewMedia[];
  isDeleted: boolean;
  dateCreated: string;
  createdBy: ByView | null;
  dateUpdated: string | null;
  updatedBy: ByView | null;
  dateDeleted: string | null;
  deletedBy: ByView | null;
}

export interface MaritimeInfluencerPostDashboardViewMedia {
  id: number;
  postId: string;
  order: number;
  type: InfluencerPostMediaType;
  url: string;
}

export interface IndexPageOfMaritimeInfluencerPostDashboardView {
  items: MaritimeInfluencerPostDashboardView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface MaritimeInfluencerPostMediaDto {
  type: InfluencerPostMediaType;
  file: FileParameter;
}

export interface AddMaritimeInfluencerPostMedia
  extends MaritimeInfluencerPostMediaDto {
  order: number;
}

export interface UpdateMaritimeInfluencerPost {
  id: string;
  text: string;
}

export interface CommentOnMaritimeInfluencerPost {
  text: string;
}

export interface DataResponseOfHeadhuntJobAppView {
  data: HeadhuntJobAppView;
}

export interface HeadhuntJobAppView {
  id: string;
  createdBy: ByView;
  title: string;
  description: string;
  jobTitle: string | null;
  yearsOfExperience: number | null;
  deadline: string | null;
  status: JobStatus;
  dateCancelled: string | null;
  dateCreated: string;
  hasApplication: boolean;
  skills: HeadhuntJobSkillAppView[];
}

export enum JobStatus {
  Published = 'published',
  Cancelled = 'cancelled',
  Closed = 'closed',
}

export interface HeadhuntJobSkillAppView {
  id: string;
  name: string;
}

export interface IndexPageOfHeadhuntJobAppView {
  items: HeadhuntJobAppView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface DataResponseOfHeadhuntJobDashboardView {
  data: HeadhuntJobDashboardView;
}

export interface HeadhuntJobDashboardView {
  id: string;
  title: string;
  description: string;
  jobTitle: string | null;
  yearsOfExperience: number | null;
  deadline: string | null;
  status: JobStatus;
  dateCancelled: string | null;
  cancelledBy: ByView | null;
  skills: HeadhuntJobSkillDashboardView[];
  isDeleted: boolean;
  dateCreated: string;
  createdBy: ByView;
  dateUpdated: string | null;
  updatedBy: ByView | null;
  dateDeleted: string | null;
  deletedBy: ByView | null;
}

export interface HeadhuntJobSkillDashboardView {
  id: string;
  name: string;
}

export interface IndexPageOfHeadhuntJobDashboardView {
  items: HeadhuntJobDashboardView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface IndexPageOfHeadhuntJobApplicationDashboardView {
  items: HeadhuntJobApplicationDashboardView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface HeadhuntJobApplicationDashboardView {
  jobId: string;
  userId: string;
  name: NameResponse | null;
  phoneNumber: PhoneNumberResponse | null;
  email: string | null;
  coverLetter: string | null;
  cvUrl: string | null;
  dateApplied: string;
  dateAccepted: string | null;
  dateRejectedOn: string | null;
  dateWithdrawnOn: string | null;
}

export interface DataResponseOfHeadhuntJobApplicantView {
  data: HeadhuntJobApplicantView;
}

export interface HeadhuntJobApplicantView {
  id: string;
  createdBy: ByView;
  title: string;
  description: string;
  jobTitle: string | null;
  yearsOfExperience: number | null;
  deadline: string | null;
  status: JobStatus;
  dateCancelled: string | null;
  dateCreated: string;
  application: HeadhuntJobApplicationApplicantView;
  skills: HeadhuntJobSkillApplicantView[];
}

export interface HeadhuntJobApplicationApplicantView {
  jobId: string;
  userId: string;
  name: NameResponse | null;
  phoneNumber: PhoneNumberResponse | null;
  email: string | null;
  coverLetter: string | null;
  cvUrl: string | null;
  dateApplied: string;
  dateAccepted: string | null;
  dateRejectedOn: string | null;
  dateWithdrawnOn: string | null;
}

export interface HeadhuntJobSkillApplicantView {
  id: string;
  name: string;
}

export interface IndexPageOfHeadhuntJobApplicantView {
  items: HeadhuntJobApplicantView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface DataResponseOfHeadhuntJobOwnerView {
  data: HeadhuntJobOwnerView;
}

export interface HeadhuntJobOwnerView {
  id: string;
  title: string;
  description: string;
  jobTitle: string | null;
  yearsOfExperience: number | null;
  deadline: string | null;
  status: JobStatus;
  dateCancelled: string | null;
  dateCreated: string;
  skills: HeadhuntJobSkillOwnerView[];
}

export interface HeadhuntJobSkillOwnerView {
  id: string;
  name: string;
}

export interface IndexPageOfHeadhuntJobOwnerView {
  items: HeadhuntJobOwnerView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface IndexPageOfHeadhuntJobApplicationOwnerView {
  items: HeadhuntJobApplicationOwnerView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface HeadhuntJobApplicationOwnerView {
  jobId: string;
  userId: string;
  name: NameResponse | null;
  phoneNumber: PhoneNumberResponse | null;
  email: string | null;
  coverLetter: string | null;
  cvUrl: string | null;
  dateApplied: string;
  dateAccepted: string | null;
  dateRejectedOn: string | null;
  dateWithdrawnOn: string | null;
}

export interface PostHeadhuntJob {
  title: string;
  description: string;
  jobTitle: string | null;
  yearsOfExperience: number | null;
  deadline: string | null;
  skills: PostHeadhuntJobSkill[];
}

export interface PostHeadhuntJobSkill {
  id: string;
}

export interface CancelHeadhuntJob {
  jobId: string;
}

export interface CollectionResponseOfFeatureAppView {
  items: FeatureAppView[];
}

export interface FeatureAppView {
  id: string;
  name: string;
  description: string | null;
  photoUrl: string | null;
  iconUrl: string | null;
  isEnabled: boolean;
}

export interface CollectionResponseOfFeatureDashboardView {
  items: FeatureDashboardView[];
}

export interface FeatureDashboardView {
  id: string;
  name: string;
  description: string | null;
  photoUrl: string | null;
  iconUrl: string | null;
  isEnabled: boolean;
  invisible: boolean;
}

export interface IndexPageOfETalkEventAppView {
  items: ETalkEventAppView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface ETalkEventAppView {
  id: string;
  dateCreated: string;
  dateOfEvent: string | null;
  number: number;
  name: string;
  description: string | null;
  eventUrl: string | null;
  photoUrl: string | null;
  speakers: ETalkEventAppViewSpeaker[];
}

export interface ETalkEventAppViewSpeaker {
  id: number;
  eTalkEventId: string;
  name: string;
  title: string | null;
  description: string | null;
  photoUrl: string | null;
}

export interface DataResponseOfETalkEventAppView {
  data: ETalkEventAppView;
}

export interface IndexPageOfETalkEventDashboardView {
  items: ETalkEventDashboardView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface ETalkEventDashboardView {
  id: string;
  number: number;
  name: string;
  description: string | null;
  eventUrl: string | null;
  photoUrl: string | null;
  isDeleted: boolean;
  dateCreated: string;
  dateOfEvent: string | null;
  createdBy: ByView | null;
  dateUpdated: string | null;
  updatedBy: ByView | null;
  dateDeleted: string | null;
  deletedBy: ByView | null;
  speakers: ETalkEventDashboardViewSpeaker[];
}

export interface ETalkEventDashboardViewSpeaker {
  id: number;
  eTalkEventId: string;
  name: string;
  title: string | null;
  description: string | null;
  photoUrl: string | null;
  isDeleted: boolean;
  dateCreated: string;
  createdBy: ByView | null;
  dateUpdated: string | null;
  updatedBy: ByView | null;
  dateDeleted: string | null;
  deletedBy: ByView | null;
}

export interface DataResponseOfETalkEventDashboardView {
  data: ETalkEventDashboardView;
}

export interface SendETalkEventInvitationsResponse {
  message: MessageDescriptor;
  invitationsSentCount: number;
}

export interface SendETalkEventInvitations {
  eTalkEventId: string;
  areaId: number | null;
  cityId: number | null;
  countryId: number | null;
  gender: SendETalkEventInvitationsGender | null;
  emails: string[];
}

export enum SendETalkEventInvitationsGender {
  Any = 'any',
  Male = 'male',
  Female = 'female',
}

export interface AddETalkEventSpeakersSpeaker {
  name: string;
  title: string | null;
  description: string | null;
  avatar: FileParameter | null;
}

export interface DeleteETalkEventSpeaker {
  speakers: DeleteETalkEventSpeakersItem[];
}

export interface DeleteETalkEventSpeakersItem {
  eTalkEventSpeakerId: number;
  isDeleted: boolean;
}

export interface IndexPageOfCustomerDashboardView {
  items: CustomerDashboardView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface CustomerDashboardView {
  id: string;
  number: number;
  name: NameResponse;
  phoneNumber: PhoneNumberResponse | null;
  status: UserStatus;
  field: CustomerField | null;
  birthday: string;
  dateLastLogin: string | null;
  dateLastBlocked: string | null;
  email: string;
  gender: Gender;
  jobTitle: string | null;
  avatar: string | null;
  bio: string | null;
  website: string | null;
  linkedIn: string | null;
  dateFirstOrder: string | null;
  notes: string | null;
  address: AddressView;
  coordinateCreatedAt: GeoCoordinateResponse | null;
  skills: CustomerSkillDashboardView[];
  isDeleted: boolean;
  dateCreated: string;
  createdBy: ByView | null;
  dateUpdated: string | null;
  updatedBy: ByView | null;
  dateDeleted: string | null;
  deletedBy: ByView | null;
}

export enum CustomerField {
  Shipping = 'shipping',
  Offshore = 'offshore',
  OilAndGas = 'oilAndGas',
  Ports = 'ports',
  TrainingAndEducation = 'trainingAndEducation',
  Classification = 'classification',
  LegalAffairs = 'legalAffairs',
  SafetyAndSecurity = 'safetyAndSecurity',
  Engineering = 'engineering',
  Shipyard = 'shipyard',
}

export interface GeoCoordinateResponse {
  latitude: number;
  longitude: number;
}

export interface CustomerSkillDashboardView {
  order: number;
  skillId: string;
  name: string;
}

export interface DataResponseOfCustomerDashboardView {
  data: CustomerDashboardView;
}

export interface UpdateMyCustomerAccount {
  id: string;
  name: NameRequest;
  gender: Gender;
  field: CustomerField;
  email: string;
  phoneNumber: PhoneNumberRequest | null;
  jobTitle: string | null;
  bio: string | null;
  website: string | null;
  linkedIn: string | null;
  address: string | null;
  areaId: number | null;
  cityId: number | null;
  countryId: number;
  concurrencyStamp: string;
}

export interface NameRequest {
  first: string;
  last: string;
}

export interface PhoneNumberRequest {
  code: number;
  number: string;
}

export interface UpdateCustomerAvatarResponse {
  avatarUrl: string;
  message: MessageDescriptor;
}

export interface AddCustomerSkillsItem {
  order: number;
  skillId: string;
}

export interface DeleteCustomerSkill {
  skills: DeleteCustomerSkillItem[];
}

export interface DeleteCustomerSkillItem {
  skillId: string;
}

export interface IndexPageOfCountryAppView {
  items: CountryAppView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface CountryAppView {
  id: number;
  iso2: string;
  iso3: string;
  name: string;
  native: string | null;
  phoneCode: number;
  coordinate: GeoCoordinateResponse | null;
}

export interface DataResponseOfCountryAppView {
  data: CountryAppView;
}

export interface IndexPageOfCityAppView {
  items: CityAppView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface CityAppView {
  id: number;
  countryId: number;
  name: string;
  native: string;
  cityCode: string | null;
  coordinate: GeoCoordinateResponse | null;
  type: string | null;
}

export interface IndexPageOfCountryDashboardView {
  items: CountryDashboardView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface CountryDashboardView {
  id: number;
  iso2: string;
  iso3: string;
  name: string;
  native: string | null;
  phoneCode: number;
  coordinate: GeoCoordinateResponse | null;
}

export interface DataResponseOfCountryDashboardView {
  data: CountryDashboardView;
}

export interface IndexPageOfCityDashboardView {
  items: CityDashboardView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface CityDashboardView {
  id: number;
  countryId: number;
  name: string;
  native: string;
  cityCode: string | null;
  coordinate: GeoCoordinateResponse | null;
  type: string | null;
}

export interface CollectionResponseOfGetPhoneCodesResponseItem {
  items: GetPhoneCodesResponseItem[];
}

export interface GetPhoneCodesResponseItem {
  code: number;
  country: GetPhoneCodesResponseItemCountry;
}

export interface GetPhoneCodesResponseItemCountry {
  name: string;
}

export interface IdMessageResponseOfInteger {
  id: number;
  message: MessageDescriptor;
}

export interface UpsertCountryShared {
  name: string;
  native: string | null;
  iso2: string;
  iso3: string;
  phoneCode: number;
  coordinate: GeoCoordinateRequest | null;
}

export interface AddCountry extends UpsertCountryShared {}

export interface GeoCoordinateRequest {
  latitude: number;
  longitude: number;
}

export interface UpdateCountry extends UpsertCountryShared {
  id: number;
}

export interface DataResponseOfCityAppView {
  data: CityAppView;
}

export interface DataResponseOfCityDashboardView {
  data: CityDashboardView;
}

export interface IndexPageOfAreaAppView {
  items: AreaAppView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface AreaAppView {
  id: number;
  cityId: number;
  name: string;
  native: string;
  areaCode: string | null;
  coordinate: GeoCoordinateResponse | null;
}

export interface IndexPageOfAreaDashboardView {
  items: AreaDashboardView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface AreaDashboardView {
  id: number;
  cityId: number;
  name: string;
  native: string;
  areaCode: string | null;
  coordinate: GeoCoordinateResponse | null;
}

export interface AddCity {
  countryId: number;
  name: string;
  native: string | null;
  cityCode: string | null;
  type: string | null;
  coordinate: GeoCoordinateRequest | null;
}

export interface UpdateCity {
  id: number;
  countryId: number;
  name: string;
  native: string | null;
  cityCode: string | null;
  type: string | null;
  coordinate: GeoCoordinateRequest | null;
}

export interface DataResponseOfBreakingPostAppView {
  data: BreakingPostAppView;
}

export interface BreakingPostAppView {
  id: string;
  category: BreakingPostCategory;
  title: string;
  content: string;
  photoUrl: string | null;
  dateCreated: string;
  dateUpdated: string | null;
}

export enum BreakingPostCategory {
  InBrief = 'inBrief',
  News = 'news',
  Expert = 'expert',
  Industry = 'industry',
  Watch = 'watch',
  Outlook = 'outlook',
  Investigations = 'investigations',
  TalentAndHub = 'talentAndHub',
  Yacht = 'yacht',
  WomenInMaritime = 'womenInMaritime',
}

export interface IndexPageOfBreakingPostAppView {
  items: BreakingPostAppView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface DataResponseOfBreakingPostDashboardView {
  data: BreakingPostDashboardView;
}

export interface BreakingPostDashboardView {
  id: string;
  category: BreakingPostCategory;
  title: string;
  content: string;
  photoUrl: string | null;
  source: BreakingPostSource;
  isDeleted: boolean;
  dateCreated: string;
  createdBy: ByView | null;
  dateUpdated: string | null;
  updatedBy: ByView | null;
  dateDeleted: string | null;
  deletedBy: ByView | null;
}

export enum BreakingPostSource {
  Console = 'console',
  Webhook = 'webhook',
}

export interface IndexPageOfBreakingPostDashboardView {
  items: BreakingPostDashboardView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface WebhookBreakingPostEnvelop {
  posts: WebhookBreakingPost[];
}

export interface WebhookBreakingPost {
  id: string;
  title: string;
  content: string;
}

export interface DataResponseOfAreaAppView {
  data: AreaAppView;
}

export interface DataResponseOfAreaDashboardView {
  data: AreaDashboardView;
}

export interface AddArea {
  cityId: number;
  name: string;
  native: string | null;
  areaCode: string | null;
  coordinate: GeoCoordinateRequest | null;
}

export interface UpdateArea {
  id: number;
  cityId: number;
  name: string;
  native: string | null;
  areaCode: string | null;
  coordinate: GeoCoordinateRequest | null;
}

export interface IndexPageOfAdministratorView {
  items: AdministratorView[];
  index: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface AdministratorView {
  id: string;
  number: number;
  name: NameResponse;
  email: string;
  emailConfirmed: boolean;
  phoneNumber: PhoneNumberResponse | null;
  phoneNumberConfirmed: boolean;
  status: UserStatus;
  gender: Gender;
  dateLastLogin: string | null;
  concurrencyStamp: string | null;
  isDeleted: boolean;
  dateCreated: string;
  createdBy: ByView | null;
  dateUpdated: string | null;
  updatedBy: ByView | null;
  dateDeleted: string | null;
  deletedBy: ByView | null;
}

export interface DataResponseOfAdministratorView {
  data: AdministratorView;
}

export interface FileParameter {
  data: any;
  fileName: string;
}

export class ApiException extends Error {
  override message: string;
  status: number;
  response: string;
  headers: { [key: string]: any };
  result: any;

  constructor(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result: any,
  ) {
    super();

    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true;
  }
}

function throwException(
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any },
  result?: any,
): Observable<any> {
  return _observableThrow(
    new ApiException(message, status, response, headers, result),
  );
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next('');
      observer.complete();
    } else {
      let reader = new FileReader();
      reader.onload = (event) => {
        observer.next((event.target as any).result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}
