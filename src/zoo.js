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

const arrayBySex = (sex, isSorted) => {
  const arrayAnimalsName = [];
  let namesList;
  const animalArr = animals.map(({ name }) => name);
  animalArr.forEach((animal) => {
    namesList = (animals.filter((element) => element.name === animal)
      .map(({ residents }) => residents)[0]
      .filter(({ sex: sexo }) => sexo === sex))
      .map(({ name }) => name);
    if (isSorted) arrayAnimalsName.push({ [animal]: namesList.sort() });
    arrayAnimalsName.push({ [animal]: namesList });
  });
  return arrayAnimalsName;
};

const arrayAnimals = (isSorted, sex) => {
  if (sex) { return arrayBySex(sex, isSorted); }
  const arrayAnimalsName = [];
  let namesList;
  const animalArr = animals.map(({ name }) => name);
  animalArr.forEach((animal) => {
    namesList = (animals.filter((element) => element.name === animal)
      .map(({ residents }) => residents)[0]
      .map(({ name }) => name));
    if (isSorted) arrayAnimalsName.push({ [animal]: namesList.sort() });
    arrayAnimalsName.push({ [animal]: namesList });
  });
  return arrayAnimalsName;
};

// const b = a.map(({residents}) => residents)[0]
// const c = b.map(({name}) => name)

// console.log(b);
// console.log(c);

const nameIsIncluded = (isSorted, sex) => {
  const animalsByName = arrayAnimals(isSorted, sex);
  const nameIncludes = withNoParams();
  const locations = ['NE', 'NW', 'SE', 'SW'];
  locations.forEach((location) => {
    animalsByName.forEach((animal) => {
      const validator = Object.keys(animal)[0];
      nameIncludes[location].forEach((element, i) => {
        if (element === validator) nameIncludes[location][i] = animal;
      });
    });
  });
  return nameIncludes;
};

const firstValidator = (options) => {
  let sex;
  let sorted;
  let names;
  const chooseOptions = Object.entries(options);
  chooseOptions.forEach((element) => {
    if (element[0] === 'includeNames') {
      [, names] = element;
    } else if (element[0] === 'sorted') {
      [, sorted] = element;
    } else if (element[0] === 'sex') {
      [, sex] = element;
    }
  });
  return [sex, sorted, names];
};

const animalMap = (options) => {
  if (!options) { return withNoParams(); }
  const [sex, sorted, names] = firstValidator(options);
  if (names) { return nameIsIncluded(sorted, sex); }
  return withNoParams();
};

// const sortedArray = ['oi', 'a', 'adedonha', 'adelina', 'adeilio', 'jir', 'chiquita', 'bueno']
//   .sort();
// console.log(sortedArray);

const daysNameList = () => {
  let result = {};
  const keys = Object.keys(hours);
  const values = Object.values(hours);
  values.forEach(({ open, close }, index) => {
    result = Object.assign(result, { [keys[index]]: `Open from ${open}am until ${close - 12}pm` });
  });
  Object.entries(result).forEach((element) => { // For in não queria funcionar dai esse site me deu a ideia : https://www.30secondsofcode.org/blog/s/eslint-refactor-for-in
    if (element[1].includes('from 0am')) {
      result[element[0]] = 'CLOSED';
    }
  });
  return (result);
};

const scheduleWhithParam = (dayName, list) => {
  let finalValue = '';
  Object.entries(list)
    .forEach((element) => {
      if (element[0] === dayName) {
        finalValue = { [element[0]]: element[1] };
      }
    });
  return finalValue;
};

const schedule = (dayName) => {
  const result = daysNameList();
  if (dayName) { return scheduleWhithParam(dayName, result); }
  return result;
};
schedule('Monday');

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
  animalMap,
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
