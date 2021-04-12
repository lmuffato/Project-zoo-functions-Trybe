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

const { hours } = require('./data');
const data = require('./data');
// const { animals } = require('./data');

function animalsByIds(...ids) {
  const { animals } = data;
  return animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  const { animals } = data;
  return animals.find(({ name }) => name === animal).residents.every(({ age: agersAnimals }) =>
    agersAnimals >= age);
}

function employeeByName(employeeName) {
  const { employees } = data;
  return (!employeeName) ? {} : employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const { employees } = data;
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const { employees } = data;
  const employee = createEmployee({ id, firstName, lastName }, { managers, responsibleFor });
  employees.push(employee);
}

function animalCount(species) {
  const { animals } = data;
  if (!species) {
    return animals.reduce((acc, { name, residents }) => {
      acc[name] = residents.length;
      return acc;
    }, {});
  }
  return animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  const { prices } = data;
  return Object.entries(entrants).map(([key, value]) => prices[key] * value)
    .reduce((acc, totalPrice) => acc + totalPrice);
}

// Implementação item 1 requisito 9:
const mappingAnimalsTypesByLocation = (animals, location) => animals.filter((animal) =>
  (animal.location === location)).map((animal) => animal.name);
// Implementação item 2 e 3 requisito 9:

function getAnimalsNameSexAll(animals, arrayNames, type) {
  animals.forEach((animal) => {
    animal.residents.forEach((element) => {
      if (animal.name === type) {
        arrayNames.push(element.name);
      }
    });
  });
  return arrayNames;
}

function getAnimalsNameSex(animals, type, sex = 'all') {
  const arrayNames = [];
  if (sex === 'all') {
    getAnimalsNameSexAll(animals, arrayNames, type);
  }
  animals.forEach((animal) => {
    animal.residents.forEach((element) => {
      if (animal.name === type && element.sex === sex) {
        arrayNames.push(element.name);
      }
    });
  });
  return arrayNames;
}

const getAnimalsName = (animals, type, sorted, sex) => {
  let arrayNames = [];
  const animalsNameSex = getAnimalsNameSex(animals, type, sex);
  arrayNames = animalsNameSex;
  if (sorted === true) {
    return arrayNames.sort();
  }
  return arrayNames;
};

const mappingAnimalsNamesByTypes = (animals, location, sorted, sex) => {
  const animalsTypesByLocation = mappingAnimalsTypesByLocation(animals, location);
  return animalsTypesByLocation.map((typeAnimal) =>
    ({ [typeAnimal]: getAnimalsName(animals, typeAnimal, sorted, sex) }));
};
// Implementação item 4 requisito 9
const showAnimalsBy = (animals, sorted = false, sex = 'all') =>
  animals.reduce((acc, curr) => {
    acc[curr.location] = mappingAnimalsNamesByTypes(animals, curr.location, sorted, sex);
    return acc;
  }, {});

const showAnimals = (animals) =>
  animals.reduce((acc, curr) => {
    acc[curr.location] = mappingAnimalsTypesByLocation(animals, curr.location);
    return acc;
  }, {});

function animalMap(options) {
  const { animals } = data;
  if (!options) return showAnimals(animals);
  if (Object.keys(options).includes('sex') && !Object.keys(options)
    .includes('includeNames')) {
    return showAnimals(animals);
  }
  const { sorted = false, sex = 'all' } = options;
  return showAnimalsBy(animals, sorted, sex);
}

const hoursPM = {
  12: '12pm',
  13: '1pm',
  14: '2pm',
  15: '3pm',
  16: '4pm',
  17: '5pm',
  18: '6pm',
  19: '7pm',
  20: '8pm',
  21: '9pm',
  22: '10pm',
  23: '11pm',
};

const hoursAM = {
  0: '12am',
  1: '1am',
  2: '2am',
  3: '3am',
  4: '4am',
  5: '5am',
  6: '6am',
  7: '7am',
  8: '8am',
  9: '9am',
  10: '10am',
  11: '1am',
};

function formatData(open, close) {
  if (!open && !close) {
    return 'CLOSED';
  }
  return `Open from ${hoursAM[open]} until ${hoursPM[close]}`;
}

function schedule(dayName) {
  const entriesHours = Object.entries(hours);
  const keyHours = Object.keys(hours);
  if (!dayName) {
    return entriesHours.reduce((acc, [weekday, { open, close }]) => {
      acc[weekday] = formatData(open, close);
      return acc;
    }, {});
  }
  const values = Object.values(entriesHours[keyHours.indexOf(dayName)]);
  const [weekday, { open, close }] = values;
  return {
    [weekday]: formatData(open, close),
  };
}

function oldestFromFirstSpecies(id) {
  const { employees, animals } = data;
  const responsible = employees.filter((employee) => employee.id === id)[0].responsibleFor;
  const animalsResponsible = animals.filter((animal) => responsible.includes(animal.id));
  const animalOlder = animalsResponsible.map((animal) => animal.residents
    .reduce((acc, curr) => (acc.age > curr.age ? acc : curr), 0))
    .reduce((acc, curr) => (acc.age > curr.age ? acc : curr));
  return Object.values(animalOlder);
}

function increasePrices(percentage) {
  const percentageValue = (percentage / 100) + 1;
  console.log(percentageValue);
  const { prices } = data;
  const visitorsTypes = Object.keys(prices);
  visitorsTypes.forEach((visitorType) => {
    const visitorsPrices = prices[visitorType] * percentageValue;
    prices[visitorType] = Number(((visitorsPrices
      - Math.floor(visitorsPrices)) + 0.001).toFixed(2)) + Math.trunc(visitorsPrices);
  });
}

function animalsList(responsibleFor) {
  const { animals } = data;
  return responsibleFor.map((idResponsible) => animals
    .find(({ id: idAnimal }) => idAnimal === idResponsible).name);
}

function employeeCoverage(idOrName) {
  const { employees } = data;
  const responsible = employees.filter((employee) =>
    (employee.id === idOrName || employee.firstName.includes(idOrName)
     || employee.lastName.includes(idOrName)));
  const employeesList = employees.reduce((acc, curr) => {
    const fullName = `${curr.firstName} ${curr.lastName}`;
    acc[fullName] = animalsList(curr.responsibleFor);
    return acc;
  }, {});
  if (!idOrName) return employeesList;
  const oneEmployee = {};
  const fullName = `${responsible[0].firstName} ${responsible[0].lastName}`;
  oneEmployee[fullName] = employeesList[fullName];
  return oneEmployee;
}
console.log(employeeCoverage('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));
// console.log(employeeCoverage('Nelson'));
// console.log(employeeCoverage('Nigel'));
// console.log(employeeCoverage());

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
