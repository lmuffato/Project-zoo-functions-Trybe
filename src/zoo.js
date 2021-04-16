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
  const animalsArray = animals.filter((animal) => ids.includes(animal.id));
  return animalsArray;
}

function animalsOlderThan(species, age) {
  const animalsAge = animals.find((animal) => animal.name === species);
  return animalsAge.residents.every((animal) => animal.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const searchEmployee = employees.find((employee) => employee.firstName === employeeName
    || employee.lastName === employeeName);
  return searchEmployee;
}

function createEmployee(personalInfo, associatedWith) {
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
  return employees.some((employeeObj) => employeeObj.managers.some((employeeId) =>
    employeeId === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (species === undefined) {
    const animalObj = {};
    animals.forEach(({ name, residents }) => {
      animalObj[name] = residents.length;
    });
    return animalObj;
  }
  return animals.find((value) => species === value.name).residents.length;
}

console.log(animalCount('lions'));

// Requisito resolvido com a ajuda maravilhosa e eterna do Murilo Gonçalves <3

// Daria pra usar template literals? NÃO, POIS RETORNA STRING E O QUE O REQUISITO SOLICITA É O RETORNO DE UM OBJETO
// `${animalObj[name]}: ${animalObj.residents.length}`;

// Por que aqui só volta array? Como mudar isso? É por causa do map? MAP RETORNA ARRAY
// return animals.map((animalObj) => ({[animalObj.name]: animalObj.residents.length}));

function entryCalculator(entrants) {
  if (entrants === undefined || Object.entries(entrants).length === 0) {
    return 0;
  }
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const priceAdult = Adult * prices.Adult;
  const priceSenior = Senior * prices.Senior;
  const priceChild = Child * prices.Child;
  const totalPrice = priceAdult + priceSenior + priceChild;
  return totalPrice;
}

console.log(entryCalculator({}));
console.log(entryCalculator({ Adult: 1 }));

// function animalMap(options) {
//   // seu código aqui
// }

const getSchedule = (day) => {
  const timeOpen = hours[day].open;
  const timeClose = hours[day].close;
  if (timeOpen === 0 && timeClose === 0) {
    return 'CLOSED';
  }
  return `Open from ${timeOpen}am until ${timeClose - 12}pm`;
};

function schedule(dayName) {
  const result = {};
  const days = Object.keys(hours);
  if (dayName === undefined) {
    days.forEach((day) => {
      result[day] = getSchedule(day);
    });
  } else {
    result[dayName] = getSchedule(dayName);
  }
  return result;
}

console.log(schedule());

function oldestFromFirstSpecies(id) {
  const firstSpecie = employees.find((employee) => employee.id === id).responsibleFor[0];
  function firstSpecieObj(animalId) {
    return animals.find((value) => value.id === animalId).residents.sort((a, b) => b.age - a.age)[0];
  }
  const animalArray = [
    firstSpecieObj(firstSpecie).name,
    firstSpecieObj(firstSpecie).sex,
    firstSpecieObj(firstSpecie).age,
  ];
  return animalArray;
}

console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));

// function increasePrices(percentage) {
//   // seu código aqui
// }

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
