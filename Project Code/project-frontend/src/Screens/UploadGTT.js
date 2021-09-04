import React, { useState } from "react";
import styled from "styled-components";
import { Button, Form } from "react-bootstrap";

// query API
import { client_file_api } from "../services/api/index";

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
`;

const UploadGTT = () => {
    const [GTTfile, setGTTfile] = useState(false);
    const [resp, setResp] = useState(null);

    const saveFile = (event) => {
        setGTTfile(event.target.files[0]);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();

		if (GTTfile) {
			
			const response = await client_file_api.postFile(GTTfile);

			console.log(response);

			if (response.status === 200) {
				setResp(
					<div
						style={{
							fontSize: "20px",
							fontWeight: "bold",
							color: "green",
							marginBottom: "15px",
						}}
					>
						Successfull stored in the database
					</div>
				);
			}
			else if (response.status === 205) {
				setResp(
					<div
						style={{
							fontSize: "20px",
							fontWeight: "bold",
							color: "red",
							marginBottom: "15px",
						}}
					>
						Wrong format of document
					</div>
				);
			}
        }
    }

	return (
		<div
			style={{
				maxHeight: "100%",
			}}
		>
			<div>
				<div>
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="emailValidation">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								name="gtt"
								type="file"
								accept="application/JSON"
								required
								placeholder="Select GTT json file"
								onChange={saveFile}
								style={{
									width: "300px",
									border: "1px solid #ced4d8",
									padding: "5px",
									borderRadius: "3px",
								}}
							/>
							<Form.Control.Feedback type="invalid">
								GTT file is required
							</Form.Control.Feedback>
						</Form.Group>

                        {resp}
						
						<Button
							variant="primary"
							type="submit"
							style={{ width: "300px" }}
						>
							Upload
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default UploadGTT;
