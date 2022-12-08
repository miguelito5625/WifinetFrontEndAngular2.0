// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // backendServer: "http://192.168.1.101:3000/api",
  backendServer: "https://api.wifinetgt.com:4444/api",
  firebaseConfig: {
    apiKey: "AIzaSyAXUy418CFyBfKppShFScH6vhsFzS6seFU",
    authDomain: "versatile-gist-288922.firebaseapp.com",
    databaseURL: "https://versatile-gist-288922.firebaseio.com",
    projectId: "versatile-gist-288922",
    storageBucket: "versatile-gist-288922.appspot.com",
    messagingSenderId: "253808514500",
    appId: "1:253808514500:web:3ef305f1223bf91b440091"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
