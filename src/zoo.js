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

const { animals } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.includes(animal.id));
}

/*
function animalsOlderThan(animal, age) {
const obj = animals.find((anim) => anim.name === animal); // nesse caso, o find sozinho retorna um obj, mas depois do .residents, ele vira array
return obj.residents.every((anim2) => anim2.age > age);
}
*/

function animalsOlderThan(animal, ageA) {
  return animals
    .find(({ name }) => name === animal).residents
    .every(({ age }) => age > ageA);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(ids) {
  const emp = employees.find(({ id }) => id === ids).managers;
  if (emp.length === 0 || emp.length === 1) {
    return true;
  }
  return false;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const obj = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(obj);
}

function animalCount(species) {
  if (!species) {
    return animals
      .map((animal) => ({ [animal.name]: animal.residents.length }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});

    // const { name, residents: { length } } = animal;
    // return { [name]: length };
  }
  return animals.find((animal) => animal.name === species).residents.length;
}

function entryCalculator(entrants = 0) {
  return Object.keys(entrants).reduce((acc, curr) => acc + (entrants[curr] * prices[curr]), 0);
}

// function animalMap(options) {}

const returnObject = (obj, key) => {
  const object = obj;
  if (hours[key].open !== 0) {
    object[key] = `Open from ${hours[key].open}am until ${hours[key].close - 12}pm`;
  } else {
    object[key] = 'CLOSED';
  }
  return object;
};

function schedule(dayName) {
  if (!dayName) {
    return Object.keys(hours).reduce((acc, curr) => returnObject(acc, curr), {});
  }
  return returnObject({}, dayName);
}

function oldestFromFirstSpecies(ids) {
  const firstSpecies = employees.find(({ id }) => id === ids).responsibleFor[0];
  const resident = animals.find(({ id }) => id === firstSpecies).residents;
  const { name, sex, age } = resident.reduce((acc, curr) => {
    if (curr.age > acc.age) {
      return curr;
    }
    return acc;
  });
  const result = [name, sex, age];
  return result;
}

const getPrice = (entry, percentage) => {
  const [age, price] = entry;
  prices[age] = (Math.round(price * percentage) + price * 100) / 100;
};

function increasePrices(percentage) {
  const entries = Object.entries(prices); // retorna array dos valores;
  entries.forEach((entry) => getPrice(entry, percentage));
  return prices;
}

// function employeeCoverage(idOrName) {}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  // animalMap,
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
