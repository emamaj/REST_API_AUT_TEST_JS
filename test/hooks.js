import request from 'supertest'
import { expect } from 'chai'

const api = request('https://rest-api-demo-yxag.onrender.com/api')

export const mochaHooks = {
    async beforeEach() {
        const response = await api.get('/restoreDB')
        expect(response.statusCode).to.be.equal(201, `Assert failed on: ${JSON.stringify(response.body)}`)
        console.log(`This will be expected before each test: ${JSON.stringify(response.body)}`)
    }
}