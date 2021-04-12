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
  if (!ids) {
    return [];
  }
  return ids.map((id) => animals.find((animal) => animal.id === id));
}
function animalsOlderThan(animal, age) {
  const { animals } = data;
  const obj = animals.find((animal2) => animal2.name === animal);
  return obj.residents.every((resident) => resident.age >= age);
}

function employeeByName(employeeName) {
  const { employees } = data;
  if (!employeeName) return {};
  return employees.find(({ firstName, lastName }) => [firstName, lastName].includes(employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const { employees } = data;
  return employees.some((person) => person.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const { employees } = data;
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };

  return employees.push(newEmployee);
}

function animalCount(species) {
  const { animals } = data;
  if (!species) {
    return animals.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length;
      return acc;
    }, {});
  }
  const wantedAninal = animals.find(({ name }) => name === species);
  return wantedAninal.residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  const { prices } = data;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  return ((Adult * prices.Adult) + (Senior * prices.Senior) + (Child * prices.Child));
}

// function animalMap(options) {
//   // seu código aqui
// }

function schedule(dayName) {
  const { hours } = data;
  const openOrClose = { };
  Object.keys(hours).forEach((day) => {
    if (day === 'Monday') {
      openOrClose[day] = 'CLOSED';
    } else {
      openOrClose[day] = `Open from ${hours[day].open}am until ${(hours[day].close) - 12}pm`;
    }
  });
  if (!dayName) {
    return openOrClose;
  }
  return { [dayName]: openOrClose[dayName] };
}
// fonte: https://trybecourse.slack.com/archives/C01DJFH0DNW/p1611760741076400?thread_ts=1611012283.421000&channel=C01DJFH0DNW&message_ts=1611760741.076400

function oldestFromFirstSpecies(id) {
  const { employees, animals } = data;
  const animalIncharge = employees.find((employee) => employee.id === id).responsibleFor[0];
  const objInfoAnimal = animals.find((animal) => animal.id === animalIncharge).residents;
  const oldestanimal = objInfoAnimal.reduce((acc, animal) => {
    if (acc.age > animal.age) return acc;
    return animal;
  });
  const { name, sex, age } = oldestanimal;
  return [name, sex, age];
}

function increasePrices(percentage) {
  const { prices } = data;
  const perCents = (percentage + 100) / 100;
  Object.keys(prices).forEach((key) => {
    const plusPercent = parseFloat(((prices[key] * perCents) + 0.01 - 0.004).toPrecision(4));
    prices[key] = plusPercent;
  });
  return prices;
}

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  //   animalMap,
  animalsByIds,
  employeeByName,
  //   employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
