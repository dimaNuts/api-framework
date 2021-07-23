import CoreApi from "../src/http/CoreApi";
import {assert} from "chai";
import {allure} from "allure-mocha/runtime";

//НАЙТИ СЛУЧАЙНОГО КОТА ПО ЕГО ID
//УДАЛИТЬ
//ПРОВЕРИТЬ, ЧТО КОТА БОЛЬШЕ НЕТ

/*В тесте использованы allure шаги и логирование. Allure можно закоментировать и посмотреть работу теста в консоли.
Чтобы посмотреть работу теста с allure нужно запускать командную строку через терминал
*/
it('Удалить случайного кота', async () => {
    allure.description(`
//НАЙТИ СЛУЧАЙНОГО КОТА ПО ЕГО ID
//УДАЛИТЬ
//ПРОВЕРИТЬ, ЧТО КОТА БОЛЬШЕ НЕТ`);
    //дергаем апишку со списком всех котов
            console.log(`Дергаем апишку со списком всех котов`);
        const response = await CoreApi.getAllCats();
    allure.logStep(`Дергаем апишку со списком всех котов/Get-Метод получения всех котов [all] `);
            console.log(response);
        //создаем объект со списком в алфавитном порядке
            console.log(`Cоздаем объект со списком в алфавитном порядке`);
    allure.logStep(`Cоздаем объект со списком в алфавитном порядке `);
            const alphabetList = (response.data.groups);
            console.log(alphabetList);
    //создаем рандом,который будет дергать случайную букву по длине( "1" учтена в alphabetList.length) объекта
            console.log(`создаем рандом,который будет дергать случайную букву по длине объекта`);
    allure.logStep(`Создаем рандом,который будет дергать случайную букву по длине объекта`);
        const randomInt = Math.floor(Math.random() * alphabetList.length) ;
            console.log(`Cоздаем объект списка котов случайной буквы `);
        const Cats =(alphabetList[randomInt].cats);
             console.log(Cats);
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
    //удаляем случайного кота(покойся с миром)
            console.log(`Удаляем случайного кота(покойся с миром)` );
    allure.logStep(`Удаляем случайного кота`);
    let catDelete = await CoreApi.removeCat(catsId);
            console.log(catDelete);
    //проверяем , что кота больше нет
    allure.logStep(`Проверяем , что кота больше нет`);
    // создаем ожидаемый статус удаленного кота
        const status: number = 404;
    //дергаем апишку удалить кота по ID несуществующего кота, если кот есть, тест не пройдет
    allure.logStep(`Дергаем апишку удалить кота по ID несуществующего кота, если кот есть, тест не пройдет`);
            console.log(`Тело ответа на попытку удалить кота,которого нет`)
            const catNull = await CoreApi.removeCat(catsId);
            console.log(catNull);
    //сравниваем статус ответа с ожидаемым статусом
        assert.ok(
            catNull.status === status,
            `Кот не удален,статус ${catNull.status}, ожидался ${status}`
        );

});