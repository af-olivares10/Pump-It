# Pump-It
Two player online game made using Meteor and React. Get points by pumping up the ball. Click the ball to pump it. The bigger the ball is, the more points you get. Make sure you click the ball or else you'll get some points discounted. If you pop the ball, you will loose a lot of points.

App: https://pump-it-up.herokuapp.com/
## Features

**Used technologies:**
- MongoDB
- Nodejs
- Meteor
- ReactJS
- Heroku


## Prerequisites
* Install NodeJs
* Install Meteor

## Deployment

* Download the repository and run on the main directory
  ```
  > npm install
  ```

* (Optional) In case you are using a remote MongoDB service, set the url as an enviornment variable 
   ```
  > MONGO_URL=mongodb://<MONGO_URI>
  ```
* Run on the main directory
  ```
  > meteor
  ```
And you are all set up! Access the app on http://localhost:3000/

## Running tests

* Download the repository and run on the main directory
  ```
  > meteor test --driver-package=cultofcoders:mocha --port 3100
  ```
The tests will run and results will appear connecting to http://localhost:3100/

## License
[MIT license](https://github.com/af-olivares10/Pump-It/blob/master/LICENSE)  

## Authors
* **Andrés Olivares** - [*Personal website*](https://af-olivares10.github.io/)
* **Ramon Vega** - [*Personal website*](https://ramonvega96.github.io/)
