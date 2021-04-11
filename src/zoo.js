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
// const data = require('./data');

function animalsByIds(...ids) {
  if (ids.length === 0) return [];

  const arrSpecies = [];

  if (ids.length === 1) {
    arrSpecies.push(animals.find((animal) => animal.id === ids[0]));
    return arrSpecies;
  }

  animals.forEach((species) => {
    ids.forEach((id) => {
      if (id === species.id) {
        arrSpecies.push(species);
      }
    });
  });

  return arrSpecies;
}

function animalsOlderThan(animal, age) {
  const findAnimalName = animals.find((animalSpecie) => animalSpecie.name === animal);
  const adults = findAnimalName.residents.every((adult) => adult.age >= age);
  return adults;
}

// console.log(animalsOlderThan('penguins', 10));

function employeeByName(employeeName) {
  const emptyArray = {};
  if (!employeeName) return emptyArray;
  return employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;

  const newObj = {
    id, firstName, lastName, managers, responsibleFor,
  };

  return newObj;
}

function isManager(id) {
  return employees.some((emp) => emp.managers.includes(id));
}

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

function animalCount(species) {
  const allAnimals = {};
  if (!species) {
    animals.forEach((animal) => {
      allAnimals[animal.name] = animal.residents.length;
    });
    return allAnimals;
  }
  const getAnimal = animals.find((animal) => animal.name === species);
  return getAnimal.residents.length;
}

// function entryCalculator(entrants) {
//   if ((entrants === undefined) || Object.keys(entrants).length === 0) return 0;
//   let childPrice = 0;
//   let adultPrice = 0;
//   let seniorPrice = 0;
//   const arrayEntrants = Object.entries(entrants);
//   arrayEntrants.forEach((item) => {
//     if (item[0] === 'Adult') {
//       adultPrice = item[1] * prices.Adult;
//     }
//     if (item[0] === 'Child') {
//       childPrice = item[1] * prices.Child;
//     }
//     if (item[0] === 'Senior') {
//       seniorPrice = item[1] * prices.Senior;
//     }
//   });
//   return childPrice + adultPrice + seniorPrice;
// }

// function animalMap(options) {
//   // seu código aqui
// }

// function schedule(dayName) {
//   // seu código aqui
// }

function oldestFromFirstSpecies(id) {
  const getEmployee = employees.find((employee) => employee.id === id);
  const firstAnimal = animals.find((animal) => animal.id === getEmployee.responsibleFor[0]);
  let oldestAnimalArray = [];
  let maiorIdade = 0;
  firstAnimal.residents.forEach((animal) => {
    if (animal.age > maiorIdade) {
      maiorIdade = animal.age;
      oldestAnimalArray = animal;
    }
    return oldestAnimalArray;
  });
  return Object.values(oldestAnimalArray);
}

// console.log(oldestFromFirstSpecies('fdb2543b-5662-46a7-badc-93d960fdc0a8'));

function increasePrices(percentage) {
  Object.keys(prices).forEach((item) => {
    prices[item] = Math.ceil(prices[item] * (percentage + 100)) / 100;
  });
}

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  // entryCalculator,
  // schedule,
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
