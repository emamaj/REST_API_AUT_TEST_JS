import { expect } from 'chai'
import request from 'supertest'

const api = request('https://rest-api-demo-yxag.onrender.com/api')

describe("GET/users", function() {
    it("should return status code 200 and more than four users", async function() {
        //arrange:
        const expectedStatusCode = 200
        const expectedNumberOfUsers = 11

        //act:
        const response = await api.get("/users")

        //assert:
        expect(response.statusCode).to.be.equal(expectedStatusCode, `For GET users we expected status code: ${expectedStatusCode}`)
        expect(response.body.length).to.be.equal(expectedNumberOfUsers)
    })
    it("should return user with given ID", async function(){
        //arrange:
        const expectedStatusCode = 200
        const expectedUserID = 1

        //act:
        const response = await api.get(`/users/${expectedUserID}`)

        //assert:
        expect(response.statusCode).to.be.equal(expectedStatusCode, `For GET /userID we expect status code: ${expectedStatusCode}`)
        expect(response.body.id).to.be.equal
        (expectedUserID, `expect id number ${expectedUserID} we received: ${JSON.stringify(response.body)}`)
    })

    it("should return list of users with given ID using parameters in URL", async function(){
        //arrange:
        const expectedStatusCode = 200
        const expectedUserID = 1

        //act:
        const response = await api.get(`/users?id=${expectedUserID}`)

        //assert:
        expect(response.statusCode).to.be.equal(expectedStatusCode, `expect status code ${expectedStatusCode}`)
        expect(response.body.length).to.be.equal(1, `For parameter ?id=${expectedUserID}, we received: ${JSON.stringify(response.body)}`)
        expect(response.body[0].id).to.be.equal(expectedUserID, `expect user ?id=: ${expectedUserID} we receive: ${JSON.stringify(response.body)}`)

    })
})