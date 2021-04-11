/* eslint-disable no-return-assign */
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

// const assert = require('assert');

const { animals, employees, hours, prices } = require('./data.js');

function animalsByIds(...ids) {
  // seu código aqui
  return animals.filter((animal) => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals
    .find((specimen) => specimen.name === animal).residents
    .every((specimen) => specimen.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }

  return employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const employee = { ...personalInfo, ...associatedWith };
  return employee;
}

function isManager(id) {
  // seu código aqui
  return employees.some(({ managers }) => managers.indexOf(id) !== -1);
}

function addEmployee(id = 0, firstName = 'None', lastName = 'None',
  managers = [], responsibleFor = []) {
  // seu código aqui
  employees[employees.length] = { id, firstName, lastName, managers, responsibleFor };
  return employees;
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    const animalsObject = animals.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
    return animalsObject;
  }
  const specie = animals.find((animal) => animal.name === species);
  return specie.residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const totalPrice = Object.keys(entrants).reduce((acc, curr) => (
    acc + (entrants[curr] * prices[curr])
  ), 0);
  return totalPrice;
}

function getLocation() {
  const locationObject = {};
  // const animalsLocation = animals
  animals.map((animal) => animal.location)
    .forEach((region) => {
      locationObject[region] = animals.filter((specimen) => specimen.location === region)
        .map((animal) => animal.name);
    });
  return locationObject;
}

function addNames() {
  let nameObject = {};
  const locations = animals.reduce((acc, curr) => (acc.includes(curr.location) ? acc
    : acc.concat(curr.location)), []);

  locations.forEach((location) => {
    const specimens = animals.filter(({ location: locat }) => locat === location)
      .map((animal) => ({ [animal.name]: animal.residents.map((specimen) => specimen.name) }));
    nameObject = { ...nameObject, ...{ [location]: specimens } };
  });
  return nameObject;
}

function orderAnimalsNames(sortObject, includeNames = false, sorted) {
  let objectSorted;
  if (includeNames && sorted) {
    Object.keys(sortObject).forEach((region) => {
      sortObject[region].forEach((animal) => {
        objectSorted = animal;
        Object.keys(objectSorted).forEach((specimen) => {
          objectSorted[specimen] = objectSorted[specimen].sort();
        });
      });
    });
  }
}

function animalMap(options = false) {
  // Com funcionalidades sugeridas por Wanderson Sales
  // seu código aqui
  let newObjt = {};
  const includeNames = !!options.includeNames;
  const sorted = !!options.sorted;
  const sex = options.sex ? options.sex : null;

  if (includeNames) {
    newObjt = addNames();
  } else {
    return getLocation();
  }

  orderAnimalsNames(newObjt, includeNames, sorted);

  return newObjt;
}

// console.log(animalMap());
// console.log(animalMap({ includeNames: true }));
console.log(animalMap({ includeNames: true, sex: 'female' }));

function returnDays(day) {
  const openHour = hours[day].open;
  const closeHour = hours[day].close;

  if (openHour === 0 && closeHour === 0) return 'CLOSED';
  return `Open from ${openHour}am until ${closeHour - 12}pm`;
}

function schedule(dayName) {
  // seu código aqui
  // Com alterações sugeridas por Orlando Flores
  const newObjt = {};
  const days = Object.keys(hours);
  if (dayName === undefined) {
    days.forEach((day) => { newObjt[day] = returnDays(day); });
    return newObjt;
  }
  if (dayName !== undefined) {
    newObjt[dayName] = returnDays(dayName);
    return newObjt;
  }
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  let oldest = [];
  const specie = employees.find((employee) => employee.id === id).responsibleFor[0];
  animals.find((animal) => animal.id === specie).residents
    .forEach((spec, index) => {
      if (index === 0) {
        oldest = [spec.name, spec.sex, spec.age];
      }
      if (spec.age > oldest[2]) {
        oldest = [spec.name, spec.sex, spec.age];
      }
    });
  return oldest;
}

function increasePrices(percentage) {
  // seu código aqui
  // Com modificação sugerida pro Lucas Pedroso
  const increase = (percentage / 100) + 1;
  let increased = 0;
  Object.entries(prices).forEach(([key, value]) => {
    increased = value * increase;
    prices[key] = Math.round(increased * 100) / 100;
  });
  return prices;
}

function employeeCoverage(idOrName) {
  // seu código aqui
  const newObjt = {};
  employees.forEach((employee) => {
    const name = `${employee.firstName} ${employee.lastName}`;
    const responsibleFor = employee.responsibleFor
      .map((specie) => animals.find((animal) => animal.id === specie).name);
    newObjt[name] = responsibleFor;
  });
  if (idOrName === undefined) return newObjt;

  const { firstName, lastName } = employees.find((actualEmployee) => actualEmployee
    .firstName === idOrName || actualEmployee.lastName === idOrName
    || actualEmployee.id === idOrName);
  const name = `${firstName} ${lastName}`;
  return { [name]: newObjt[name] };
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
