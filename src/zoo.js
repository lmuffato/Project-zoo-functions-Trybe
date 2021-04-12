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
  // seu código aqui
  const idAnimal = [];
  ids.forEach((id) => {
    data.animals.forEach((animal) => {
      if (id === animal.id) {
        idAnimal.push(animal);
      }
    });
  });
  return idAnimal;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const animalVerify = data.animals.find((animalName) => animalName.name === animal);
  return animalVerify.residents.every((resident) => resident.age > age);
}

function employeeByName(employeeName) {
  // seu código aqui
  const employeeObj = data.employees.filter((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName);
  const toObject = employeeObj.reduce((obj, item) => Object.assign(obj, item), {});
  return toObject;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  // seu código aqui
  const verifyManager = data.employees.map((employee) => employee.managers);
  return verifyManager.some((manager) => manager.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  // seu código aqui
  if (species !== undefined) {
    let animalsSpecie = 0;
    data.animals.forEach((animalSpecie) => {
      if (animalSpecie.name === species) {
        animalsSpecie = animalSpecie.residents.length;
      }
    });
    return animalsSpecie;
  }
  const animalsList = data.animals.map((animal) => ({ [animal.name]: animal.residents.length }));
  const animalToObj = animalsList.reduce((obj, item) => Object.assign(obj, item), {});
  return animalToObj;
}

function entryCalculator(...entrants) {
  // seu código aqui
  let totalPrices = 0;
  const { Adult, Child, Senior } = data.prices;
  entrants.forEach((entrant) => {
    if (entrant.Adult !== undefined) {
      totalPrices += entrant.Adult * Adult;
    } if (entrant.Child !== undefined) {
      totalPrices += entrant.Child * Child;
    } if (entrant.Senior !== undefined) {
      totalPrices += entrant.Senior * Senior;
    }
  });
  return totalPrices;
}

// function animalMap(options) {
//   // seu código aqui
// }

// function schedule(dayName) {
//   // seu código aqui
// }

// function oldestFromFirstSpecies(id) {
//   // seu código aqui
// }

function increasePrices(percentage) {
  // seu código aqui
  const { Adult, Senior, Child } = data.prices;
  const dataPrices = data.prices;
  const calculatePrices = (prices) => (Math.round(prices * percentage + prices * 100) / 100);
  Object.assign(dataPrices, {
    Adult: calculatePrices(Adult),
    Senior: calculatePrices(Senior),
    Child: calculatePrices(Child),
  });
  return dataPrices;
}

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  entryCalculator,
  // schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};

// Conteúdo utilizado para consulta na resolução de alguns exercícios.:
// https://stackoverflow.com/questions/19874555/how-do-i-convert-array-of-objects-into-one-object-in-javascript
