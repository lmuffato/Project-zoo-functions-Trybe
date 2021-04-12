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

const data = require('./data');

function animalsByIds(...ids) {
  if (ids.length === 0) return [];
  return ids.map((id) => data.animals.find((animal) => animal.id === id));
}

// Encontra o objeto do animal com o nome animalName
// Acessa a propriedade residents e cria um array com as idades
// Por fim verifica se cada uma dessas idades são maiores que age
function animalsOlderThan(animalName, age) {
  return data.animals.find((animal) =>
    animal.name === animalName).residents.map((resident) =>
    resident.age).every((howOld) => howOld > age);
}

// Pega todos os objetos dentro de data.employees, obtem os valores das chaves e verifica se está incluído employeeName
function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find((employee) => Object.values(employee).includes(employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return (data.employees.find((employee) => employee.managers.includes(id)) !== undefined);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (species === undefined) {
    const obj = {};
    data.animals.forEach((animal) => {
      obj[animal.name] = animal.residents.length;
    });
    return obj;
  }
  return data.animals.find((animal) => animal.name === species).residents.length;
}

// Transforma o objeto recebido em um array de objetos, utilizando object destructuring;
// Depois foi usado o map nesse array (visitors), utilizando Object.keys para acessar data.price
// com e obter o valor da chave correspondente para depois multiplicar pela quantidade usando
// Object.values e então se tem um array com 3 valores correspondentes a multiplicação do tipo
// do visitante pela quantidade e então o reduce faz a soma total.
function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) return 0;

  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const visitors = [{ Adult }, { Child }, { Senior }];
  return visitors.map((visitor) =>
    data.prices[Object.keys(visitor)] * Object.values(visitor)).reduce((acc, curr) =>
    acc + curr, 0);
}

// function animalMap(options) {
//   const locations = ['NE', 'NW', 'SE', 'SW'];

//   if (options === undefined || options.includeNames !== true) {
//     return locations.reduce((acc, curr) => {
//       acc[curr] = data.animals.filter((animal) =>
//         animal.location === curr).map((located) => located.name);
//       return acc;
//     }, {});
//   }

//   else {
//     return locations.reduce((acc, curr) => {
//       acc[curr] = data.animals.filter((animal) =>
//         animal.location === curr).map((located) => {
//         const obj = {};
//         (options.sorted === true) ?
//         obj[located.name] = located.residents.reduce((arrayResidents, currentResident) => {
//           if (options.sex === undefined) {
//             arrayResidents.push(currentResident.name);
//           } else if (currentResident.sex === 'female') {
//           arrayResidents.push(currentResident.name);
//           }
//           return arrayResidents;
//         }, []).sort() :
//         obj[located.name] = located.residents.reduce((arrayResidents, currentResident) => {
//           if (options.sex === undefined) {
//             arrayResidents.push(currentResident.name);
//           }

//           else if (currentResident.sex === 'female') {
//           arrayResidents.push(currentResident.name);
//           }
//           return arrayResidents;
//         }, []);
//         return obj;
//         });
//       return acc;
//     }, {});
//   }
// }

function schedule(dayN) {
  let days = Object.keys(data.hours);
  if (dayN !== undefined) { days = [dayN]; }
  return days.reduce((daysObj, day) => {
    Object.assign(daysObj,
      { [day]: `Open from ${data.hours[day].open}am until ${data.hours[day].close - 12}pm` });
    if (day === 'Monday') { Object.assign(daysObj, { [day]: 'CLOSED' }); }
    return daysObj;
  }, {});
}

function oldestFromFirstSpecies(id) {
  const animalID = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const older = data.animals.find((animal) => animal.id === animalID).residents.reduce(
    (olderAnimal, currAnimal) => {
      if (currAnimal.age > olderAnimal.age) return currAnimal;
      return olderAnimal;
    },
  );
  return Object.values(older);
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
