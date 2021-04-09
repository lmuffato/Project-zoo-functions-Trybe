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

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.some((id) => id === animal.id));
}
// Tinha feito com dois forEach mas achei muito melhor a lógica que o Rodrigo Luiz apresentou no plantão, mais concisa.
function animalsOlderThan(animal, age) {
  return animals.find((getAnimal) => getAnimal.name === animal)
    .residents.every(((animalAge) => animalAge.age >= age));
}
function employeeByName(employeeName) {
  if (typeof (employeeName) === 'undefined') return {};
  return employees.filter((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName).shift();
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return newEmployee;
  // seu código aqui
}

function isManager(id) {
  return employees.map((employee) => employee.managers).shift().includes(id);
}

function verifyEmpty(list) {
  if (!list) return [];
  return list;
}
function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const addANewEmployee = {
    id,
    firstName,
    lastName,
    managers: verifyEmpty(managers),
    responsibleFor: verifyEmpty(responsibleFor),
  };
  employees.push(addANewEmployee);
  return employees;
}
function animalList() {
  const defaultAnimalList = {};
  animals.forEach((animal) => {
    defaultAnimalList[animal.name] = animal.residents.length;
  });
  return defaultAnimalList;
}
function animalCount(species) {
  if (!species) return animalList();
  return animals.filter((animal) => (animal.name === species)).shift().residents.length;
}
function valueEntrants(entrants) {
  const totalValue = [];
  Object.entries(entrants).forEach(([key, value]) => totalValue.push(value * prices[key]));
  return totalValue.reduce((total, value) => total + value, 0);
}
function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  return valueEntrants(entrants);
}

// function animalMap(options) {
//   // seu código aqui
// }

function scheduleExceptions(dayName) {
  const defaultSchedule = {}
  if (!dayName) {
    Object.keys(hours).forEach((hour) => {
      if (hour === 'Monday') {
        defaultSchedule[hour] ='CLOSED'
      } else {
       defaultSchedule[hour] = `Open from ${hours[hour].open}am until ${hours[hour].close -12}pm`
      }
    })
  }
  return defaultSchedule
}

function schedule(dayName) {
  if (!dayName) return scheduleExceptions()
  if (dayName === 'Monday') return {Monday:'CLOSED'}
  const scheduleText = `Open from ${hours[dayName].open}am until ${hours[dayName].close -12}pm`
  return { [dayName] : scheduleText }
}

function oldestFromFirstSpecies(id) {
  const getSpecieId = employees.find((employee) => employee.id === id).responsibleFor[0]
  const getAnimalsByEmployee = animals.filter((animal) => animal.id === getSpecieId).shift().residents
  const sortedByAge = getAnimalsByEmployee.sort(function (a,b) {
    return b.age-a.age
  })
  return Object.values(sortedByAge[0])
}

// function increasePrices(percentage) {
//   // seu código aqui
// }

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

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
  // increasePrices,
  createEmployee,
};
