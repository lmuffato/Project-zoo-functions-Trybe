/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local"
    "varsIgnorePattern": "data"
  }
]
*/
const { animals, employees, prices, hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  return animals
    .find((specie) => specie.name === animal)
    .residents.every((specie) => specie.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees
    .some((employee) => employee.managers
      .some((gerente) => gerente === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const array = [];
  array.id = id;
  array.firstName = firstName;
  array.lastName = lastName;
  array.managers = [...managers];
  array.responsibleFor = [...responsibleFor];
  employees.push(array);
}

function animalCount(species) {
  const animalObj = {};
  data.animals.forEach((animal) => {
    Object.assign(animalObj, { [animal.name]: animal.residents.length });
  });
  return (species !== undefined ? animalObj[species] : animalObj);
}

function entryCalculator(entrants) {
  if (entrants === undefined) return 0;
  if (Object.keys(entrants).length === 0) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const total = (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
  return total;
}

/* function animalMap(options) {
  // seu código aqui
} */

function schedule(dayName) {
  const dayObj = {};
  Object.keys(hours).forEach((day) => {
    if (day !== 'Monday') {
      dayObj[day] = `Open from ${hours[day].open}am until ${(hours[day].close) - 12}pm`;
    } else {
      dayObj[day] = 'CLOSED';
    }
  });
  if (!dayName) {
    return dayObj;
  }
  return { [dayName]: dayObj[dayName] };
}

function oldestFromFirstSpecies(id) {
  const employeeId = employees.find((item) => item.id === id);
  const animalSpecie = employeeId.responsibleFor[0];
  const animalsID = animals.find((animal) => animal.id === animalSpecie);
  const animal = animalsID.residents.reduce((acc, curr) => {
    if (curr.age > acc.age) return curr;
    return acc;
  });
  const { name, sex, age } = animal;
  return [name, sex, age];
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((element) => {
    prices[element] = Math.round(prices[element] * (1 + (percentage / 100)) * 100) / 100;
  });
}
//  Requisito 13
const getAnimalName = (arrayId) => {
  const array = [];
  arrayId.forEach((id) =>
    animals.forEach((animal) => {
      if (animal.id === id) {
        array.push(animal.name);
      }
    }));
  return array;
};

const selectEmployee = (param) => {
  const obj = {};
  employees.forEach((emp) => {
    if (emp.id === param || emp.lastName === param || emp.firstName === param) {
      Object.assign(obj, { [`${emp.firstName} ${emp.lastName}`]:
      getAnimalName(emp.responsibleFor) });
    }
  });
  return obj;
};

function employeeCoverage(idOrName) {
  const obj = {};
  if (!idOrName) {
    employees.forEach((emp) => Object.assign(obj, { [`${emp.firstName} ${emp.lastName}`]:
  getAnimalName(emp.responsibleFor) }));
    return obj;
  }
  return selectEmployee(idOrName);
}

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
