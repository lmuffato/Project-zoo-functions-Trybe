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

const { animals, employees, prices, hours } = data;

function animalsByIds(...ids) {
  const someAnimals = animals.filter((animalId) => ids.includes(animalId.id));
  return someAnimals;
}

function animalsOlderThan(animal, age) {
  const animalSpecies = animals.find((species) => species.name === animal);
  return animalSpecies.residents.every((animalAge) => animalAge.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return { };
  const employNames = employees
    .find((name) => name.firstName === employeeName || name.lastName === employeeName);
  return employNames;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((person) => person.managers.includes(id));
}

function addEmployee(id, firstName, lastName, [...managers] = [], [...responsibleFor] = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // if (species === undefined) {
  //   const animalData = {};
  //   animals.forEach((animal) => {
  //     animalData[animal.name] = animal.residents.length;
  //   });
  // }
  const animalData = animals.reduce((acc, animal) => {
    acc[animal.name] = animal.residents.length;
    return acc;
  }, {});
  if (species === undefined) {
    return animalData;
  }
  return animalData[species];
}

function entryCalculator(entrants = 0) {
  // {Adult: 2, Child: 3, Senior: 1};
  // referência do código do Andy
  const totalValue = Object.keys(entrants);
  // totalValue = ['Adult', 'Child', 'Senior'];
  return totalValue.reduce((acc, actual) => acc + entrants[actual] * prices[actual], 0);
}

// function animalMap(options) {
//   // seu código aqui
// }

// referência de código e ajuda de Andy
const NewObject = (op) => ({ [op[0]]:
  op[0] === 'Monday' ? 'CLOSED' : `Open from ${op[1].open}am until ${op[1].close - 12}pm` });

function schedule(dayName) {
  const consultHour = Object.entries(hours);
  if (dayName === undefined) {
    return consultHour.reduce((acc, actualHour) => Object.assign(acc, NewObject(actualHour)), {});
  }
  return consultHour.map((singleHour) => NewObject(singleHour)).find((actual) => actual[dayName]);
}
// referência de código e ajuda de Andy
function oldestFromFirstSpecies(id) {
  const animalID = employees.find((person) => person.id === id).responsibleFor[0];
  const animal = animals.find((actualAnimal) => actualAnimal.id === animalID);
  const olderAnimal = animal.residents
    .reduce((acc, oldAnimal) => (acc.age < oldAnimal.age ? oldAnimal : acc));
  return Object.values(olderAnimal);
}

const newNumber = (number, percent) => parseFloat(number + number * percent);

function increasePrices(percentage) {
  // referência de código e ajuda de Andy
  // refatorar para highOrder function
  // const actualPrices = Object.values(prices);
  // console.log(actualPrices);
  // const calculate = percentage / 100;
  // return actualPrices.reduce((acc, newprice) => (acc + newprice * calculate), {});
  const calculate = percentage / 100;
  prices.Adult = Math.round(newNumber(prices.Adult, calculate) * 100) / 100;
  prices.Child = Math.round(newNumber(prices.Child, calculate) * 100) / 100;
  prices.Senior = Math.round(newNumber(prices.Senior, calculate) * 100) / 100;
}

// referênciado e explicado à mim por Andy, voltarei e refatorarei este código

const consultAnimalsById = (...arr) => (
  arr.map((id) => animals.find((animal) => animal.id === id)).map((specie) => specie.name)
);

const returnEmployee = (par) => {
  const fullName = `${par.firstName} ${par.lastName}`;
  return { [fullName]: consultAnimalsById(...par.responsibleFor) };
};

function employeeCoverage(idOrName) {
  if (idOrName === undefined) {
    return employees.reduce((acc, act) => Object.assign(acc, returnEmployee(act)), {});
  }
  const findEmployee = employees.find((element) => element.id === idOrName
      || element.firstName === idOrName || element.lastName === idOrName);
  return { ...returnEmployee(findEmployee) };
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  // animalMap,
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
