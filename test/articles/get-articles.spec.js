import { expect } from 'chai'
import request from 'supertest'

const api = request('https://rest-api-demo-yxag.onrender.com/api')

describe("GET/articles", function() {
    it("should return status code 200 and more than 4 articles", async function() {
        //arrange:
        const expectedStatusCode = 200
        const expectesNumberOfArticles = 4

        //act:
        const response = await api.get("/articles")

        //assert:
        expect(response.statusCode).to.be.equal(expectedStatusCode, `return status code: ${expectedStatusCode}`) 
        expect(response.body.length).to.be.greaterThanOrEqual(expectesNumberOfArticles, `return expected number od articles: ${expectesNumberOfArticles} `)
    })
})