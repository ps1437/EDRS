export interface TextFieldProps {
    styles?: any,
    isTouched?: boolean | undefined,
    isError?: string | "",
    errorMessage?: string | "",
    fieldProps?: any,
    props?: any,
    testName?:any,
    label?: string | undefined
    name?: string
    placeholder?: string,
    className?: string,
    validation?: any,
    value?: any,
    type?: string | "text",
    onChange?: (value: any | undefined) => void;
    mask?: string,
    classnamelabel?:string | undefined,
    onFocus?: any,
    maskPlaceholder?: string
  }