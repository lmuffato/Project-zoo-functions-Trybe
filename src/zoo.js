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
const { animals, employees, prices, hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return data.animals.filter((specie, index) => specie.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  return data.animals
    .find((specie) => specie.name === animal)
    .residents.every((ageSpecie) => ageSpecie.age > age);
}
console.log(animalsOlderThan('otters', 7));

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find((managers) => managers.firstName === employeeName
  || managers.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees
    .some((gerente) => gerente.managers
      .some((manager) => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const obj = { id, firstName, lastName, managers, responsibleFor };
  employees.push(obj);
}

function animalCount(species) {
  const objChange = {};
  if (species) {
    return animals.find((specie) => specie.name === species).residents
      .reduce((acumulator) => acumulator + 1, 0);
  }
  animals.forEach((animal) => {
    const animalsN = animal.residents.reduce((acc) => acc + 1, 0);
    objChange[animal.name] = animalsN;
  });
  return objChange;
}

function entryCalculator(entrants = 0) {
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return !entrants || entrants === {}
    ? 0
    : (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
}

function animalMap(options) {
  return options;
}

function schedule(dayName) {
  const dayList = {};
  Object.keys(hours).forEach((day) => {
    if (day !== 'Monday') {
      dayList[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    } else {
      dayList[day] = 'CLOSED';
    }
  });
  if (!dayName) {
    return dayList;
  }
  return { [dayName]: dayList[dayName] };
}

function oldestFromFirstSpecies(id) {
  const nameId = employees.find((personId) => personId.id === id);
  const animalSpecie = nameId.responsibleFor[0];
  const animalsId = animals.find((animal) => animal.id === animalSpecie);
  const animalDetails = animalsId.residents.reduce((acc, curr) => {
    if (curr.age > acc.age) return curr;
    return acc;
  });
  const { name, sex, age } = animalDetails;
  return [name, sex, age];
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((inc) => {
    prices[inc] = Math.round(prices[inc] * (1 + (percentage / 100)) * 100) / 100;
  });
}

const animalName = (idParam) => {
  const array = [];
  idParam.forEach((id) => animals.forEach((animal) => {
    if (animal.id === id) {
      array.push(animal.name);
    }
  }));
  return array;
};

const employeedFunc = (param) => {
  const obj = {};
  employees.forEach((cmp) => {
    if (cmp.id === param || cmp.firstName === param || cmp.lastName === param) {
      Object.assign(obj, { [`${cmp.firstName} ${cmp.lastName}`]: animalName(cmp.responsibleFor) });
    }
  });
  return obj; // Referencias Bruno Mendes, Giovanni Maldonado, Wanderson Sales
};

function employeeCoverage(idOrName) {
  const newObj = {};
  if (!idOrName) {
    employees.forEach((cmp) => Object.assign(newObj, { [`${cmp.firstName} ${cmp.lastName}`]:
    animalName(cmp.responsibleFor) }));
    return newObj;
  }
  return employeedFunc(idOrName);
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
