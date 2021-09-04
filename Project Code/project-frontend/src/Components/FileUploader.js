import React from "react";
import styled from "styled-components";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const PickerBox = styled.div`
	width: 300px;
	height: 45px;
	background-color: rgba(245, 1, 87, 0.3);
	// background-color: linear-gradient(45deg, rgba(29, 236, 197, 0.5), rgba(91, 14, 214, 0.5) 100%)
	border-width: 2;
	border-color: rgba(0, 123, 255, 1);
	border-style: dashed;
	border-radius: 11px;
	margin-bottom: 20px;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		border-style: solid;
		background-color: rgba(245, 1, 87, 0.5);
	}
`;

const FileUploader = (props) => {
	const handleClick = (event) => {
		document.getElementById("hiddenFileInput").click();
	};

	const handleFileChange = (event) => {
		// console.log(event.target.files[0]);
		props.saveFile(event.target.files[0]);
	};

	return (
		<div>
			<PickerBox onClick={handleClick}>
				<AddCircleOutlineIcon
					style={{ fontSize: "35", color: "rgba(0, 123, 255, 1)" }}
				/>
			</PickerBox>

			<input
				onChange={handleFileChange}
				id="hiddenFileInput"
				style={{ display: "none" }}
				type="file"
			/>
		</div>
	);
};

export default FileUploader;