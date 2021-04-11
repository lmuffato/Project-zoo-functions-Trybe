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

function animalsByIds(...listOfIdsToSearch) {
  // This guard clause is not necessary, but imo it makes the code prettier
  if (listOfIdsToSearch.length === 0) return [];
  const { animals } = data;
  const animalsList = [];
  listOfIdsToSearch.forEach((idToSearchFor) => {
    animalsList.push(animals.find(({ id }) => id === idToSearchFor));
  });
  return animalsList;
}

function animalsOlderThan(animalName, ageToCheck) {
  const { animals } = data;
  const animalMatch = animals.find(({ name }) => name === animalName);
  return animalMatch.residents.every(({ age }) => age >= ageToCheck);
}

function employeeByName(employeeName) {
  if (typeof employeeName === 'undefined') return ({});
  const { employees } = data;
  return employees.find(({ firstName, lastName }) => firstName === employeeName
    || lastName === employeeName);
}

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

function isManager(idToSearch) {
  const { employees } = data;
  return employees.some(({ managers }) => managers.includes(idToSearch));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const { employees } = data;
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
}

function animalCount(speciesNameToSearch) {
  const { animals } = data;
  if (typeof speciesNameToSearch === 'string') {
    return animals.find(({ name }) => name === speciesNameToSearch).residents.length;
  }
  // https://medium.com/@vmarchesin/using-array-prototype-reduce-in-objects-using-javascript-dfcdae538fc8
  return animals.reduce((acc, { name, residents }) => ({ ...acc, [name]: residents.length }), {});
}

function entryCalculator(entrants) {
  if (typeof entrants === 'undefined') return 0;
  if (Object.keys(entrants).length === 0) return 0;
  const { prices } = data;
  const entrantsEntries = Object.entries(entrants);
  return entrantsEntries.reduce((acc, cur) => acc + prices[cur[0]] * cur[1], 0);
}

const getLocations = (array) => {
  const locations = [];
  array.forEach((item) => {
    if (!locations.includes(item.location)) { locations.push(item.location); }
  });
  return locations;
};
const createEmptyDictionary = (array) => array.reduce((acc, cur) => ({ ...acc, [cur]: [] }), {});
const populateDictionary = (dict, entries) => {
  entries.forEach((item) => {
    const { location } = item; // NE for example
    dict[location].push(item); // pushes the ENTIRE OBJECT
  });
};
const noName = (animals) => {
  const animalList = [];
  animals.forEach(({ name }) => animalList.push(name));
  return animalList;
};
const withName = (animals) => {
  const animalList = [];
  animals.forEach(({ name, residents }) => {
    const xablau = { [name]: [] };
    residents.forEach(({ name: animalName }) => {
      xablau[name].push(animalName);
    });
    animalList.push(xablau);
  });
  return animalList;
};
const formatDictionary = (dict, callback) => {
  const toReturn = {};
  Object.entries(dict).forEach(([location, animals]) => {
    toReturn[location] = callback(animals);
  });
  return (toReturn);
};
const alphabeticallyCriteria = (elemA, elemB) => {
  if (elemA > elemB) return 1;
  if (elemA < elemB) return -1;
  return 0;
};
// const sexCriteria = (sex) => (resident) => resident.sex === sex;

const maybeSortNames = (dict, arg) => {
  if (!arg) return dict;
  const toReturn = JSON.parse(JSON.stringify(dict));
  Object.entries(toReturn).forEach(([location, arrayOfAnimals]) => {
    arrayOfAnimals.forEach(({ residents }) => {
      // The object I'm modifying below lives in this scope, there no problem modifying it
      // eslint-disable-next-line no-param-reassign
      residents.sort((a, b) => alphabeticallyCriteria(a.name, b.name));
    });
  });
  return toReturn;
};
// https://stackoverflow.com/questions/37318808/what-is-the-in-place-alternative-to-array-prototype-filter
function filterInPlace(a, callback) {
  let j = 0;
  a.forEach((e, i) => {
    if (callback.call(null, e, i, a)) {
      // eslint-disable-next-line no-param-reassign
      if (i !== j) a[j] = e;
      j += 1;
    }
  });

  // eslint-disable-next-line no-param-reassign
  a.length = j;
  return a;
}
const maybeFilterAnimals = (dict, arg) => {
  if (!arg) return dict;
  const toReturn = JSON.parse(JSON.stringify(dict));
  Object.entries(toReturn).forEach(([location, arrayOfAnimals]) => {
    arrayOfAnimals.forEach(({ residents }) => {
      // The object I'm modifying below lives in this scope, there no problem modifying it
      // eslint-disable-next-line no-param-reassign
      residents = filterInPlace(residents, (resident) => resident.sex === arg);
    });
  });
  return toReturn;
};

// const sortAnimalsByName = (dict, sortingMethod) => dict.sort(sortingMethod);
// const filterAnimalsBySex = (dict, sexData) => dict.filter(sexCriteria(sexData));
/* const maybeDo = (bool, callback, arg, dict) => {
  if (!arg) return dict;
  const toReturn = { ...dict };
  Object.entries(toReturn).forEach(([_, arrayOfAnimals]) => {
    arrayOfAnimals.forEach(({ residents }) => {
      // The object I'm modifying below lives in this scope, there no problem modifying it
      // eslint-disable-next-line no-param-reassign
      residents = callback(residents, arg);
    });
  });
  return toReturn;
}; */

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters#destructured_parameter_with_default_value_assignment
function animalMap({ includeNames = false, sorted = false, sex = false } = {}) {
  // const { includeNames = false, sorted = false, sex = false } = options || {};
  const { animals } = data;
  const locations = getLocations(animals);
  const animalsDividedByLocation = createEmptyDictionary(locations);
  populateDictionary(animalsDividedByLocation, animals);
  if (!includeNames) return formatDictionary(animalsDividedByLocation, noName);
  const obj1 = maybeFilterAnimals(animalsDividedByLocation, sex);
  const obj2 = maybeSortNames(obj1, sorted);
  const obj3 = formatDictionary(obj2, withName);
  return obj3;
  // return (formatDictionary(maybeDo(filterAnimalsBySex, sex, maybeDo), withName));
}// format, maybe filter, maybe sort
animalMap({ includeNames: true, sex: 'female', sorted: true });
const format24HoursToAmPm = (hour) => (hour > 12 ? `${hour - 12}pm` : `${hour}am`);

const message = (open, close) => {
  if (!(open - close)) return 'CLOSED';
  return `Open from ${format24HoursToAmPm(open)} until ${format24HoursToAmPm(close)}`;
};

const schedule = (dayName) => {
  const { hours } = data;
  const obj = Object.entries(hours).reduce((acc, [weekday, { open, close }]) =>
    ({ ...acc, [weekday]: message(open, close) }), ({}));
  if (typeof dayName === 'undefined') return obj;
  // https://stackoverflow.com/questions/11508463/javascript-set-object-key-by-variable
  return { [dayName]: obj[dayName] };
};
// ----- Auxiliary functions ----- //
const curry = (func) => (...args) => func.bind(null, ...args);
const pipe = (...fns) => (...args) => fns.reduce((acc, func) => func(acc), ...args);
const find = curry((arr, expBool) => arr.find(expBool));
const prop = curry((propName, obj) => obj[propName]);
const firstElem = (arr) => arr[0];
const idMatch = (reference) => ({ id }) => id === reference;
const biggestProp = curry((p, arrayOfIntegers) =>
  arrayOfIntegers.reduce((acc, cur) => (acc[p] > cur[p] ? acc : cur), { [p]: 0 }));
const objPropsToArr = (...args) => (obj) => args.map((p) => obj[p]);
// ----- Business specific ----- //
function oldestFromFirstSpecies(thisId) {
  const { employees, animals } = data;
  return pipe(idMatch, find(employees), prop('responsibleFor'), firstElem,
    pipe(idMatch, find(animals)), pipe(prop('residents'), biggestProp('age')),
    objPropsToArr('name', 'sex', 'age'))(thisId);
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
