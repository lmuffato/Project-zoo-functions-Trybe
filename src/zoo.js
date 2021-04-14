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

const { animals, employees, prices, hours } = require('./data');
const data = require('./data');

function animalsByIds(...args) {
  if (args.length === 0) {
    return [];
  }
  if (args.length === 1) {
    const animalOne = data.animals.filter((animal) => animal.id === args[0]);
    return animalOne;
  }
  return data.animals.filter((index) => args.includes(index.id));
}

function animalsOlderThan(animal, age) {
  const findeAnimalName = (nome) => nome.name === animal;
  const animalsdearch = animals.find(findeAnimalName);
  const filter = (ageAnimals) => ageAnimals.age >= age;
  return animalsdearch.residents.every(filter);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};

  return employees.find((name) =>
    name.firstName === employeeName || name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const idGerent = (is) => is.id === id;
  const confirmGerent = data.employees.filter(idGerent);
  return confirmGerent.every((Isgerent) => Isgerent.id === '0e7b460e-acf4-4e17-bcb3-ee472265db83');
}

/* function addEmployee(id, firstName, lastName, managers, responsibleFor) {
} */

function animalCount(species) {
  if (!species) {
    const speciesAndQnt = animals.reduce((acc, current) => {
      acc[current.name] = current.residents.length;
      return acc;
    }, {});
    return speciesAndQnt;
  }
  const animalsAndQuantidades = (nome) => nome.name === species;
  const returnAnimals = animals.find(animalsAndQuantidades);
  return returnAnimals.residents.length;
}

function entryCalculator(entrants) {
  if (!entrants) return 0;
  if (Object.keys(entrants).length === 0) return 0;

  
  return Object.keys(entrants)
    .reduce((acc, current) =>
      acc + (entrants[current] * prices[current]), 0);
}

/* function animalMap(options) {
} */

 /* function schedule(dayName) {
} */

 function oldestFromFirstSpecies(id) {
  const searchFunctionare = (nome) => nome.id === id;
  const checkSearch = employees.find(searchFunctionare);
  const animalId = checkSearch.responsibleFor[0];
  const specieId = (nome) => nome.id === animalId;
  const animalIdReturn = animals.find(specieId);
  const residentsAnimals = animalIdReturn.residents
  const oldAnimal = residentsAnimals.reduce((acc, current) => {
  return Math.max(acc, current.age); 
   }, 0);
   return OlderAnimal;

}

 function increasePrices(percentage) {
   const newAdult = (prices.Adult * percentage) / 100;
   const newSenior = (prices.Senior * percentage) / 100;
   const newChild = (prices.Child * percentage) / 100;
   //parseFloat(newAdult).toFixed(2);
   //parseFloat(newSenior).toFixed(2);
   //parseFloat(newChild).toFixed(2);
   prices.Adult += newAdult;
   prices.Senior += newSenior;
   prices.Child += newChild;
}

/* function employeeCoverage(idOrName) {
} */

console.log(increasePrices(20));
console.log(prices);

module.exports = {
  entryCalculator,
  //schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  // addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
