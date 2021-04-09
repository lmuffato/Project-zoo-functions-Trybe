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

function addEmployee(id = '', firstName = '', lastName = '', managers = [], responsibleFor = []) {
  const newEmp = createEmployee({ id, firstName, lastName }, { managers, responsibleFor });
  data.employees.push(newEmp);
}

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
    // console.log(listOfResidents);
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
const generateCompliteSchedule = () => {
  const dSc = Object.entries(data.hours);
  const cSch = {};
  for (let index = 0; index < dSc.length; index += 1) {
    if (dSc[index][1].open !== 0) {
      cSch[dSc[index][0]] = `Open from ${dSc[index][1].open}am until ${dSc[index][1].close - 12}pm`;
    } else {
      cSch[dSc[index][0]] = 'CLOSED';
    }
  }
  return cSch;
};

function schedule(dayName) {
  let scheduleRequested = generateCompliteSchedule();
  if (dayName !== undefined) {
    const scheduleDay = scheduleRequested[dayName];
    scheduleRequested = {};
    scheduleRequested[dayName] = scheduleDay;
  }
  return scheduleRequested;
}

function oldestFromFirstSpecies(id) {
  const idOldestAnimal = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const { residents } = data.animals.find((animal) => animal.id === idOldestAnimal);
  const oldestResident = Object.values(residents.sort((a, b) => b.age - a.age)[0]);
  return oldestResident;
}

function increasePrices(percentage = 0) {
  const multiplyFactor = ((percentage) + 100);
  const { Adult, Child, Senior } = data.prices;
  data.prices.Adult = Math.ceil(Adult * multiplyFactor) / 100;
  data.prices.Child = Math.ceil(Child * multiplyFactor) / 100;
  data.prices.Senior = Math.ceil(Senior * multiplyFactor) / 100;
}

const getAniNames = (...ids) => ids.map((id) => {
  const animalFinded = data.animals.find((animal) => animal.id === id);
  return (animalFinded !== undefined) ? animalFinded.name : '';
});

const generateCoverdList = () => {
  const list = {};
  data.employees.forEach((employee) => {
    list[`${employee.firstName} ${employee.lastName}`] = getAniNames(...employee.responsibleFor);
  });
  return list;
};

const findName = (info) => data.employees.reduce((fullName, employee) => {
  const stringTested = `${employee.firstName} ${employee.lastName} ${employee.id}`;
  return stringTested.includes(info) ? `${employee.firstName} ${employee.lastName}` : fullName;
}, '');

function employeeCoverage(idOrName) {
  let coverageList = generateCoverdList();
  if (idOrName !== undefined) {
    const name = findName(idOrName);
    const animalList = coverageList[name];
    coverageList = {};
    coverageList[name] = animalList;
  }
  return coverageList;
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
