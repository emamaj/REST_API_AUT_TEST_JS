import { faker } from '@faker-js/faker'
import { expect } from 'chai'
import request from 'supertest'

const api = request('https://rest-api-demo-yxag.onrender.com/api')

describe("POST / comments", function() {
    it("should not create comment because invalid authorization", async function() {
    // Arrange

    const payload = {
            "article_id": 1,
            "user_id": 1,
            "body": "string",
            "date": "2024-04-25"
          }
    const headers = {
        "authorization": "Basic Test1234" 
    }

    const responseBeforeCreation = await api.get("/comments")

    // Act

    const response = await api.post("/comments").set(headers).send(payload)

    // Assert
    expect(response.statusCode).to.be.equal(403, `Assert failed on ${JSON.stringify(response.body)}`)
    const responseAfterCreation = await api.get("/comments")
    expect(responseAfterCreation.body.length).to.be.equal(responseBeforeCreation.body.length, 
        "Number of comments after attempt of creation does not match expected number of comments")

    })
})