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
  const { animals } = data;
  const arrAnimals = animals.filter(({ id }) => ids.includes(id));
  return arrAnimals;
}

function animalsOlderThan(animal, age) {
  const searchAnimal = data.animals.find(({ name }) => name === animal);
  return searchAnimal.residents.every(({ age: idade }) => idade > age);
}

function employeeByName(employeeName) {
  const objEmployee = data.employees.find(
    ({ firstName, lastName }) =>
      employeeName === firstName || employeeName === lastName,
  );
  return !employeeName ? {} : objEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(thisId) {
  const checkIsManager = data.employees.some((manager) =>
    manager.managers.includes(thisId),
  );
  return checkIsManager;
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  const createObj = { id, firstName, lastName, managers, responsibleFor };
  const addObjEmployee = data.employees.push(createObj);
  return addEmployee;
}

function animalCount(species) {
  const animalObj = data.animals.find(({ name }) => name === species);
  const calcPopul = data.animals.reduce((acc, cur) => {
    acc[cur.name] = cur.residents.length;
    return acc;
  }, {});
  return !species ? calcPopul : animalObj.residents.length;
}

function entryCalculator(entrants) {
  const objIsEmpty = (obj) => Object.keys(obj).length === 0;
  if (!entrants || objIsEmpty(entrants)) return 0;
  const {
    Adult: priceAdult,
    Child: priceChild,
    Senior: princeSenior,
  } = data.prices;
  const listPrices = entrants;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const sumPrinces =
    Adult * priceAdult + Child * priceChild + Senior * princeSenior;
  return sumPrinces;
}

function animalMap(options) {
  const objAnimals = data.animals.reduce((acc, cur) => {
    acc[cur.name] = cur.location;
    return acc;
  }, []);

  // const mapObj = data.animals.reduce();
  // return objAnimals;
}

// console.log(animalMap());

function schedule(_dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  const objManager = data.employees.find(({ id: isId }) => isId === id);
  const searchAnimal = data.animals.find(
    ({ id: idAnimal }) => idAnimal === objManager.responsibleFor[0],
  );
  const olderAnimal = searchAnimal.residents.reduce(
    (acc, { age }) => (acc > age ? acc : age),
    {},
  );
  const newObjAnimal = searchAnimal.residents.find(
    ({ age }) => age === olderAnimal,
  );
  const newArrAnimal = Object.keys(newObjAnimal).map(
    (key) => newObjAnimal[key],
  );
  return newArrAnimal;
}

function increasePrices(_percentage) {
  // seu código aqui
}

// function employeeCoverage(idOrName) {
//   const employeeObj = data.employees;
//   const objAnimal = data.animals;
//   const arrRespon = employeeObj.reduce((acc, cur) => {
//     acc[`${cur.firstName} ${cur.lastName}`] = objAnimal
//       .filter(({ id }) => cur.responsibleFor.includes(id))
//       .map(({ name }) => name);
//     return acc;
//   }, {});

//   return arrRespon;
// }

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
