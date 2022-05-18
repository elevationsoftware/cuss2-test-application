// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const qs = new URLSearchParams(window.location.search);

export const environment = {
  production: false,

  cuss2Config: {
    cussUrl: qs.get('url') || 'https://localhost:22222',
    clientId: qs.get('id') || 'EL',
    clientSecret:  qs.get('secret') || '12345678'
  }
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
