import CoreApi from "../src/http/CoreApi";
import {assert} from "chai";


it('Удалить случайного котика', async () => {
    const getRandomInt = (max: number) => Math.floor(Math.random() * max) + 1;
    const randomValue = getRandomInt(30);
    const groupsList = [];
    const response = await CoreApi.getAllCats();
    groupsList.push(response.data.groups[randomValue].cats[0].id);
    const catDelete = await CoreApi.removeCat(groupsList[0]);
    const status: number = 404;

    const catNull = await CoreApi.removeCat(groupsList[0]);

    assert.ok(
        catNull.status === status,
        `Актуальный статус код ${catNull.status}, ожидался ${status}`
    );
});