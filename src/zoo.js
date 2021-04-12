/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const data = require('./data');

const { animals } = data;

const { employees } = data;

function animalsByIds(...ids) {
  const allAnimals = [];

  const newAnimal = (par) => {
    for (let index = 0; index < ids.length; index += 1) {
      allAnimals.push(animals
        .find((animal) => animal.id === par[index]));
    }
    return allAnimals;
  };
  return newAnimal(ids);
}

function animalsOlderThan(animal, age) {
  const animalFound = animals.find(
    (animalist) => (animalist.name === animal),
  );
  const { residents } = animalFound;
  const animalsAge = residents.every((resident) => (resident.age >= age));

  return animalsAge;
}

function employeeByName(employeeName) {
  const employeeData = employees.find((name) => name.firstName === employeeName
  || name.lastName === employeeName);

  return employeeData;
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  const employ = id;
  console.log(employ);
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const employ = id;
  const b = firstName;
  const c = lastName;
  const d = managers;
  const e = responsibleFor;
  console.log(employ + b + c + d + e);
}

function animalCount(species) {
  const employ = species;
  console.log(employ);
}

function entryCalculator(entrants) {
  const employ = entrants;
  console.log(employ);
}

function animalMap(options) {
  const employ = options;
  console.log(employ);
}

function schedule(dayName) {
  const employ = dayName;
  console.log(employ);
}

function oldestFromFirstSpecies(id) {
  const employ = id;
  console.log(employ);
}

function increasePrices(percentage) {
  const employ = percentage;
  console.log(employ);
}

function employeeCoverage(idOrName) {
  const employ = idOrName;
  console.log(employ);
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
