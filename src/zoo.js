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
  if (ids === []) {
    return [];
  }
  return ids.map((id) => data.animals.find((animal) => animal.id === id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const object = data.animals.find((beast) => beast.name === animal);
  const arrayIdades = [];
  object.residents.forEach((habitat) => {
    arrayIdades.push(habitat.age);
  });
  return arrayIdades.every((idade) => idade >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  const employees = data.employees
    .find((employee) => employee
      .firstName === employeeName || employee.lastName === employeeName);
  return employees !== undefined ? employees : {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  const { employees } = data;
  return employees.some((anEmployee) => anEmployee.managers.some((employee) => employee === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employee);
  return data.employees;
}

function animalCount(species) {
  // seu código aqui
  if (species) {
    return data.animals.find((value) =>
      value.name === species).residents.length;
  }
  const object = {};
  data.animals.forEach((value) => {
    object[value.name] = value.residents.length;
  });
  return object;
}

function entryCalculator(entrants) {
  // seu código aqui
  const { prices } = data;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  return ((Adult * prices.Adult) + (Senior * prices.Senior) + (Child * prices.Child));
}

/*
function animalMap(options) {
  // seu código aqui
}
*/

function schedule(day) {
  // seu código aqui
  const horario = (value) => value - 12;
  const { hours } = data;
  const wDay = {};
  const hourKey = Object.values(hours);
  const arrDays = Object.keys(hours);
  for (let index = 0; index < arrDays.length - 1; index += 1) {
    const days = arrDays[index];
    const hour = hourKey[index];
    Object
      .assign(wDay, { [days]: `Open from ${hour.open}am until ${horario(hour.close)}pm` });
  }
  Object.assign(wDay, { Monday: 'CLOSED' });
  return (day !== undefined ? { [day]: wDay[day] } : wDay);
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const idAnimal = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const { residents } = data.animals.find((animal) => animal.id === idAnimal);
  const residentAnimal = Object
  .values(residents.sort((firstAnimal, secondAnimal) => secondAnimal.age - firstAnimal.age)[0]);
  return residentAnimal;
}

/*
function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
}
*/
module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  /*  animalMap, */
  animalsByIds,
  employeeByName,
  /* employeeCoverage, */
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  /* increasePrices, */
  createEmployee,
};
