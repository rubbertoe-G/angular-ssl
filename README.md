# AngularSsl

## Dependencies
1. Node 12.6.0
2. npm 6.13.1
3. [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

## Setup

Ensure that you have the project dependencies installed. 

Run `npm install` and all rependencies will be installed automatically. After installation, the `postinstall` script will run automatically which will build the application.

## Build

Run `ng build --output-path dist --aot` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running

Run `ng serve` will generate a dev server . Navigate to `http://localhost:4200/`.

***Note: To use an API gateway for HTTPS, please follow the tutorial [here](https://levelup.gitconnected.com/create-a-valid-ssl-in-localhost-for-angular-applications-ed05054ec2e7) and run the application with `ng serve --ssl`***
