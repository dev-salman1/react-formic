import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  categorizeItems,
  handleCategoryCheck,
  handleUncategorizedCheck,
} from "../functions/CategorizeData";
import { itemsAPIResponse } from "../data/data";
import { TaxSchema } from "../schemas/TaxFormSchema";
import "../styles/TaxForm.css";
import CloseIcon from "@mui/icons-material/Close";

const TaxForm = () => {
  const { categorized, uncategorized } = categorizeItems(itemsAPIResponse);

  return (
    <Formik
      initialValues={{
        taxName: "",
        taxRate: "",
        appliedTo: "some",
        applicableItems: [],
      }}
      validationSchema={TaxSchema}
      onSubmit={async (values, actions) => {
        console.log({
          applicable_items: values.applicableItems,
          applied_to: values.appliedTo,
          name: values.taxName,
          rate: values.taxRate,
        });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        actions.resetForm();
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="tax-form">
          <div className="container">
            <div className="taxform__header">
              <h2>Add Tax</h2>
              <CloseIcon className="close_icon" />
            </div>
            <div className="taxLabels">
              <div className="taxLabel_name">
                <Field
                  name="taxName"
                  className="textfield"
                  style={{ width: "100%" }}
                />
                <ErrorMessage
                  name="taxName"
                  component="div"
                  className="error"
                />
              </div>
              <div className="taxLabel_rate">
                <Field type="number" name="taxRate" className="textfield" />
                <ErrorMessage
                  name="taxRate"
                  component="div"
                  className="error"
                />
              </div>
            </div>
            <div className="radio-group apply_selection">
              <label className="apply_selection__label">
                <Field
                  type="checkbox"
                  name="appliedTo"
                  className="apply_selection__Checkbox"
                  value={"all"}
                  checked={values.appliedTo === "all"}
                  onChange={(e) => {
                    setFieldValue("appliedTo", "all");
                    setFieldValue(
                      "applicableItems",
                      itemsAPIResponse.map((item) => item.id)
                    );
                  }}
                />
                <span className="checkmark"></span>
                Apply to all items
              </label>

              <label className="apply_selection__label">
                <Field
                  type="checkbox"
                  name="appliedTo"
                  value={"specific"}
                  className="apply_selection__Checkbox"
                  checked={values.appliedTo === "some"}
                  onChange={(e) => {
                    //Also set values.appliedTo to "specific"
                    setFieldValue("appliedTo", "some");
                  }}
                />
                Apply to specific items
              </label>
            </div>
          </div>
          <hr className="border" />

          <div className="items container">
            
            {Object.keys(categorized).map((category) => (
              <div key={category} className="category">
                <div className="checkbox_row">
                  <label>
                    <Field
                      type="checkbox"
                      checked={categorized[category].every((item) =>
                        values.applicableItems.includes(item.id)
                      )}
                      onChange={(e) =>
                        handleCategoryCheck(
                          setFieldValue,
                          values,
                          category,
                          e.target.checked,
                          categorized
                        )
                      }
                    />
                    {category}
                  </label>
                </div>
                {categorized[category].map((item) => (
                  <label className="category_selection__label" key={item.id}>
                    <Field
                      type="checkbox"
                      name="applicableItems"
                      value={item.id}
                      checked={values.applicableItems.includes(item.id)}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        setFieldValue(
                          "applicableItems",
                          checked
                            ? [...values.applicableItems, parseInt(value)]
                            : values.applicableItems.filter(
                                (id) => id !== parseInt(value)
                              )
                        );
                      }}
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            ))}
            <div className="category">
              <div className="checkbox_row">
                <label>
                  <Field
                    type="checkbox"
                    checked={uncategorized.every((item) =>
                      values.applicableItems.includes(item.id)
                    )}
                    onChange={(e) =>
                      handleUncategorizedCheck(
                        setFieldValue,
                        values,
                        e.target.checked,
                        uncategorized
                      )
                    }
                  />
                </label>
              </div>

              {uncategorized.map((item) => (
                <label className="category_selection__label" key={item.id}>
                  <Field
                    type="checkbox"
                    name="applicableItems"
                    value={item.id}
                    checked={values.applicableItems.includes(item.id)}
                    onChange={(e) => {
                      const { value, checked } = e.target;
                      setFieldValue(
                        "applicableItems",
                        checked
                          ? [...values.applicableItems, parseInt(value)]
                          : values.applicableItems.filter(
                              (id) => id !== parseInt(value)
                            )
                      );
                    }}
                  />
                  {item.name}
                </label>
              ))}
              <ErrorMessage
                name="applicableItems"
                component="div"
                className="error"
              />
            </div>
          </div>
          <hr className="border" />
          <div className="button_container">
            <button className="submit_button" type="submit">
              Apply tax to {values.applicableItems.length} item(s)
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TaxForm;


