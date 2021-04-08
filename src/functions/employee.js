const data = require('../data');

const find = {
  byName: {
    firstName(name) {
      const result = data.employees.find((employee) => employee.firstName === name);
      if (result === undefined) return false;
      return {
        found: true,
        result,
      };
    },
    lastName(name) {
      const result = data.employees.find((employee) => employee.lastName === name);
      if (result === undefined) return false;
      return {
        found: true,
        result,
      };
    },
  },
};

module.exports = {
  find,
};
