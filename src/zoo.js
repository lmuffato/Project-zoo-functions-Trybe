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

const { employees } = data;
const { animals } = data;
const { prices } = data;
const { hours } = data;

function animalsByIds(...ids) {
  return animals.filter((animal, index) => animal.id === ids[index]);
}

const filterAnimals = (animal) => [animals.find((eachAnimal) => eachAnimal.name === animal)];

function animalsOlderThan(animalName, animalAge) {
  const foundAnimal = filterAnimals(animalName);
  const [{ residents }] = foundAnimal;
  return residents.every((eachAnimal) => eachAnimal.age > animalAge);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find((eachEmployee) =>
    eachEmployee.firstName === employeeName || eachEmployee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const [{ managers }] = employees;
  return managers.some((eachManager) => (eachManager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

// Para essa função utilizei o repositório do Anderson Nascimento como fonte.
function animalsListBySpecies() {
  return animals.reduce((acc, { name, residents }) => {
    acc[name] = residents.length;
    return acc;
  }, {});
}

function animalCount(specie) {
  if (!specie) {
    return animalsListBySpecies();
  }
  return animals.find((animal) => animal.name === specie).residents.length;
}

// Alguém me ajuda a refatorar esse código, não gostei! Hahaha'
function entryCalculator(entrants) {
  if (entrants === undefined) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const totalAdultPrice = Adult * prices.Adult;
  const totalChildPrice = Child * prices.Child;
  const totalSeniorPrice = Senior * prices.Senior;
  return totalAdultPrice + totalChildPrice + totalSeniorPrice;
}

// const locationsNE = animals.filter((animal) => animal.location === 'NE');
// const locationsNW = animals.filter((animal) => animal.location === 'NW');
// const locationsSE = animals.filter((animal) => animal.location === 'SE');
// const locationsSW = animals.filter((animal) => animal.location === 'SW');

// function optionsEmpty(){
//   return {
//       NE: locationsNE.map((eachAnimal) => eachAnimal.name),
//       NW: locationsNW.map((eachAnimal) => eachAnimal.name),
//       SE: locationsSE.map((eachAnimal) => eachAnimal.name),
//       SW: locationsSW.map((eachAnimal) => eachAnimal.name),
//     }
// }

// function includeNamesOption(){
//   const [{ residents }] = locationsNE;
//   let includeNE;
//   locationsNE.forEach((animal) => {
//     includeNE = {
//       [animal.name]: residents.map((resident) => resident.name),
//     }
//   })
//   return includeNE;
// }
// console.log(includeNamesOption());

// function animalMap(options) {
//   if (!options) {
//     return optionsEmpty();
//   }
//   if (options === { includeNames: true }) {

//   }
// }
function withoutDay() {
  return {
    Tuesday: `Open from ${hours.Tuesday.open}am until ${hours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${hours.Wednesday.open}am until ${hours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${hours.Thursday.open}am until ${hours.Thursday.close - 12}pm`,
    Friday: `Open from ${hours.Friday.open}am until ${hours.Friday.close - 12}pm`,
    Saturday: `Open from ${hours.Saturday.open}am until ${hours.Saturday.close - 12}pm`,
    Sunday: `Open from ${hours.Sunday.open}am until ${hours.Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
}

function getZooHour(day) {
  const openTime = hours[day].open;
  const closeTime = hours[day].close - 12;
  if (!openTime || !closeTime) {
    return 'CLOSED';
  }
  return `Open from ${openTime}am until ${closeTime}pm`;
}

function schedule(dayName) {
  if (!dayName) {
    return withoutDay();
  }
  return {
    [dayName]: getZooHour(dayName),
  };
}

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
  schedule,
  animalCount,
  // animalMap,
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
