import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-multi-date-picker'
import { DATE_FORMAT } from '../constant/Constant';
import ErrorText from './ErrorText';
import { at } from "lodash";

export function CustomInput({ openCalendar, disabled, className, value, name, handleValueChange, placeholder }: any) {
    return (
        <input
            className={`form-input
            rounded   ${className}  ${disabled ? "bg-gray-100 border-0" : null} `}
            onFocus={openCalendar}
            value={value}
            disabled={disabled}
            name={name}
            placeholder={placeholder ? placeholder : "YYYY-MM-DD"}
            onChange={handleValueChange}
        />
    )
}

interface MultiDatePickerProps {
    value?: string | undefined,
    onChange?: (date: any) => void,
    calendar?: any,
    label?: string,
    plugins?: any,
    format?: any,
    name?: any,
    inputClass?: any
    props?: any,
}
const getDateError = (error:any,name:any)=>{
    return <ErrorText msg={error[name]} />;
  
  }
export default function MultiDatePicker(props: MultiDatePickerProps) {
    const [field, meta] = useField(props.props);
    const { setFieldValue, getFieldProps } = useFormikContext();
    let error = meta &&  meta?.error && getDateError(meta.error,props.name);
    return (
        <div>
            <label className="block mb-1  tracking-wide text-gray-700 text-md font-medium " htmlFor="grid-state">
                {props.label}
            </label>
            <DatePicker
                disabled={getFieldProps("isPreview").value}

                format={props.format ? props.format : DATE_FORMAT}
                calendar={props.calendar}
                plugins={props.plugins}
                render={<CustomInput disabled={getFieldProps("isPreview").value}
                    name={props.name} className={`${props.inputClass}`}
                    placeholder={props.format} />}
                {...field}
                {...props}
                value={new Date(field.value[props.name])}
                onChange={(val) => {
                    setFieldValue(props.name, val?.toString());
                }}
            />
            <div>
            {error}
            </div>
        </div>
    )
}
