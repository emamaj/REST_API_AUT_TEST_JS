import { expect } from 'chai'
import request from "supertest"
import { faker } from "@faker-js/faker"

const api = request('https://rest-api-demo-yxag.onrender.com/api')

describe("POST/articles", function(){
    it("should create a new article", async function(){
        //arrange:
        const expectedstatusCode = 201
        const title = faker.lorem.paragraph({ min: 1, max: 3})
        const body = faker.lorem.sentence()
        const payload = {
                "user_id": 2,
                title,
                body,
                "date": "2024-01-09",
                "image": ".\\data\\images\\256\\andrew-svk-nQvFebPtqbw-unsplash.jpg"
        }

        //act:
        const response = await api.post("/articles").send(payload)

        //assert:
        expect(response.statusCode).to.be.equal(expectedstatusCode, `expected status code is: ${expectedstatusCode} with actual ${response.body}`)
        const newArticle = await api.get(`/articles/${response.body.id}`)
        payload.id = response.body.id

        expect(newArticle.body).to.be.deep.equal(payload, `expected article ID: ${response.body.id}`)
    
    })
})