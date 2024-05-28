import { faker, expect, request, api } from '../../config.js';

describe("DELETE / users", function() {
    it("should delete valid and existing user", async function() {
        //arrange:
        const firstname = faker.person.firstName()
        const lastname = faker.person.lastName()
        const email = faker.internet.email({ firstname, lastname, provider: "test@test.test" })
        const password = faker.internet.password()
        const payload = {
            email,
            firstname,
            lastname,
            password,
            "avatar": ".\\data\\users\\face_1591133479.7144732.jpg"
        }

        
        const responseAfterUserCreation = await api.post("/users").send(payload)
        expect(responseAfterUserCreation.statusCode).to.be.equal(201, 
            `Assert failed on: ${JSON.stringify(responseAfterUserCreation.body)}`)
        const userId = responseAfterUserCreation.body.id

        //act:
        const response = await api.delete(`/users/${userId}`)

        //assert:
        expect(response.statusCode).to.be.equal(200, `Assert failed on: ${JSON.stringify(response.body)}`)
        const responseAfterDelete = await api.delete(`/users/${userId}`)
        expect(responseAfterDelete.statusCode).to.be.equal(404, `Assert failed on: ${JSON.stringify(responseAfterDelete.statusCode)}`)


    })
})