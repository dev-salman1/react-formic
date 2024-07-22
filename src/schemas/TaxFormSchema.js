import * as yup from "yup";

export const TaxSchema = yup.object().shape({
  taxName: yup.string().required("Tax name is required!"),
  taxRate: yup.number().positive().integer().required("Tax rate is required"),
  appliedTo: yup.string().required("Applied to is required!"),
  applicableItems: yup
    .array()
    .of(yup.number())
    .required("At least one item must be selected")
    .min(1, "At least one item must be selected"),
});
