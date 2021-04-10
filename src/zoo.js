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

function animalsByIds(...ids) {
  return ids.map((ID) => animals.find(({ id }) => id.includes(ID)));
}
// console.log(animalsByIds('ef3778eb-2844-4c7c-b66c-f432073e1c6b', '89be95b3-47e4-4c5b-b687-1fabf2afa274'));

function animalsOlderThan(animal, age) {
  return animals.find((especie) => especie.name === animal).residents
    .every((resident) => resident.age >= age);
}

// console.log(animalsOlderThan('bears', 10));

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(({ firstName, lastName }) => [firstName, lastName].includes(employeeName));
}
// console.log(employeeByName('Nelson'));

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}
// console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}
// console.log(addEmployee('92', 'Pollyana', 'Oliveira'));

function animalCount(species) {
  const allAnimals = animals.reduce((acc, currentAnimal) => {
    acc[currentAnimal.name] = currentAnimal.residents.length;
    return acc;
  }, {});
  if (species) {
    return allAnimals[species];
  }
}
// console.log(animalCount('bears'));

function entryCalculator(entrants) {
  if (!entrants) {
    return 0;
  }
  return Object.keys(entrants)
    .reduce((acc, currentValue) => acc + (entrants[currentValue] * prices[currentValue]), 0);
}
// console.log(entryCalculator({ Adult: 2, Child: 2, Senior: 1 }));

// function animalMap(options) {
//   // seu código aqui
// }

function schedule(dayName) {
  // ao chamar a função sem paramentros retorna cronograma inteiro
  // ao chamar a função com um parametro retorna o cronograma do dia
  const openOrClose = { };
  Object.keys(hours).forEach((day) => {
    if (day === 'Monday') {
      openOrClose[day] = 'CLOSED';
    } else {
      openOrClose[day] = `Open from ${hours[day].open}am until ${(hours[day].close) - 12}pm`;
    }
  });
  if (dayName === undefined) {
    return openOrClose;
  }
  return { [dayName]: openOrClose[dayName] };
}
// console.log(schedule('Friday'));

function oldestFromFirstSpecies(id) {
  const searchPerson = employees.find((person) => person.id.includes(id)).responsibleFor[0];
  const searchAnimal = animals.find((animal) => animal.id.includes(searchPerson)).residents
    .sort((animal1, animal2) => animal2.age - animal1.age)[0];
  return [searchAnimal.name, searchAnimal.sex, searchAnimal.age];
}
// console.log(oldestFromFirstSpecies('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));

function increasePrices(percentage) {
  Object.keys(prices).forEach((key) => {
    const updatePrices = Math.round((prices[key] * (1 + (percentage / 100))) * 100) / 100;
    prices[key] = updatePrices;
  });
  return prices;
}
// Arredondar casas decimais com math.round: https://metring.com.br/arredondar-numero-em-javascript#:~:text=Para%20arredondar%20um%20n%C3%BAmero%20decimal,n%C3%A3o%20%C3%A9%20um%20m%C3%A9todo%20confi%C3%A1vel.
// console.log(increasePrices(20));

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
