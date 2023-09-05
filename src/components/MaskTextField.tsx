import { useField, useFormikContext } from "formik";
import ReactInputMask from "react-input-mask";
import ErrorText from "./ErrorText";

export default function MaskTextField({ label,mask,defaultValue, type="text", ...props }: any) {
  const [field, meta] = useField(props);
  const  form = useFormikContext();

  return (
    <>
      <label className="block  tracking-wide text-gray-700 text-md font-medium " htmlFor="grid-state">
        <span className="text-gray-700">{label}</span>
        <ReactInputMask 
          className={`form-input mt-1 h-10 block rounded  bg-gray-50 w-full  ${props?.className} ${form.getFieldProps("isPreview").value ? "bg-gray-100 border-0" : null}`}
          mask={mask}
          type={type}
          defaultValue={defaultValue}
          style={{ ...props?.styles }}
          {...props}
          {...field}
          {...props}
          disabled={form.getFieldProps("isPreview").value}
          />
      </label>


      {meta.touched || meta.error ? <ErrorText msg={meta.error} /> : null}
    </>
  );
}
