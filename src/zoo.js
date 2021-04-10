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

function animalsByIds(...ids) {
  const { animals } = data;
  return animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  const { animals } = data;
  return animals.find(({ name }) => name === animal).residents.every(({ age: agersAnimals }) =>
    agersAnimals >= age);
}

function employeeByName(employeeName) {
  const { employees } = data;
  return (!employeeName) ? {} : employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const { employees } = data;
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const { employees } = data;
  const employee = createEmployee({ id, firstName, lastName }, { managers, responsibleFor });
  employees.push(employee);
}

function animalCount(species) {
  const { animals } = data;
  if (!species) {
    return animals.reduce((acc, { name, residents }) => {
      acc[name] = residents.length;
      return acc;
    }, {});
  }
  return animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  const { prices } = data;
  return Object.entries(entrants).map(([key, value]) => prices[key] * value)
    .reduce((acc, totalPrice) => acc + totalPrice);
}

// Implementação item 1 requisito 9:
const mappingAnimalsTypesByLocation = (animals, location) => animals.filter((animal) =>
  (animal.location === location)).map((animal) => animal.name);
// Implementação item 2 requisito 9:
const getAnimalsName = (animals, type, sorted) => {
  const array = [];
  animals.forEach((animal) => {
    animal.residents.forEach((element) => {
      if (animal.name === type) {
        array.push(element.name);
      }
    });
  });
  if (sorted === true) {
    return array.sort();
  }
  return array;
};

const mappingAnimalsNamesByTypes = (animals, location, sorted) => {
  const animalsTypesByLocation = mappingAnimalsTypesByLocation(animals, location);
  return animalsTypesByLocation.map((typeAnimal) =>
    ({ [typeAnimal]: getAnimalsName(animals, typeAnimal, sorted) }));
};

function animalMap(options) {
  const { animals } = data;
  if (!options) {
    return animals.reduce((acc, curr) => {
      acc[curr.location] = mappingAnimalsTypesByLocation(animals, curr.location);
      return acc;
    }, {});
  }
  const { includeNames = false, sorted = false } = options;
  if (Object.keys(options).includes('includeNames') && includeNames === true) {
    return animals.reduce((acc, curr) => {
      acc[curr.location] = mappingAnimalsNamesByTypes(animals, curr.location, sorted);
      // console.log(acc);
      return acc;
    }, {});
  }
}
// console.log(animalMap());
console.log(animalMap({ includeNames: true }));
// console.log(animalMap({ includeNames: true, sorted: true }));

// function schedule(dayName) {
//   // seu código aqui
// }

// function oldestFromFirstSpecies(id) {
//   // seu código aqui
// }

// function increasePrices(percentage) {
//   // seu código aqui
// }

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  entryCalculator,
  // schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
