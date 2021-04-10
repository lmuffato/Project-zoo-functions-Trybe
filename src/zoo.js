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
const maybeSortNames = (dict, bool) => {
  if (!bool) return dict;
};
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters#destructured_parameter_with_default_value_assignment
function animalMap(options) {
  const { includeNames = false, sorted = false, sex = false } = options || {};
  const { animals } = data;
  const locations = getLocations(animals);
  const animalsDividedByLocation = createEmptyDictionary(locations);
  populateDictionary(animalsDividedByLocation, animals);
  if (!includeNames) return formatDictionary(animalsDividedByLocation, noName);
  const formattedDict = formatDictionary(animalsDividedByLocation, withName);
  return (maybeSortNames(formattedDict, sorted));
}
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
