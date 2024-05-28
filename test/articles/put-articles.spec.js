import { faker, expect, request, api } from '../../config.js';

describe("PUT/articles", function() {
    it("should update valid article with valid data", async function() {
        // arrange:
        const title = "The beauty of the sunset was obscured by the industrial cranes"
        const body = faker.lorem.sentences(2)
        const id = 1
        const payload = {
            body,
            "date": "2022-03-26",
            id,
            "image": ".\\data\\images\\256\\andrew-svk-nQvFebPtqbw-unsplash.jpg",
            title,
            "user_id": 1
        }
        //act:

        const response = await api.put(`/articles/${id}`).send(payload)

        //assert:
        expect(response.statusCode).to.be.equal(200, `Assert failed on: ${JSON.stringify(response.body)}`)
        const getArticleId = await api.get(`/articles/${id}`) 
        expect(getArticleId.body).to.be.eql(payload, `Assertion failed during comparing expected ${JSON.stringify(payload)} 
        with actual ${JSON.stringify(getArticleId.body)}`)  
    })
})