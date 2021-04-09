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

// const data = require('./data');
const { animals, employees } = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.some((id) => animal.id === id));
}

function animalsOlderThan(animalName, age) {
  // const animalWithName = animals.find((animal) => animal.name.includes(animalName)); // capturando objeto que possui animal.name passado por parametro.
  // const { residents } = animalWithName; // capturando array de residentes.
  // const answer = residents.every((elem) => elem.age >= age); // verificando se todas as expressões (elem.agr >= age) retornam true.
  // return answer; // retornando valor final.
  // --------------- tentativa otimização -----------
  const answer = animals.find((animal) => animal.name.includes(animalName))
    .residents.every((elem) => elem.age >= age);
  return answer;
}

// console.log(animalsOlderThan('lions'))

function employeeByName(employeeName) {
  const objectWithName = employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
  if (!objectWithName) {
    return {};
  }
  return objectWithName;
}

function createEmployee(personalInfo, associatedWith) {
  return {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/some
const createObj = (id, firstName, lastName, managers, responsibleFor) => {
  const obj = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return obj;
};

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const obj = createObj(id, firstName, lastName, managers, responsibleFor);
  // if (!managers) obj.managers = [];
  // if (!responsibleFor) obj.responsibleFor = [];
  employees.push(obj);
}

function animalCount(species) {
  let count = 0;
  // for (let i = 0; i <= animals.length; i += 1) {
  //   // console.log(animals[0].name);
  //   if (animals[i].name === species) {
  //     count += 1
  //   };
  // }
  animals.forEach((animal) => {
    if (animal.name === species) {
      count += 1;
    }
  });
  console.log(count);
  return count;
}
animalCount('lions');

// function entryCalculator(entrants) {
//   // seu código aqui
// }

// function animalMap(options) {
//   // seu código aqui
// }

// function schedule(dayName) {
//   // seu código aqui
// }

// function oldestFromFirstSpecies(id) {
//   // seu código aqui
// }

// function increasePrices(percentage) {
//   // seu código aqui
// }

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  // entryCalculator,
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
