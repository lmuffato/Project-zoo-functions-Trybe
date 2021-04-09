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

const { animals, employees, hours, prices } = data; // Ideia retirada do código do Murilo Gonçalves (Turma 10-A)

function animalsByIds(...ids) {
  // seu código aqui
  return data.animals.filter((animal) =>
    ids.some((id) => animal.id === id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return data.animals.find(({ name }) =>
    name === animal).residents.every((resident) =>
    resident.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  return employeeName === undefined ? {}
    : data.employees.find(({ firstName, lastName }) =>
      employeeName === firstName || employeeName === lastName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
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
  // seu código aqui
  const managerList = [];
  data.employees.forEach(({ managers }) => {
    if (managerList.every((manager) => managers.every((managerTest) => manager !== managerTest))) {
      managerList.push(...managers);
    }
  });

  return data.employees.some((employee) =>
    employee.id === id && (managerList.some((idTeste) => idTeste === employee.id)));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    const finalObj = {};
    data.animals.forEach(({ name, residents }) =>
      finalObj[name] = residents.length);

    return finalObj;
  }

  return data.animals.find((animal) =>
    species === animal.name).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined) return 0;

  return Object
    .keys(entrants)
    .reduce((totalPrice, keyPerson) =>
      totalPrice + entrants[keyPerson] * data.prices[keyPerson], 0);
}

function animalMap(options) {
  // seu código aqui

  const locations = {};
  animals.forEach(({ location }) => {
    if (!Object.keys(locations).includes(location)) {
      locations[location] = [];
    }
  });

  if (options === undefined || !options.includeNames) {
    animals.forEach(({ name, location }) => {
      locations[location].push(name);
    });
    return locations;
  }

  if (options.includeNames) {
    animals.forEach((animal) => {
      const nameResidents = () => {
        if (options.sex !== undefined) {
          return animal.residents.filter((resident) =>
            resident.sex === options.sex).map((animalOfSex) => animalOfSex.name);
        }
        return animal.residents.map((resident) => resident.name);
      };
      if (options.sorted) {
        locations[animal.location].push({ [animal.name]: nameResidents().sort() });
      } else {
        locations[animal.location].push({ [animal.name]: nameResidents() });
      }
    });
    return locations;
  }
}

/* function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
} */

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
