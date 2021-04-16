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
  const animalType = data.animals.find((animalName) => animalName.name === animal);
  return animalType.residents.every((animalAge) => animalAge.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};

  return data.employees.find((employee) => employee.firstName === employeeName
    || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  const everyManager = data.employees.map((employee) => employee.managers);
  return everyManager.map((someManager) =>
    someManager.some((manager) => manager === id)).some((trueManager) => trueManager === true);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const addedEmployee = { id, firstName, lastName, managers, responsibleFor };
  return data.employees.push(addedEmployee);
}

function animalCount(species) {
  if (typeof species === 'undefined') {
    const object = {};
    data.animals.forEach((element) => {
      object[element.name] = element.residents.length;
    });
    return object;
  }
  return data.animals.find((animal) => animal.name === species).residents.length;
}

// function entryCalculator(entrants) {
//   // seu código aqui
// }

// function animalMap(options) {
//   // seu código aqui
// }

const week = (dayName) => (acc, [key, value]) => {
  if (dayName === undefined || dayName === key) {
    acc[key] = value.open !== 0
      ? `Open from ${value.open}am until ${value.close - 12}pm`
      : 'CLOSED';
  }
  return acc;
};

function schedule(dayName) {
  return Object.entries(data.hours).reduce(week(dayName), {});
}

function oldestFromFirstSpecies(id) {
  const animalUnit = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const forResidents = data.animals.find((animal) => animal.id === animalUnit).residents;
  const oldestAnimal = forResidents.reduce((acc, cur) => (acc.age > cur.age ? acc : cur));
  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}

function increasePrices(percentage) {
  const increment = percentage / 100;
  const newIncrement = 1 + increment;
  data.prices.Adult = Math.round(100 * (data.prices.Adult * newIncrement)) / 100;
  data.prices.Child = Math.round(100 * (data.prices.Child * newIncrement)) / 100;
  data.prices.Senior = Math.round(100 * (data.prices.Senior * newIncrement)) / 100;
  return data.prices;
}

// fn = fullName, rf = responsibleFor, an = animal
// em = employee, emp = employee

function employeeCoverage(idOrName) {
  const obj0 = {};
  data.employees.map((employee) => {
    const fn = `${employee.firstName} ${employee.lastName}`;
    const rf = employee.responsibleFor;
    const aN = rf.reduce((acc, cur) => { acc.push(animalsByIds(cur)[0].name); return acc; }, []);
    obj0[fn] = aN;
    return fn;
  });
  if (idOrName) {
    const em = data.employees.find((emp) =>
      emp.id === idOrName || emp.firstName === idOrName || emp.lastName === idOrName);
    const obj1 = {};
    const fn2 = `${em.firstName} ${em.lastName}`;
    obj1[fn2] = obj0[fn2];
    return obj1;
  }
  return obj0;
}

module.exports = {
  //   entryCalculator,
  schedule,
  animalCount,
  //   animalMap,
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
