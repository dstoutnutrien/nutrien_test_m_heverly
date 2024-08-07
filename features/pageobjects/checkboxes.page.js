class CheckboxesPage {
  get elements() {
    return {
      header: () => $("h3"),
      checkbox: (num) => $(`#checkboxes input:nth-of-type(${num})`), //checkbox element based on its position
    };
  }

  async select(num) {
    try {
      const checkbox = await this.elements.checkbox(num); //obtain checkbox element
      console.log(`Checkbox element obtained: ${checkbox.selector}`); //log obtained checkbox element selector

      const isChecked = await checkbox.isSelected();
      if (!isChecked) {
        await checkbox.click();
        console.log(`Checkbox number ${num} clicked.`);
      } else {
        console.log(`Checkbox number ${num} is already checked.`);
      }

    } catch (error) {
      console.error(`Error clicking checkbox number ${num}: ${error.message}`);
    }
  }
}

export default new CheckboxesPage();
