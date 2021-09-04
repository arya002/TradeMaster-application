import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Field } from "formik";
import { Button, Form, Row } from "react-bootstrap";
import * as Yup from "yup";

//components
import FormikTextfield from "../Components/FormikInput";
import TradeTable from "../Components/TradeTable";

// query API
import { trade_api } from "../services/api/index";

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

const QueryByTradeID = () => {
	const [trades, setTrades] = useState(null);
	const [queryTrade, setQueryTrade] = useState(null);

	const PostValues = async (values) => {
		console.log(values);

		const response = await trade_api.get(values);
		console.log(response);

		setQueryTrade(values.tradeID);
		setTrades(response.data);
	};

	const validationSchema = Yup.object().shape({
		tradeID: Yup.string()
			.max(16, "Trade ID must be less than 16 characters")
			.required("Trade ID is required"),
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
						tradeID: "",
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
									label="Trade ID"
									name="tradeID"
									type="text"
									placeholder="Enter trade ID"
								/>

								<Button
									variant="primary"
									type="submit"
									style={{ width: "300px" }}
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
				{trades && trades.length === 1 && trades[0].docs.length === 0 ? (
					<div
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
						{queryTrade} is GTT
					</div>
				) : null}

				{trades && trades.length === 1 && trades[0].docs.length !== 0 ? (
					<div
						style={{
							color: "red",
							marginTop: "30px",
							padding: "5px",
							fontWeight: "bold",
							fontSize: "20px",
							backgroundColor: "rgba(255, 0, 0, 0.3)",
							borderRadius: "5px",
						}}
					>
						{queryTrade} is not GTT
					</div>
				) : null}

				{trades === null ? null : trades.length > 0 ? (
					<TradeTable data={trades} />
				) : (
					<div
						style={{
							color: "red",
							marginTop: "30px",
							padding: "5px",
							fontWeight: "bold",
							fontSize: "20px",
							backgroundColor: "rgba(255, 0, 0, 0.3)",
							borderRadius: "5px",
						}}
					>
						{queryTrade} not found
					</div>
				)}
			</div>
		</div>
	);
};

export default QueryByTradeID;
