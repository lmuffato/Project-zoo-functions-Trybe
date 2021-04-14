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

const { animals, employees, prices } = require('./data');
const data = require('./data');

function animalsByIds(...args) {
    if (args.length === 0) {
      return args = [];
    }
    if (args.length === 1) {
      const animalOne = data.animals.filter((animal) => animal.id === args[0]);
      return animalOne;
    }
  return data.animals.filter((index) => args.includes(index.id));
}

function animalsOlderThan(animal, age) {
  const findeAnimalName = nome => nome.name === animal;
  const animalsdearch = animals.find(findeAnimalName);
  const filter = ageAnimals => ageAnimals.age >= age; 
  return animalsdearch.residents.every(filter);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};

  return employees.find((nomeOrLast)  => 
  nomeOrLast.firstName === employeeName 
  | nomeOrLast.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  const idGerent = is => is.id === id; 
  const confirmGerent = data.employees.filter(idGerent); 
  return confirmGerent.every((Isgerent) => Isgerent.id === '0e7b460e-acf4-4e17-bcb3-ee472265db83');
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  return employees.push({id: `${id}`,
  firstName: `${firstName}`,
  lastName: `${lastName}`,
  managers: [`${managers}`],
  responsibleFor: [`${responsibleFor}`],
});
}

function animalCount(...species) {
  if (species.length === 0) {
    const animals = data.animals.reduce((acumulador, animalCurrent) => {
      return acumulador.push(animalCurrent)
    } , []);
  }
  const AnimalConting = nome => nome.name === species;
  const animalNumber = data.animals.find(AnimalConting);
  //return animalNumber.residents.length;
}

function entryCalculator(entrants) {
  if (typeof entrants === 0 | Object.keys(entrants).length === 0) {
    return 0;
  }
  const { Adult } = entrants;
  const { Child } = entrants;
  const { Senior } = entrants;
  const total = prices.Adult * Adult + prices.Child * Child 
  + prices.Senior * Senior;
  return total;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  const values = Object.values(prices).map((valor) => {
    const atualPercentage = valor * percentage / 100;
    return atualPercentage
  })
  prices.Adult += values[0];
  prices.Senior += values[1];
  prices.Child += values[2];
}

function employeeCoverage(idOrName) {
  // seu código aqui
}

console.log(employeeByName('Emery'));

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
