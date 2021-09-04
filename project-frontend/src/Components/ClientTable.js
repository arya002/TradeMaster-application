import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import { Badge } from "react-bootstrap";
import chunkArray from "../Functions/ChunkArray";

const renderTrades = (params) => {
	const splitTrades = chunkArray(params.value, 33);

	return (
		<span>
			{splitTrades.map((tradeLine) => (
				<Typography key={Math.random()} color="textPrimary">
					<span style={{ height: "100%" }}>
						{tradeLine.map((t) => (
							<Badge
								key={t}
								pill
								variant="primary"
								style={{ marginRight: "4px" }}
							>
								{t}
							</Badge>
						))}
					</span>
				</Typography>
			))}
		</span>
	);
};

const columns = [
	{
		field: "client",
		headerName: "Client ID",
		width: 140,
	},
	{
		field: "entity",
		headerName: "Entity ID",
		width: 140,
	},
	{
		field: "docs",
		headerName: "Missing documents",
		width: 250,

		renderCell: (params) => (
			<span>
				<Typography color="textPrimary">
					<span style={{ height: "100%" }}>
						{params.value.slice(0, 2).map((t) => (
							<Badge
								key={t}
								pill
								variant="warning"
								style={{ marginRight: "4px" }}
							>
								{t}
							</Badge>
						))}
					</span>
				</Typography>
				<Typography color="textPrimary">
					<span style={{ height: "100%" }}>
						{params.value.slice(2).map((t) => (
							<Badge
								key={t}
								pill
								variant="warning"
								style={{ marginRight: "4px" }}
							>
								{t}
							</Badge>
						))}
					</span>
				</Typography>
			</span>
		),
	},
	{
		field: "trades",
		headerName: "Trades",
		width: 4400,

		renderCell: (params) => renderTrades(params),
	},
];

export default function RenderCellGrid(props) {
	const [tableRows, settableRows] = useState([]);

	useEffect(() => {
		if (props.data)
			settableRows(props.data);
		
	}, [props.data]);

	return (
		<span style={{ height: 500, width: "100%", marginTop: "20px" }}>
			<DataGrid
				rows={tableRows}
				columns={columns}
				rowHeight={150}
				checkboxSelection
				// disableSelectionOnClick
				components={{
					Toolbar: GridToolbar,
				}}
			/>
		</span>
	);
}
