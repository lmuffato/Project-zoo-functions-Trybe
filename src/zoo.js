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
const { animals, employees, hours, prices } = require('./data');

/* ITEM vai receber tudo que vem de DATA.ANIMALS,
depois vai verificar se o que foi recebido em IDS
tem algo em comum com o recebido em ITEM,
tudo isso baseando-se pelo ID. */
function animalsByIds(...ids) {
  return animals.filter((item) => ids.includes(item.id));
}

/* Vai procurar (FIND) dentro de DATA.ANIMALS o primeiro
elemento na qual a propriedade NAME é igual ao parâmetro "nomeAnimals".
Depois vai verificar se TODAS (EVERY) as idades da propriedade AGE
são maiores que o parâmetro "idade" fornecido pelo teste. */
function animalsOlderThan(nomeAnimal, idade) {
  const verificarAnimal = animals.find(({ name }) => name === nomeAnimal);
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
  return employees.some(({ managers }) => managers.includes(id));
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
  employees.push(adicionaEmpregado);
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.residents.length;
      return accumulator;
    }, {});
  }
  return animals.find((animal) => species === animal.name).residents.length;
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
      horarioFuncionamento[dia] = `Open from ${abertura}am until ${fechamento}pm`;
    }
  });
  if (!dayName) return horarioFuncionamento;
  return { [dayName]: horarioFuncionamento[dayName] };
}

// TRANSPARÊNCIA é uma virtude: Só consegui fazer essa questão após analisar
// o code-review de vários alunos. A lógica que eu usava não passava no teste
// portanto eu segui a dica dada na aula ao vivo para entender como os outros
// alunos estavam fazendo. Também acompanhei as dúvidas deixadas no Slack.
// Fiz questão de comentar o código para deixar nítido que entendi como ele
// funciona em cada parte. Preciso estudar mais, foi difícil. Vou parar com 84.62%.
function oldestFromFirstSpecies(id) {
  // Procurar na lista de funcionários aquele que tem o id igual o id informado
  // no teste e, ao mesmo tempo, "pegar" o id da 1a especie que ele cuida.
  const zooWorker = employees.find((funcionario) => funcionario.id === id).responsibleFor[0];
  // Depois de encontrar o id da espécie que o funcionário cuida, agora encontrar
  // a ficha completa dos animais que pertencem a essa espécie.
  const protegido = animals.find((animal) => animal.id === zooWorker);
  // Para achar o mais antigo foi feito uma condição dentro de um reduce
  const antigo = protegido.residents.reduce((acc, cur) => ((acc > cur.age) ? acc : cur.age));
  // O animal procurado foi encontrado através de uma filtragem dos residentes
  // onde a idade do animal era igual ao valor da idade mais antiga
  // encontrada na etapa anterior
  const { name, sex, age } = protegido.residents.find((resident) => resident.age === antigo);
  // retornou através de um array o nome, sexo e a idade, que é o formato
  // de eibição exigido no teste.
  return [name, sex, age];
}

// Resolvido com a ajuda do aluno Marcelo Maurício (Tchelo) - Turma 10 - Tribo A
// Muito Obrigado Tchelo!!!
function increasePrices(percentage) {
  const { Adult, Senior, Child } = prices;
  prices.Adult = parseFloat((Adult + (Math.ceil(Adult * percentage) / 100)).toFixed(2));
  prices.Child = parseFloat((Child + (Math.ceil(Child * percentage) / 100)).toFixed(2));
  prices.Senior = parseFloat((Senior + (Math.ceil(Senior * percentage) / 100)).toFixed(2));
}

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
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
