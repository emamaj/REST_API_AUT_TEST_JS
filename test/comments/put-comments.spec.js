import { faker, expect, request, api } from '../../config.js';

describe("PUT / comments", function() {
    it("Should update comment with valid date", async function() {
    //Arrange
    
    const userId = 3    
    const commentId = 1
    const payload = {
            "article_id": 1,
            "user_id": userId,
            "body": faker.lorem.paragraphs(4),
            "date": new Date().toISOString().split("T")[0]
          
    }
    const responseWithUserId = await api.get(`/users/${userId}`)
    const userEmail = responseWithUserId.body.email 
    const userPass = responseWithUserId.body.password
    const userEmailAndPass = `${userEmail}:${userPass}`
    const userEmailAndPassBase64 = Buffer.from(userEmailAndPass, 'utf-8').toString('base64')


    const header = {
        "authorization": `Basic ${userEmailAndPassBase64}`
    }
    //Act
    const response = await api.put(`/comments/${commentId}`).set(header).send(payload)


    //Assert
    expect(response.statusCode).to.be.equal(200,
        `Assert failed on: ${JSON.stringify(response.body)}`)
    const responseAfterCreation = await api.get(`/comments/${commentId}`)
    payload.id = commentId
    expect(responseAfterCreation.body).to.be.deep.equal(payload,
        "Comment content does not match expected content")
    })
})