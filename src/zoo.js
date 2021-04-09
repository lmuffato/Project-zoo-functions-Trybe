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

function oldestFromFirstSpecies(id) {
  const animalId = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const allResidents = data.animals.find((animal) => animal.id === animalId).residents;
  const olderAnimal = allResidents.reduce((acc, cur) => (acc.age > cur.age ? acc : cur));
  return [olderAnimal.name, olderAnimal.sex, olderAnimal.age];
}

function increasePrices(percentage) {
  const factor = 1 + (percentage / 100);
  data.prices.Adult = Math.round(100 * (data.prices.Adult * factor)) / 100;
  data.prices.Child = Math.round(100 * (data.prices.Child * factor)) / 100;
  data.prices.Senior = Math.round(100 * (data.prices.Senior * factor)) / 100;
  return data.prices;
}

function employeeCoverage(idOrName) {
  const obj = {};
  data.employees.map((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`;
    const rFA = employee.responsibleFor;
    const aN = rFA.reduce((acc, cur) => { acc.push(animalsByIds(cur)[0].name); return acc; }, []);
    obj[fullName] = aN;
    return fullName;
  });
  if (idOrName) {
    const employ = data.employees.find((emp) =>
      emp.id === idOrName || emp.firstName === idOrName || emp.lastName === idOrName);
    const ob = {};
    const fullNam = `${employ.firstName} ${employ.lastName}`;
    ob[fullNam] = obj[fullNam];
    return ob;
  }
  return obj;
}

console.log(employeeCoverage());

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  // animalMap,
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
