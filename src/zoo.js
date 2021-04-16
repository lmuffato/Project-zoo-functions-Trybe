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
// Um eterno obrigado à Marília, Nath Zebral, Ana Ventura, Beatriz Izidoti, Malu, Thalita, Lucas Lara,
// Rafael Medeiros e Henrique Lima (que além da ajuda técnica soube dizer as palavras certas num momento bem difícil).

// FIRST COMMIT <3

const { prices, employees } = require('./data');
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

function schedule(dayName) {
  const { hours } = data;
  const result = Object.entries(hours).reduce((acc, [key, value]) => {
    const [am, pm] = Object.values(value);
    acc[key] = key === 'Monday' ? 'CLOSED' : `Open from ${am}am until ${pm % 12}pm`;
    return acc;
  }, {});
  if (dayName) {
    const day = result[dayName];
    return {
      [dayName]: day,
    };
  }
  return result;
}

//   const week = {};
//   // const dias = Object.keys(data.hours);
//   // const hour = Object.values(data.hour);
//   let resultado = 0;
//   Object.keys(data.hour).map((elem, i) => {
//     const funcionamento = (Object.keys(data.hours)[i].open !== 0)
//       ? `Open from ${Object.keys(data.hours)[i].open}am until ${(Object.keys(data.hour)[i].close - 12)}pm`
//       : 'CLOSED';
//     return Object.assign(week, { [elem]: funcionamento });
//   });
//   if (dayName !== undefined) {
//     Object.entries(week).forEach((key) => {
//       if (dayName === key[0]) {
//         output = { [key[0]]: key[1] };
//       }
//     });
//   } else {
//     resultado = week;
//   }
//   return resultado;
// }
// const dias = Object.keys(data.hours);
// const hour = Object.values(data.hour);
// let output;
// if (!dayName) {

function oldestFromFirstSpecies(id) {
  const funcionario = employees.find((employee) => employee.id === id);
  const anim = funcionario.responsibleFor[0];
  const infoAnimal = data.animals.filter((bicho) =>
    bicho.id === anim)[0].residents;
  const animalAgeComp = infoAnimal.sort((a, b) => (a.age < b.age ? 1 : -1));
  return Object.values(animalAgeComp[0]);
}

function increasePrices(percentage) {
  prices.Child = parseFloat((prices.Child + Math.round(prices.Child * percentage)
  / 100.0).toFixed(2));
  prices.Adult = parseFloat((prices.Adult + Math.round(prices.Adult * percentage)
  / 100.0).toFixed(2));
  prices.Senior = parseFloat((prices.Senior + Math.round(prices.Senior * percentage)
   / 100.0).toFixed(2));
}

//
// function employeeCoverage(idOrName) {
//  const employee = data.employees;
//  const semparam = employee.reduce(acc, curr) => { return {...acc
//     [curr]
//   }
//   }
// }

// if (!idOrName) {
//   for (let i = 0; i <= employee.length === 0; i + 1) {
//     const func = employee.reduce((acc, funcionario) => {
//       acc[acc.name] = acc.employee.length;
//       return acc;
//     }, {});
//   }
// } else {
//   if (idOrName === data.employees.name || data.employees.lastName || data.employees.id);
//   return (data.employees.responsibleFor);
// }
// }
// console.log(employeeCoverage());
// const { firstName: name, lastName: surName, responsibleFor: animais }data.employee = employee;
//   if (!idOrName) { for (let i =0; i <= employee.lenght === 0; i + 1); {
//     const objetoFunc = employee.reduce((acc, funcionario) => {
//       acc[acc.name] = acc.employee.lenght;
//       return acc;
//     }, {});
//
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
  increasePrices,
  createEmployee,
};
