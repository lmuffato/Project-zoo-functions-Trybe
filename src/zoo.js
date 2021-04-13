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

const { animals } = data;

const { employees } = data;

function animalsByIds(...ids) {
  const allAnimals = [];

  const newAnimal = (par) => {
    for (let index = 0; index < ids.length; index += 1) {
      allAnimals.push(animals
        .find((animal) => animal.id === par[index]));
    }
    return allAnimals;
  };
  return newAnimal(ids);
}

function animalsOlderThan(animal, age) {
  const animalFound = animals.find(
    (animalist) => (animalist.name === animal),
  );
  const { residents } = animalFound;
  const animalsAge = residents.every((resident) => (resident.age >= age));

  return animalsAge;
}

function employeeByName(employeeName) {
  let employeeData = employees.find((name) => name.firstName === employeeName
  || name.lastName === employeeName);

  if (employeeData === undefined) {
    employeeData = {};
  }
  return employeeData;
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  const allManagers = [];
  let verifier = 0;
  employees.forEach((info) => {
    allManagers.push(info.managers);
  });
  const isAMan = (element) => {
    const test = element.some((info) => info === id);
    if (test === true) {
      verifier += 1;
    }
  };
  allManagers.forEach(isAMan);

  if (verifier === 0) {
    return false;
  }
  return true;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const manaFilter = (managers === undefined) ? [] : managers;
  const responFilter = (responsibleFor === undefined) ? [] : responsibleFor;

  const newEmployee = {
    id,
    firstName,
    lastName,
    managers: manaFilter,
    responsibleFor: responFilter,
  };
  Object.assign(employees, newEmployee);
}

function animalCount(species) {
  const animalsCounter = {};

  const objectAnimal = (animal) => {
    const resident = animal.name;
    const { residents } = animal;
    const animalToPush = {
      [resident]: residents.length,
    };
    Object.assign(animalsCounter, animalToPush);
  };

  const specifAnimal = animals.find((animal) => animal.name === species);
  if (species === undefined) {
    animals.forEach(objectAnimal);
    return animalsCounter;
  }
  return { [specifAnimal.name]: specifAnimal.residents.length };
}

function entryCalculator(entrants) {
  const employ = entrants;
  console.log(employ);
}

function animalMap(options) {
  const employ = options;
  console.log(employ);
}

function schedule(dayName) {
  const employ = dayName;
  console.log(employ);
}

function oldestFromFirstSpecies(id) {
  const employ = id;
  console.log(employ);
}

function increasePrices(percentage) {
  const employ = percentage;
  console.log(employ);
}

function employeeCoverage(idOrName) {
  const employ = idOrName;
  console.log(employ);
}

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
