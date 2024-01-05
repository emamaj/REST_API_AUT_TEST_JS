import { expect } from "chai"

describe('test multiplication random number', function() {
    it('should multiplay number test', function() {
        // arrange:
        const numberA = 5
        const numberB = 2
        const expectedResult = 10

        // act:
        const actualResult = multiplyNumber(numberA, numberB)

        //assert:
        expect(actualResult).to.be.equal(expectedResult, 'Accteptable result')
        
    })

    it('should multgiplay one negative number', function() {
        //arrange:
        const numberC = -2
        const numberD = 2
        const expectedResult2 = -4

        //act:
        const actualResult2 = multiplyNumber(numberC, numberD)

        //assert:
        expect(actualResult2).to.be.equal(expectedResult2, 'result with one negative number')
    })

    it('should indicate wrong result', function() {
        //arrange:
        const numberE = 2
        const numberF = 1
        const expectedResult3 = 5

        //act:
        const actualResult3 = multiplyNumber(numberE, numberF)

        //assert:
        expect(actualResult3).to.be.equal(expectedResult3, `this is a wrong result of: ${numberE} * ${numberF}`)
    })
})

function multiplyNumber(a, b) {
    return a * b 
}