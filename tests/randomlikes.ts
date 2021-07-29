//Найти случайного котика
//Получить и сохранить количество лайков котика
//Поставить ему n лайков
//Проверить количество что количество лайков котика соответсвует ожидаемому


import CoreApi from "../src/http/CoreApi";
import LikeApi from "../src/http/LikeApi";
import {allure} from "allure-mocha/runtime";
import {assert} from "chai";
before('Задача', () => {
    console.log(`Начало теста`);
});
it('Поставить n лайков случайному коту', async () => {
    allure.description(`
//Получить и сохранить количество лайков котика
//Поставить ему n лайков
//Проверить количество что количество лайков котика соответсвует ожидаемому`);
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
   // console.log(alphabetList);
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
    //создаем счеткчик, и количество лайков n
    console.log(`Создаем переменную i счеткчика, и количество лайков n`);
    allure.logStep(`Создаем переменную i счеткчика, и количество лайков n`);
    let i ;
    const n = 5;
    console.log(`Создаем пустой массив,в который будем наполнять лайками.`);
    allure.logStep(`Создаем пустой массив,в который будем наполнять лайками.`);
    const likeArray = [];
    console.log(likeArray);
    //находим случайного кота и сохраняем число лайков
    console.log(`Находим случайного кота и сохраняем число лайков до `);
    allure.logStep(`Находим случайного кота и сохраняем число лайков до`);
    const catLikeBefore = await CoreApi.getCatById(catsId);
    console.log(catLikeBefore.data.cat.likes);
    //создаем счетчик лайков и наполняем массив
    console.log(`Создаем счетчик лайков и наполняем массив`);
    allure.logStep(`Создаем счетчик лайков и наполняем массив`);
    for (i = 1; i<=n; i++ ) {
        const catLikeAfter = await LikeApi.likes(catsId, {like: true, dislike: false});
        likeArray.push(catLikeAfter.data.likes);

    }
    console.log(likeArray);
    allure.logStep(`Количество лайков после,выводим последние значение в массиве`);
    //Количество лайков после,выводим последние значение в массиве
    console.log(`Количество лайков после`);
    console.log(likeArray[(likeArray.length-1)]);
});

after(() => {
    console.log('Тест окончен');
});