import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

/**
 * Для проверки, что jest настроен правильно. Можно удалить
 */
/* test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
}); */

 describe('Проверка имени пользователя', () => {

    test('no name', () => {
        expect(nameIsValid(null)).toBe(false);
      });

    test('name lenght = 2', () => {
        expect(nameIsValid('Di')).toBe(true);
      });

    test('name lenght < 2', () => {
        expect(nameIsValid('D')).toBe(false);
      });

    test('name lenght > 2', () => {
        expect(nameIsValid('Diana')).toBe(true);
      });

    test('name has backspace', () => {
        expect(nameIsValid('Di ana')).toBe(false);
      });

});  


 describe('Удаление пробелов из строки', () => {

    test('нет пробелов', () => {
        expect(fullTrim('ТекстБезПробелов')).toBe('ТекстБезПробелов');
      });

    test('текст с пробелами', () => {
        expect(fullTrim('Текст с пробелами')).toBe('Текстспробелами');
      });

    test('пробелам в начале ', () => {
        expect(fullTrim(' пробел')).toBe('пробел');
      });
    
    test('пробелам в конце', () => {
        expect(fullTrim('пробел ')).toBe('пробел');
      });

    test('несколько пробелов подрядк', () => {
        expect(fullTrim('  пробел  и  еще  пробел')).toBe('пробелиещепробел');
      });
}); 





describe('Подсчёт суммы заказа parametric test', () => {
    test.each`
  quantity    | name    | price    | discount | expected
    ${0} | ${'product 1'} | ${0}  | ${0} | ${0}
    ${10} | ${'product 2'} | ${0}  | ${0} | ${0}
    ${10} | ${'product 3'} | ${0}  | ${-1} | ${'error'}
    ${10} | ${'product 4'} | ${-1}  | ${0} | ${'error'}
    ${10} | ${'product 5'} | ${10}  | ${0} | ${100}
    ${10} | ${'product 6'} | ${'a'}  | ${0} | ${'error'}
    ${'d'} | ${'product 7'} | ${1}  | ${0} | ${'error'}
    ${10} | ${'product 8'} | ${1}  | ${10} | ${9}

  `('$name: $quantity * $price - % $discount = $expected', ({quantity, name, price, discount, expected}) => {
    if (expected === 'error') {
      expect(() => getTotal({quantity, name, price}, discount)).toThrow();
    } else {
      expect(getTotal([{quantity, name, price}], discount)).toBe(expected);
    }
  });
});