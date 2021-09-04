import React from "react";
import { ErrorMessage, useField } from "formik";

const FormikInput = ({ label, onChange, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<div className="mb-3">
			<label htmlFor={field.name}>{label}</label>
			<input
				className={`form-control ${
					meta.touched && meta.error && "is-invalid"
				}`}
				onChange={{ onChange }}
				style={{width: '300px'}}
				{...field}
				{...props}
				// autoComplete="new-password"
			/>
			{meta.error && meta.touched ? (
				<div style={{ marginTop: "4px" }}>
					<ErrorMessage
						component="div"
						name={field.name}
						style={{
							color: "red",
							fontSize: "12.8px",
							marginTop: "4px",
						}}
					/>
				</div>
			) : null}
		</div>
	);
};

export default FormikInput;