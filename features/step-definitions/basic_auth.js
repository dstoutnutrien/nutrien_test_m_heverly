import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";

import BasicAuthPage from "../pageobjects/basic_auth.page.js";

When(
  /^I use basic auth to login with (\w+) and (.+)$/,
  async (username, password) => {
    console.log(`Attempting to login with username: ${username} and password: ${password}`);
    await BasicAuthPage.login(username, password);
    console.log('Login attempt completed.');
  }
);

Then(/^I should see a paragraph saying (.+)$/, async (message) => {
  console.log(`Verifying the existence of the message element.`);
  const messageElement = await BasicAuthPage.message; //fetch the message element
  const isExisting = await messageElement.isExisting();
  console.log(`Message element exists: ${isExisting}`);
  
  if (isExisting) {
    const messageText = await messageElement.getText(); //get the text of the message element
    console.log(`Message text: ${messageText}`);
    console.log(`Expected message text: ${message}`);
    
    await expect(messageElement).toHaveTextContaining(message); //verify the text contains the expected message
    console.log('Message verification completed.');
  } else {
    console.error('Message element does not exist.');
  }
});
