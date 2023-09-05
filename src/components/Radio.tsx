import { useField, useFormikContext } from 'formik';
import { at } from 'lodash';
import ErrorText from './ErrorText';

export default function Radio(props:any){
const { label } = props;
const [field, meta, helper] = useField(props);
const { setValue } = helper;
const  form = useFormikContext();
function _renderHelperText() {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched || error) {
        return <ErrorText msg={error} />;
    }
}

function _onChange(e: any) {
    setValue(e.target.value);
}


return (
    <div className={props.containerClass}>
        <label className={`block  tracking-wide mb-1 text-gray-700 text-md font-medium ${props?.classnamelabel}`} htmlFor="grid-state">
            <span className="text-gray-700">{label}</span>
        </label>
        <div className="mt-2">
            {props?.options?.map(({ key, value }: any) => (
                <label className={`inline-flex items-center px-2 ${props?.classNameInput}`}>
                    <input type="radio"
                        {...field}
                        disabled={form.getFieldProps("isPreview").value}

                        className={`form-radio ${form.getFieldProps("isPreview").value ? "bg-gray-100 border-0" : null}`}
                        checked={field.value === key}
                        onChange={_onChange}
                        value={key} />
                    <span className="ml-2">{value}</span>
                </label>
            ))}


         
        </div> 
        {_renderHelperText()}
        </div>
)};