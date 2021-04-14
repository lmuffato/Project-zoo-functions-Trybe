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

// Requisito 01
function animalsByIds(...ids) {
  return animals.filter((animal, index) => animal.id === ids[index]);
}
// Requisito 02
const filterAnimals = (animal) => [animals.find((eachAnimal) => eachAnimal.name === animal)];

function animalsOlderThan(animalName, animalAge) {
  const foundAnimal = filterAnimals(animalName);
  const [{ residents }] = foundAnimal;
  return residents.every((eachAnimal) => eachAnimal.age > animalAge);
}

// Requisito 03
function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find((eachEmployee) =>
    eachEmployee.firstName === employeeName || eachEmployee.lastName === employeeName);
}

// Requisito 04
function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

// Requisito 05
function isManager(id) {
  const [{ managers }] = employees;
  return managers.some((eachManager) => (eachManager === id));
}

// Requisito 06
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

// Requisito 07
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

// Requisito 08
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

// Requisito 10
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

// Requisito 12
function increasePrices(number) {
  // Para essa função, consultei o conteúdo sobre arredondamento e casas decimais:
  // http://www.javascriptkit.com/javatutors/round.shtml
  const percentNumber = (number + 100) / 100;
  const pricesKeys = Object.keys(prices);
  pricesKeys.forEach((key) => {
    data.prices[key] = Math.round(100 * (data.prices[key] * percentNumber)) / 100;
  });
}

// Requisito 13
function getAnimals(animalsIds) {
  return animalsIds.map((ids) => animals
    .find(({ id }) => id === ids).name);
}

function buildResponseWithoutParam() {
  return employees.reduce((acc, eachEmployeesObject) => {
    const fullName = `${eachEmployeesObject.firstName} ${eachEmployeesObject.lastName}`;
    acc[fullName] = getAnimals(eachEmployeesObject.responsibleFor);
    return acc;
  }, {});
}

function buildResponse(obj) {
  const employeeResponsabilities = obj[0].responsibleFor;
  return {
    [`${obj[0].firstName} ${obj[0].lastName}`]: getAnimals(employeeResponsabilities) };
}

function employeeCoverage(employeeIdOrName) {
  if (!employeeIdOrName) {
    return buildResponseWithoutParam();
  }

  // Para essa parte da função, consultei o repositório do Anderson Nascimento,
  // que me deu uma luz de como deixar o código mais limpo.
  const objReturned = employees.filter((eachEmployee) =>
    (eachEmployee.id === employeeIdOrName || eachEmployee.firstName.includes(employeeIdOrName)
   || eachEmployee.lastName.includes(employeeIdOrName)));

  return buildResponse(objReturned);
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
