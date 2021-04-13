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

const { animals, employees, prices, hours } = data;

function animalsByIds(...ids) {
  return animals.filter((animal, index) => animal.id === ids[index]);
}

const filterAnimals = (animal) => [animals.find((eachAnimal) => eachAnimal.name === animal)];

function animalsOlderThan(animalName, animalAge) {
  const foundAnimal = filterAnimals(animalName);
  const [{ residents }] = foundAnimal;
  return residents.every((eachAnimal) => eachAnimal.age > animalAge);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find((eachEmployee) =>
    eachEmployee.firstName === employeeName || eachEmployee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const [{ managers }] = employees;
  return managers.some((eachManager) => (eachManager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

// Para essa função utilizei o repositório do Anderson Nascimento como fonte.
function animalsListBySpecies() {
  return animals.reduce((acc, { name, residents }) => {
    acc[name] = residents.length;
    return acc;
  }, {});
}

function animalCount(specie) {
  if (!specie) {
    return animalsListBySpecies();
  }
  return animals.find((animal) => animal.name === specie).residents.length;
}

// Alguém me ajuda a refatorar esse código, não gostei! Hahaha'
function entryCalculator(entrants) {
  if (entrants === undefined) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const totalAdultPrice = Adult * prices.Adult;
  const totalChildPrice = Child * prices.Child;
  const totalSeniorPrice = Senior * prices.Senior;
  return totalAdultPrice + totalChildPrice + totalSeniorPrice;
}

// const locationsNE = animals.filter((animal) => animal.location === 'NE');
// const locationsNW = animals.filter((animal) => animal.location === 'NW');
// const locationsSE = animals.filter((animal) => animal.location === 'SE');
// const locationsSW = animals.filter((animal) => animal.location === 'SW');

// function optionsEmpty(){
//   return {
//       NE: locationsNE.map((eachAnimal) => eachAnimal.name),
//       NW: locationsNW.map((eachAnimal) => eachAnimal.name),
//       SE: locationsSE.map((eachAnimal) => eachAnimal.name),
//       SW: locationsSW.map((eachAnimal) => eachAnimal.name),
//     }
// }

// function includeNamesOption(){
//   const [{ residents }] = locationsNE;
//   let includeNE;
//   locationsNE.forEach((animal) => {
//     includeNE = {
//       [animal.name]: residents.map((resident) => resident.name),
//     }
//   })
//   return includeNE;
// }
// console.log(includeNamesOption());

// function animalMap(options) {
//   if (!options) {
//     return optionsEmpty();
//   }
//   if (options === { includeNames: true }) {

//   }
// }
function withoutDay() {
  return {
    Tuesday: `Open from ${hours.Tuesday.open}am until ${hours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${hours.Wednesday.open}am until ${hours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${hours.Thursday.open}am until ${hours.Thursday.close - 12}pm`,
    Friday: `Open from ${hours.Friday.open}am until ${hours.Friday.close - 12}pm`,
    Saturday: `Open from ${hours.Saturday.open}am until ${hours.Saturday.close - 12}pm`,
    Sunday: `Open from ${hours.Sunday.open}am until ${hours.Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
}
// Consultei o código do colega Daniel Ribeiro para me auxiliar na lógica dessa função;
function getZooHour(day) {
  const openTime = hours[day].open;
  const closeTime = hours[day].close - 12;
  if (!openTime || !closeTime) {
    return 'CLOSED';
  }
  return `Open from ${openTime}am until ${closeTime}pm`;
}

function schedule(dayName) {
  if (!dayName) {
    return withoutDay();
  }
  return {
    [dayName]: getZooHour(dayName),
  };
}

// Requisito 11
function oldestFromFirstSpecies(employeeId) {
  const rightEmployee = employees.find((employee) => employee.id === employeeId);
  const foundSpecie = rightEmployee.responsibleFor[0];
  const foundAnimal = animals.find((animal) => animal.id === foundSpecie);
  const getResidents = foundAnimal.residents;
  let animalAge = 0;
  let currentAnimal;
  getResidents.forEach((resident) => {
    if (resident.age >= animalAge) {
      animalAge = resident.age;
      currentAnimal = resident;
    }
  });
  return Object.values(currentAnimal);
}

function increasePrices(number) {
  // Para essa função, consultei o conteúdo sobre arredondamento e casas decimais:
  // http://www.javascriptkit.com/javatutors/round.shtml
  const percentNumber = (number + 100) / 100;
  const pricesKeys = Object.keys(prices);
  pricesKeys.forEach((key) => {
    data.prices[key] = Math.round(100 * (data.prices[key] * percentNumber)) / 100;
  });
}

function getEmployeeById(employeeId) {
  return employees.find((employee) => employee.id === employeeId);
}

function getEmployeeByName(employeeName) {
  return employees.find((employee) => employee.firstName === employeeName);
}

function getEmployeeByLastName(employeeLastName) {
  return employees.find((employee) => employee.lastName === employeeLastName);
}

function getAnimals(animalsIds) {
  return animalsIds.map((ids) => animals
    .find(({ id }) => id === ids).name);
}

// Para essa parte do requisito consultei o repositório do colega Sérgio Martins
function buildResponseWithoutParam() {
  const employeesFullName = employees.map(({ firstName, lastName }) => `${firstName} ${lastName}`);

  return employeesFullName
    .sort()
    .map((employee) => ({ [employee]: getAnimals(employees
      .find(({ firstName }) => employee.includes(firstName)).responsibleFor) }))
    .reduce((obj, current) => Object.assign(obj, current), {});
}

function buildResponse(obj) {
  const employeeResponsabilities = obj.responsibleFor;
  return {
    [`${obj.firstName} ${obj.lastName}`]: getAnimals(employeeResponsabilities) };
}

function employeeCoverage(employeeIdOrName) {
  if (!employeeIdOrName) {
    return buildResponseWithoutParam();
  }

  let objReturned = getEmployeeById(employeeIdOrName);
  if (objReturned) {
    return buildResponse(objReturned);
  }

  objReturned = getEmployeeByName(employeeIdOrName);
  if (objReturned) {
    return buildResponse(objReturned);
  }

  objReturned = getEmployeeByLastName(employeeIdOrName);
  if (objReturned) {
    return buildResponse(objReturned);
  }
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
