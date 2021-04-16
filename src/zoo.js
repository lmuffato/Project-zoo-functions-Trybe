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

const { animals, hours } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  let selectedAnimals = []; // lanca array vazio
  // filtra animais por ids recebidos por paramento
  ids.forEach((id) => {
    selectedAnimals = [...selectedAnimals, ...animals.filter((animal) => {
      if (animal.id === id) return true;
      return false;
    })];
  });
  //  retorna selectedAnimals apos atribuir todos animais filtrados por id
  return selectedAnimals;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  // Busca os animais a partir do nome de uma especie recebida por parametro
  // find() / every ()
  const animalBySpecies = animals.find(({ name }) => name === animal);

  // verificar idades
  // verificar se todos os animais daquela especie tem uma idade minima que foi recebida por parametro
  // forEach() / every() => retorna um booleano
  return animalBySpecies.residents.every((resident) => resident.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  // sem parametros retorna um objeto vazio {}
  if (!employeeName) {
    return {};
  }
  // quando provido o primeiro nome do funcionario, retorna o objeto do funcionario
  return employees.find((employee) => employee.firstName === employeeName
  || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  // - O parâmetro `personalInfo` recebe um objeto que contém o `id`, o `firstName` e o `lastName`
  // - O parâmetro `associatedWith` recebe um objeto que contém dois array: `managers` e `responsibleFor`
  // - Cria um novo colaborador a partir de objetos contendo `informações pessoais` e `gerentes e animais gerenciados`.
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  // verifica de o id passado por parametro é de algum gerente
  const manager = employees.some((employee, index) => employee.managers[index] === id);
  return manager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  // seu código aqui
  // sem parametros deve retornar um objeto com todos os animais e a quantidade de cada especie.
  // construir o objeto com todos animais
  // reduce com inicialValue = {}
  const allAnimals = animals.reduce((acc, currentAnimal) => {
    acc[currentAnimal.name] = currentAnimal.residents.length;
    return acc;
  }, {});
  // se recebermos o nome da especie , devemos retornar a quantidade de animais dessa especie.
  if (species) {
    return allAnimals[species];
  }
  return allAnimals;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  const Total = Object.keys(entrants).reduce((acc, curr, index) => {
    const calculator = prices[curr] * Object.values(entrants)[index];
    return acc + calculator;
  }, 0);
  return Total;
}

// function animalMap(options) {
//   //pseudo codigo

//   //1. recupera as regioes que eu quero categorizar OK
//   //2. uma vez que eu tenho as regioes, eu filtro os animais dessa regiao OK
//   //3. se nao tiver parametro de opcoes, retorna um array com as especies
//   //4. se a opcao includeNames estiver habilitada, retorna um array de objetos com as especies e o nome delas
//   //5. se a opcao sorted estiver habilitada, retorna um array de objetos com as especies e o nome delas Ordenada
//   //6. se a opcao sex estiver habilitada, retorna um array de objetos com as especies e o nome delas filtrada por sexo
//   //7. se a opcao sex e sorted estiverem habilitadas retorna um array de objetos com as especies e o nome delas ordenadas e filtrada pr sexo
//   //8. se nao tiver a opcao includeNames: retorna array de string com as especies

//   // codigo
//   const locations = retriveAvailableLocations();

//   const { includeNames = false, sex, sorted = false }= options;

//   if (includeNames) {
//     return retriveAnimalsPerLocationWithName(locations);
//   }

//   return retriveAnimalsPerLocation(locations);
// }

// function retriveAnimalsPerLocationWithName(locations, sorted, sex) {
//   const animalsPerLocation = { };

//   locations.forEach((location) => {
//     const filteredAnimals = animals
//       .filter((animal) => animal.location === location )
//       .map((animal) => {
//         const nameKey = animal.name;
//         const nameValue = animal.residents
//         .map((resident) => resident.name);
//       if (sorted) {
//         nameValue.sort();
//       }
//       return { [nameKey]: nameValue };
//       });

//     animalsPerLocation[location] = filteredAnimals;
//   });
//   return animalsPerLocation;
// }

// function retriveAnimalsPerLocation(locations) {
//   const animalsPerLocation = { };
//   locations.forEach((location) => {
//     const filteredAnimals = animals
//       .filter((animal) => animal.location === location )
//       .map((animal) => animal.name );

//     animalsPerLocation[location] = filteredAnimals;
//   });
//   return animalsPerLocation;
// }

// function retriveAvailableLocations() {
//   return ['NE', 'NW', 'SE', 'SW'];
// }
const getWeek = (dayName) => (acc, [key, value]) => {
  if (dayName === undefined || dayName === key) {
    acc[key] = value.open !== 0
      ? `Open from ${value.open}am until ${value.close - 12}pm`
      : 'CLOSED';
  }
  return acc;
};

function schedule(dayName) {
  // seu código aqui
  return Object.entries(hours).reduce(getWeek(dayName), {});
}

// function oldestFromFirstSpecies(id) {
//   // seu código aqui
//   // encontra funcionario
//   const employeeObject = employees.find(employee => id === employee.id);
//   // encontra a id da primeira especie de responsabilidade desse funcionario
//   const animalID = employeeObject.responsibleFor[0];
//   const animalsObject = animals.find((id) => id.id === animalID).residents;
// }
// oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992');

//* este codigo foi baseado no resultado de pesquisas realizado no slack
//* thiago Granville - turma 09 */
function increasePrices(percentage) {
  // seu código aqui
  const percent = percentage / 100;
  const ageEntrant = Object.keys(prices);
  ageEntrant.forEach((key) => {
    const increase = prices[key] * percent;
    prices[key] += increase;
    prices[key] = Math.round(prices[key] * 100) / 100;
  });
  return prices;
}

function employeeCoverage(idOrName) {
  // sem parametros, retorna uma lista de funcionarios e os animais pelos quais sao responsaveis
  if (!idOrName) {
    // firstName, lastName de employees, responsibleFor
    return employees.reduce((accumulator, employee) => {
      const animalList = employee.responsibleFor
        .map((animalId) => animals.find((animal) => animalId === animal.id).name);
      const key = `${employee.firstName} ${employee.lastName}`;
      accumulator[key] = animalList;
      return accumulator;
    }, {});
  }
  const targetEmployee = employees
    .find((employee) => employee.id === idOrName
      || employee.firstName === idOrName || employee.lastName === idOrName);
  const animalList = targetEmployee.responsibleFor
    .map((animalId) => animals.find((animal) => animalId === animal.id).name);
  const key = `${targetEmployee.firstName} ${targetEmployee.lastName}`;
  return { [key]: animalList };
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
