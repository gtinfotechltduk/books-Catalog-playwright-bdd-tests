Feature: Books inventory management
              As an authorized user
              I want to login and manage books
              So that the inventory stays up to date

        Background:
            Given I am on the login page

        @happy_path
        Scenario: Successful login and add a book
             When I log in with valid admin credentials
             Then I should see the books list page
          #     And I should see a welcome message
          #    When I add a valid new book
          #    Then I should see the new book in the list

     #    @validation
     #    Scenario: Validation error when adding an invalid book
     #         When I log in with valid admin credentials
     #          And I navigate to the add book form
     #          And I submit the book form with invalid data
     #         Then I should see validation errors on the book form
