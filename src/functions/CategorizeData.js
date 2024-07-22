export const categorizeItems = (items) => {
  const categorized = {};
  const uncategorized = [];

  items.forEach((item) => {
    if (item.category) {
      if (!categorized[item.category.name]) {
        categorized[item.category.name] = [];
      }
      categorized[item.category.name].push(item);
    } else {
      uncategorized.push(item);
    }
  });

  return { categorized, uncategorized };
};

export const handleCategoryCheck = (
  setFieldValue,
  values,
  category,
  checked,
  categorized
) => {
  const categoryItems = categorized[category].map((item) => item.id);
  setFieldValue(
    "applicableItems",
    checked
      ? [...new Set([...values.applicableItems, ...categoryItems])]
      : values.applicableItems.filter((id) => !categoryItems.includes(id))
  );
};




export const handleUncategorizedCheck = (
  setFieldValue,
  values,
  checked,
  uncategorized
) => {
  const categoryItems = uncategorized.map((item) => item.id);
  setFieldValue(
    "applicableItems",
    checked
      ? [...new Set([...values.applicableItems, ...categoryItems])]
      : values.applicableItems.filter((id) => !categoryItems.includes(id))
  );
};
