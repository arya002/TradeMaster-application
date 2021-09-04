import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// screens
import QueryByDate from '../Screens/QueryByDate';
import QueryByTradeID from '../Screens/QueryByTradeID';
import QueryByClientID from '../Screens/QueryByClientID';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			style={{width: '100%'}}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					{children}
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		// flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: "flex",
		width: '100%',
		// height: 224,
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
		width: '200px'
	},
}));

export default function VerticalTabs() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<Tabs
				orientation="vertical"
				value={value}
				onChange={handleChange}
				aria-label="Vertical tabs example"
				className={classes.tabs}
			>
				<Tab label="Query by date" {...a11yProps(0)} />
				<Tab label="Query by trade Id" {...a11yProps(1)} />
				<Tab label="Query by client ID" {...a11yProps(2)} />
			</Tabs>
			<TabPanel value={value} index={0}>
				<QueryByDate />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<QueryByTradeID />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<QueryByClientID />
			</TabPanel>
		</div>
	);
}
