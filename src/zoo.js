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
  if (ids.length === 0) return ids;
  if (ids.length === 1) return [data.animals.find((el) => ids[0] === el.id)];
  return data.animals.filter((el) => ids.includes(el.id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(({ name }) => name === animal)
    .residents.every(({ age: ageAnimal }) => ageAnimal >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  const getAllAnimalsAndPopulation = (acc, currentAnimal) => {
    acc[currentAnimal.name] = currentAnimal.residents.length;
    return acc;
  };

  if (species === undefined) {
    return data.animals.reduce(getAllAnimalsAndPopulation, {});
  }

  return data.animals.find(({ name }) => name === species).residents.length;
}

const sumPrice = (acc, [person, qty]) => acc + data.prices[person] * qty;
function entryCalculator(entrants = 0) {
  return Object.entries(entrants).reduce(sumPrice, 0);
}

const localeAnimals = (acc, curr) => {
  if (acc[curr.location]) {
    acc[curr.location].push(curr.name);
  } else {
    acc[curr.location] = [curr.name];
  }
  return acc;
};
const getAnimalsPerLocation = () => data.animals.reduce(localeAnimals, {});

const getAllResidentsNames = (isSorted, sexAnimal = 'all') => (acc, { name, sex }) => {
  if (sexAnimal === 'all' || sexAnimal === sex) acc.push(name);
  if (isSorted) acc.sort();
  return acc;
};
const createOrAddResident = (isSorted, sexAnimal) => (acc, { name, location, residents }) => {
  if (acc[location]) {
    acc[location].push({ [name]: residents.reduce(getAllResidentsNames(isSorted, sexAnimal), []) });
  } else {
    acc[location] = [{ [name]: residents.reduce(getAllResidentsNames(isSorted, sexAnimal), []) }];
  }
  return acc;
};
const getAnimalsPerLocationIncludesTrue = (isSorted, sexAnimal) =>
  data.animals.reduce(createOrAddResident(isSorted, sexAnimal), {});

const getAnimalsPerLocationWithIncludes = (hasIncludeNames, isSorted, sexAnimal) => {
  if (hasIncludeNames) {
    if (sexAnimal !== undefined) return getAnimalsPerLocationIncludesTrue(isSorted, sexAnimal);
    if (isSorted && sexAnimal === undefined) return getAnimalsPerLocationIncludesTrue(isSorted);
    return getAnimalsPerLocationIncludesTrue();
  }
  return getAnimalsPerLocation();
};

function animalMap(options) {
  let output = getAnimalsPerLocation();
  if (!options) return output;
  const hasIncludeNames = !!options.includeNames;
  const isSorted = !!options.sorted;
  const sexAnimal = options.sex;

  output = getAnimalsPerLocationWithIncludes(hasIncludeNames, isSorted, sexAnimal);
  return output;
}

const getWeek = (dayName) => (acc, [key, value]) => {
  if (dayName === undefined || dayName === key) {
    acc[key] = value.open !== 0
      ? `Open from ${value.open}am until ${value.close - 12}pm`
      : 'CLOSED';
  }
  return acc;
};
function schedule(dayName) {
  return Object.entries(data.hours).reduce(getWeek(dayName), {});
}

const findById = (id) => ({ id: idItem }) => idItem === id;
const getFirstSpecieId = (id) =>
  data.employees.find(findById(id)).responsibleFor[0];

function oldestFromFirstSpecies(id) {
  return Object.values(data.animals.find(findById(getFirstSpecieId(id)))
    .residents.sort(({ age: a}, { age: b}) => a - b).reverse()[0]);
}

const round = (value) => Math.round(value * 100) / 100;
const valueMorePercentage = (percentage) => 
  ([key, value]) => [key, value + (value * (0.01 * percentage))];
const updatePrices = ([key, value]) => { data.prices[key] = round(value); };

function increasePrices(percentage) {
  Object.entries(data.prices)
    .map(valueMorePercentage(percentage))
    .forEach(updatePrices);
  return data.prices;
}
const getByIdOrFirstNameOrLastName = (idOrName) =>
  ({ id, firstName, lastName }) =>
    id === idOrName || firstName === idOrName || lastName === idOrName;
const getEmployee = (idOrName) => data.employees.find(getByIdOrFirstNameOrLastName(idOrName));
const getAnimalName = (acc, curr) => {
  acc.push(animalsByIds(curr)[0].name);
  //console.log(acc);
  return acc;
};
const createObjEmployeeWithAnimals = (acc, { firstName, lastName, responsibleFor }) => {
  acc[`${firstName} ${lastName}`] = responsibleFor.reduce(getAnimalName, []);
  return acc;
};
function employeeCoverage(idOrName) {
  if (idOrName === undefined) {
    return data.employees.reduce(createObjEmployeeWithAnimals,{});
  }
  const { firstName, lastName, responsibleFor } = getEmployee(idOrName);
  const result = {};
  result[`${firstName} ${lastName}`] = responsibleFor.reduce(getAnimalName, []);
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
