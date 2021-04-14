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
  const { animals } = data;
  const filtered = animals.filter(({ id }) => ids.find((idArray) => idArray === id));

  return filtered;
}

function animalsOlderThan(animal, age) {
  const { animals } = data;
  const { residents } = animals.find(({ name }) => name === animal);
  const isEveryOlder = residents.every(({ age: animalAge }) => animalAge > age);

  return isEveryOlder;
}

function employeeByName(employeeName) {
  const { employees } = data;
  const employeeObject = employees.find(({ firstName, lastName }) => {
    if (firstName === employeeName || lastName === employeeName) return true;
    return false;
  });

  return employeeObject || {};
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };

  return newEmployee;
}

function isManager(id) {
  const { employees } = data;
  const findManager = employees.some(({ managers }) => managers.find((manager) => manager === id));

  return findManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const { employees } = data;
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };

  employees.push(newEmployee);
}

function animalCount(species) {
  const { animals } = data;

  if (species) {
    const speciesArray = animals.find(({ name }) => name === species);
    const speciesCount = speciesArray.residents.length;

    return speciesCount;
  }

  const countObject = animals.reduce((animalsObject, { name, residents }) => {
    const animalsCount = animalsObject;
    animalsCount[name] = residents.length;

    return animalsCount;
  }, {});

  return countObject;
}

function entryCalculator(entrants = {}) {
  const { prices } = data;

  if (!Object.keys(entrants).length) return 0;

  const totalPrice = Object.keys(entrants).reduce((total, personType) => {
    const price = prices[personType];
    const people = entrants[personType];
    const toPay = total + (price * people);

    return toPay;
  }, 0);

  return totalPrice;
}

//  ANIMALMAP FUNCTIONS
function genderFilter(residents, sex) {
  const residentsName = residents.reduce((genders, { name, sex: animalGender }) => {
    const gendersName = genders;

    if (sex === animalGender) gendersName.push(name);

    return gendersName;
  }, []);

  return residentsName;
}

function residentsFilter(residents, sorted, sex) {
  const residentsName = sex ? genderFilter(residents, sex) : residents.map(({ name }) => name);

  if (sorted) residentsName.sort();

  return residentsName;
}

function namesObject(name, residentsName) {
  const obj = {};
  obj[name] = residentsName;

  return obj;
}

function animalMap(options = {}) {
  const { animals } = data;
  const { includeNames, sorted, sex } = options;

  const filtered = animals.reduce((locationFilter, animal) => {
    const { location, name, residents } = animal;
    const residentsName = residentsFilter(residents, sorted, sex);
    const filter = locationFilter;

    if (!filter[location]) filter[location] = [];

    if (includeNames) filter[location].push(namesObject(name, residentsName));
    else filter[location].push(name);

    return filter;
  }, {});

  return filtered;
}

// SCHEDULE FUNCTIONS
function convertHour(hour) {
  const converted = hour - 12;

  return converted;
}

function toHuman({ open, close }) {
  const humanText = `Open from ${open}am until ${convertHour(close)}pm`;

  return open === close ? 'CLOSED' : humanText;
}

function schedule(dayName) {
  const { hours } = data;
  const oneDay = {};

  if (dayName) {
    oneDay[dayName] = toHuman(hours[dayName]);

    return oneDay;
  }

  const allWeek = Object.keys(hours).reduce((days, day) => {
    const daysObj = days;
    daysObj[day] = toHuman(hours[day]);

    return daysObj;
  }, {});

  return allWeek;
}

// OLDESTFROMFIRSTSPECIES FUNCTIONS
function catchOldestAnimal({ residents }) {
  const oldestAnimal = residents.reduce((oldest, actual) => {
    const { age: oldestAge } = oldest;
    const { age: actualAge } = actual;

    return actualAge > oldestAge ? actual : oldest;
  });

  return Object.values(oldestAnimal);
}

function oldestFromFirstSpecies(id) {
  const { employees, animals } = data;
  const { responsibleFor } = employees.find(({ id: employeeId }) => id === employeeId);
  const firstEmployeeAnimals = animals.find(({ id: animalId }) => animalId === responsibleFor[0]);
  const oldestAnimal = catchOldestAnimal(firstEmployeeAnimals);

  return oldestAnimal;
}

function increasePrices(percentage) {
  const { prices } = data;
  // https://trybecourse.slack.com/archives/C01L16B9XC7/p1618319128014700?thread_ts=1618318862.014000&cid=C01L16B9XC7
  Object.entries(prices).forEach((actualPrice) => {
    const [age, price] = actualPrice;
    const newPrice = price + (price * (percentage / 100));
    prices[age] = Math.round(newPrice * 100) / 100;
  }, {});
}

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
