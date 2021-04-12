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

const { employees } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');
const data = require('./data');

const { animals } = data;

function animalsByIds(...ids) {
  // seu código aqui
  const animalArray = animals.filter((animal) => ids.includes(animal.id));
  return animalArray;
}

function animalsOlderThan(animalName, ageAnimal) {
  // seu código aqui
  const nameAnimal = animals.find((animal) => animalName === animal.name);
  const ageCheck = nameAnimal.residents;
  return ageCheck.every((animal) => ageAnimal <= animal.age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    const emptyObject = {};
    return emptyObject;
  }
  return employees.find((employe) => employe.firstName === employeeName
  || employe.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  // seu código aqui
  const personCheck = employees.filter((employ) => employ.managers.includes(id));
  return personCheck.some(() => id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newEmployee);
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    return animals.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
  return animals.find((animal) => animal.name === species).residents.length;
} // Consegui entender a lógica de utilizar o reduce e sua criação de objeto através do código do Paulo Henrique!

const summAdult = (entrants) => (prices.Adult * ((entrants === undefined) ? 0 : entrants));
const summChild = (entrants) => (prices.Child * ((entrants === undefined) ? 0 : entrants));
const summSenior = (entrants) => (prices.Senior * ((entrants === undefined) ? 0 : entrants));

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  return summAdult(entrants.Adult) + summChild(entrants.Child) + summSenior(entrants.Senior);
}

// function animalMap(options) {
//   // seu código aqui
// }

const days = Object.values(hours);
const daysWeek = Object.keys(hours);

const fullSchedule = days.reduce((acc, curr, index) => {
  if (curr.open || curr.close) {
    acc[`${daysWeek[index]}`] = `Open from ${curr.open}am until ${curr.close - 12}pm`;
    return acc;
  }
  acc[`${daysWeek[index]}`] = 'CLOSED';
  return acc;
}, {});

function schedule(dayName) {
  // seu código aqui
  if (dayName === undefined) {
    return fullSchedule;
  }
  // const [dayWeek, info] = Object.entries(fullSchedule).find(([_dayWeek, _info]) => _info === dayName);
  // return ({ [dayWeek]: info });
  // Eu acabei vendo a forma abaixo como resultado através do código do Rodrigo Grande. A única coisa que tive que manter os nomes date e mensage para que funcionasse, pois como a tentativa acima ela não funcionou
  const [date, mensage] = Object.entries(fullSchedule)
    .find(([_date, _mensage]) => _date === dayName);
  return ({ [date]: mensage });
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const personCheck = employees.find((employ) => employ.id.includes(id));
  const firstSpecie = personCheck.responsibleFor[0];
  const animalsByPerson = animals.find((animal) => animal.id.includes(firstSpecie));
  const oldestAnimal = animalsByPerson.residents.sort((a, b) => a.age - b.age);
  return [oldestAnimal[oldestAnimal.length - 1].name,
    oldestAnimal[oldestAnimal.length - 1].sex,
    oldestAnimal[oldestAnimal.length - 1].age];
}

function increasePrices(percentage) {
  // seu código aqui
  const { Adult, Child, Senior } = prices;
  prices.Adult = parseFloat((Adult + (Math.ceil(Adult * percentage) / 100)).toFixed(2));
  prices.Child = parseFloat((Child + (Math.ceil(Child * percentage) / 100)).toFixed(2));
  prices.Senior = parseFloat((Senior + (Math.ceil(Senior * percentage) / 100)).toFixed(2));
  return prices;
}

// const inputEmpty = () => employees.reduce((acc, curr) => {
//   const species = curr.responsibleFor;
//   const arrayAnimals = animals.filter((animal) => species.includes(animal.id));
//   const nameAnimal = arrayAnimals.reduce((accArray, currArray) => {
//     accArray.push(currArray.name);
//     return accArray;
//   }, []);
//   acc[`${curr.firstName} ${curr.lastName}`] = nameAnimal;
//   return acc;
// }, {});

// const inputEmploye = (idOrName) => {
//   const employeByInput = employees.reduce((acc, curr) => {
//     const employeInput = employees.find((employe) => employe.firstName === idOrName
//       || employe.lastName === idOrName || employe.id === idOrName);
//     const species = employeInput.responsibleFor;
//     const arrayAnimals = animals.filter((animal) => species.includes(animal.id));
//     const nameAnimal = arrayAnimals.reduce((accArray, currArray) => {
//       accArray.push(currArray.name);
//       return accArray;
//     }, []);
//     acc[`${employeInput.firstName} ${employeInput.lastName}`] = nameAnimal;
//     return acc;
//   }, {});
//   return employeByInput;
// };

// function employeeCoverage(idOrName) {
//   // seu código aqui
//   if (idOrName === undefined) {
//     return inputEmpty();
//   }
//   return inputEmploye(idOrName);
// }

// console.log(employeeCoverage());
// console.log(employeeCoverage('Stephanie'));
// console.log(employeeCoverage('Azevado'));

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
