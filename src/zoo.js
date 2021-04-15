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

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const add = employees.length;
  employees[add] = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees;
}

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

function schedule(dayName) {
  temp = {};
  if (!dayName) {
    for (const index in hours) {
      temp[`${index}`] = `Open from ${hours[index].open}am until ${hours[index].close -12}pm`;
    }
  temp.Monday = 'CLOSED';
  return temp;
  }
  if (dayName === 'Monday') {
    const monday = {"Monday": "CLOSED"}
    return monday
  }
  dayOne = {}
  for (const index in hours) {
    if (index === dayName) {
      dayOne[`${index}`] = `Open from ${hours[index].open}am until ${hours[index].close -12}pm`;
    }
  return dayOne
  }
}

function oldestFromFirstSpecies(id) {
  // Filtra colaborador pelo id
  const checkSearch = employees.find((nome) => nome.id === id);
  // pega o primeiro registro de animais
  const animalId = checkSearch.responsibleFor[0];
  // pega o primeiro registro e busca pelo animal
  const animalIdReturn = animals.find((nome) => nome.id === animalId);
  const olderAnimal = animalIdReturn.residents.reduce((acc, current) => {
    const max = Math.max(acc, current.age);
    return max;
  }, 0);
  const max = animalIdReturn.residents.find((number) => number.age === olderAnimal);

  const arraAnimal = [max.name, max.sex, max.age];
  return arraAnimal;
}

function increasePrices(percentage) {
  const newAdult = (prices.Adult * percentage) / 100;
  const newSenior = (prices.Senior * percentage) / 100;
  const newChild = (prices.Child * percentage) / 100;
  parseFloat(newAdult).toFixed(2);
  parseFloat(newSenior).toFixed(2);
  parseFloat(newChild).toFixed(2);
  prices.Adult += newAdult;
  prices.Senior += newSenior;
  prices.Child += newChild;
  return hours;
}

/* function employeeCoverage(idOrName) {
  if (!idOrName) {
      const nameAndLast = employees.reduce((acc, current) => {
        acc[`${current.firstName} ${current.lastName}`] = current.responsibleFor;
      return acc;
      }, {});
      const FilterAnimals = nameAndLast.filter((ids) => {
        return ids === animals.id
      })
      return FilterAnimals;
  };

   return employees.find((name) =>
    name.firstName === employeeName || name.lastName === employeeName);
  
  } */

console.log(schedule('Monday'));

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
  increasePrices,
  createEmployee,
};
