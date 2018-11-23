import data from './data.json';
import { shuffle } from 'lodash';

export const tasks = shuffle(data.tasks);
export const questions = shuffle(data.questions);
