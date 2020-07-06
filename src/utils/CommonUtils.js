export const filterSearchByName = (prevList, inputVal) => {
  let newList = prevList;
  newList = newList.filter((list) =>
    (list.first_name + list.last_name)
      .toLowerCase()
      .includes(inputVal.toLowerCase())
  );
  return [...newList];
};
