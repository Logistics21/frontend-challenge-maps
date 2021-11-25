This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started

Configure environment

Write a file `.env` in the projects root directory.

```bash
YELP_API_KEY=[Yelp API key]
REACT_APP_GOOGLE_MAPS_API_KEY=[Google Map API]
```

Install dependencies

```shell
$ yarn install
```

Start the server and client

```shell
$ yarn server
$ yarn start
```

## Available Scripts

In the project directory, you can run:

### `yarn server`

Runs the node server for development.<br />
It will run on http://localhost:5000/<br />

Open [http://localhost:5000/-/ping](http://localhost:5000/-/ping) to check if running in the browser.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

---
## frontend-challenge-maps notes

### completed features

- [x] three buttons which allow you to switch/toggle between different types of restaurants in Berlin

- [x] `markers` placed on the map for each of the restaurants

- [x] `infowindow` events attached to the `markers` which provide additional details on the restaurant including:
  - image
  - name
  - address
  - price
  - rating
  - link to the restaurant's website

### additional completed features

- [x] Infinite scroll of restaurants list
  - prevents the need to make massive initial query
  - querying is deferred until the user actively looks for additional restaurants
  - queries are chunked into efficient blocks of `10`

- [x] updating of map with new markers and infowindows when user scrolls for additional restaurants

- [x] retaining previous list position and map locations of restaurants when toggling between restaurant types
### future improvements

- [ ] caching of previous searches of restaurants (by type) to prevent redundant queries on page refresh

- [ ] visual highlighting of which restaurant button is currently active

- [ ] implementation of Google Maps API for React [@googlemaps/react-wrapper](https://www.npmjs.com/package/@googlemaps/react-wrapper) and MarkerClusters library [@googlemaps/markerclusterer](https://www.npmjs.com/package/@googlemaps/react-wrapper) to optimize drawing and rendering of collections of restaurants

- [ ] Cleaner, more informative loading state for Infinite Scroll during fetching of new restaurants.

- [ ] Add test spec file for `Main.js` file.
  - Currently, the libraries which mock the Google Maps API only provide a limited implementation.
  - This changed the focus of the test from trying to test the functionality of Main.js to providing a deeply mocked instance of the Maps API.
  - The focus of Main.js tests should be the efficacy of the component code, not ensuring the functionality of the external libraries used in it's implementation.