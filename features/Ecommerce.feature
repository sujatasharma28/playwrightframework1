Feature: Ecommerce validation

  Scenario: playcing the order
    Given a login to Ecommerce application with "sujatasharma1690@gmail.com" and "@Sujata28"
    When Add "zara coat 3" to cart
    Then Verify "zara coat 3" is displayed in the cart
    When Enter valid details and place order
    Then Verify order is present on order history page