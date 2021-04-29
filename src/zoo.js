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
// const data = require('./data');

function animalsByIds(...ids) {
  const foundedAnimals = [];

  ids.forEach((parameter) => {
    const selectAnimals = animals.find((animal) => animal.id === parameter);
    foundedAnimals.push(selectAnimals);
  });

  return foundedAnimals;
}

function animalsOlderThan(animal, age) {
  const findAnimal = animals.find((species) => species.name === animal);
  const { residents } = findAnimal;

  return residents.every((eachAnimal) => eachAnimal.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }

  const firstName = employees.find((object) => object.firstName === employeeName);
  const lastName = employees.find((object) => object.lastName === employeeName);

  if (firstName === undefined) {
    return lastName;
  }

  return firstName;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const managersArray = employees.map((employee) => employee.managers);
  const verifyManager = managersArray.some((managers) => managers.includes(id));

  return verifyManager;
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

const getSpecies = () => {
  const counted = {};
  animals.forEach((animal) => {
    counted[animal.name] = Object.entries(animal.residents).length;
  });

  return counted;
};

function animalCount(species) {
  const listedAnimals = getSpecies();

  if (!species) {
    return getSpecies();
  }

  return listedAnimals[species];
}

function entryCalculator(entries = 0) {
  if (entries === {}) return 0;

  const visistors = Object.entries(entries);

  const sumAll = visistors.map((person) => (prices[person[0]] * person[1]))
    .reduce((acc, currentValue) => acc + currentValue, 0);

  return sumAll;
}

// function animalMap(options) {
//   // seu código aquiS
// }

function setSchedule({ open, close }) {
  function amPm(number) {
    return number > 12 ? `${(number - 12)}pm` : `${number}am`;
  }

  return (open === close) ? 'CLOSED' : `Open from ${amPm(open)} until ${amPm(close)}`;
}

const defaultSchedule = () => {
  const weekDays = Object.keys(hours);

  const workdays = weekDays.reduce((acc, currentDay) => {
    acc[currentDay] = setSchedule(hours[currentDay]);
    return acc;
  }, {});

  return workdays;
};

function schedule(dayName) {
  if (!dayName) {
    return defaultSchedule();
  }

  const daySchedule = {};
  daySchedule[dayName] = defaultSchedule()[dayName];
  return daySchedule;
}

function getOldest(idAnimal) {
  const getAnimal = animals.find((animal) => animal.id === idAnimal);
  const { residents } = getAnimal;

  const oldest = residents.reduce((accumulator, { age }) => {
    if (age > accumulator) return age;
    return accumulator;
  }, 0);

  return Object.values(residents.find(({ age }) => age === oldest));
}

function oldestFromFirstSpecies(id) {
  const FirstResponsible = employees.find((employee) => employee.id === id).responsibleFor[0];

  return getOldest(FirstResponsible);
}

// function increasePrices(percentage) {
//   const tax = () => (percentage / 100 + 1);

//   const newPrices = Object.entries(prices)
//     .reduce((acc, currentValue) => {
//     acc[currentValue[0]] = (parseFloat((currentValue[1] * tax()).toPrecision(4)));
//     return acc;
//   }, {});

//   return newPrices;
//   // return final (assigment newprices com o prices original)
// }

// console.log(increasePrices(50));

const getCoverages = () => {
  const nameNspecies = employees.reduce((acc, currentEmploy) => {
    const names = [];

    const caredSpecies = currentEmploy.responsibleFor;
    caredSpecies.forEach((each) => names.push(animals.find((it) => it.id === each).name));
    acc[`${currentEmploy.firstName} ${currentEmploy.lastName}`] = names;
    return acc;
  }, {});

  return nameNspecies;
};

function employeeCoverage(idOrName) {
  if (!idOrName) {
    return getCoverages();
  }

  const finded = employees.find((employee) => Object.values(employee).includes(idOrName));
  const caredSpecies = finded.responsibleFor;

  const names = [];
  caredSpecies.forEach((each) => names.push(animals.find((it) => it.id === each).name));

  return { [`${finded.firstName} ${finded.lastName}`]: names };
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
  // increasePrices,
  createEmployee,
};
