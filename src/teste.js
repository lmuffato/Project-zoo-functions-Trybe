const greet = (...funcs) => {
  funcs.map((func) => func());
};

const ola = () => console.log({ ola: 'teste' });
const hello = () => console.log('hello');

const funcs = [ola, hello];

greet(...funcs);
