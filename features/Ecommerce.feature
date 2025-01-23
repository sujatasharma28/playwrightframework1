Feature: Ecommerce validation

  @Regression
  Scenario: playcing the order
    Given a login to Ecommerce application with "sujatasharma1690@gmail.com" and "@Sujata28"
    When Add "IPHONE 13 PRO" to cart
    Then Verify "IPHONE 13 PRO" is displayed in the cart
    When Enter valid details with "sujatasharma1690@gmail.com" and place order
    Then Verify order is present on order history page


  @Validation
  Scenario Outline: placing the order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then  Verify error message validation

    Examples:
      | username                   | password  |
      | sujatasharma1690@gmail.com | @Sujata28 |
      | hello123@gmail.com         | bsbbsb    |