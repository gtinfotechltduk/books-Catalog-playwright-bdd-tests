Feature: Books inventory management
              As an authorized user
              I want to login and manage books
  So that the inventory stays up to date

        Background:
            Given I am on the login page

        @login @done
        Scenario: Successful login
             When I log in with valid admin credentials
             Then I should see the books list page

        @login @done
        Scenario: Error message for invalid credentials
             When I enter an invalid username or password
              And I click the login button
             Then I should see an error message "Invalid credentials"

        @login @done
        Scenario: Error message for empty username/password
             When I leave username and password fields empty
              And I click the login button
             Then I should see validation messages "Username is required" and "Password is required"

        @authorisation @done @bug
        Scenario: Redirect to login when accessing books list without login
             When I navigate to the books list page without logging in
             Then I should be redirected to the login page

        @booksPage @done
        Scenario: Welcome message and logout button are displayed
             When I log in with valid credentials
             Then I should see a welcome message with my username
              And I should see a logout button

        @booksPage @done @bug
        Scenario: Logout redirects to login and invalidates session
             When I log in with valid admin credentials
              And I click the logout button
             Then I should be redirected to the login page
              And I should not be able to access the books list page without logging in again

        @booksPage @done
        Scenario: Add a book
             When I log in with valid admin credentials
             Then I should see the books list page
             When I add a valid new book
             Then I should see the new book in the list

        @booksPage @done
        Scenario: Edit a book
             When I log in with valid admin credentials
             Then I should see the books list page
             When I edit a valid book
             Then I should see the updated book in the list

        @booksPage @done
        Scenario: Delete a book
             When I log in with valid admin credentials
             Then I should see the books list page
             When I delete a book
             Then I should not see the book in the list

        @booksPage @done @bug
        Scenario: Successful logout
             When I log in with valid admin credentials
             Then I should see the books list page
             When I log out
             Then I should see the login page
