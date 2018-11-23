import { invariants } from "./../data.json"
import { setGenerator } from './core';
import parseES6Template from './es6-template-parser';

const generatorsMap = {};
Object.keys(invariants).forEach(key => {
  generatorsMap[key] = setGenerator(invariants[key]);
});

export default function reachDescription(descrition) {
  return parseES6Template(descrition, generatorsMap)
}