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
  if (ids === []) {
    return [];
  }
  return ids.map((id) => data.animals.find((animal) => animal.id === id));
}

function animalsOlderThan(animal, age) {
  const theAnimal = data.animals.find((ani) => ani.name === animal);
  return theAnimal.residents.every((resident) => resident.age >= age);
}

function employeeByName(employeeName = '') {
  if (employeeName === '') {
    return {};
  }
  return data.employees.find((employee) => employee.firstName === employeeName
  || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  const allManagers = data.employees.map((employee) => employee.managers);
  return allManagers.map((aManager) =>
    aManager.some((manager) => manager === id)).some((item) => item === true);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return data.employees.push(newEmployee);
}

function animalCount(species) {
  if (typeof species === 'undefined') {
    const obj = {};
    data.animals.forEach((element) => {
      obj[element.name] = element.residents.length;
    });
    return obj;
  }
  return data.animals.find((animal) => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (typeof entrants === 'undefined') {
    return 0;
  }
  const { Adult, Child, Senior } = entrants;
  let totalPrice = 0;
  if (typeof Adult === 'number') {
    totalPrice += Adult * data.prices.Adult;
  }
  if (typeof Child === 'number') {
    totalPrice += Child * data.prices.Child;
  }
  if (typeof Senior === 'number') {
    totalPrice += Senior * data.prices.Senior;
  }
  return totalPrice;
}

// function animalMap(options) {
//   const { includeNames, sorted, sex } = options;

// }

// function schedule(dayName) {
//   const ob = {};
//   if (typeof dayName === 'undefined') {
//     const arr = Object.keys(data.hours);
//     arr.forEach((el) => {
//       if (data.hours[el].close - data.hours[el].open) {
//         ob[el] = `Open from ${data.hours[el].open}am until ${data.hours[el].close - 12}pm`;
//       } else {
//         ob[el] = 'CLOSED';
//       }
//     });
//     return ob;
//   }
//   if (data.hours[dayName].close - data.hours[dayName].open === 0) {
//     ob[dayName] = 'CLOSED';
//     return ob;
//   }
//   ob[dayName] = `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`;
//   return ob;
// }

function schedule(dayName) {
  const ob = {};
  const arr = Object.keys(data.hours);
  arr.forEach((el) => {
    if (data.hours[el].close - data.hours[el].open) {
      ob[el] = `Open from ${data.hours[el].open}am until ${data.hours[el].close - 12}pm`;
    } else {
      ob[el] = 'CLOSED';
    }
  });
  if (dayName) {
    const obj = {};
    obj[dayName] = ob[dayName];
    return obj;
  }
  return ob;
}

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
  schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  //   employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  //   oldestFromFirstSpecies,
  //   increasePrices,
  createEmployee,
};
