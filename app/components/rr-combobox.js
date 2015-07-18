import Ember from 'ember';

export default Ember.Component.extend({
  isDropdownVisible: false,
  input: null,

  registerInput(input) {
    this.set('input', input);
  },

  toggleDropdown() {
    this.toggleProperty('isDropdownVisible');
  },

  actions: {
    selectItem(item) {
      this.get('on-select')(item);
      this.set('isDropdownVisible', false);
      //NOTE: When the property the input's value attr is bound to does not change,
      // (e.g you select the same item after backspacing a few chars), the rr-combobox-input
      // does not display the selected item's label. This is a workaround for that scenario,
      // though I wish there was a solution that does not involve the registerInput process.
      // Also, this.rerender() does not rerender the input's value, though I'd think it should.
      this.get('input').updateValue();
    },

    inputDidChange(value) {
      this.get('on-input')(value);
      this.set('isDropdownVisible', true);
    }
  }
});
