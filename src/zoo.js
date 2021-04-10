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

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.some((id) => id === animal.id));
}

function animalsOlderThan(animal, age) {
  const selectedAnimals = animals.find((resident) => resident.name === animal).residents;
  return selectedAnimals.every((name) => name.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find((employee) => employeeName === employee.firstName
    || employeeName === employee.lastName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  let result = false;
  employees.forEach((employee) => {
    employee.managers.forEach((manager) => {
      if (manager === id) {
        result = true;
      }
    });
  });
  return result;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  let result = {};
  if (species === undefined) {
    animals.forEach((animal) => {
      const { name } = animal;
      result[name] = animal.residents.length;
    });
  } else {
    result = animals.find((animal) => animal.name === species).residents.length;
  }
  return result;
}

function entryCalculator(entrants) {
  if (entrants === undefined) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const totalAdult = Adult * prices.Adult;
  const totalChild = Child * prices.Child;
  const totalSenior = Senior * prices.Senior;
  return totalAdult + totalChild + totalSenior;
}
const location = (coord) => animals.filter((animal) => animal.location === coord);
const getSpecies = (array) => array.map((animal) => animal.name);
const getAnimalsName = (array) => array.map((item) => item.residents.map((animal) => animal.name));
function getAnimalsNameBySex(array, gender) {
  const residents = array.map((item) => item.residents);
  const filter = residents.map((resident) => resident
    .filter((animal) => animal.sex === gender)
    .map((one) => one.name));
  return filter;
}

const animalsNamesObjectBySex = (array, gender) => {
  const species = getSpecies(array);
  const names = getAnimalsNameBySex(array, gender);
  return species.map((specie, index) => ({ [specie]: names[index] }));
};
const animalsNamesObject = (array) => {
  const species = getSpecies(array);
  const names = getAnimalsName(array);
  return species.map((specie, index) => ({ [specie]: names[index] }));
};

const animalsNamesObjectSorted = (array) => {
  const species = getSpecies(array);
  const names = getAnimalsName(array);
  return species.map((specie, index) => ({ [specie]: names[index].sort() }));
};

function returnObject(coordenadas, fn) {
  const object = {};
  coordenadas.forEach((coordenada) => {
    object[coordenada] = fn(location(coordenada));
  });
  return object;
}

function returnObjectBySex(coordenadas, fn, gender) {
  const object = {};
  coordenadas.forEach((coordenada) => {
    object[coordenada] = fn(location(coordenada), gender);
  });
  return object;
}

function animalMap(options) {
  const coordenadas = ['NE', 'NW', 'SE', 'SW'];
  if (!options) return returnObject(coordenadas, getSpecies);
  if (options.includeNames) {
    if (options.sorted) return returnObject(coordenadas, animalsNamesObjectSorted);
    if (options.sex) {
      const { sex } = options;
      return returnObjectBySex(coordenadas, animalsNamesObjectBySex, sex);
    }
    return returnObject(coordenadas, animalsNamesObject);
  }
}
console.log(animalMap({ includeNames: true, sex: 'male' }));

const getScheduleDay = (day) => {
  const openTime = hours[day].open;
  const closingTime = hours[day].close;
  if (openTime === 0 && closingTime === 0) return 'CLOSED';
  return `Open from ${openTime}am until ${closingTime - 12}pm`;
};

function schedule(dayName) {
  const result = {};
  const days = Object.keys(hours);
  if (dayName === undefined) {
    days.forEach((day) => {
      result[day] = getScheduleDay(day);
    });
  } else {
    result[dayName] = getScheduleDay(dayName);
  }
  return result;
}
function oldestFromFirstSpecies(id) {
  const firstSpecie = employees.find((employee) => employee.id === id).responsibleFor[0];
  const resident = animals.find((animal) => animal.id === firstSpecie)
    .residents
    .sort((a, b) => (b.age) - (a.age))[0];
  const { name, sex, age } = resident;
  return [name, sex, age];
}

function increasePrices(percentage) {
  const increase = (percentage / 100) + 1;
  const keys = Object.keys(prices);
  keys.forEach((key) => {
    const number = prices[key] * increase;
    const result = Math.round(number * 100) / 100;
    prices[key] = result;
  });
  return prices;
}

function getAnimals(array) {
  return array.map((animalId) => animals.find((animal) => animal.id === animalId).name);
}

function getAnimalsNames(employee) {
  const animalsResponsible = employee.responsibleFor;
  const animalsNames = getAnimals(animalsResponsible);
  return animalsNames;
}

function employeeCoverage(idOrName) {
  const result = {};
  if (idOrName !== undefined) {
    const person = employees.find((employee) => idOrName === employee.id
      || idOrName === employee.firstName
      || idOrName === employee.lastName);
    const fullName = `${person.firstName} ${person.lastName}`;
    result[fullName] = getAnimalsNames(person);
  } else {
    employees.forEach((employee) => {
      const fullName = `${employee.firstName} ${employee.lastName}`;
      result[fullName] = getAnimalsNames(employee);
    });
  }
  return result;
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
