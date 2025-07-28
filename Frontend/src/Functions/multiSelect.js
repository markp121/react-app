export function multiSelect(selectedItem, multiSelectState, setMultiselectState) {
  if (!multiSelectState.some((item) => item === selectedItem)) {
    setMultiselectState((prev) => [...prev, selectedItem]);
  } else {
    setMultiselectState((prev) => prev.filter((a) => a !== selectedItem));
  }
}
