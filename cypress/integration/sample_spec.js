
describe('My First Test', () => {
  it('Does not do much', () => {
    expect(true).to.equal(true)
  })

  it('Visits the Kitchen Sink', () => {
    cy.visit('https://example.cypress.io')
  })

  it('finds the content "type"', () => {
    cy.visit('https://example.cypress.io')
    cy.contains('type').click()
    cy.url().should('include', '/commands/actions')

    cy.get('.action-email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')
  })
})

describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(false)
  })
})


describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/') // change URL to match your dev URL
  })
})