// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ORDERLOG: 'orderLogs',
  ORDERCONFIG: 'orderConfig',
  ORDERCLIENT: 'orderClients',
  ORDERINVENTORY: 'orderInventory',
  ORDERSPED: 'orders',
  URL_FIREBASE: 'https://pedidos-35b02-default-rtdb.firebaseio.com/pedidos/',
  FIREBASE: {
    apiKey: "AIzaSyBsuAn_euBPG2XxxaNlByFUxNi215wXpZY",
    authDomain: "pedidos-35b02.firebaseapp.com",
    databaseURL: "https://pedidos-35b02-default-rtdb.firebaseio.com",
    projectId: "pedidos-35b02",
    storageBucket: "pedidos-35b02.appspot.com",
    messagingSenderId: "326317097841",
    appId: "1:326317097841:web:d32c80d95123488623acd0"
  },
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
