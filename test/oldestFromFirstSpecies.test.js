const assert = require('assert');
const zoo = require('../src/zoo');

describe('Implemente a função oldestFromFirstSpecies', () => {
  it('Passado o id de um funcionário, encontra a primeira espécie de animal gerenciado pelo funcionário, e retorna um array com nome, sexo e idade do animal mais velho dessa espécie', () => {
    let actual = zoo.oldestFromFirstSpecies();
    let expected = ['Vicky', 'female', 12];
    assert.deepStrictEqual(actual, expected);

    actual = zoo.oldestFromFirstSpecies('4b40a139-d4dc-4f09-822d-ec25e819a5ad');
    expected = ['Margherita', 'female', 10];
    assert.deepStrictEqual(actual, expected);
  });
});
