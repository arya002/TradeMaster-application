import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
// import { Link } from "react-bootstrap";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import AssessmentIcon from "@material-ui/icons/Assessment";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "fixed",
		bottom: theme.spacing(2),
		right: theme.spacing(2),
		zIndex: '2'
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

function ScrollTop(props) {
	const { children, window } = props;
	const classes = useStyles();
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	});

	const handleClick = (event) => {
		const anchor = (event.target.ownerDocument || document).querySelector(
			"#back-to-top-anchor"
		);

		if (anchor) {
			anchor.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	return (
		<Zoom in={trigger}>
			<div
				onClick={handleClick}
				role="presentation"
				className={classes.root}
			>
				{children}
			</div>
		</Zoom>
	);
}

ScrollTop.propTypes = {
	children: PropTypes.element.isRequired,
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default function BackToTop(props) {
    const classes = useStyles();

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar position="sticky">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						<AssessmentIcon
							style={{
								fontSize: "35",
								color: "white",
							}}
						/>
						{" "} Trade Master
					</Typography>
					<Button color="inherit" href="/query">
						Query
					</Button>
					<Button color="inherit" href="/files">
						Upload files
					</Button>
				</Toolbar>
			</AppBar>
			<Toolbar id="back-to-top-anchor" />

			<ScrollTop {...props}>
				<Fab
					color="secondary"
					size="small"
					aria-label="scroll back to top"
				>
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
		</React.Fragment>
	);
}