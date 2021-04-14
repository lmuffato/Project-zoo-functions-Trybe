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

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  return employees.push(newEmployee);
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

function oldestFromFirstSpecies(employeeId) {
  const findEmployee = employees.find(({ id }) => id === employeeId);
  const { responsibleFor } = findEmployee;
  const animalId = responsibleFor[0];
  let ageNumber = 0;

  const findAnimal = animals.find(({ id }) => id === animalId);
  const { residents } = findAnimal;

  residents.forEach((resident) => {
    if (resident.age > ageNumber) {
      ageNumber = resident.age;
    }
  });

  const oldestResident = residents.find(({ age }) => age === ageNumber);

  const values = Object.values(oldestResident);
  return values;
}

function increasePrices(percentage) {
  const percent = percentage / 100 + 1;
  const keys = Object.keys(prices);

  keys.forEach((key) => {
    prices[key] = Math.round(prices[key] * percent * 100) / 100;
  });

  return prices;
}

const employeeCoverageList = () => {
  const fullCoverageList = {};

  employees.forEach(({ firstName, lastName, responsibleFor }) => {
    const fullName = `${firstName} ${lastName}`;

    const getAnimalsById = responsibleFor.map((element) =>
      animals.find(({ id }) => id === element));

    const animalsName = getAnimalsById.map(({ name }) => name);

    fullCoverageList[fullName] = animalsName;
  });

  return fullCoverageList;
};

function employeeCoverage(idOrName) {
  const employeeResponsibleFor = {};
  const fullList = employeeCoverageList();
  if (idOrName === undefined) {
    return fullList;
  }
  const findEmployee = employees.find(({ id, firstName, lastName }) =>
    id === idOrName || firstName === idOrName || lastName === idOrName);

  const { firstName, lastName, responsibleFor } = findEmployee;
  const fullName = `${firstName} ${lastName}`;
  const getAnimalsById = responsibleFor.map((element) =>
    animals.find(({ id }) => id === element));
  const animalsName = getAnimalsById.map(({ name }) => name);

  employeeResponsibleFor[fullName] = animalsName;
  return employeeResponsibleFor;
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  //   animalMap,
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
