import { expect } from 'chai'
import request from 'supertest'

const api = request('https://rest-api-demo-yxag.onrender.com/api')

describe("GET/users", function() {
    it("should return status code 200 and more than four users", async function() {
        //arrange:
        const expectedStatusCode = 200
        const expectedNumberOfUsers = 9

        //act:
        const response = await api.get("/users")

        //assert:
        expect(response.statusCode).to.be.equal(expectedStatusCode, `For GET users we expected status code: ${expectedStatusCode}`)
        expect(response.body.length).to.be.equal(expectedNumberOfUsers)
    })
})