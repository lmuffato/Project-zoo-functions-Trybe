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

const isXYZ = (x, y, z) => x === y || y === z;

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find(({ name }) => name === animal).residents
    .every((resident) => resident.age > age);
}

function employeeByName(employeeName) {
  return !employeeName ? {} : employees
    .find(({ firstName, lastName }) => isXYZ(firstName, employeeName, lastName));
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return employees.some((emplo) => emplo.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

const gettAllnimals = (acc, { name, residents }) => {
  const obj = acc;
  obj[name] = residents.length;
  return obj;
};

function animalCount(species) {
  return !species ? animals.reduce(gettAllnimals, {}) : animals
    .find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants = 0) {
  return Object.keys(entrants)
    .reduce((acc, cur) => acc + prices[cur] * entrants[cur], 0);
}

const getByInfo = (residents, [gend, includ]) => {
  if (isXYZ('female', gend, 'male')) {
    return residents.filter(({ sex }) => sex === gend).map(({ name }) => name);
  }
  if (includ) return residents.map(({ name }) => name);
};

const getMap = (acc, animal, infos) => {
  const { location, name, residents } = animal;
  const map = acc;

  if (!map[location]) map[location] = [];

  if (infos) {
    const objAnimal = {};
    objAnimal[name] = getByInfo(residents, infos);
    map[location].push(objAnimal);
  } else map[location].push(name);

  return map;
};

const getSorted = (locals, zooMap) => {
  locals.forEach((local) => zooMap[local]
    .forEach((animal) => animal[Object.keys(animal)[0]].sort()));
};

function animalMap(options = 0) {
  const { includeNames, sex, sorted } = options;
  if (!includeNames) return animals.reduce((map, anm) => getMap(map, anm), {});

  const infos = [sex, includeNames];
  const zooMap = animals.reduce((map, animal) => getMap(map, animal, infos), {});

  if (sorted) getSorted(Object.keys(zooMap), zooMap);

  return zooMap;
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
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
