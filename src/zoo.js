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
  return (ids !== []) ? ids.map((id) => data.animals.find((animal) => animal.id === id)) : ids;
}

const isOlder = (res, age) => !res.reduce((test, re) => (!test ? re.age < age : test), false);

function animalsOlderThan(nAnimal, age) {
  const animalsChoiced = data.animals.find((animal) => animal.name === nAnimal);
  let result = false;
  if (animalsChoiced !== undefined) {
    result = isOlder(animalsChoiced.residents, age);
  }
  return result;
}

console.log(animalsOlderThan('lions', 7));

function employeeByName(empName) {
  const empS = data.employees.find((emp) => emp.firstName === empName || emp.lastName === empName);
  return empS !== undefined ? empS : {};
}

console.log(employeeByName());

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

const infoPer = {
  id: '56d43ba3-a5a7-40f6-8dd7-cbb05082383f',
  firstName: 'Wilburn',
  lastName: 'Wishart',

};
const assoc = {
  managers: ['burlId', 'olaId'],
  responsibleFor: ['snakesId', 'elephantsId'],
};

console.log(createEmployee(infoPer, assoc));

function isManager(id) {
  const managers = [];
  data.employees.forEach((emp) => managers.push(...emp.managers));
  return managers.find((idMan) => idMan === id) !== undefined;
}

console.log(isManager('b0dc644a-5335-489b-8a2c-4e086c7819a2'));

function addEmployee(id, firstN, lastN, managers, responsibleFor) {
  const newEmp = createEmployee({ ...id, ...firstN, ...lastN }, { ...managers, ...responsibleFor });
  data.employees.push(newEmp);
}

const generateAnimalsList = () => {
  const listOfAnimals = data.animals.map((animal) => {
    const newAnimal = {};
    newAnimal[animal.name] = animal.residents.length;
    return newAnimal;
  });
  return listOfAnimals;
};

function animalCount(species) {
  // seu código aqui
  let result;
  if (species !== undefined) {
    result = data.animals.find((animal) => animal.name === species).residents.length;
  } else {
    result = generateAnimalsList();
  }
  return result;
}
console.log(animalCount());

function entryCalculator({ Adult = 0, Child = 0, Senior = 0 } = 0) {
  return Adult * data.prices.Adult + Child * data.prices.Child + Senior * data.prices.Senior;
}

const entries = { Adult: 1, Child: undefined, Senior: 2 };

console.log(entryCalculator(entries));

function animalMap(options) {
  // seu código aqui
}

// function schedule(dayName) {
//   // seu código aqui
// }

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
  // schedule,
  animalCount,
  animalMap,
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
