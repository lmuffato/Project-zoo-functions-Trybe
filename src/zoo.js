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
  // if (ids.length === 0) return [];
  // if (ids.length === 1) {
  //  return data.animals.find(({id}) => id === ids[0])
  // } */
  return data.animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  const bixos = data.animals.find((bixo) => bixo.name === animal);
  return bixos.residents.every((idd) => idd.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(({ firstName, lastName }) => firstName === employeeName
  || lastName === employeeName);
}

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

// const { id, firstName, lastName } = personalInfo;
//   const { managers, responsibleFor } = associatedWith;
//   const employee = {
//     id,
//     firstName,
//     lastName,
//     managers,
//     responsibleFor,
//   };
//   return employee;

function isManager(id) {
  return data.employees.some((item) => item.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employee);
}

function animalCount(species) {
  if (species === undefined) {
    return data.animals.reduce((acc, currentAnimal) => {
      acc[currentAnimal.name] = currentAnimal.residents.length;
      return acc;
    }, {});
  }
  return data.animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants) {
  if (typeof entrants === 'undefined' || entrants === {}) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const { Adult: adulto, Senior: idoso, Child: criança } = data.prices;
  return (adulto * Adult) + (idoso * Senior) + (criança * Child);
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

// function increasePrices(percentage) {
//   const increse = (percentage / 100) + 1;
//   let incresed = 0;
//   Object.entries(data.prices).forEach((key, value) => {
//     incresed = value * increse;
//     data.prices[key] = Math.round(incresed * 100) / 100;
//   });
//   return data.prices;
// }

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
  // increasePrices,
  createEmployee,
};
