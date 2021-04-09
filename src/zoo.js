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

function employeeByName(empName) {
  const empS = data.employees.find((emp) => emp.firstName === empName || emp.lastName === empName);
  return empS !== undefined ? empS : {};
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const managers = [];
  data.employees.forEach((emp) => managers.push(...emp.managers));
  return managers.find((idMan) => idMan === id) !== undefined;
}

function addEmployee(id, firstN, lastN, managers, responsibleFor) {
  const newEmp = createEmployee({ ...id, ...firstN, ...lastN }, { ...managers, ...responsibleFor });
  data.employees.push(newEmp);
}

// addEmployee({},{},{},{})

const generateAnimalsList = () => {
  const listOfAnimals = {};
  data.animals.forEach((animal) => {
    listOfAnimals[animal.name] = animal.residents.length;
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
// console.log(animalCount());

function entryCalculator({ Adult = 0, Child = 0, Senior = 0 } = 0) {
  return Adult * data.prices.Adult + Child * data.prices.Child + Senior * data.prices.Senior;
}

const listByRegion = () => {
  const animalList = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
  data.animals.forEach((animal) => animalList[animal.location].push(animal.name));
  return animalList;
};

const listForSex = (animal, sex) => animal.residents.reduce((list, resident) => {
  if (!sex || sex === resident.sex) {
    list.push(resident.name);
  }
  return list;
}, []);

const listWithNames = (sex, sorted) => {
  const animalList = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
  data.animals.forEach((animal) => {
    const listOfResidents = {};
    listOfResidents[animal.name] = listForSex(animal, sex);
    if (sorted) listOfResidents[animal.name].sort();
    animalList[animal.location].push(listOfResidents);
  });
  return animalList;
};

function animalMap(options = {}) {
  const { includeNames = false, sorted = false, sex = false } = options;
  let result;
  if (!includeNames) {
    result = listByRegion();
  } else {
    result = listWithNames(sex, sorted);
  }
  return result;
}
// console.log(animalMap({ includeNames: true }));

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
