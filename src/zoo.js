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

// const data = require('./data');
const { animals, employees, hours, prices } = require('./data');

function animalsByIds(...ids) {
  return animals.filter(({ id }) => ids.includes(id));
}
animalsByIds('89be95b3-47e4-4c5b-b687-1fabf2afa274', 'ef3778eb-2844-4c7c-b66c-f432073e1c6b');

function animalsOlderThan(animal, old) {
  return animals.find(({ name }) => name === animal).residents
    .every(({ age }) => age >= old);
}
// console.log(animalsOlderThan('lions', 2));

function employeeByName(args) {
  // seu código aqui
  if (args === undefined) {
    return {};
  }
  return employees.find(({ firstName, lastName }) =>
    args === firstName || args === lastName);
}
// console.log(employeeByName());

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(ids) {
  const result = employees.find(({ id }) => id === ids).managers;
  if (result.length === 0 || result.length === 1) {
    return true;
  } return false;
  // seu código aqui
}
// console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}
// console.log(addEmployee('3902931', 'Lucas', 'Godoi', 'Rita', 'Lion'));
function animalCount(species) {
  // seu código aqui

  if (species === undefined) {
    return animals.map((animal) => {
      const { name, residents: { length } } = animal;
      return { [name]: length };
    }).reduce((acc, animal) => ({ ...animal, ...acc }), {});
  }
  return animals.find(({ name }) => name === species).residents.length;
}
// console.log(animalCount());

function entryCalculator(entrants) {
  // seu código aqui
  // Ajuda do Murilo Gonçalves
  if (entrants === undefined || Object.entries(entrants).length === 0) {
    return 0;
  }

  return Object.entries(entrants).reduce((acc, [key, value]) => prices[key] * value + acc, 0);
}
console.log(entryCalculator({ Adult: 12, Child: 2 }));

// function animalMap(options) {
//   // seu código aqui
// }

const changeValues = () => {
  const openFrom8am = 'Open from 8am until 6pm';
  hours.Friday = 'Open from 10am until 8pm';
  hours.Monday = 'CLOSED';
  hours.Saturday = 'Open from 8am until 10pm';
  hours.Sunday = 'Open from 8am until 8pm';
  hours.Thursday = 'Open from 10am until 8pm';
  hours.Tuesday = openFrom8am;
  hours.Wednesday = openFrom8am;
};
changeValues();
function schedule(dayName) {
  // seu código aqui
  if (dayName === undefined) {
    return Object.entries(hours)
      .map(([key, value]) => ({ [key]: value }))
      .reduce((acc, element) => ({ ...acc, ...element }), {});
  }
  const [dayKey, Dayvalue] = Object.entries(hours).find(([key]) => key === dayName);
  return {
    [dayKey]: Dayvalue,
  };
}
console.log(schedule('Monday'));
function oldestFromFirstSpecies(ids) {
  // seu código aqui
  const employeResponsible = employees.find(({ id }) => id === ids).responsibleFor[0];
  const animalResident = animals.find(({ id }) => id === employeResponsible).residents;
  const { name, sex, age } = animalResident.reduce((acc, currentValue) => {
    if (currentValue.age > acc.age) {
      return currentValue;
    } return acc;
  });
  return [name, sex, age];
}
console.log(oldestFromFirstSpecies('c1f50212-35a6-4ecd-8223-f835538526c2'));

function increasePrices(percentage) {
  // seu código aqui
  const result = percentage / 100;
  const newPricesAdult = prices.Adult * result + prices.Adult;
  const newPricesChild = prices.Child * result + prices.Child;
  const newPricesSenior = prices.Senior * result + prices.Senior;
  prices.Adult = Math.round(newPricesAdult * 100) / 100;
  prices.Child = Math.round(newPricesChild * 100) / 100;
  prices.Senior = Math.round(newPricesSenior * 100) / 100;
}

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
  increasePrices,
  createEmployee,
};
