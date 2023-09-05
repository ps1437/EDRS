import { useField, useFormikContext } from "formik";
import { at } from "lodash";
import ErrorText from "./ErrorText";


export default function SelectField(props: any) {
  const { label, options } = props;
  const [field, meta] = useField(props);
  const { value: selectedValue } = field;
  const [touched, error] = at(meta, "touched", "error");
  const isError = touched || error ;
  const  form = useFormikContext();

  function _renderHelperText() {
    if (isError) {
      return <ErrorText msg={error} />;
    }
  }

  return (
    <div className={`block ${props.containerClass}`}>
      <label
        className="tracking-wide  text-gray-700 text-md font-medium "
        htmlFor="grid-state"
      >
        {label}
      </label>
      <select
       disabled={form.getFieldProps("isPreview").value}

        {...field}
        value={selectedValue ? selectedValue : ""}
        className={`form-select w-full mt-1 bg-gray-50 block rounded ${props?.className} ${form.getFieldProps("isPreview").value ? "bg-gray-100 border-0" : null}`}
      >
        {options?.map((object: any) => (
          <option value={object?.key}>{object?.value} </option>
        ))}
      </select>

      {_renderHelperText()}
    </div>
  );
}
