  - [The API](#the-api)
    - [GET `/fields` &rarr; `{ fields: BasicField[] }`](#get-fields---fields-basicfield-)
    - [GET `/fields/:id` &rarr; `ExtendedField`](#get-fieldsid--extendedfield)
    - [The API is **_intentionally_** imperfect!](#the-api-is-intentionally-imperfect)
  - [Your Tasks](#your-tasks)
    - [Task 1: A Basic App](#task-1-a-basic-app)
      - [Country Flags](#country-flags)
      - [Field Area](#field-area)
    - [Task 2: Grouping, Sorting, Filtering](#task-2-grouping-sorting-filtering)
    - [Task 3: Searching](#task-3-searching)
    - [Task 4: Field Icons](#task-4-field-icons)
    - [Task 5: A Lot of Fields!](#task-5-a-lot-of-fields)
    - [Task 6: Maps!](#task-6-maps) // bonus
    - [Task 7: Deployment](#task-7-deployment) //not required


## The API

Run with `yarn start` and go to [`http://localhost:8000`](http://localhost:8000).

To enable live-reloading for any reason, run `yarn watch`. To change the host and port,

```bash
HOST="127.0.0.1" PORT=8080 yarn serve
```

Always replies with an `application/json` content-type and has only two endpoints. Please look at `resources/types.ts` for what you'll get back. You will want to use that file in your project.

### GET `/fields` &rarr; `{ fields: BasicField[] }`

Returns some basic information on all the fields in the backend. Here's a sample response:

```javascript
{
  "fields": [
    {
        "id": "318fcafb-a40c-425e-bb91-798f2b3e6c3e",
        "name": "Makeba",
        "type": "corporate"
    },
    {
        "id": "2b103f85-919b-4826-9858-00b0729f2fb9",
        "name": "Olathe Farms",
        "type": "individual"
    },
    // ... more `BasicField`s
  ]
}
```

### GET `/fields/:id` &rarr; `ExtendedField`

For the given field ID, returns its basic information _plus_ extended information:

* Field geometry in valid [GeoJSON](https://geojson.org/)
* The field's [two-letter country code](https://www.iban.com/country-codes), and
* The field's owner

Here's a sample request and response:

    GET /fields/318fcafb-a40c-425e-bb91-798f2b3e6c3e

```javascript
{
  "id": "318fcafb-a40c-425e-bb91-798f2b3e6c3e",
  "countryCode": "IN",
  "name": "Moyanka",
  "owner": "Giuseppe Sydow",
  "type": "collective",
  "geoData": {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [-95.42449951171875, 44.32384807250689],
          [-95.152587890625, 44.32384807250689],
          [-95.152587890625, 44.39257961837961],
          [-95.42449951171875, 44.39257961837961],
          [-95.42449951171875, 44.32384807250689]
        ]
      ]
    }
  }
}
```

You'll get the expected `HTTP 404` if the Field ID was not found in the `/fields` collection.

### The API is **_intentionally_** imperfect!

our APIs are fast, resilient, and reliable 😎 But _this_ API isn't _any_ of these things. 🤦 For the sake of this exercise, consider it is an external, third-party API and build accordingly.

* For both endpoints, it will reply with a **happy `HTTP 200` around 75% of the time** and sulk with a **sad `HTTP 500` around 25% of the time**.
* You might **wait between 10ms and 3s** for all responses.

Locally, you can add these URL params to all endpoints so _you_ can develop faster:

* Add `?fail` to get nothing but HTTP 500s
* Add `?succeed` to get nothing but HTTP 200s (supercedes `fail` (so let's not waste time being cheeky with `fail&succeed` 😁))
* Add `?fast` to enjoy a super-fast API without the simulated latency

Example: `/fields?fail&fast`

## Your Tasks

### Task 1: A Basic App

Create a React application that uses the API to render a list of fields and their extended information. Your app must factor in the API's latency and unreliability when displaying any information to the user.

Using the two endpoints, you'll need to show

* A list of all the Fields
* The total number of Fields
* The name of each Field
* A little icon for each Field's `type`
    - 🏦 when the `type` is "corporate"
    - 👥 when the `type` is "collective"
    - 👤 when the `type` is "individual"
* A small flag based on a Field's `countryCode`
* The Field's area in acres based on its `geoData`

We use (a highly customized extension of) [Reactstrap](https://reactstrap.github.io/) for our products so we'd prefer if you used that in your solution. If you're comfortable with a UI library **other than Reactstrap**, **please use it instead**. Don't worry about how your solution looks (we have a fantastic Design team for that). Just focus on the _states_ of the app and the _information_ you're showing the user.

#### Country Flags

Use [this library](https://www.npmjs.com/package/react-world-flags) to render a small flag for the `countryCode`.

```javascript
import Flag from "react-world-flags";

<Flag code="US" />
```

#### Field Area

Use [this library](https://www.npmjs.com/package/@mapbox/geojson-area) to compute the field's area from its `geoData` attribute:

```typescript
import GeoJSONArea from "@mapbox/geojson-area";

// If `fieldObject` is the upstream response,
const areaInSquaredMeters = GeoJSONArea.geometry(fieldObject.geoData.geometry);
```

The library will return squared meters. Convert that to acres with two decimal places of precision (1 m<sup>2</sup> = 0.000247105 acres). The result must look like this: "3.43 ac".

### Task 2: Grouping, Sorting, Filtering

* Allow a user to switch between acres and hectares (1 m<sup>2</sup> = 0.0001 hectares)
* Allow a user to to filter by field `type`
* Allow a user to sort fields by their area (ascending and descending order)

### Task 3: Searching

Allow a user to search fields by their name. A simple substring match is okay. Extra credit: Highlight the search term in the field's name!

### Task 4: Field Icons

Use any library of your choice to create SVG icons of field shapes based on their individual GeoData. Place your icons next to the field name in your list of fields. The result would look something like `resources/images/field-icons.png` in this repository.

### Task 5: A Lot of Fields!

Instead of 25 fields in the previous tasks, you will deal with fetching and displaying 5,000 fields. Browser performance is the big issue here!

You have two options: you can fetch _all_ 5,000 fields at once with `/fields?all` and figure out what to do with them in your app **or** you can paginate the backend response like so `/fields?page=1`.

The latter's response will include a new property called `pages` which will give you some information on which page you're on, the total number of pages, and so on (we suggest using `&succeed&fast` in the URIs above to play with them first).

### Task 6: Maps! //////// ****** nice to have ****

Use any maps API (like Google Maps or Mapbox) to show a field's GeoData. Users must be able to select a field from your list and see it overlaid on a map.

### Task 7: Deployment //not required

Deploy this app to a platform of your choice (e.g. AWS, Heroku, CloudFlare). Host `server.js` some place (we love our Lambdas but you can pick whatever you want).
