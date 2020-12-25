import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LinearProgress, makeStyles } from "@material-ui/core";
import { AppModel } from "../../rematch";
import { AppState } from "../../rematch/store";


const useStyles = makeStyles(theme=>({
	load : {
		position : "fixed",
		top : 0,
		left : 0,
		width : "100%"
	}
}))
export default function AppLoadingTop() {
	const [loading, setLoading] = useState(true)
	const classes = useStyles()

    const loadingTop: boolean = useSelector(
		(state: AppState) => state.loadingTop
	);
	useEffect(() => {
		if(loading !== loadingTop){
			setLoading(loadingTop)
		}
	}, [loadingTop])
	return (
		<div className = {classes.load}>
			<LinearProgress   color="primary"  hidden ={!loading}/>
		</div>
	) 
}
