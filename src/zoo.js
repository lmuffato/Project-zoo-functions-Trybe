// -------------------- Imports -----------------------

/* const data = require('./data'); */
const { animals, employees, prices } = require('./data');
/* const data = require('./data'); */

// -------------------- require 01 -----------------------

function animalsByIds(...ids) {
  return animals.filter(({ id }) => ids.includes(id)); // this includes was based in Murilo Goncalves
}
/* return ids.map((id) => animals.find((animal) => animal.id === id)); */

// -------------------- require 02 -----------------------

function animalsOlderThan(animal, animalsAge) {
  return animals
    .find(({ name }) => name === animal)
    .residents.every(({ age }) => age >= animalsAge);
}

// -------------------- require 03 -----------------------

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees
    .find(({ firstName, lastName }) => [firstName, lastName].includes(employeeName));
}

// -------------------- require 04 -----------------------

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

// -------------------- require 05 -----------------------

function isManager(id) {
  return employees.some(({ managers }) => managers.find((manager) => manager === id));
}

// -------------------- require 06 ------------------------

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

// -------------------- require 07 ------------------------

function animalCount(species) {
  const howMannyAnimals = animals.reduce((acc, crr) => { // function inspired by Lucas Pedroso
    acc[crr.name] = crr.residents.length;
    return acc;
  }, {});

  return !species ? howMannyAnimals : howMannyAnimals[species];
}

// other way to work.
/* const howMannyAnimals = animals.reduce((acc, crr) =>
    ({ acc, [crr.name]: crr.residents.length }), {});
*/

// --------------------- require 08 ------------------------

// entrie: { 'Adult': 2, 'Child': 3, 'Senior': 1 }

// using Object.entries to transform the object in array:
function entryCalculator(entrants = 0) {
  const priceCalc = (acc, [category, qnt]) => acc + prices[category] * qnt;
  return Object.entries(entrants).reduce(priceCalc, 0);
}

// the way to do this function w/o transform objects in arrays using the prototyped Object functions is:
/* function entryCalculator(entrants = 0) {
  const { Adult: adultQnt, Child: childQnt, Senior: seniorQnt } = entrants;
  const validCalc = (a, b) => (!a) ? 0 : a * b;
  return (validCalc(adultQnt, prices.Adult)) + (validCalc(childQnt, prices.Child)) + (validCalc(seniorQnt, prices.Senior));
} */

// -------- require 09 ---------- Functional but enemy of the Lint ----------- require 09 ------

const animalsByLocation = (...zone) => animals.filter(({ location }) => zone.includes(location));

const animalsNE = animalsByLocation('NE');
const animalsNW = animalsByLocation('NW');
const animalsSE = animalsByLocation('SE');
const animalsSW = animalsByLocation('SW');

const speciesByZone = (zone) => zone.reduce((acc, crr) => [...acc, crr.name], []);

const noOptions = {
  NE: speciesByZone(animalsNE),
  NW: speciesByZone(animalsNW),
  SE: speciesByZone(animalsSE),
  SW: speciesByZone(animalsSW),
};

const specieReduced = (specie, sorted = false) => {
  if (!sorted) {
    return specie.reduce((acc, crr) => {
      return [...acc, { [crr.name]: crr.residents.map((a) => a.name) }];
    }, []);
  }

  return specie.reduce((acc, crr) => {
    return [...acc, { [crr.name]: crr.residents.map((a) => a.name).sort() }];
  }, []);
};

const residentsControl = (specie, sexOption = false, sorted = false) => {
  if (!sorted) {
    return specie.reduce((acc, crr) => {
      return [...acc, { [crr.name]: (crr.residents.filter((animal) => animal.sex === sexOption).map((a) => a.name)) }];
    }, [])
  }

  return specie.reduce((acc, crr) => {
    return [...acc, { [crr.name]: (crr.residents.filter((animal) => animal.sex === sexOption).map((a) => a.name)).sort() }];
  }, [])
};

const specieResidents = (specie, sorted = false, sex = false) => {
  if (!!sorted && sex === 'male') return residentsControl(specie, 'male', true);
  if (!!sorted && sex === 'female') return residentsControl(specie, 'female', true);
  if (!sorted && sex === 'male') return residentsControl(specie, 'male');
  if (!sorted && sex === 'female') return residentsControl(specie, 'female');
  if (!!sorted && !sex) return specieReduced(specie, true);
  return specieReduced(specie);
};

const optionsControl = (option1, option2) => ({
  NE: specieResidents(animalsNE, option1, option2),
  NW: specieResidents(animalsNW, option1, option2),
  SE: specieResidents(animalsSE, option1, option2),
  SW: specieResidents(animalsSW, option1, option2),
});

const includeNamesC = optionsControl();
const sortedNamesC = optionsControl(true);
const sortedFemaleNamesC = optionsControl(true, 'female');
const sortedMaleNamesC = optionsControl(true, 'male');
const maleNamesC = optionsControl(false, 'male');
const femaleNamesC = optionsControl(false, 'female');

function animalMap(options = {}) {
  if (!options.includeNames) return noOptions;
  if (!!options.sorted && options.sex === 'female') return sortedFemaleNamesC;
  if (!!options.sorted && options.sex === 'male') return sortedMaleNamesC;
  if (!!options.sorted && !options.sex) return sortedNamesC;
  if (options.sex === 'male') return maleNamesC;
  if (options.sex === 'female') return femaleNamesC;
  return includeNamesC;
}

// --------------------- require 10 ------------------------

/* function schedule(dayName) {
  // seu código aqui
} */

// --------------------- require 11 ------------------------

/* function oldestFromFirstSpecies(id) {
  // seu código aqui
} */

// --------------------- require 12 ------------------------

function increasePrices(percentage) {
  const { Adult, Child, Senior } = prices;
  prices.Adult = Math.ceil(Adult * (percentage + 100)) / 100;
  prices.Child = Math.ceil(Child * (percentage + 100)) / 100;
  prices.Senior = Math.ceil(Senior * (percentage + 100)) / 100;
}

// --------------------- require 13 ------------------------

/* function employeeCoverage(idOrName) {
  // seu código aqui
} */

module.exports = {
  animalsByIds,
  animalsOlderThan,
  employeeByName,
  createEmployee,
  isManager,
  addEmployee,
  animalCount,
  entryCalculator,
  increasePrices,
  animalMap,
  /* schedule,
  employeeCoverage,
  oldestFromFirstSpecies, */
};
