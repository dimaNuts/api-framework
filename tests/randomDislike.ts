//Найти случайного котика
//Получить и сохранить количество дизлайков котика
//Поставить ему m дизлайков
//Проверить количество дизлайков котика

import {allure} from "allure-mocha/runtime";
import CoreApi from "../src/http/CoreApi";
import LikeApi from "../src/http/LikeApi";
import {assert} from "chai";

before('Задача', () => {
    let task = `Найти случайного котика
Получить и сохранить количество дизлайков котика
Поставить ему m дизлайков
Проверить количество дизлайков котика`;
    console.log(task);
});
it('Поставить m дизлайков случайному коту', async () => {

    allure.description(`
//Найти случайного котика
//Получить и сохранить количество дизлайков котика
//Поставить ему m дизлайков
//Проверить количество дизлайков котика`);
    //дергаем апишку со списком всех котов
    console.log(`Дергаем апишку со списком всех котов`);
    const response = await CoreApi.getAllCats();
    allure.logStep(`Дергаем апишку со списком всех котов/Get-Метод получения всех котов [all] `);

    if (response.status !== 404) {

        assert.ok(response.status === 200,
            `Актуальный статус код ${response.status}`);
    }

    allure.testAttachment(
        'testAttachment',
        JSON.stringify(response.data, null, 2),
        'application/json'
    );
    //создаем объект со списком в алфавитном порядке
    console.log(`Cоздаем объект со списком в алфавитном порядке`);
    allure.logStep(`Cоздаем объект со списком в алфавитном порядке `);
    const alphabetList = (response.data.groups);
    //создаем рандом,который будет дергать случайную букву по длине( "1" учтена в alphabetList.length) объекта
    console.log(`создаем рандом,который будет дергать случайную букву по длине объекта`);
    allure.logStep(`Создаем рандом,который будет дергать случайную букву по длине объекта`);
    const randomInt = Math.floor(Math.random() * alphabetList.length) ;
    console.log(`Cоздаем объект списка котов случайной буквы `);
    const Cats =(alphabetList[randomInt].cats);
    //console.log(Cats);
    //создаем рандом для получения случайного ID по длине объекта с котами
    console.log(`Находим порядковый номер случайного кота из списка Cats` );
    allure.logStep(`Создаем рандом для получения случайного ID по длине объекта с котами`);
    const randomCat = Math.floor(Math.random() * Cats.length)
    console.log(randomCat);

    //находим и преобразуем в число случайный ID
    console.log(`Находим  случайный ID` );
    allure.logStep(`Находим  случайный ID`);
    const catsId = Number(JSON.stringify(alphabetList[randomInt].cats[randomCat].id));
    console.log(catsId);
    //создаем счеткчик, и количество дизлайков m
    console.log(`создаем переменную i счеткчика, и количество дизлайков m`);
    allure.logStep(`Создаем переменную i счеткчика, и количество лайков m`);
    let i ;
    const m = 5;
    console.log(`создаем пустой массив,в который будем наполнять дизлайками.`)
    allure.logStep(`Создаем пустой массив,в который будем наполнять дизлайками.`);
    const dislikeArray = [];
    console.log(dislikeArray);
    //находим случайного кота и сохраняем число дизлайков
    console.log(`находим случайного кота и сохраняем число дизлайков до `);
    allure.logStep(`Находим случайного кота и сохраняем число дизлайков до`);
    const catDislikeBefore = await CoreApi.getCatById(catsId);
    console.log(catDislikeBefore.data.cat.dislikes);
    //создаем счетчик дизлайков и наполняем массив
    console.log(`создаем счетчик дизлайков и наполняем массив`);
    allure.logStep(`Создаем счетчик дизлайков и наполняем массив`);
    for (i = 1; i<=m; i++ ) {
        const catDislikeAfter = await LikeApi.likes(catsId, {like: false, dislike: true});
        dislikeArray.push(catDislikeAfter.data.dislikes);

    }
    console.log(dislikeArray);
    //Количество дизлайков после,выводим последние значение в массиве
    console.log(`Количество дизлайков после`);
    allure.logStep(`Количество дизлайков после,выводим последние значение в массиве`);
    console.log(dislikeArray[(dislikeArray.length-1)]);

});
after(() => {
        console.log('Тест окончен');
    });

