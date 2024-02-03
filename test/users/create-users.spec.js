import { expect } from 'chai'
import request from 'supertest'
import { faker } from '@faker-js/faker'

const api = request('https://rest-api-demo-yxag.onrender.com/api')

describe("POST/users", function(){
    it("should create valid and unique user", async function() {
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
                "avatar": ".\\data\\users\\face_1591133479.7144732.jpg"
        }

        //act:
        const response = await api.post("/users").send(payload)

        //assert:
        expect(response.statusCode).to.be.equal(201, `Assert failed on: ${JSON.stringify(response.body)}`)
        const responseWithUser = await api.get(`/users/${response.body.id}`)
        payload.id = response.body.id

        expect(responseWithUser.body).to.be.deep.equal(payload, `Assertion failed during comparing expected ${payload} with actual ${response.body}`)
        expect(responseWithUser.body).to.be.eql(payload, `Assertion failed during comparing expected ${payload} with actual ${response.body}`)

    })

    describe("invalid empty fields", function() {
        const emptyFields = ["email", "firstName"]
        emptyFields.forEach(field => {
            it(`should not create user with empty: ${field}`, async function() {
                // arange:
                const firstName = faker.person.firstName()
                const lastName = faker.person.lastName()
                const email = faker.internet.email({ firstName, lastName, provider: "test@test.pl" })
                const password = faker.internet.password()
                const payload = {
                    email,
                    firstName,
                    lastName,
                    password,
                    'avatar': ".\\data\\users\\face_1591133479.7144732.jpg"
                }
        
                const getAllNumberOfUsers = await api.get("/users")

                payload[field] = "0"
        
                // act:
                const response = await api.post("/users"). send(payload)
        
                // assert:
                expect(response.statusCode).to.be.equal(422, `Assert failed on ${JSON.stringify(response.body)}`)
                const getUsersAfter = await api.get("/users")
                expect(getUsersAfter.body.lenght).to.be.equal(getAllNumberOfUsers.body.lenght, 
                    "Number of users before test does not match number of users after test")
            })
        })
    })
})