import { When, Then } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
import checkboxesPage from "../pageobjects/checkboxes.page.js";

When(/^I select checkbox (\d)$/, async function (num) {
  console.log(`Selecting checkbox number: ${num}`);
  try {
    this.checkbox = await checkboxesPage.elements.checkbox(num); //obtain the checkbox element
    console.log(`Checkbox element obtained: ${this.checkbox.selector}`); //obtained checkbox element selector
    await checkboxesPage.select(num); //select the checkbox
    console.log(`Checkbox number ${num} selected.`); //successful selection
  } catch (error) {
    console.error(`Error selecting checkbox number ${num}: ${error.message}`); //debugging
  }
});

Then(/^The checkbox should be checked$/, async function () {
  console.log(`Verifying that the checkbox is checked.`);
  try {
    const isChecked = await this.checkbox.isSelected();
    expect(isChecked).toBe(true);
    console.log(`Checkbox is verified to be checked.`); //successful verification
  } catch (error) {
    console.error(`Error verifying checkbox: ${error.message}`); //debugging
  }
});
