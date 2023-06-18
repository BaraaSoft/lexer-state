import { ILexem } from '../lexem';

export const LexerState = function <T>(stateObject: T): {
  create(state: keyof T): ILexem;
} {
  // Todo: generate tokenKey from uuid
  let tokenKeyId = 0;
  return {
    create(state: keyof T): ILexem {
      return {
        tokenClass: stateObject[state] as string,
        tokenKey: tokenKeyId,
        matchers: new RegExp(stateObject[state] as string),
      };
    },
  };
};
