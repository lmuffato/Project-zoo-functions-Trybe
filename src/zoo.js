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
// Este trabalho todo só foi possível graças a pessoas incríveis e dispostas que me ajudaram não
// somente a completar os exercícios, mas me ensinaram na prática o sentido de TIME.
// Um eterno obrigado à Marília, Nath Zebral, Ana Ventura, Beatriz Izidioti, Malu, Thalita, Lucas Lara,
// Rafael e Henrique Lima (que além da ajuda técnica soube dizer as palavras certas num momento bem difícil).

// FIRST COMMIT <3

const data = require('./data');

function animalsByIds(...ids) {
  if (ids.lenght === 0) return [];
  if (ids.lenght === 1) {
    data.animals.find(({ id }) => id === ids[0]);
  }
  return data.animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  const specie = data.animals.find((creature) => creature.name === animal);
  return specie.residents.every((idade) => idade.age >= age);
}

function employeeByName(employeeName) {
// seu código aqui
  if (!employeeName) {
    return {};
  }
  return data.employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
}
function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employee;
}

function isManager(id) {
  return data.employees.some((item) => item.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // const { id, firstName, lastName } = personalInfo;
  // const { managers, responsibleFor } = associatedWith;
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employee);
}

function animalCount(species) {
  if (!species) {
    const animalObj = data.animals.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length; return acc;
    }, {});
    return animalObj;
  }
  return data.animals.find((animal) => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || entrants === {}) {
    return 0;
  }
  return Object.entries(entrants)
    .map(([entrant, qty]) => qty * data.prices[entrant])
    .reduce(((acc, curr) => acc + curr), 0);
}
// function animalMap(options) {
// seu código aqui
// }

// function schedule(dayName) {
// seu código aqui
// }

// function oldestFromFirstSpecies(id) {
// seu código aqui
// }

// function increasePrices(percentage) {
// seu código aqui
// }

// function employeeCoverage(idOrName) {
//   const employee = data.employee;
//   if (!idOrName) {
//     for (let i =0; i <= employee.lenght === 0; i + 1); {
//       const objetoFunc = employee.reduce((acc, funcionario) => {
//         acc[acc.name] = acc.employee.lenght;
//         return acc;
//       }, {});
//     }
//   }
// }

module.exports = {
  entryCalculator,
  // schedule,
  animalCount,
  // animalMap,
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
