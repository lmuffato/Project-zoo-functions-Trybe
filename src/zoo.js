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

const { animals, employees, prices, hours } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  return ids.map((element) => animals.find((animal) => animal.id === element));
}

function animalsOlderThan(specie, age) {
  const species = animals.filter((animal) => animal.name === specie);
  return species[0].residents.every((element) => element.age > age);
}

function employeeByName(employeeName) {
  return employees.reduce((accumulator, employee) => (employee.firstName === employeeName
  || employee.lastName === employeeName
    ? employee : accumulator), {});
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees
    .map((employee) => employee.managers)
    .reduce((accumulator, manager) => accumulator.concat(manager), [])
    .some((manager) => manager === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
}

function animalCount(species) {
  const numbSpecies = () => animals.find((animal) => animal.name === species).residents.length;
  const allSpecies = () => animals.reduce((accumulator, animal) => (
    { ...accumulator, [animal.name]: animal.residents.length }), {});

  return (species !== undefined ? numbSpecies() : allSpecies());
}

function entryCalculator(entrants) {
  const totalPrice = () => {
    const { Adult = 0, Child = 0, Senior = 0 } = entrants;
    return ((prices.Adult * Adult) + (prices.Child * Child) + (prices.Senior * Senior));
  };
  return (entrants === undefined || entrants === {}
    ? 0
    : totalPrice());
}

// ANIMAL MAP //

// function animalMap(options) {
//   const newObj = {
//     NE: [],
//     NW: [],
//     SE: [],
//     SW: [],
//   };
//   const noParam = () => {
//     animals.forEach((animal) => {
//       animal.location === 'NE' ? newObj.NE.push(animal.name)
//       : animal.location === 'NW' ? newObj.NW.push(animal.name)
//       : animal.location === 'SE' ? newObj.SE.push(animal.name)
//       : newObj.SW.push(animal.name);
//     });
//     return newObj;
//   };
//   const withParam = () => {
//     const { includeNames = false, sex = 'none', sorted = false } = options;

//     const namedAnimal = (animal) => {
//       const animalResidents = [];
//       if (sex === 'none') {
//         animal.residents.forEach((resident) => animalResidents.push(resident.name));
//       }
//       if (sex === 'female') {
//         animal.residents.forEach((resident) => {
//           if (resident.sex === 'female') {
//             animalResidents.push(resident.name);
//           }
//         });
//       }
//       if (sex === 'male') {
//         animal.residents.forEach((resident) => {
//           if (resident.sex === 'male') {
//             animalResidents.push(resident.name);
//           }
//         });
//       }
//       return (sorted === false ? { [animal.name]: animalResidents }
//         : { [animal.name]: animalResidents.sort() });
//     };

//     if (includeNames === false) {
//       return noParam();
//     }

//     if (includeNames === true) {
//       animals.forEach((animal) => {
//         animal.location === 'NE' ? newObj.NE.push(namedAnimal(animal))
//         : animal.location === 'NW' ? newObj.NW.push(namedAnimal(animal))
//         : animal.location === 'SE' ? newObj.SE.push(namedAnimal(animal))
//         : newObj.SW.push(namedAnimal(animal));
//       });
//     }

//     return newObj;
//   };
//   return (options === undefined ? noParam() : withParam());
// }

// ANIMAL MAP ^ //

function schedule(dayName) {
  const { Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = hours;
  const days = {
    Tuesday: `Open from ${Tuesday.open}am until ${Tuesday.close - 12}pm`,
    Wednesday: `Open from ${Wednesday.open}am until ${Wednesday.close - 12}pm`,
    Thursday: `Open from ${Thursday.open}am until ${Thursday.close - 12}pm`,
    Friday: `Open from ${Friday.open}am until ${Friday.close - 12}pm`,
    Saturday: `Open from ${Saturday.open}am until ${Saturday.close - 12}pm`,
    Sunday: `Open from ${Sunday.open}am until ${Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
  const entries = Object.entries(days);
  const singleDayArray = entries.find((element) => element[0] === dayName);
  return (dayName === undefined ? days
    : { [singleDayArray[0]]: singleDayArray[1] });
}

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
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
