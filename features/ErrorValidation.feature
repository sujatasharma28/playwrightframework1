Feature: Ecommerce validation

@Validation
  Scenario Outline: placing the order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then  Verify error message validation

Examples:
    |  username                     | password   |
    |  sujatasharma1690@gmail.com   | @Sujata28  | 
    |  hello123@gmail.com           | bsbbsb     |