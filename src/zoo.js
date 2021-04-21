const { animals, employees, hours, prices } = require('./data');
// 1
const animalsByIds = (...listOfIdsToSearch) => {
  // This guard clause is not necessary, but imo it makes the code prettier
  if (listOfIdsToSearch.length === 0) return [];
  return listOfIdsToSearch.reduce((acc, idToSearchFor) =>
    (acc.push(animals.find(({ id }) => id === idToSearchFor)) ? acc : null),
  []);
};
// 2
const animalsOlderThan = (animalName, ageToCheck) =>
  animals.find(({ name }) => name === animalName).residents.every(({ age }) => age >= ageToCheck);
// 3
const employeeByName = (employeeName) => {
  if (typeof employeeName === 'undefined') return ({});
  return employees.find(({ firstName, lastName }) => firstName === employeeName
    || lastName === employeeName);
};
// 4
const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });
// 5
const isManager = (idToSearch) => employees.some(({ managers }) => managers.includes(idToSearch));
// 6
const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) =>
  employees.push({ id, firstName, lastName, managers, responsibleFor });
// 7
const animalCount = (speciesNameToSearch) => {
  // https://medium.com/@vmarchesin/using-array-prototype-reduce-in-objects-using-javascript-dfcdae538fc8
  if (typeof speciesNameToSearch === 'undefined') {
    return animals.reduce((acc, { name, residents }) => ({ ...acc, [name]: residents.length }), {});
  }
  return animals.find(({ name }) => name === speciesNameToSearch).residents.length;
};
// 8
const entryCalculator = (entrants) => {
  if (typeof entrants === 'undefined') return 0;
  if (Object.keys(entrants).length === 0) return 0;
  return Object.entries(entrants).reduce((acc, [key, value]) => acc + prices[key] * value, 0);
};
// 9
const maybeSort = (bool, arr) => (bool ? arr.sort() : arr);
const maybeFilterBySex = (sexOption, arrOfObjs) =>
  (sexOption ? arrOfObjs.filter(({ sex }) => sex === sexOption) : arrOfObjs);
const withResidentsNames = (isSorted, maybeSexOption) => (givenLoc) =>
  animals.filter(({ location }) => location === givenLoc)
    .reduce((acc, { name: species, residents }) =>
      (acc.push({
        [species]: maybeSort(isSorted,
          maybeFilterBySex(maybeSexOption, residents).map(({ name }) => name)),
      }) ? acc : null), []);
const onlySpecieName = (givenLoc) => animals
  .filter(({ location }) => location === givenLoc)
  .map(({ name }) => name);
// https://codeburst.io/javascript-array-distinct-5edc93501dc4
const template = (callback) =>
  [...new Set(animals.map(({ location }) => location))].reduce((acc, givenLoc) => ({
    ...acc,
    [givenLoc]: callback(givenLoc),
  }),
  {});
const animalMap = ({ includeNames = false, sorted = false, sex = false } = {}) =>
  (includeNames ? template(withResidentsNames(sorted, sex)) : template(onlySpecieName));
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
const oldestFromFirstSpecies = (thisId) => pipe(
  idMatch, find(employees), prop('responsibleFor'),
  firstElem, pipe(idMatch, find(animals)),
  pipe(prop('residents'), biggestProp('age')), objPropsToArr('name', 'sex', 'age'),
)(thisId);
// 12
const toFixed = (num, precision) => {
  function round(digit) {
    return (parseInt(digit, 10) + 1).toString();
  }
  let str = num.toString();
  const end = str.indexOf('.') + precision;
  if (str[end + 1] >= '5') {
    str = str.substring(0, end) + round(str[end]);
  } else {
    str = str.substring(0, end + 1);
  }
  return parseFloat(str);
};
const increasePrices = (percentage) => {
  Object.keys(prices).forEach((key) => {
    prices[key] = toFixed(prices[key] + prices[key] * (percentage / 100), 2);
  });
};
// 13
const employeeCoverage = (idOrName) => {
  function fName({ firstName, lastName }) {
    return `${firstName} ${lastName}`;
  }
  const allEmployeesCoverage = employees.reduce((acc, { firstName, lastName, responsibleFor }) => ({
    ...acc,
    [fName({ firstName, lastName })]: responsibleFor.map((givenId) =>
      animals.find(({ id }) => id === givenId).name),
  }), {});
  if (typeof idOrName === 'undefined') return allEmployeesCoverage;
  const hisFullName = fName(employees.find(({ id, firstName, lastName }) =>
    [id, firstName, lastName].includes(idOrName)));
  return { [hisFullName]: allEmployeesCoverage[hisFullName] };
};

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
