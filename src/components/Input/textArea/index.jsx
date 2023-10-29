import { Field, ErrorMessage } from "formik";
import PropTypes from "prop-types"

export default function TextArea({ label, name, placeholder, ...props }) {
    return (
        <div className="w-full">
            {label && <div className="mb-2.5 ps-3  text-lg text-text_primary/80">{label} :</div>}
            <Field 
            as="textarea" 
            name={name} 
            placeholder={placeholder} 
            className="w-full bg-my_input_bg border border-my_border_color rounded-lg  focus:outline-1 focus:outline-primary/50 text-lg m-2 h-20 px-5"/>
            <style>
                {`
                    [name="${name}"]::placeholder {
                        font-style: italic;
                    }
                `}
            </style>
            <ErrorMessage component="small" name={name} className="text-xs text-red-500 dark:text-red-400 mt-1 block" />
        </div>
    )
}

TextArea.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    props: PropTypes.object
}