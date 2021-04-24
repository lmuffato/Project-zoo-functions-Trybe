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

const { animals, employees, prices } = require('./data');

const arr = (array) => {
  const result = [];
  array.forEach((element) => {
    result.push(animals.filter(({ id }) => id === element)[0]);
  });
  return result;
};

const animalsByIds = (...ids) => (ids ? arr(ids) : []);

// console.log(animalsByIds("0938aa23-f153-4937-9f88-4858b24d6bce"))

// const animalsOlderThan = (animal, age) => {
//   let count = 0;
//   animals
//     .filter(({ name, residents }) => {
//       residents
//         .forEach(({ age: newAge }) => console.log(`${count += 1}: ${newAge > age}`));
//     });
// };

const animalsOlderThan = (animal, age) => {
  const selectedAnimal = animals.filter(({ name }) => name === animal);
  let residentsList;
  selectedAnimal.forEach(({ residents }) => {
    residentsList = residents;
  });
  return residentsList.every(({ age: newAge }) => newAge > age);
};

// animalsOlderThan('lions', 1);

const retorno = (employeeName) => employees
  .find(({ firstName, lastName }) => employeeName === firstName || employeeName === lastName);

const employeeByName = (employeeName) => (employeeName ? retorno(employeeName) : {});

// console.log(employeeByName('Nelson'));

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });
// console.log(createEmployee({oi: "tudo bem"}, {i:['oioi'], o:['aiai']}));

const isManager = (id) => employees.some(({ managers }) => managers
  .find((element) => element === id));

// isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83');

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees[employees.length] = { id, firstName, lastName, managers, responsibleFor };
}

// addEmployee(1, 2, 3);
// console.log(employees);

const listOfAnimals = () => {
  let auxiliar = '';
  const result = {};
  animals
    .filter(({ name, residents }) => {
      (auxiliar = { [name]: residents.length });
      return Object.assign(result, auxiliar);
    });
  return result;
};

const animalCount = (species) => {
  if (species) {
    const animal = animals.find(({ name }) => species === name);
    return animal.residents.length;
  }
  return listOfAnimals();
};

// console.log(animalCount());

const entryCalculator = (entrants) => {
  let total = 0;
  if (entrants) {
    const entries = Object.entries(entrants);
    entries.forEach((element) => { total += prices[element[0]] * element[1]; });
  }
  return total;
};

// console.log(entryCalculator({ Adult: 2, 'Child': 3, 'Senior': 1 }));
// const inconstant = {oi:'0',e:'e', i:'i'};
// console.log(Object.entries(inconstant))
// console.log(Object.keys(inconstant).length)

const withNoParams = () => {
  const ne = animals.filter(({ location }) => (location === 'NE'));
  const nw = animals.filter(({ location }) => (location === 'NW'));
  const se = animals.filter(({ location }) => (location === 'SE'));
  const sw = animals.filter(({ location }) => (location === 'SW'));
  const neAnimals = ne.map(({ name }) => name);
  const nwAnimals = nw.map(({ name }) => name);
  const seAnimals = se.map(({ name }) => name);
  const swAnimals = sw.map(({ name }) => name);
  return { NE: neAnimals, NW: nwAnimals, SE: seAnimals, SW: swAnimals };
};

const animalMap = (options) => {
  if (!options) { return console.log(withNoParams()); }
  let sex, sorted, names;
  const chooseOptions = Object.entries(options);
  chooseOptions.forEach((element) => {
    if (element[0] === 'includeNames' ) console.log('oi');
  });
};
animalMap({k:'oi', includeNames:'tudo ', v:'bom?'});

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
