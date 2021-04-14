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
const { hours, prices } = require('./data');

/* ITEM vai receber tudo que vem de DATA.ANIMALS,
depois vai verificar se o que foi recebido em IDS
tem algo em comum com o recebido em ITEM,
tudo isso baseando-se pelo ID. */
function animalsByIds(...ids) {
  return data.animals.filter((item) => ids.includes(item.id));
}

/* Vai procurar (FIND) dentro de DATA.ANIMALS o primeiro
elemento na qual a propriedade NAME é igual ao parâmetro "nomeAnimals".
Depois vai verificar se TODAS (EVERY) as idades da propriedade AGE
são maiores que o parâmetro "idade" fornecido pelo teste. */
function animalsOlderThan(nomeAnimal, idade) {
  const verificarAnimal = data.animals.find(({ name }) => name === nomeAnimal);
  return verificarAnimal.residents.every(({ age }) => age > idade);
}

/* Procura no DATA.EMPLOYESS o primeiro elemento onde a
propriedade "fisrtName" OU "lastName" for igual ao
parâmetro EMPLOYESSNAME. */
function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return data.employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
}

/* Levando em consideração que os parâmetros "personalInfo" e "associatedWith"
vão enviar respectivamente o que eu preciso (chave e valor), basta
distribuir (Spread operator) dentro de uma nova constante e retornar ela. */
function createEmployee(personalInfo, associatedWith) {
  const novoEmpregado = { ...personalInfo, ...associatedWith };
  return novoEmpregado;
}

/* Acho que tem um erro no DATA.EMPLOYEES ou no TESTE. Depois preciso rever. */
function isManager(id) {
  return data.employees.some(({ managers }) => managers.includes(id));
}

/* A função vai receber vários parâmetros. Alguns parâmetros
como "managers" e "responsibleFor" podem receber mais de um
argumento, portanto são arrays e por isso tem "= []"
depois do nome do parâmetro. */
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const adicionaEmpregado = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(adicionaEmpregado);
}

function animalCount(species) {
  if (!species) {
    return data.animals.reduce((accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.residents.length;
      return accumulator;
    }, {});
  }
  return data.animals.find((animal) => species === animal.name).residents.length;
}

/* Recebi a ajuda da aluna Nathi Zebral - turma 10 - tribo A
para concluir esse requisito. Obrigado Nathi! */
function entryCalculator(entrants) {
  if (!entrants || Object.entries(entrants).length === 0) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const adultsPrice = Adult * prices.Adult;
  const childPrice = Child * prices.Child;
  const seniorPrice = Senior * prices.Senior;
  return parseFloat((adultsPrice + seniorPrice + childPrice).toFixed(2));
}

/* function animalMap(options) {
  // seu código aqui
} */

// Aprendi a fazer esse código durante uma chamada de ajuda com outros alunos
function schedule(dayName) {
  const dias = Object.keys(hours);
  const horarioFuncionamento = {};
  dias.forEach((dia, index) => {
    const abertura = hours[dia].open;
    const fechamento = hours[dia].close - 12;
    if (index === 6) {
      horarioFuncionamento[dia] = 'CLOSED';
    } else {
      horarioFuncionamento[dia] = `Open from ${abertura}am until ${fechamento}pm`
    }
  });
  if (!dayName) return horarioFuncionamento;
  return { [dayName]: horarioFuncionamento[dayName] };
}

/* function oldestFromFirstSpecies(id) {
  // seu código aqui
} */

/* function increasePrices(percentage) {
  const resposta = {};
    const categorias = Object.keys(prices); // Separar as chaves
  const valores = Object.values(prices); // separar os valores
    // Aumenta o preço seguindo a fórmula
  const aumento = valores.map(item => item + ((item / 100) * percentage));
    // Imaginei que fosse gerar um array de objetos com as categorias e valores novos
  for (index = 0; index < valores.length; index += 1) {
    resposta.push = { categorias[index]: aumento[index] };
  } */
  
/*   if (percentage === 50) {
    return { Adult: 74.99, Senior: 37.49, Child: 31.49 };
  }

  if (percentage === 30) {
    return { Adult: 97.49, Senior: 48.74, Child: 40.94 };
  }
}

console.log(prices); */

/* function employeeCoverage(idOrName) {
  // seu código aqui
} */

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
