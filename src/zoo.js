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

const functionsAnimals = require('./functions/animals');
const functionsEmployee = require('./functions/employee');
const functionsManagement = require('./functions/management');

function animalsByIds(...ids) {
  const emptyParams = ids.length === 0;
  const justOneId = ids.length === 1;

  const { find } = functionsAnimals;

  if (emptyParams) return [];

  if (justOneId) {
    const id = ids[0];
    const foundAnimal = find.byId.oneId(id);
    return [foundAnimal];
  }

  const foundAnimals = find.byId.multipleIds(ids);
  return foundAnimals;
}

function animalsOlderThan(animal, age) {
  const { verify } = functionsAnimals;
  const haveMinimumAge = verify.age.minimumAge(animal, age);
  if (haveMinimumAge) return true;
  return false;
}

function employeeByName(employeeName) {
  const { find } = functionsEmployee;
  const byFirstName = find.byName.firstName(employeeName);
  const byLastName = find.byName.lastName(employeeName);

  if (byFirstName.found) return byFirstName.result;
  if (byLastName.found) return byLastName.result;
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  let { managers, responsibleFor } = associatedWith;

  if (managers === undefined) managers = [];
  if (responsibleFor === undefined) responsibleFor = [];

  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  return newEmployee;
}

function isManager(id) {
  const { verify } = functionsEmployee;
  return verify.byId.oneId.ifIsManager(id);
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const { get } = functionsEmployee;

  const employees = get.employees();

  const newEmployee = createEmployee({ id, firstName, lastName }, { managers, responsibleFor });

  employees.push(newEmployee);
}

function animalCount(species) {
  const { count } = functionsAnimals;

  if (species) return count.oneSpecies.residents(species);

  return count.allSpecies.residents();
}

function entryCalculator(entrants) {
  const { calculate } = functionsManagement;
  const nothingToCalculate = entrants === undefined || Object.entries(entrants).length === 0;

  if (nothingToCalculate) return 0;

  const result = calculate.entrants(entrants);

  return result;
}

function animalMap(options) {
  const { get } = functionsAnimals;
  if (!options || !options.includeNames) return get.all.location();

  return get.all.locations.includeNames(options);
}

// function schedule(dayName) {
//   // seu código aqui
// }

// function oldestFromFirstSpecies(id) {
//   // seu código aqui
// }

// function increasePrices(percentage) {
//   // seu código aqui
// }

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  entryCalculator,
  // schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
