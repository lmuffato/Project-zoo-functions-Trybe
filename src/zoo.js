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

const { animals } = require('./data');
// const data = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');

// const data = require('./data');

function animalsByIds(...ids) {
  if (ids === undefined) {
    return [];
  }

  const animaisEspecies = [];
  animals.forEach((animal) => {
    ids.forEach((id) => {
      if (id === animal.id) {
        animaisEspecies.push(animal);
      }
    });
  });

  return animaisEspecies;
}

function animalsOlderThan(animal, age) {
  const objetoAnimal = animals.find((item) => item.name === animal);
  const residentes = objetoAnimal.residents;
  const idadeMinima = residentes.every((residente) => residente.age > age);
  return idadeMinima;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const objetoFuncionario = employees
    .find((item) => item.firstName === employeeName || item.lastName === employeeName);
  return objetoFuncionario;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  const objetoFuncionario = employees.find((item) => item.id === id);
  if (objetoFuncionario.managers.length === 1 || objetoFuncionario.managers.length === 0) {
    return true;
  }

  return false;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
// coloco managers = [], pois esses dois parametros precisam ser arrays
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  // caso não tenha parametro
  const obejtoAnimal = animals.reduce((acc, item) => {
    acc[item.name] = item.residents.length; // adiciono uma chave e um valor ao objeto
    return acc;
  }, {});

  if (!species) {
    return obejtoAnimal;
  }
  // caso  tenha parametro
  const objetoEspecies = animals.find((item) => item.name === species);
  const ArrayEspecies = objetoEspecies.residents.length;
  return ArrayEspecies;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.entries(entrants).length === 0) {
    return 0;
  }

  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  // coloco o object destructuring, para se cado o entrants não tiver umas dessas chaves/valores eu msm atribuo.

  const adulto = prices.Adult * Adult;
  const idoso = prices.Senior * Senior;
  const crianças = prices.Child * Child;
  return adulto + idoso + crianças;
}

// function animalMap(options) {
//   // seu código aqui
// }

// Object.entries(hours).forEach((item) => {
//   if (item[1].open === 0 && item[1].close === 0) return `${item[0]}:CLOSED`;
//   return `${item[0]}: Open from ${item[1].open}am until ${item[1].close}pm`;
// });

let valor = '';
const todosHorarios = {};
const arrayKeys = Object.keys(hours);
arrayKeys.forEach((item) => {
  if (hours[item].open === 0 && hours[item].close === 0) {
    valor = 'CLOSED';
    todosHorarios[item] = valor;
  } else {
    valor = `Open from ${hours[item].open}am until ${hours[item].close - 12}pm`;
    todosHorarios[item] = valor;
  }
  return todosHorarios;
});

// pego um array como todos as chaves (nome dos dias da semana) e com esse array faço um foreach
// uso o if para especificar os valores e adiciona-los na variavel valor, e em seguida adiciono ao objeto todosHorarios uma chave[dia da semana] = varialvel valor

function schedule(dayName) {
  if (dayName === undefined) {
    return todosHorarios;
  }

  const horario = {};
  if (dayName === 'Monday') {
    horario[dayName] = 'CLOSED'; // adiciono uma chave e um valor ao objeto horario
  } else {
    horario[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
  }
  return horario;
}

function oldestFromFirstSpecies(id) {
  const objFuncionario = employees.find((item) => item.id === id); // retorna o objeto do funcionario
  const animal = objFuncionario.responsibleFor[0]; // retorna array com os animais resposaveis e pega o primeiro animal
  const objAnimal = animals.find((item) => item.id === animal).residents; // retorna obj do animal especifico e pego o array residents que está dentro desse objeto

  // fiz um reduce para diminuir o array de objetos que eu tinha em apenas 1 objeto. Se a idade do previusValue for mais que idade do currentValue eu seleciono esse objeto
  const maisVelho = objAnimal.reduce((acc, item) => {
    if (acc.age > item.age) return acc;
    return item;
  });

  // descoonstruo o objeto para pegar apenas os valores
  const { name, sex, age } = maisVelho;
  return [name, sex, age];
}

function increasePrices(percentage) {
  const { Adult, Child, Senior } = prices;
  const porcetagem = (1 + (percentage / 100));
  prices.Adult = Math.round((Adult * porcetagem) * 100) / 100;
  prices.Child = Math.round((Child * porcetagem) * 100) / 100;
  prices.Senior = Math.round((Senior * porcetagem) * 100) / 100;
}
// como arredondar 2 casas decimais https://metring.com.br/arredondar-numero-em-javascript
// fiz o caulculo de porcentagem a partir desse site https://www.estrategiaconcursos.com.br/blog/como-calcular-porcentagem/#:~:text=Exemplo%3A%20Uma%20mercadoria%20custava%20R,o%20valor%20final%20da%20mercadoria.&text=A%20taxa%20de%20aumento%20%C3%A9,%2C30%20%3D%201%2C30.

function nameAnimals(arrAnimals) {
  const nomes = [];

  arrAnimals.forEach((item) => {
    animals.forEach((animal) => {
      if (item === animal.id) {
        nomes.push(animal.name);
      }
    });
  });

  return nomes;
}
// fiz um função para achar o nome dos animais a partir do id deles. Uso dois forEach seguidos, para verrer todos os itens do array que é colocado como parametro, e depois outro para varrer todos os objetos dos animais e achar qual o objeto do animal correto a partir do id no animal. Assim por ultimo, como o obejto certo em mão pego o nome e faço o push em um novo array

function employeeCoverage(idOrName) {
  // caso não tenha parametro
  const objAnimaisFuncionario = employees.reduce((acc, item) => {
    acc[`${item.firstName} ${item.lastName}`] = nameAnimals(item.responsibleFor); // adiciono uma chave e um valor ao objeto
    return acc;
  }, {});

  if (idOrName === undefined) {
    return objAnimaisFuncionario;
  }

  // caso não tenha parametro
  const funcionario = employees
    .find((item) => item.firstName === idOrName
    || item.lastName === idOrName || item.id === idOrName);

  return {
    [`${funcionario.firstName} ${funcionario.lastName}`]: nameAnimals(funcionario.responsibleFor),
  };
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
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
