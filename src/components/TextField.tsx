import { useField, useFormikContext } from "formik";
import ErrorText from "./ErrorText";

export default function TextField({ label, type = "text", ...props }: any) {
  const [field, meta] = useField(props);
  const form = useFormikContext();
  if (type === "textArea") {
    return (
      <>
        <label
          className="block  tracking-wide text-gray-700 text-md font-medium "
          htmlFor="grid-state"
        >
          <span className={`text-gray-700  ${props?.classnamelabel}`}>
            {label}
          </span>
          <textarea
            className={`form-input mt-1 h-10 block rounded  bg-gray-50
        w-full  ${props?.className} ${
              form.getFieldProps("isPreview").value
                ? "bg-gray-100 border-0"
                : null
            }`}
            {...field}
            {...props}
            rows={2}
            disabled={form.getFieldProps("isPreview").value}
            type={props?.type ? props.type : "text"}
          />
        </label>

        {meta.touched || meta.error ? <ErrorText msg={meta.error} /> : null}
      </>
    );
  }
  return (
    <>
      <label
        className="block  tracking-wide text-gray-700 text-md font-medium  "
        htmlFor="grid-state"
      >
        <span className={`text-gray-700  ${props?.classnamelabel}`}>
          {label}
        </span>
        <input
          disabled={form.getFieldProps("isPreview").value}
          className={`form-input mt-1 h-10 block rounded  bg-gray-50 w-full  ${
            props?.className
          } ${
            form.getFieldProps("isPreview").value
              ? "bg-gray-100 border-0"
              : null
          }`}
          {...field}
          {...props}
          type={type}
        />
      </label>

      {meta.touched || meta.error ? <ErrorText msg={meta.error} /> : null}
    </>
  );
}
