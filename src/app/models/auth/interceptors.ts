import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { Provider } from "@angular/core";
import { TokenInterceptor } from "./token.interceptor";

// Array of http interceptor providers in outside-in order
export const httpInterceptorProviders:Provider = [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
];