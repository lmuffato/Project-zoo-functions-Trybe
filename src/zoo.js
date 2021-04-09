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

const animalsByIds = (...ids) => ids.map((animalId) => animals.find(({ id }) => animalId === id));

const animalsOlderThan = (animal, minimalAge) => animals
  .find(({ name }) => animal === name).residents
  .every(({ age }) => age >= minimalAge);

const employeeByName = (employeeName) => {
  const findEmployee = employees
    .find(({ firstName, lastName }) => employeeName === firstName || employeeName === lastName);
  return employeeName ? findEmployee : {};
};

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = (id) => {
  const managersIds = employees.map(({ managers }) => managers);
  const ids = [];
  managersIds.forEach((d) => {
    ids.push(...d);
  });
  return ids.some((manager) => manager === id);
};

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
};

const animalCount = (species) => {
  if (species) return animals.find(({ name }) => name === species).residents.length;
  const res = {};
  animals.map(({ name, residents }) => ({ [name]: residents.length })).forEach((obj) => {
    Object.assign(res, obj);
  });
  return res;
};

const entryCalculator = (entrants) => {
  if (!entrants || entrants === {}) return 0;
  let totalPrice = 0;
  Object.keys(entrants).forEach((key) => {
    totalPrice += entrants[key] * prices[key];
  });

  return totalPrice;
};

// function animalMap(options) {
//   if (!options) {
//     const map = {};
//     const mapZones = ['NE', 'NW', 'SE', 'SW'];
//     mapZones.forEach((zone) => {
//       Object.assign(map, { [zone]: animals
//         .filter(({ location }) => location === zone)
//         .map(({ name }) => name) });
//     });
//     return map;
//   }
//   const map = {};
//   const mapZones = ['NE', 'NW', 'SE', 'SW'];
//   mapZones.forEach((zone) => {
//     Object.assign(map, { [zone]: animals
//       .filter(({ location }) => location === zone)
//       .map(({ name }) => name) });
//   });
//   return map;
// }

const schedule = (dayName) => {
  if (!dayName) {
    const res = {};
    Object.keys(hours).forEach((key) => {
      const { open, close } = hours[key];
      res[key] = (open && close) ? `Open from ${open}am until ${close - 12}pm` : 'CLOSED';
    });
    return res;
  }
  const { open, close } = hours[dayName];
  return { [dayName]: (close && open) ? `Open from ${open}am until ${close - 12}pm` : 'CLOSED' };
};

console.log(schedule());

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
