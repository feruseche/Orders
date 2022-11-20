# Orders
Orders with Firebase and LocalStorage

Hybrid APP, built on Angular and Ionic with Cordova plugins.

This APP allows you to connect to a Firebase resource to synchronize information between the company and the mobile device.

Two implementations were designed to connect both to Firebase and to the device's own LocalStorage, these implementations are configured through an Interface for Inversion of Control in the APP.MODULE.

It is a simple APP, which obtains the list of customers and products from the company, through Firebase, said data is stored in the LocalStorage of the mobile device, and the APP allows you to fill out an Order to later send it to the company .

Framework Versions:
1. Angular 14
2. Ionic 6
3. Cordova 11
4. Node 16

Commands:
1. npm install
2. ionic serve
