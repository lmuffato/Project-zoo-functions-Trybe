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
  if (ids === undefined) return [];
  return animals.filter((el, index) => el.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  const fileredAnimals = animals.filter((el) => el.name === animal);
  return fileredAnimals.every((el2, index) => el2.residents[index].age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find((el) => el.firstName === employeeName || el.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  let haveManager = false;
  employees.forEach((employee) => {
    const elById = employee.managers.some((el) => el === id);
    if (elById) { haveManager = true; }
  });

  return haveManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((acc, item) => {
      acc[item.name] = item.residents.length;
      return acc;
    }, {});
  }
  return animals.find((el) => el.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
}

const getSex = (sex) => sex === 'female' || sex === 'male';

const addAnimalsByGenre = (map, { sex, sorted }) => {
  const obj = map;
  Object.keys(obj).forEach((el) => {
    obj[el] = obj[el].map((animal) => {
      const output = {};
      if (getSex(sex) && sorted) {
        output[animal] = animals.find((item) => item.name === animal).residents
          .filter((element) => element.sex === sex)
          .map((item2) => item2.name).sort();
        return output;
      }
      output[animal] = animals.find((item) => item.name === animal).residents
        .filter((element) => element.sex === sex)
        .map((item2) => item2.name);
      return output;
    });
  });
  return obj;
};

const addNamesForEachSpecie = (map, { sorted } = false) => {
  const obj = map;
  Object.keys(obj).forEach((el) => {
    obj[el] = obj[el].map((animal) => {
      const output = {};
      if (sorted) {
        output[animal] = animals.find((item) => item.name === animal).residents
          .map((item2) => item2.name).sort();
        return output;
      }
      output[animal] = animals.find((item) => item.name === animal).residents
        .map((item2) => item2.name);
      return output;
    });
  });
  return obj;
};

const getAnimalsLocation = () => ({
  NE: animals.filter((el) => el.location === 'NE').map((el) => el.name),
  NW: animals.filter((el) => el.location === 'NW').map((el) => el.name),
  SE: animals.filter((el) => el.location === 'SE').map((el) => el.name),
  SW: animals.filter((el) => el.location === 'SW').map((el) => el.name),
});

const getAnimalsNamesBySpecies = (options) => {
  const animalsLocations = getAnimalsLocation();
  const { sex } = options;
  if (sex) {
    const namesOfEachSpecieGenre = addAnimalsByGenre(animalsLocations, options);
    return namesOfEachSpecieGenre;
  }
  const namesOfEachSpecie = addNamesForEachSpecie(animalsLocations);
  return namesOfEachSpecie;
};

const getAnimalsNamesBySpeciesSort = (options) => {
  const animalsLocations = getAnimalsLocation();
  const { includeNames, sex, sorted } = options;
  if (includeNames && sex && sorted) return addAnimalsByGenre(animalsLocations, options);
  const namesOfEachSpecieSort = addNamesForEachSpecie(animalsLocations, options);
  return namesOfEachSpecieSort;
};

const checkOptions = (options) => !options || !options.includeNames;

function animalMap(options) {
  if (checkOptions(options)) return getAnimalsLocation();
  const { includeNames, sorted } = options;
  if (includeNames && sorted) return getAnimalsNamesBySpeciesSort(options);
  if (includeNames) return getAnimalsNamesBySpecies(options);
}

const parkServiceHours = () => {
  const output = {};
  Object.keys(hours).forEach((el) => {
    output[el] = ((hours[el].open - hours[el].close) === 0)
      ? 'CLOSED' : `Open from ${hours[el].open}am until ${hours[el].close - 12}pm`;
  });
  return output;
};

function schedule(dayName) {
  if (dayName === undefined) return parkServiceHours();
  const output = {};
  output[dayName] = ((hours[dayName].close - hours[dayName].open) === 0)
    ? 'CLOSED' : `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
  return output;
}
function oldestFromFirstSpecies(id) {
  const findAnimal = employees.find((employee) => employee.id === id).responsibleFor[0];
  console.log(findAnimal);
  const animal = animals.find((el) => el.id === findAnimal);
  const oldResidentAge = animal.residents.reduce((acc, item) =>
    ((acc > item.age) ? acc : item.age));
  const { name, sex, age } = animal.residents.find((resident) =>
    resident.age === oldResidentAge);
  return [name, sex, age];
}

function increasePrices(percentage) {
  const percent = (percentage / 100) + 1;
  Object.keys(prices).forEach((el) => {
    const num = (prices[el] * percent);
    const decimalPart = (num % 1).toFixed(3);
    const serializedNum = Math.ceil(decimalPart * 100) / 100 + Math.floor(num);
    console.log(num);
    prices[el] = serializedNum;
  });
}

function employeeCoverage(idOrName) {
  const employeeObject = {};
  if (!idOrName) {
    employees.forEach((el) => {
      const fullName = `${el.firstName} ${el.lastName}`;
      employeeObject[fullName] = el.responsibleFor.map((animalId) =>
        animals.find(({ id }) => animalId === id).name);
    });
    return employeeObject;
  }

  const especificEmployee = employees.find(({ firstName, lastName, id }) =>
    [firstName, lastName, id].includes(idOrName));
  const fullName = `${especificEmployee.firstName} ${especificEmployee.lastName}`;
  employeeObject[fullName] = especificEmployee.responsibleFor.map((el2) =>
    animals.find(({ id }) => el2 === id).name);
  return employeeObject;
}
console.log(employeeCoverage('Stephanie'));
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
