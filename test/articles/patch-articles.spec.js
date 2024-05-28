import { faker, expect, request, api } from '../../config.js';

describe("PATCH / articles", function() {
    it("should update valid article with valid title", async function() {
        //arrange:
        const title = faker.lorem.paragraphs()
        const id = 1
        const payload = {
            title,
            id
        }
        const responseWithBaseArticle = await api.get(`/articles/${id}`)
        const expectedData = responseWithBaseArticle.body
        expectedData.title = title

        //act:
        const response = await api.patch(`/articles/${id}`).send(payload)


        //assert:
        expect(response.statusCode).to.be.equal(200, `Assert faild on: ${JSON.stringify(response.body)}`)
        const articleTitleAfter = await api.get(`/articles/${id}`)

        expect(articleTitleAfter.body).to.be.deep.equal(expectedData)
    })
})