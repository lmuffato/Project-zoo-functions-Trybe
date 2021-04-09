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
  if (!ids) return [];
  return animals.filter((animal) => {
    return ids.includes(animal.id);
  });
}

function animalsOlderThan(animal, age) {
  const animalFromThatSpecies = animals.find(({name}) => {return name === animal});
  return animalFromThatSpecies.residents.every((resident) => resident.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find((employee => {
    return employee.firstName === employeeName || employee.lastName === employeeName;
  }));
}

function createEmployee(personalInfo, associatedWith) {
  const {id, firstName, lastName} = personalInfo;
  const {managers, responsibleFor} = associatedWith;
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor
  };
  return newEmployee;
}

function isManager(id) {
  return '0e7b460e-acf4-4e17-bcb3-ee472265db83' === id;
}

function addEmployee(id, firstName, lastName, managers=[], responsibleFor=[]) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor
  };
  employees.push(newEmployee);
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, {name, residents}) => {
      acc[name] = residents.length;
      return acc;
    }, {});
  };
  const animalFromThatSpecies = animals.find(({name}) => name === species);
  return animalFromThatSpecies.residents.length;
}

function entryCalculator(entrants={}) {
  if (!entrants || entrants === {}) return 0;
  const {Adult=0, Child=0, Senior=0} = entrants;
  const finalPrice = (Adult * 49.99) + (Child * 20.99) + (Senior * 24.99);
  return finalPrice;
}

const locations = ['NE', 'NW', 'SE', 'SW'];

function categorizeAnimals() {
  const returnedValue = {};
  locations.forEach((lct) => {
    const filteredAnimals = animals.filter(({location}) => location === lct);
    returnedValue[lct] = filteredAnimals.map((animal) => { return animal.name});
  });
  return returnedValue;
};

function categorizeAnimalsWithName(sexo, ordenar) {
  const returnedValue = {};
  locations.forEach((lct) => {
    const filteredAnimals = animals.filter(({location}) => location === lct);
    const animalsArray = [];
    filteredAnimals.forEach(({name, residents}) => {
      const animalObj = {};
      if (sexo !== false) {
        residents = residents.filter((resident) => resident.sex === sexo);
      }
      animalObj[name] = (ordenar) ? residents.map(({name}) => name).sort() : residents.map(({name}) => name);
      animalsArray.push(animalObj);
    });
    returnedValue[lct] = animalsArray;
  });
  return returnedValue;
}

function animalMap(options) {
  if (!options) {
    return categorizeAnimals();
  }
  const {includeNames=false, sex=false, sorted=false} = options;
  if (includeNames === true) {
    return categorizeAnimalsWithName(sex, sorted);
  }
  return categorizeAnimals();
};

function schedule(dayName) {
  const scheduleObject = {};
  if (!dayName) {
    for (day in hours) {
      scheduleObject[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    };
    scheduleObject['Monday'] = 'CLOSED';
    return scheduleObject;
  };
  if (dayName === 'Monday') { scheduleObject[dayName] = 'CLOSED'; return scheduleObject };
  scheduleObject[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
  return scheduleObject;
}

function oldestFromFirstSpecies(id) {
  const firstAnimalManaged = employees.find((employee) => employee.id === id).responsibleFor[0];
  const animal = animals.find((animal) => animal.id === firstAnimalManaged);
  const oldResidentAge = animal.residents.reduce((acc, curr) => (acc > curr.age) ? acc : curr.age);
  const {name, sex, age} = animal.residents.find((resident) => resident.age === oldResidentAge);
  return [name, sex, age];
}

function increasePrices(percentage) {
  const perc = (percentage + 100) /100;
  const keys = Object.keys(prices);
  keys.map((age) => {
    let num = (prices[age] * perc)
    let decimalPart = parseFloat((num % 1).toFixed(3));
    let serializedNum = (Math.ceil(decimalPart*100) /100) + Math.floor(num);
    prices[age] = serializedNum;
  });
}

function employeeCoverage(idOrName) {
  
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
