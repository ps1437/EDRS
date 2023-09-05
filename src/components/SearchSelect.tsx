import { useField, useFormikContext } from 'formik';
import Select from 'react-select';
import { at } from "lodash";
import ErrorText from './ErrorText';

export const styles = {

    control: (p: any, state: any) => {
        var disabledStyle = null
        if (state.isDisabled) {
            disabledStyle = { backgroundColor: 'rgba(243, 244, 246,5)', border: 0 }
        }

        return { ...p, borderColor: "black", ...disabledStyle }
    },

    input: (p: any, v: any) => {
        return { ...p, height: "2rem" }
    }

}
export default function SearchSelect({ label, options, ...props }: any) {
    const [field,meta] = useField(props);
    const { setFieldValue, getFieldProps } = useFormikContext();
    const [touched, error] = at(meta, "touched", "error");
    const isError = touched || error;
  
    function _renderHelperText() {
      if (isError) {
        return <ErrorText msg={error} />;
      }
    }
    const handleChange = (selectedOption: any) => {
        field.value = selectedOption.value;
        setFieldValue(props.name, selectedOption.value)
    };

    return (
        <>
            <label className="block  tracking-wide mb-1 text-gray-700 text-md font-medium  " htmlFor="grid-state">
                <span className={`text-gray-700  ${props?.classnamelabel}`}>{label}</span></label>
            <Select
                isDisabled={getFieldProps("isPreview").value}
                styles={styles}
                value={props.value}
                onChange={handleChange}
                options={options} />
                   {_renderHelperText()}
        </>
    )
}
