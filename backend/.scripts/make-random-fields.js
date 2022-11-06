/**
 * Generate a random list of fields for the interview.
 */

const crypto = require("crypto");
const fs = require("fs");
const { faker } = require("@faker-js/faker");
const randomGeo = require("geojson-random");

const NUMBER_OF_FIELDS_TO_GENERATE = 5000;

console.log(`Generating ${NUMBER_OF_FIELDS_TO_GENERATE} fields...`);

/**
 * Not a huge list since (a) we ourselves don't have a presence in 10s of
 * countries and (b) we want to test for how they group by country.
 */
const countries = [
  "AE",
  "AU",
  "BE",
  "BR",
  "CA",
  "CF",
  "CN",
  "DM",
  "FR",
  "IE",
  "IN",
  "IO",
  "NP",
  "NZ",
  "UK",
  "US",
  "ZM",
];

const fieldTypes = ["corporate", "collective", "individual"];

const makeField = () => ({
  countryCode: countries[Math.floor(Math.random() * countries.length)],
  name: faker.name.firstName(),
  owner: faker.name.findName(),
  type: fieldTypes[Math.floor(Math.random() * fieldTypes.length)],
  geoData: randomGeo.polygon(1, Math.floor(Math.random() * 6) + 1),
});

output = {};

for (let i = 0; i < NUMBER_OF_FIELDS_TO_GENERATE; i++) {
  output[crypto.randomUUID()] = makeField();
}

console.log("Writing data.json...");
fs.writeFileSync("./data.json", JSON.stringify(output, null, " "));

console.log("✨ Done!");
