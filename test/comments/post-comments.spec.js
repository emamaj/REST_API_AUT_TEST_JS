import { faker, expect, request, api } from '../../config.js';

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
        "authorization": "Basic test5" 
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

    it("should create comment after valid authorization", async function() {
        // Arrange
        const userId = 1
        const payload = {
                "article_id": 1,
                "user_id": userId,
                "body": faker.lorem.paragraphs( { min: 4, max: 10 }),
                "date": new Date().toISOString().split('T')[0]
        }

        const responseWithUser = await api.get(`/users/${userId}`)
        const userEmail = responseWithUser.body.email
        const userPass = responseWithUser.body.password
        const userEmailAndPass = `${userEmail}:${userPass}`

        const userEmailAndPassBasic64 = Buffer.from(userEmailAndPass, 'utf-8').toString('base64')

        const headers = {
            "authorization": `Basic ${userEmailAndPassBasic64}` 
        }

        console.log(userEmailAndPassBasic64)
        console.log(headers)
    
        // Act
    
        const response = await api.post("/comments").set(headers).send(payload)
    
        // Assert
        expect(response.statusCode).to.be.equal(201, `Assert failed on ${JSON.stringify(response.body)}`)
        const responseAfterCreation = await api.get(`/comments/${response.body.id}`)
        payload.id = response.body.id
        expect(responseAfterCreation.body).to.be.deep.equal(payload, 
            "Comment content does not match expected content")
    
        })
})