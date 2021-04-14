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
const data = require('./data');

const managersId = [
  '9e7d4524-363c-416a-8759-8aa7e50c0992',
  'fdb2543b-5662-46a7-badc-93d960fdc0a8',
  '0e7b460e-acf4-4e17-bcb3-ee472265db83',
];

const filterId = (value) =>
  value.map((id) => animals.find((el) => el.id === id));

function animalsByIds(...ids) {
  if (ids === undefined) return [];
  return filterId(ids);
}

function animalsOlderThan(animal, ageInput) {
  const animalFind = animals.find(({ name }) => animal === name);
  const { residents } = animalFind;
  const youngerThan = residents.filter(({ age }) => age < ageInput);
  return youngerThan.length === 0;
}

const findName = (name) =>
  employees.find((el) =>
    (el.firstName === name || el.lastName === name ? el : ''));

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return findName(employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { managers, responsibleFor } = associatedWith;
  const employee = { ...personalInfo };
  employee.managers = managers.map((manager) => manager);
  employee.responsibleFor = responsibleFor.map((responsible) => responsible);
  return employee;
}

function isManager(id) {
  return !!managersId.find((manager) => manager === id);
  // const employee = employees.find(({ managers }) => managers.includes(id));
  // return managers; // managers.length === 0;
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  employees.push(employee);
  return data.employees;
}

const allAnimalsCount = () => {
  const count = {};

  animals.forEach((animal) => {
    const { name, residents } = animal;
    count[name] = residents.length;
  });
  return count;
};

function animalCount(species) {
  if (species === undefined) {
    return allAnimalsCount();
  }

  const animal = animals.find(({ name }) => name === species);
  const { residents } = animal;
  return residents.length;
}

const calculateTotal = (entrants) =>
  Object.keys(entrants)
    .map((key) => entrants[key] * prices[key])
    .reduce((acc, next) => acc + next, 0);

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) {
    return 0;
  }

  return calculateTotal(entrants);
}

// const allAnimalsLocations = () => {
//   const obj = {};
//   animals.forEach((animal) => {
//     const { location } = animal;
//     obj[location] = animals
//       .filter((value) => location === value.location)
//       .map((value) => value.name);
//   });

//   return obj;
// };

// const getResidents = (specie) => {
//   const { residents } = animals.find((animal) => animal.name === specie);
//   return residents;
// };

// // const getNamesAnimals = (specie) => getResidents(specie).map(({ name }) => name);

// const getFemalesMales = (specie, sex) => getResidents(specie)
//   .filter((animal) => animal.sex === sex)
//   .map(({ name }) => name);

// const allNamesByRegion = (...parameters) => {
//   const obj = allAnimalsLocations();
//   const locationsNames = Object.values(obj);

//   locationsNames.forEach((location, i) => {
//     const locationName = Object.keys(obj)[i];
//     obj[locationName] = location.map((value) => ({ [value]: parameters[0](value, parameters[1]) }));
//   });
//   return obj;
// };

// console.log(allNamesByRegion());

// const sortedNames = (object) => {
//   const obj = object;
//   Object.values(obj).forEach((location) => location.forEach((values) => {
//     const animal = Object.keys(values)[0];
//     const sorted = Object.values(values)[0].sort();
//     const currValue = values;
//     currValue[animal] = sorted;
//   }));
//   return obj;
// };

// // eslint-disable-next-line complexity
// function animalMap(options) {
//   if (!options) {
//     return allAnimalsLocations();
//   }
//   const { includeNames, sorted, sex } = options;
//   if (includeNames && sex && sorted) {

//   }
//   if (includeNames && sex) {
//     return allNamesByRegion(getFemalesMales, sex);
//   }
//   if (includeNames && sorted) {
//     return sortedNames(allNamesByRegion());
//   }
//   if (includeNames) {
//     return allNamesByRegion();
//   }
// }

// console.log(animalMap({ includeNames: true, sex: 'female' }).NE);

const getAllSchedules = () => {
  const schedules = {};

  Object.keys(hours).forEach((day) => {
    const { open, close } = hours[day];
    const condition = (open === 0 && close === 0);
    schedules[day] = `Open from ${open}am until ${close - 12}pm`;
    if (condition) schedules[day] = 'CLOSED';
  });
  return schedules;
};

const findDay = (object, dayName) => {
  const day = Object.entries(object).find(([key]) => key === dayName);
  return [day].reduce((obj, [key, value]) => Object.assign(obj, { [key]: value }), {});
};

function schedule(dayName) {
  const allSchedules = getAllSchedules();

  if (!dayName) {
    return allSchedules;
  }
  return findDay(allSchedules, dayName);
}

function oldestFromFirstSpecies(id) {
  const employee = employees.find((emp) => emp.id === id);
  const { responsibleFor } = employee;
  const animalByEmployee = animals.find((animal) =>
    animal.id === responsibleFor[Object.keys(responsibleFor)[0]]);
  const animalsNames = animalByEmployee.residents.sort((a, b) => a.age - b.age);
  return Object.values(animalsNames[animalsNames.length - 1]);
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((price) => {
    prices[price] = parseFloat((Math
      .round((prices[price] + (prices[price] * (percentage / 100))) * 100) / 100)
      .toFixed(2));
  });
  return prices;
}

const getAnimal = (value) => {
  const animalFind = animals.find((animal) => animal.id === value);
  return animalFind.name;
};

const employeesAndAnimals = () => {
  const employeeAndAnimals = {};
  employees.forEach((employee) => {
    const { firstName, lastName, responsibleFor } = employee;
    employeeAndAnimals[`${firstName} ${lastName}`] = responsibleFor
      .map((value) => getAnimal(value));
  });
  return employeeAndAnimals;
};

const getEmployeeByFNameOrLName = (object, name) => {
  const currFind = Object.entries(object).find((emp) => emp[0].includes(name));
  return [currFind].reduce((obj, [key, value]) => Object.assign(obj, { [key]: value }), {});
};

const getEmployeeAnimalsById = (id) => {
  const currEmployee = employees.find((employee) => employee.id === id);
  const { firstName, lastName, responsibleFor } = currEmployee;
  const currFind = {};
  currFind[`${firstName} ${lastName}`] = responsibleFor.map((animal) => getAnimal(animal));

  return currFind;
};

function employeeCoverage(idOrName) {
  const employeesAnimals = employeesAndAnimals();
  if (!idOrName) return employeesAnimals;
  return idOrName.length === 36
    ? getEmployeeAnimalsById(idOrName)
    : getEmployeeByFNameOrLName(employeesAnimals, idOrName);
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
  increasePrices,
  createEmployee,
};
