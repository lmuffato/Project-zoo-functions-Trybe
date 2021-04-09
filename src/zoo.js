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

const { animals, employees, prices } = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.some((id) => id === animal.id));
}

function animalsOlderThan(animal, age) {
  const selectedAnimals = animals.find((resident) => resident.name === animal).residents;
  return selectedAnimals.every((name) => name.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find((employee) => employeeName === employee.firstName
  || employeeName === employee.lastName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  let result = false;
  employees.forEach((employee) => {
    employee.managers.forEach((manager) => {
      if (manager === id) {
        result = true;
      }
    });
  });
  return result;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  let result = {};
  if (species === undefined) {
    animals.forEach((animal) => {
      const { name } = animal;
      result[name] = animal.residents.length;
    });
  } else {
    result = animals.find((animal) => animal.name === species).residents.length;
  }
  return result;
}

function entryCalculator(entrants) {
  if (entrants === undefined) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const totalAdult = Adult * prices.Adult;
  const totalChild = Child * prices.Child;
  const totalSenior = Senior * prices.Senior;
  return totalAdult + totalChild + totalSenior;
}

// const getLocationsKeys = () => {
//   const object = {};
//   animals.forEach((animal) => {
//     const { location } = animal;
//     object.
//   });
//   return object;
// }

// function animalMap(options) {
//   const result = {};
//   const animalNames = [];
//   const keys = getLocationsKeys();
//   console.log(getLocationsKeys());
//   // console.log(keys);
//   // const keys = Object.keys(result);
//   // console.log(keys);
//   if (options === undefined) {
//     // result[location] = animal.name;
//   }
//   return result;
// }
// console.log(animalMap());

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
