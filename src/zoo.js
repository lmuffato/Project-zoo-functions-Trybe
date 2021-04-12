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

const { animals, employees, hours, prices } = data;

function animalsByIds(...ids) {
  return animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  const filterAnimal = animals.find(({ name }) => name === animal);

  const { residents } = filterAnimal;

  const checkAge = residents.every((resident) => resident.age > age);

  return checkAge;
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }

  return employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
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

function isManager(id) {
// const findEmployee =  employees.find((employee) => employee.id === id);
  return employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function animalCount(species) {
  const findAnimal = animals.find(({ name }) => name === species);
  const objectOfAnimals = {};

  if (species === undefined) {
    animals.forEach((animal) => {
      objectOfAnimals[animal.name] = animal.residents.length;
    });
    return objectOfAnimals;
  }

  if (animals.find(({ name }) => name === species)) {
    const animalCounting = findAnimal.residents.length;
    return animalCounting;
  }
}

function entryCalculator(entrants = 0) {
  let sumTotal = 0;

  if (entrants.Senior) {
    sumTotal += entrants.Senior * prices.Senior;
  }

  if (entrants.Adult) {
    sumTotal += entrants.Adult * prices.Adult;
  }

  if (entrants.Child) {
    sumTotal += entrants.Child * prices.Child;
  }

  return sumTotal;
}

// function animalMap(options) {
//   // seu código aqui
// }

const createZooHour = () => {
  const zooHour = {};
  const hourKeys = Object.keys(hours);
  const hourValues = Object.values(hours);

  for (let i = 0; i < hourKeys.length; i += 1) {
    zooHour[hourKeys[i]] = `Open from ${hourValues[i].open}am until ${hourValues[i].close - 12}pm`;

    if (hourValues[i].open === 0 && hourValues[i].close === 0) {
      zooHour[hourKeys[i]] = 'CLOSED';
    }
  }
  return zooHour;
};

function schedule(dayName) {
  const open = {};
  const hour = createZooHour();
  const hourKeys = Object.keys(hour);
  const hourValues = Object.values(hour);

  if (dayName === undefined) {
    return hour;
  }

  for (let i = 0; i < hourKeys.length; i += 1) {
    if (hourKeys[i] === dayName) {
      open[hourKeys[i]] = hourValues[i];
    }
  }
  return open;
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
  //   animalMap,
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
