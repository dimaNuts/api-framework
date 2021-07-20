import CoreApi from "../src/http/CoreApi";
import {assert} from "chai";

//НАЙТИ СЛУЧАЙНОГО КОТА ПО ЕГО ID
//УДАЛИТЬ
//ПРОВЕРИТЬ, ЧТО КОТА БОЛЬШЕ НЕТ


it('Удалить случайного кота', async () => {

//дергаем апишку со списком всех котов
    const response = await CoreApi.getAllCats();
    //создаем строку со списком в алфавитном порядке
    const alphaList = JSON.stringify(response.data.groups);
    // преобразуем строку в  объект
    const alphaObj = JSON.parse(alphaList);
    //создаем рандом,который будет дергать случайную букву по длине( "1" учтена в alphaObj.length) объекта
    const getRandomInt = Math.floor(Math.random() * alphaObj.length) ;
    //создаем строку случайной буквы
    const getRandomLtr = JSON.stringify(alphaObj[getRandomInt]);
    //преобразуем строку в объект
    const objLtr = JSON.parse(getRandomLtr);
    //получаем строку котов выбранной буквы
    const cats = JSON.stringify(objLtr.cats);
    //преобразуем в объект, чтобы узнать длину(кол-во котов)
    const catsLength = JSON.parse(cats);
    //создаем рандом для получения случайного ID по длине объекта с котами
    const RandomInt = Math.floor(Math.random() * catsLength.length) ;
    //находим и преобразуем в число случайный ID
    const catsId = Number(JSON.stringify(objLtr.cats[RandomInt].id));
//удаляем случайного кота(покойся с миром)
    let catDelete = await CoreApi.removeCat(catsId);
//проверяем статус удаленного кота
    const status: number = 404;
//дергаем апишку удалить кота по ID несуществующего кота, если кот есть, тест не пройдет
    const catNull = await CoreApi.removeCat(catsId);
    //сравниваем статус ответа с ожидаемым статусом
    assert.ok(
        catNull.status === status,
        `Кот не удален,статус ${catNull.status}, ожидался ${status}`
    );

    console.log(`Cоздаем строку со списком в алфавитном порядке`);
    console.log(alphaList);
    console.log(`Преобразуем строку в  объект`);
    console.log(alphaObj);
    console.log(`Cоздаем строку случайной буквы `);
    console.log(getRandomLtr);
    console.log(`Преобразуем строку в  объект`);
    console.log(objLtr);
    console.log(`Получаем строку котов выбранной буквы`);
    console.log(cats);
    console.log(`Находим и преобразуем в число случайный ID` );
    console.log(catsId);
    console.log(`Удаляем случайного кота(покойся с миром)` );
    console.log(catDelete);
    console.log(`Тело ответа на попытку удалить кота,которого нет`)
    console.log(catNull);
    console.log(`Статус ответа ${catNull.status}` );
});