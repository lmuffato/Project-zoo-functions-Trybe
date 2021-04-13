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
const { animals, employees, prices } = require('./data');
const { hours } = require('./data');

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
  employees.push(obj);
}

// const foundSpecie = (animal, species) => animal.name === species;
function animalCount(species) {
  if (!species) {
    const objReturn = {};
    animals.forEach((animal) => {
      objReturn[animal.name] = animal.residents.length;
    });
    return objReturn;
  }
  const objWithSpecie = animals.find((foundSpecie) => foundSpecie.name === species);
  return objWithSpecie.residents.length;
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function entryCalculator(entrants) {
  if (!entrants || isEmpty(entrants)) return 0;
  const arrayValue = Object.entries(entrants);
  const sum = arrayValue.reduce((acumulator, actual) =>
    acumulator + actual[1] * prices[actual[0]], 0);
  return sum;
}

// const getAllLocations = () => {
//   let NE = [], NW = [], SE = [], SW = [];
//   animals.forEach((animal) => {
//     if(animal.location === 'NE') NE.push(animal.name);
//     if(animal.location === 'NW') NW.push(animal.name);
//     if(animal.location === 'SE') SE.push(animal.name);
//     if(animal.location === 'SW') SW.push(animal.name);
//   });
//   return {
//     NE,
//     NW,
//     SE,
//     SW
//   };
// };

// // const getAllLocationsWithNames = () => {
// // };

// function animalMap(options) {
//   if(!options) {
//     let output = getAllLocations();
//     return output;
//   }
//   // const { includeNames, sorted, sex} = options;
//   // if(includeNames) {
//   //   const output = getAllLocationsWithNames();
//   // }
// };
// animalMap();

const generateObjSchedule = () => {
  const obj = Object.entries(hours);
  const objReturn = {};
  obj.forEach((day) => {
    let msg = `Open from ${day[1].open}am until ${(day[1].close) - 12}pm`;
    if (day[0] === 'Monday') msg = 'CLOSED';
    objReturn[day[0]] = msg;
  });
  return objReturn;
};

const generateObjScheduleWithDay = (dayName) => {
  const arr = Object.entries(hours);
  const objReturn = {};
  const found = arr.find((day) => day[0] === dayName);
  if (found[1].open === found[1].close) {
    objReturn[found[0]] = 'CLOSED';
    return objReturn;
  }
  objReturn[found[0]] = `Open from ${found[1].open}am until ${(found[1].close) - 12}pm`;
  return objReturn;
};

function schedule(dayName) {
  if (!dayName) {
    const obj = generateObjSchedule();
    return obj;
  }
  return generateObjScheduleWithDay(dayName);
}

function oldestFromFirstSpecies(id) {
  const idAnimal = employees.find((obj) => obj.id === id).responsibleFor[0];
  const arrAnimalResidents = animals.find((animal) => animal.id === idAnimal).residents;
  let animalReturn = arrAnimalResidents[0];
  arrAnimalResidents.forEach((animal) => {
    if (animal.age > animalReturn.age) {
      animalReturn = animal;
    }
  });
  return [...Object.values(animalReturn)];
}

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
