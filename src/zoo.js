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
  return animals.filter(({ id }) => ids.includes(id));
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

const getDate = (acc, arr) => {
  const [week, time] = arr;
  const { open, close } = time;
  const obj = acc;
  obj[week] = open === 0 ? 'CLOSED' : `Open from ${open}am until ${close - 12}pm`;
  return obj;
};

const getWeek = () => ({
  Tuesday: 0,
  Wednesday: 1,
  Thursday: 2,
  Friday: 3,
  Saturday: 4,
  Sunday: 5,
  Monday: 6,
});

function schedule(dayName) {
  if (!dayName) return Object.entries(hours).reduce(getDate, {});
  const day = getWeek()[dayName];
  return getDate({}, Object.entries(hours)[day]);
}

const getOldestSpecie = (acc, anm) => {
  let result = acc;
  result = anm.age > acc.age ? anm : acc;
  return result;
};

function oldestFromFirstSpecies(idE) {
  const firstId = employees.find(({ id }) => id === idE).responsibleFor[0];
  const { name, sex, age } = animals
    .find(({ id }) => id === firstId).residents
    .reduce(getOldestSpecie);

  return [name, sex, age];
}

const getPrice = (info, percentage) => {
  const [age, price] = info;
  prices[age] = (Math.round(price * percentage) + price * 100) / 100;
};

function increasePrices(percentage) {
  const arrPrices = Object.entries(prices);
  return arrPrices.forEach((info) => getPrice(info, percentage));
}

const getEmplos = (acc, emplo) => {
  const { firstName, lastName, responsibleFor } = emplo;
  const full = `${firstName} ${lastName}`;
  const obj = acc;

  obj[full] = responsibleFor
    .map((idA) => animals.find(({ id }) => id === idA).name);

  return obj;
};

const getEmplo = (emplo, check, idOrName) => {
  const { firstName, lastName, id } = emplo;
  return check ? isXYZ(firstName, idOrName, lastName) : id === idOrName;
};

function employeeCoverage(idOrName) {
  if (!idOrName) return employees.reduce(getEmplos, {});

  const isName = idOrName.split('').every((carac) => Number.isNaN(Number(carac)));
  return getEmplos({}, employees.find((emplo) => getEmplo(emplo, isName, idOrName)));
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
