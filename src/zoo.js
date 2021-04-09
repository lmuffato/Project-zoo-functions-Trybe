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

const { animals, employees, prices, hours } = data;

function animalsByIds(...ids) {
  const animalsArray = [];
  ids.forEach((idParam, index) =>
    (animals[index].id === idParam ? animalsArray.push(animals[index]) : animalsArray));
  return animalsArray;
}

function animalsOlderThan(name, age) {
  const objAnimal = animals.find((animal) => animal.name === name);
  const result = objAnimal.residents.every((animal2) => animal2.age >= age);
  return result;
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find((emp) => (emp.firstName === employeeName || emp.lastName === employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;

  const obj = { id, firstName, lastName, managers, responsibleFor };
  return obj;
}

function isManager(id) {
  const managerList = [];
  employees.forEach((emp) => (
    emp.managers.length > 0 ? managerList.push(...emp.managers) : emp.managers
  ));
  const check = managerList.find((gerenteId) => gerenteId === id);
  const bool = check !== undefined;
  return bool;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const listAnimals = {};
  animals.forEach((animal) =>
    Object.assign(listAnimals, {
      [animal.name]: animal.residents.length,
    }));
  if (!species) { return listAnimals; }
  return listAnimals[species];
}

function entryCalculator(entrants) {
  if (!entrants) { return 0; }

  const keys = Object.keys(entrants);
  const value = Object.values(entrants);
  let total = 0;

  keys.forEach((key, index) => {
    if (key === 'Adult') {
      total += value[index] * prices.Adult;
    } else if (key === 'Senior') {
      total += value[index] * prices.Senior;
    } else if (key === 'Child') { total += value[index] * prices.Child; }
  });
  return total;
}

//  function animalMap(options) {

//  }

const hourConverter = ((param) => {
  let result = '';
  if (param === 0) {
    result = '00pm';
  } else if (param > 12) {
    result = `${param - 12}pm`;
  } else { result = `${param}am`; }
  return result;
});

const weekSchedule = (() => {
  const obj = {};
  const keys = Object.keys(hours);
  keys.forEach((key) => {
    if (hours[key].open === 0 || hours[key].close === 0) {
      Object.assign(obj, { [key]: 'CLOSED' });
    } else {
      Object.assign(obj, { [key]:
        `Open from ${hourConverter(hours[key].open)} until ${hourConverter(hours[key].close)}`,
      });
    }
  });
  return obj;
});

function schedule(day) {
  const obj = {};
  if (!day) {
    return weekSchedule();
  }

  if (hours[day].open === 0 || hours[day].close === 0) {
    Object.assign(obj, { [day]: 'CLOSED' });
  } else {
    Object.assign(obj, { [day]:
    `Open from ${hourConverter(hours[day].open)} until ${hourConverter(hours[day].close)}` });
  }

  return obj;
}

function oldestFromFirstSpecies(id) {
  const specie = employees.find((emp) => (emp.id === id)).responsibleFor[0];
  const obj = animals.find((animal) => animal.id === specie);
  const { name, sex, age } = obj.residents.reduce((arr, curr) => (arr.age > curr.age ? arr : curr));
  return [name, sex, age];
}

function increasePrices(percentage) {
  const keyPrices = Object.keys(prices);
  keyPrices.forEach((key) => {
    const increased = (prices[key] + (prices[key] * percentage) / 100);
    const finalPrice = Math.floor(increased)
    + Math.ceil((increased - Math.floor(increased)) * 100) / 100;
    prices[key] = finalPrice;
  });
}

const getAnimalName = (arrayId) => {
  const array = [];
  arrayId.forEach((idParam) =>
    animals.forEach((animal) => {
      if (animal.id === idParam) {
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
    employees.forEach((emp) =>
      Object.assign(obj, { [`${emp.firstName} ${emp.lastName}`]:
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
