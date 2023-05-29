import { CharacterValidationPipe } from './character-validation.pipe';

describe('CharacterValidationPipe', () => {
  it('create an instance', () => {
    const pipe = new CharacterValidationPipe();
    expect(pipe).toBeTruthy();
  });
});
