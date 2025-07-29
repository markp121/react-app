export const handleMultiSelect = (event, multiSelectState, setMultiselectState) => {
  const selectValue = event.target.value;
  if (!multiSelectState.some((item) => item === selectValue)) {
    setMultiselectState((prev) => [...prev, selectValue]);
  } else {
    setMultiselectState((prev) => prev.filter((a) => a !== selectValue));
  }
};

export const handleToggleAll = (event, selectOptionsList, setMultiselectState) => {
  const checked = event.target.checked;
  if (checked) {
    setMultiselectState(selectOptionsList);
  } else {
    setMultiselectState([]);
  }
};
