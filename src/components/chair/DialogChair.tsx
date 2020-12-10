import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { chairCarController } from "../../service";
import { Car } from "../../submodules/base-ticket-team/base-carOwner/Car";
import { ListChairCar } from "../../submodules/base-ticket-team/controller.ts/ListChairCar";
import DiagramChair from "./DiagramChair";

type Props=  {
    Car : Car,
    open : boolean,
    onClose: ()=> void
}
export default function DialogChair(props : Props ) {
    const [diagramChair, setDiagramChair] = useState<ListChairCar>(
		{} as ListChairCar
	);

	useEffect(() => {
		if(props.open){
			chairCarController
			.getByCarId(props.Car._id || "")
			.then((res) => {
				setDiagramChair(res);
			});
		}
	}, [props.open]);

	return (
		<div>
			<Dialog
				open={props.open}
				onClose={props.onClose}
				aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth = {false}			>
				<DialogTitle id="alert-dialog-title">
					{"Use Google's location service?"}
				</DialogTitle>
				<DialogContent>
					<DiagramChair
                        IconRender = {{} as any}
                        listChairDiagram = {diagramChair}
                    ></DiagramChair>
				</DialogContent>
				<DialogActions>
					<Button onClick={props.onClose} color="primary">
						close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
