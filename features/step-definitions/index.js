import { Given, When, Then } from "@wdio/cucumber-framework";
import Page from "../pageobjects/page.js";
const index = new Page();

Given(/^I am on the (.+) page$/, async (page) => {
  console.log(`Navigating to the ${page} page.`); //navigation step
  await index.open(page);
  console.log(`Navigated to the ${page} page successfully.`); //debugging
});

Given("I am at the index page", async function () {
  console.log("Navigating to the index page."); //navigation step
  await index.open();
  console.log("Navigated to the index page successfully."); //debugging
});

When(/^I click the (.+) link$/, async function (page) {
  console.log(`Clicking the ${page} link.`); //debugging click
  this.page = page.trim(); //trim any extra spaces
  await index.click(page);
  console.log(`Clicked the ${page} link successfully.`);
});

Then("I should be directed to the selected page", async function () {
  console.log(`Verifying the presence of the header for ${this.page}.`);

  const maxRetries = 3;
  let retries = 0;
  let headerText = '';

  while (retries < maxRetries) {
    try {
      const currentUrl = await browser.getUrl();
      console.log(`Current URL: ${currentUrl}`); //URL to ensure we are on the correct page

      //check if any h3 element exists
      const headers = await $$('h3');
      if (headers.length === 0) {
        console.log(`No h3 element found on the page.`);
        break; //exit the loop if no h3 element is found
      }

      //selector that finds an h3 containing the text
      for (const header of headers) {
        const headerTextTemp = await header.getText(); //text content of the header
        console.log(`Header text: ${headerTextTemp}`);

        if (headerTextTemp.includes(this.page)) {
          headerText = headerTextTemp;
          console.log("Header text verification completed successfully.");
          break; //exit loop if header is found and verified
        }
      }

      if (headerText !== '') {
        break; //exit loop if a matching header text was found
      } else {
        throw new Error(`No h3 header text contains "${this.page}"`);
      }
    } catch (error) {
      retries++;
      console.log(`Header not found or text mismatch, retrying... (${retries}/${maxRetries})`);
      await browser.pause(1000); //wait for 1 second before retrying
    }
  }

  if (headerText === '') {
    console.error(`Header for ${this.page} not found after ${maxRetries} retries.`);
    // debugging
    // const pageSource = await browser.getPageSource();
    // console.log(pageSource);
  }
});
