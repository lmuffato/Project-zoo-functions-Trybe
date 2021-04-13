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

const { hours } = require('./data');
const data = require('./data');

const { animals } = data;

const { employees } = data;

const { prices } = data;

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
  employees.push(newEmployee);
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
  return specifAnimal.residents.length;
}

function entryCalculator(entrants = 0) {
  let totalBill = 0;

  Object.entries(entrants).forEach((person) => {
    Object.entries(prices).forEach((personCost) => {
      if (personCost[0] === person[0]) {
        totalBill += (person[1] * personCost[1]);
      }
    });
  });

  return totalBill;
}

const mapResidents = () => {
  const residential = [];
  animals.forEach((animal) => {
    const { location } = animal;
    if (residential.indexOf(location) < 0) {
      residential.push(location);
    }
  });
  return residential;
};

function animalMap() {
  const residentialList = {};
  mapResidents().forEach((place) => {
    const animalFilter = () => {
      const placeAnimals = animals.filter((animal) => {
        if (animal.location === place) {
          return animal.name;
        }
        return ' ';
      });
      return placeAnimals;
    };
    const listMaker = {
      [place]: animalFilter(),
    };
    Object.assign(residentialList, listMaker);
  });

  return residentialList;
}

function schedule(dayName) {
  const allSchedule = {};
  let specifDay = {};
  const dayReceptor = (days) => {
    if (days[1].open === 0) {
      specifDay = { [days[0]]: 'CLOSED' };
    } else {
      specifDay = { [days[0]]: `Open from ${days[1].open}am until ${(days[1].close) - 12}pm` };
    }
    Object.assign(allSchedule, specifDay);
  };

  if (dayName === undefined) {
    Object.entries(hours).forEach(dayReceptor);
  } else {
    dayReceptor(Object.entries(hours)
      .find((specday) => specday[0] === dayName));
  }
  return allSchedule;
}

function oldestFromFirstSpecies(id) {
  const employ = id;
  console.log(employ);
}

function increasePrices(percentage) {
  const employ = percentage;
  console.slog(employ);
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
