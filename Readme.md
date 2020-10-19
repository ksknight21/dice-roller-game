# springboot/React dice roller App

Minimal [Spring Boot & React](https://github.com/ksknight21/dice-roller-game) dice roller app.

## Requirements

For building and running the application you need:

- [JDK 11.0.8+](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- [Maven 3.6.3+](https://maven.apache.org)
- [Node.js and npm](https://www.npmjs.com/get-npm)

- SpringBootAPI and ReactFrontend directories stored on your PC locally.

## Running the spring-boot application locally

To run the spring boot application (API) you can use the [Spring Boot Maven plugin](https://docs.spring.io/spring-boot/docs/current/reference/html/build-tool-plugins-maven-plugin.html) like so:

```shell
cd %PATH%\SpringBootAPI
mvn spring-boot:run
```
(Where '%PATH%\' is where you have chosen to store the directory)

## Running the React Site locally

To run the React application you can use the [npm plugin] like so:

```shell
cd %PATH%\ReactFrontend
npm start
```
(Where '%PATH%\' is where you have chosen to store the directory)

## Using the application
The application can do the following:
-Each player has a “bank” score which starts at 0
-On a player’s turn
-“turn score” and “throw score” are 0, max dice is 10
-they roll (up to) their max dice
-all 1s and 6s are removed
-all remaining dice values are added up to make a throw score
  -if the throw score is zero (there are no remaining dice)
  -the player’s turn score is wiped out
  -play passes to the next player
-else
  -the throw score is added to the turn score
  -the max dice is reduced to only those which were not showing a 1 or a 6
  -the player may have another throw or end their turn
  -when a player ends their turn their turn score is added to their “bank” where the points are safe
  -Winner is the first to reach 200 points in the bank

See preview images:

https://github.com/ksknight21/dice-roller-game/blob/main/React%20example.PNG

https://github.com/ksknight21/dice-roller-game/blob/main/React%20example%202.PNG
