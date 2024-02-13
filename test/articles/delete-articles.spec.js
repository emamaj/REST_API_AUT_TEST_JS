import { faker } from "@faker-js/faker"
import { expect } from "chai"
import request from "supertest"

const api = request('https://rest-api-demo-yxag.onrender.com/api')

describe("DELETE / articles", function() {
    it("should delete valid and existing articles", async function() {
        //arrange:
        // const title = faker.lorem.paragraph({ min: 1, max: 3})
        // const body = faker.lorem.sentence()
        // const payload = {
        //         "user_id": 2,
        //         title,
        //         body,
        //         "date": "2024-01-09",
        //         "image": ".\\data\\images\\256\\andrew-svk-nQvFebPtqbw-unsplash.jpg"
        // }

        // const responseAfterCreateArticle = await api.post("/articles").send(payload)
        // expect(responseAfterCreateArticle.statusCode).to.be.equal(201, 
        //     `Assert failed on: ${JSON.stringify(responseAfterCreateArticle.body)}`)
        
        const articleId = 1

        //act:

        const deleteCreatedArticle = await api.delete(`/articles/${articleId}`)

        //assert:
        expect(deleteCreatedArticle.statusCode).to.be.equal(200, `Assert failed on: ${JSON.stringify(deleteCreatedArticle.body)}`)

        const responseAfterDelete = await api.delete(`/articles/${articleId}`)
        expect(responseAfterDelete.statusCode).to.be.equal(404, `Assert failed on: ${JSON.stringify(responseAfterDelete.statusCode)}`)

    })
})