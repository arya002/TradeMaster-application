import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Field } from "formik";
import { Button, Form, Row } from "react-bootstrap";
import * as Yup from "yup";

//components
import FormikTextfield from "../Components/FormikInput";
import DateTable from "../Components/DateTable";

// query API
import { date_api } from '../services/api/index';

const Container = styled.div`
	// width: 143px;
	// height: 169px;
	// background-color: rgba(221, 183, 253, 0.7);
	// border-width: 2;
	// border-color: rgba(144, 19, 254, 1);
	// border-style: dashed;
	// border-radius: 11px;
	// margin: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
`;

const QueryByDate = () => {

	const [trades, setTrades] = useState(null);
	const [queryDate, setQueryDate] = useState(null);

	const PostValues = async (values) => {
		console.log(values);
		setQueryDate(values.date);

		const response = await date_api.get(values);
		console.log(response);
		setTrades(response.data);
	};

	
	const validationSchema = Yup.object().shape({
		date: Yup.string()
			.max(10, "Date of birth must be less than 10 characters")
			.required("Date is required"),
	});

    return (
		<div
			style={{
				maxHeight: "100%",
			}}
		>
			<div>
				<Formik
					initialValues={{
						date: "",
					}}
					validationSchema={validationSchema}
					onSubmit={(values, { setSubmitting, resetForm }) => {
						setSubmitting(true);
						PostValues(values);
						// resetForm();
						setSubmitting(false);
					}}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						setFieldValue,
						setFieldTouched,
						isSubmitting,
					}) => (
						<div>
							<Form onSubmit={handleSubmit}>
								<FormikTextfield
									label="Date of trade"
									name="date"
									type="date"
									placeholder="Select date"
								/>

								<Button
									variant="primary"
									type="submit"
									style={{ width: "300px", }}
								>
									Get results
								</Button>
							</Form>
						</div>
					)}
				</Formik>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					flexWrap: "wrap",
				}}
			>
				{trades === null ? null : trades.length > 0 ? (
					<DateTable data={trades} />
				) : (
					<span
						style={{
							color: "green",
							marginTop: "30px",
							padding: "5px",
							fontWeight: "bold",
							fontSize: "20px",
							backgroundColor: "rgba(0, 255, 0, 0.3)",
							borderRadius: "5px",
						}}
					>
						All trades on {queryDate} are GTT
					</span>
				)}
			</div>
		</div>
	);
}

export default QueryByDate;