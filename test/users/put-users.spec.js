import { faker } from "@faker-js/faker"
import { expect } from "chai"
import request from 'supertest'

const api = request('https://rest-api-demo-yxag.onrender.com/api')

describe("PUT/users", function(){
    it("should update valid user", async function() {
        //arrange:
        const firstname = faker.person.firstName()
        const lastname = faker.person.lastName()
        const email = faker.internet.email({ firstname, lastname, provider: "test.test.pl" })
        const password = faker.internet.password()
        const payload = {
                email,
                firstname,
                lastname,
                password,
                "avatar": faker.lorem.sentence()
        }

        const userId = 2

        //act:
        const response = await api.put(`/users/${userId}`).send(payload)
         

        //assert
        expect(response.statusCode).to.be.equal(200, `Assert failed on: ${JSON.stringify(response.body)}`)
        const responseWithUser = await api.get(`/users/${userId}`)

        payload.id = userId
        expect(responseWithUser.body).to.be.deep.equal(payload, `Assertion failed during comparing expected ${JSON.stringify(response.body)}`)
    })
})