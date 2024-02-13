import { expect } from 'chai'
import request from 'supertest'

const api = request('https://rest-api-demo-yxag.onrender.com/api')

describe("GET/articles", function() {
    it("should return status code 200 and more than 4 articles", async function() {
        //arrange:
        const expectedStatusCode = 200
        const expectedNumberOfArticlesID = 1

        //act:
        const response = await api.get("/articles")

        //assert:
        expect(response.statusCode).to.be.equal(expectedStatusCode, `return status code: ${expectedStatusCode}`) 
        expect(response.body.length).to.be.greaterThanOrEqual(expectedNumberOfArticlesID, `return expected number od articles: ${expectedNumberOfArticlesID} `)
    })
    it("should return article ID with given number of article", async function(){
        //arrange:
        const expectedStatusCode = 200
        const expectedNumberOfArticlesID = 1
        const epxectedTitleOfArticle = "The beauty of the sunset was obscured by the industrial cranes"

        //act:
        const response = await api.get(`/articles/${expectedNumberOfArticlesID}`)

        //assert:
        expect(response.statusCode).to.be.equal(expectedStatusCode, `return status code: ${expectedStatusCode}`) 
        expect(response.body.id).to.be.greaterThanOrEqual(expectedNumberOfArticlesID, `return expected number od articles: ${expectedNumberOfArticlesID} `)
        expect(response.body.title).to.be.equal(epxectedTitleOfArticle, `return expected title of article: ${epxectedTitleOfArticle}`)
    })
    it("should return article ID with given parameter from URL", async function() {
        //arrange:
        const expectedStatusCode = 200
        const expectedNumberOfArticlesID = 1
        const epxectedTitleOfArticle = "The beauty of the sunset was obscured by the industrial cranes"

        //act:
        const response = await api.get(`/articles?id=${expectedNumberOfArticlesID}`)

        //assert:
        expect(response.statusCode).to.be.equal(expectedStatusCode, `return status code for GET/articles?id: ${expectedStatusCode}`)
        expect(response.body[0].id).to.be.equal(expectedNumberOfArticlesID, `return article ID: ${expectedNumberOfArticlesID}, we received ${JSON.stringify(response.body)}`)
        expect(response.body[0].title).to.be.equal(epxectedTitleOfArticle, `return expected title ${epxectedTitleOfArticle}`)
    })
})