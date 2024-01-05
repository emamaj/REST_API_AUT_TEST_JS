
    import { expect } from "chai"
    
    describe("Addition tests", function() {
        it("should add two positive numbers", function() {
            // arrange:
            const valueA = 8
            const valueB = 4
            const expectedResult = 13
    
            // act:
            const actualResult = addNumbers(valueA, valueB)
    
            // assert:
            expect(actualResult).to.be.equal(expectedResult, "During adding two numbers")
        })
        it("should add two numbers - one positive and one negative", function() {
            // arrange:
            const valueA = -8
            const valueB = 4
            const expectedResult = -4
    
            // act:
            const actualResult = addNumbers(valueA, valueB)
    
            // assert:
            expect(actualResult).to.be.equal(expectedResult)
        })
    })
    
    function addNumbers(a, b) {
        return a + b
    }