import { expect } from 'chai'
import request from 'supertest'

const api = request('https://rest-api-demo-yxag.onrender.com/api/v2')

describe("GET / plugins", function() {
    it("Should not get list of plugins because of invalid authorization", async function(){
        //arrange
        const headers = {
            "authorization": "1234"
        }

        //act
        const response = await api.get("/plugins").set(headers)

        //assert
        expect(response.statusCode).to.be.equal(401, `Assert faild on: ${JSON.stringify(response.body)}`)
    })

    it("Should get list of plugins after authorization", async function(){
        //arrange
        const payload = {
            "email": "John.Doe@test.test.ca",
            "password": "1234"
          }
          
        const tokenResponse = await api.post("/login").send(payload)
        const token = tokenResponse.body.access_token

        const headers = {
            "authorization": `Bearer ${token}`
        }

        //act
        const response = await api.get("/plugins").set(headers)

        //assert
        expect(response.statusCode).to.be.equal(200, `Assert failed on: ${JSON.stringify(response.body)}`)
    })
})