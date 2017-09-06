# topcommerce

This application was developed as part of the Toptal Angular Academy course. Topcommerce is a monolith application with a Java + Spring Boot
 back end and Angular 4 + Bootstrap 4 front end. Authorization/Authentication is token-based using JWT and Spring Security.

Topcommerce was generated using JHipster 4.7.0, you can find documentation and help at [https://jhipster.github.io/documentation-archive/v4.7.0](https://jhipster.github.io/documentation-archive/v4.7.0).

## Requirements

- User can register at any time to the store (registration/auth mocking is permitted) OK
- Recaptcha on user registration OK
- Three types of roles: admin, manager, user OK
	- Admin
		- Can CRUD (Create, Read, Update, Delete) users OK
		- Can assign/remove roles to users OK
		- Can CRUD products OK
		- Can RD orders OK
	- Manager
		- Can CRU products OK
		- Can R orders OK
		- Can change status of an order OK
	- User
		- Can R products OK
		- Can CR orders OK
		- Update Profile	OK
			- Shipping Address OK
			- Billing Address OK
- Order checkout OK
	- Ability to add different products and different quantities to the cart OK
	- Payment using PayPal or Stripe Sandboxes OK
	
## Technical requirements

- You can use a service like Firebase to power the backend of your application, alternatively, you can create your own with your language of preference.
    - I chose `JHipster` since it generates boilerplate code that I am used to since my main stack is `Java` and `Spring Boot`. Nothing that `JHipster` generates is customized, 
    it's purely the `Spring` standard reviewed by hundreds of contributors on GitHub. The code generated in the Client side is also 
    approved by `Angular` contributors from `Google` and the community. It's easy to follow along, use best practices and is totally extensible as shown by my commits along the way.
- Use `Ngrx` to manage the state
    - To be honest, I chose not to cover this technical requirement since I don't see any gain on having a central Store to manage data for such
    simple project. I'm using `Rxjs` extensively in the project (e.g. `Subject` and `Observables`), but I didn't see a point in adding Ngrx at this point since it's been changing a lot (e.g. from `Angular` 2 to 4).
     I am aware of the benefits of state management using Store and Reducers, but as this phrase states, "You’ll know when you need Flux (the pattern). If you aren't sure if you need it, you don't need it.". I think that
     Angular provides ways of managing the state just fine with the `Dependency Injection` mechanism and `Services`. If we understand how the `RootInjector` works as well as 
     the `ChildInjector` when using Lazy loaded modules plus returning immutable data (e.g. I return array.slice() in order to work with a copy of the array), we
      can achieve a degree of safety provided by `Ngrx`. More info on this [website](http://blog.angular-university.io/angular-2-redux-ngrx-rxjs/).
- You can use third party UI libraries.
    - I took a look at the state of `angular-material` but it's not very stable yet so I decided to go with `Bootstrap 4`, even though it's in Beta.
- Separate modules for User/Admin+Manager supporting Lazy Loading.
    - I honestly don't agree with this requirement and I am open to discuss it further. I might have not understood it correctly, but the way I see it,
    we add more complexity by having separate modules per user role since they share most of the code with a few exceptions. The way Lazy loading is explained,
    we should use it when we have parts of the app that are infrequently accessed so we can boost the overall start up time which won't be the case if we have 
    separate modules per role (e.g. all roles can do something in Products, Products should always be loaded). As an example, I added the `app/about/about.module.ts` 
    module being Lazy loaded just to show that it's easy enough to get it working with Angular 4. In addition, I added a preloading strategy `PreloadAllModules` to load
    the Lazy modules after the app has been started. This way, we can improve the user experience when they access a Lazy loaded module.
    
## Development

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: We use Node to run a development web server and build the project.
   Depending on your system, you can install Node either from source or as a pre-packaged bundle.
2. [Yarn][]: We use Yarn to manage Node dependencies.
   Depending on your system, you can install Yarn either from source or as a pre-packaged bundle.

After installing Node, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json).

    yarn install

We use yarn scripts and [Webpack][] as our build system.


Run the following commands in two separate terminals to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

    ./mvnw
    yarn start

[Yarn][] is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `yarn update` and `yarn install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `yarn help update`.

The `yarn run` command will list all of the scripts available to run for this project.

### Versions

- @angular/cli: 1.2.6,
- @angular/core: 4.3.2
- Node: 7.7.2
- NPM: 4.1.2
- Yarn: 0.20.0
- JHipster generator: 4.7.0
- Java: 8
- Spring Boot: 1.5.6
- Mysql: 5.7.18 (docker image)

### Managing dependencies

For example, to add [Leaflet][] library as a runtime dependency of your application, you would run following command:

    yarn add --exact leaflet

To benefit from TypeScript type definitions from [DefinitelyTyped][] repository in development, you would run following command:

    yarn add --dev --exact @types/leaflet

Then you would import the JS and CSS files specified in library's installation instructions so that [Webpack][] knows about them:

Edit [src/main/webapp/app/vendor.ts](src/main/webapp/app/vendor.ts) file:
~~~
import 'leaflet/dist/leaflet.js';
~~~

Edit [src/main/webapp/content/css/vendor.css](src/main/webapp/content/css/vendor.css) file:
~~~
@import '~leaflet/dist/leaflet.css';
~~~

Note: there are still few other things remaining to do for Leaflet that we won't detail here.

For further instructions on how to develop with JHipster, have a look at [Using JHipster in development][].

### Using angular-cli

You can also use [Angular CLI][] to generate some custom client code.

For example, the following command:

    ng generate component my-component

will generate few files:

    create src/main/webapp/app/my-component/my-component.component.html
    create src/main/webapp/app/my-component/my-component.component.ts
    update src/main/webapp/app/app.module.ts

## Building for production

To optimize the topcommerce application for production, run:

    ./mvnw -Pprod clean package

This will concatenate and minify the client CSS and JavaScript files. It will also modify `index.html` so it references these new files.
To ensure everything worked, run:

    java -jar target/*.war

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

Refer to [Using JHipster in production][] for more details.

## Testing

To launch your application's tests, run:

    ./mvnw clean test

### Client tests

Unit tests are run by [Karma][] and written with [Jasmine][]. They're located in [src/test/javascript/](src/test/javascript/) and can be run with:

    yarn test

UI end-to-end tests are powered by [Protractor][], which is built on top of WebDriverJS. They're located in [src/test/javascript/e2e](src/test/javascript/e2e)
and can be run by starting Spring Boot in one terminal (`./mvnw spring-boot:run`) and running the tests (`yarn run e2e`) in a second one.

For more information, refer to the [Running tests page][].

## Using Docker to simplify development (optional)

You can use Docker to improve your JHipster development experience. A number of docker-compose configuration are available in the [src/main/docker](src/main/docker) folder to launch required third party services.
For example, to start a mysql database in a docker container, run:

    docker-compose -f src/main/docker/mysql.yml up -d

To stop it and remove the container, run:

    docker-compose -f src/main/docker/mysql.yml down

You can also fully dockerize your application and all the services that it depends on.
To achieve this, first build a docker image of your app by running:

    ./mvnw package -Pprod docker:build

Then run:

    docker-compose -f src/main/docker/app.yml up -d

For more information refer to [Using Docker and Docker-Compose][], this page also contains information on the docker-compose sub-generator (`jhipster docker-compose`), which is able to generate docker configurations for one or several JHipster applications.

## Continuous Integration (optional)

To configure CI for your project, run the ci-cd sub-generator (`jhipster ci-cd`), this will let you generate configuration files for a number of Continuous Integration systems. Consult the [Setting up Continuous Integration][] page for more information.

[JHipster Homepage and latest documentation]: https://jhipster.github.io
[JHipster 4.7.0 archive]: https://jhipster.github.io/documentation-archive/v4.7.0

[Using JHipster in development]: https://jhipster.github.io/documentation-archive/v4.7.0/development/
[Using Docker and Docker-Compose]: https://jhipster.github.io/documentation-archive/v4.7.0/docker-compose
[Using JHipster in production]: https://jhipster.github.io/documentation-archive/v4.7.0/production/
[Running tests page]: https://jhipster.github.io/documentation-archive/v4.7.0/running-tests/
[Setting up Continuous Integration]: https://jhipster.github.io/documentation-archive/v4.7.0/setting-up-ci/


[Node.js]: https://nodejs.org/
[Yarn]: https://yarnpkg.org/
[Webpack]: https://webpack.github.io/
[Angular CLI]: https://cli.angular.io/
[BrowserSync]: http://www.browsersync.io/
[Karma]: http://karma-runner.github.io/
[Jasmine]: http://jasmine.github.io/2.0/introduction.html
[Protractor]: https://angular.github.io/protractor/
[Leaflet]: http://leafletjs.com/
[DefinitelyTyped]: http://definitelytyped.org/
