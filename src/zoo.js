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

const { animals, employees, prices } = data;

function animalsByIds(...ids) {
  if (ids === null || ids === undefined) return [];
  return animals.filter((animal, index) => animal.id === ids[index]);
}

// Com a ajuda do plantão do instrutor Eliezer Queiroz e sugestão da colega Carolina Vasconcellos.

/*
function animalsOlderThan(animal, age) {
  // seu código aqui
}
*/

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  const searchEmployee = employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
  return searchEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers = [], responsibleFor = [] } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  let trueOrFalse;
  const soughtEmployee = employees.find((employee) => employee.id === id);
  if (soughtEmployee.managers.length === 1 || soughtEmployee.managers.length === 0) {
    trueOrFalse = true;
  } else {
    trueOrFalse = false;
  }
  return trueOrFalse;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newEmployee);
}

const animalsCountListComFor = () => {
  const list = {};
  for (let index = 0; index < animals.length; index += 1) {
    list[`${animals[index].name}`] = animals[index].residents.length;
  }
  return list;
};

function animalCount(species) {
  if (species === undefined) {
    return animalsCountListComFor();
  }
  const soughtSpecie = animals.find((animal) => species === animal.name);
  return soughtSpecie.residents.length;
}

// console.log(animals[0].name); // animal.name = nome da especie
// console.log(animals[0].residents.length); animal.residents.length ==> quantidade de animais

function entryCalculator(entrants = {}) {
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  if (entrants === undefined) return 0;
  const totalAdult = Adult * parseFloat(prices.Adult);
  const totalChild = Child * parseFloat(prices.Child);
  const totalSenior = Senior * parseFloat(prices.Senior);
  return parseFloat((totalAdult + totalChild + totalSenior).toPrecision(5));
}

/*
function animalMap(options) {
  // seu código aqui
}
*/
function schedule(dayName) {
  if (dayName === undefined);
}
/*
function oldestFromFirstSpecies(id) {
  const { responsibleFor } = employees;
  employees.filter((employee, index) => {
    if (employee.id === id) {
      responsibleFor.find(animal => {

      });
    }
  });
}
*/
const calculateIncrease = (percent) => 1 + (percent / 100) + 0.00001;

function increasePrices(percentage) {
  const increasePrice = calculateIncrease(percentage);
  prices.Adult = parseFloat((prices.Adult * increasePrice).toPrecision(4));
  prices.Senior = parseFloat((prices.Senior * increasePrice).toPrecision(4));
  prices.Child = parseFloat((prices.Child * increasePrice).toPrecision(4));
}
/*
function employeeCoverage(idOrName) {
  if (idOrName === undefined) {
    employees.reduce((previousValue, value) => {});
  }
}
 */
// Referências:
// http://www.macoratti.net/18/09/js_marr2.htm

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  //  animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  /* animalsOlderThan, */
  /*  oldestFromFirstSpecies, */
  increasePrices,
  createEmployee,
};
