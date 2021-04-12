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

const { animals, employees, hours, prices } = require('./data');
// 1
function animalsByIds(...listOfIdsToSearch) {
  // This guard clause is not necessary, but imo it makes the code prettier
  if (listOfIdsToSearch.length === 0) return [];
  const animalsList = [];
  listOfIdsToSearch.forEach((idToSearchFor) => {
    animalsList.push(animals.find(({ id }) => id === idToSearchFor));
  });
  return animalsList;
}
// 2
function animalsOlderThan(animalName, ageToCheck) {
  const animalMatch = animals.find(({ name }) => name === animalName);
  return animalMatch.residents.every(({ age }) => age >= ageToCheck);
}
// 3
function employeeByName(employeeName) {
  if (typeof employeeName === 'undefined') return ({});
  return employees.find(({ firstName, lastName }) => firstName === employeeName
    || lastName === employeeName);
}
// 4
const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });
// 5
function isManager(idToSearch) {
  return employees.some(({ managers }) => managers.includes(idToSearch));
}
// 6
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
}
// 7
function animalCount(speciesNameToSearch) {
  if (typeof speciesNameToSearch === 'string') {
    return animals.find(({ name }) => name === speciesNameToSearch).residents.length;
  }
  // https://medium.com/@vmarchesin/using-array-prototype-reduce-in-objects-using-javascript-dfcdae538fc8
  return animals.reduce((acc, { name, residents }) => ({ ...acc, [name]: residents.length }), {});
}
// 8
function entryCalculator(entrants) {
  if (typeof entrants === 'undefined') return 0;
  if (Object.keys(entrants).length === 0) return 0;
  const entrantsEntries = Object.entries(entrants);
  return entrantsEntries.reduce((acc, cur) => acc + prices[cur[0]] * cur[1], 0);
}
// 9
const maybeSort = (bool, arr) => (bool ? arr.sort() : arr);
const maybeSex = (sexOption, arrOfObjs) =>
  (sexOption ? arrOfObjs.filter(({ sex }) => sex === sexOption) : arrOfObjs);
const animalsAt = (isSorted, isFiltered) => (givenLoc) =>
  animals.filter(({ location }) => location === givenLoc)
    .reduce((acc, { name: species, residents }) => {
      acc.push({
        [species]:
          maybeSort(isSorted, maybeSex(isFiltered, residents)
            .map(({ name }) => name)),
      });
      return acc;
    }, []);
// https://codeburst.io/javascript-array-distinct-5edc93501dc4
const noNames = (givenLoc) => animals
  .filter(({ location }) => location === givenLoc)
  .map(({ name }) => name);
const template = (callback) =>
  [...new Set(animals.map(({ location }) => location))].reduce((acc, givenLoc) => ({
    ...acc,
    [givenLoc]: callback(givenLoc),
  }),
  {});
function animalMap({ includeNames = false, sorted = false, sex = false } = {}) {
  if (!includeNames) return template(noNames);
  return template(animalsAt(sorted, sex));
}
// 10
const format24HoursToAmPm = (hour) => (hour > 12 ? `${hour - 12}pm` : `${hour}am`);
const message = (open, close) => {
  if (!(open - close)) return 'CLOSED';
  return `Open from ${format24HoursToAmPm(open)} until ${format24HoursToAmPm(close)}`;
};
const schedule = (dayName) => {
  const obj = Object.entries(hours).reduce((acc, [weekday, { open, close }]) =>
    ({ ...acc, [weekday]: message(open, close) }), ({}));
  if (typeof dayName === 'undefined') return obj;
  // https://stackoverflow.com/questions/11508463/javascript-set-object-key-by-variable
  return { [dayName]: obj[dayName] };
};
// 11
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
  return pipe(idMatch, find(employees), prop('responsibleFor'), firstElem,
    pipe(idMatch, find(animals)), pipe(prop('residents'), biggestProp('age')),
    objPropsToArr('name', 'sex', 'age'))(thisId);
}
const toFixed = (num, precision) => {
  function round(digit) {
    const add1 = parseInt(digit, 10) + 1;
    return add1.toString();
  }
  let str = num.toString();
  const start = str.indexOf('.');
  const end = start + precision;
  const roundup = str[end + 1] >= '5';
  if (roundup) {
    str = str.substring(0, end) + round(str[end]);
  } else {
    str = str.substring(0, end + 1);
  }
  return parseFloat(str);
};
// 12
function increasePrices(percentage) {
  Object.keys(prices).forEach((key) => {
    prices[key] = toFixed(prices[key] + prices[key] * (percentage / 100), 2);
  });
}
// 13
function employeeCoverage(idOrName) {
  function fName({ firstName, lastName }) {
    return `${firstName} ${lastName}`;
  }
  const obj = {};
  employees.forEach((employee) => {
    const key = fName(employee);
    const value = employee.responsibleFor.map((givenId) =>
      animals.find(({ id }) => id === givenId).name);
    obj[key] = value;
  });
  if (typeof idOrName === 'undefined') return obj;
  const employee = employees.find(({ id, firstName, lastName }) =>
    [id, firstName, lastName].includes(idOrName));
  const hisFullName = fName(employee);
  return { [hisFullName]: obj[hisFullName] };
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
