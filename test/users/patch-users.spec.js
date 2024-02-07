import { faker } from "@faker-js/faker"
import { expect } from "chai"
import request  from "supertest"

const api = request('https://rest-api-demo-yxag.onrender.com/api')

describe("PATCH/users", function() {
    it("should update valid user witch valid email", async function() {
        //arrange:
        const email = faker.internet.email()
        const payload = {
            email
        }

        const userId = 3

        //act:

        const response = await api.patch(`/users/${userId}`).send(payload)
        const responseWithBaseUser = await api.get(`/users/${userId}`) 
        const expectedData = responseWithBaseUser.body
        expectedData.email = email

        //assert:
        expect(response.statusCode).to.be.equal(200, `Assert failed on: ${JSON.stringify(response.body)}`)
        const takeUserBody = await api.get(`/users/${userId}`)

        expect(takeUserBody.body).to.be.deep.equal(expectedData, 
            `Assertion faild with during comparing expected ${JSON.stringify(expectedData)} with current ${takeUserBody.body}`)
    })
})