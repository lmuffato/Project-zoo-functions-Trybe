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
  return data.animals.filter((animal) => ids.find((id) => animal.id === id));
}

function animalsOlderThan(animal, age) {
  const container = data.animals.find((animalS) => animalS.name === animal);
  return container.residents.every((animalResident) => animalResident.age > age);
}

function employeeByName(emplName) {
  if (!emplName) return {};
  const { employees } = data.employees;
  const name = employees.find((emp) => emp.firstName === emplName || emp.lastName === emplName);
  return name;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const addNewEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return data.employees.push(addNewEmployee);
}

function animalCount(species) {
  if (!species) {
    return data.animals.reduce((accumulator, animal) => {
      accumulator[animal.name] = animal.residents.length;
      return accumulator;
    }, {});
  }
  return data.animals.find((animal) => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  return (!entrants || Object.keys(entrants).length === 0) ? 0
    : Object.keys(entrants).reduce((accumulator, option) => {
      const price = data.prices[option] * entrants[option];
      const pay = accumulator + price;
      return pay;
    }, 0);
}

//  function animalMap(options) {
//  }

function schedule(dayName) {
  const obj = {};
  Object.keys(data.hours).forEach((day) => {
    if (day !== 'Monday') {
      obj[day] = `Open from ${data.hours[day].open}am until ${(data.hours[day].close) - 12}pm`;
    } else {
      obj[day] = 'CLOSED';
    }
  });
  return dayName ? { [dayName]: obj[dayName] } : obj;
}

//  function oldestFromFirstSpecies(id) {
//  }

function increasePrices(percentage) {
  const { Adult, Child, Senior } = data.prices;
  data.prices.Adult = Math.ceil(Adult * ((percentage) + 100)) / 100;
  data.prices.Child = Math.ceil(Child * ((percentage) + 100)) / 100;
  data.prices.Senior = Math.ceil(Senior * ((percentage) + 100)) / 100;
}

//  function employeeCoverage(idOrName) {
//  }

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  //  animalMap,
  animalsByIds,
  employeeByName,
  //  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  //  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
