import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { chairCarController } from "../../service";
import { Car } from "../../submodules/base-ticket-team/base-carOwner/Car";
import { ChairCar } from "../../submodules/base-ticket-team/base-carOwner/ChairCar";
import { CreateChairCar } from "../../submodules/base-ticket-team/controller.ts/CreateChairCar";
import { ListChairCar } from "../../submodules/base-ticket-team/controller.ts/ListChairCar";
import DiagramChair from "./DiagramChair";
import PopUpAutoCreateChair from "./PopUpAutoCreateChair";
import PopUpEditChairCar from "./PopUpEditChairCar";

type Props = {
	Car: Car;
	open: boolean;
	onClose: () => void;
};
export default function DialogChair(props: Props) {
	const [diagramChair, setDiagramChair] = useState<ListChairCar>(
		{} as ListChairCar
	);
	const [eventReload, setEventReload] = useState<boolean>(false);
	const [selected, setSelected] = useState<ChairCar>({} as ChairCar);
	const [showForm, setShowForm] = useState<boolean>(false);
	const [showConfirm, setShowConfirm] = useState<boolean>(false);
	const [showFormAutoCreate, setShowFormAutoCreate] = useState<boolean>(
		false
	);

	function onAddRows(floor: number) {
		floor++;
		if (diagramChair.dataListChar) {
			let getListChair = [...diagramChair.dataListChar];
			let row = getListChair[getListChair.length - 1].length + 1;
			console.log(row);
			getListChair[floor - 1].push([
				{
					localColumn: 1,
					localRow: row,
					carId: props.Car._id,
					localFloor: floor,
				},
				{
					localColumn: 2,
					localRow: row,
					carId: props.Car._id,
					localFloor: floor,
				},
				{
					localColumn: 3,
					localRow: row,
					carId: props.Car._id,
					localFloor: floor,
				},
				{
					localColumn: 4,
					localRow: row,
					carId: props.Car._id,
					localFloor: floor,
				},
				{
					localColumn: 5,
					localRow: row,
					carId: props.Car._id,
					localFloor: floor,
				},
			]);
			console.log(getListChair);
			setDiagramChair({
				dataListChar: getListChair,
			});
		}
	}

	function onCreateOrUpdate(item: ChairCar) {
		setSelected(item);
		setShowForm(true);
	}

	function onCloseForm() {
		setShowForm(false);
	}

	function onSave(item: ChairCar) {
		chairCarController.create(item).then((res) => {
			setEventReload(!eventReload);
			setShowForm(false);
		});
	}

	function onDelete() {
		chairCarController.delete(selected._id || "").then((res) => {
			setEventReload(!eventReload);
		});
		setShowConfirm(false);
	}

	function onCancelAutoCreate(){
		setShowFormAutoCreate(false);
		
		
	}

	function onAutoCreate(data : CreateChairCar ){
		chairCarController.autoCreate({
			...data,
			carId : props.Car._id
		}).then(res=>{
			setShowFormAutoCreate(false);
			setEventReload(!eventReload);

		})
	}

	useEffect(() => {
		setShowFormAutoCreate(false);
		setDiagramChair({ dataListChar: [] });
		if (props.open) {
			chairCarController.getByCarId(props.Car._id || "").then((res) => {
				setDiagramChair(res);
				if (res.dataListChar?.length === 0) {
					setShowFormAutoCreate(true);
				} else setShowFormAutoCreate(false);
			});
		}
	}, [props.open, eventReload]);

	return (
		<div>
			<PopUpEditChairCar
				isDisplay={showForm}
				onCancel={onCloseForm}
				obj={selected}
				onSave={onSave}
			/>
			<PopUpAutoCreateChair
				onCancel ={onCancelAutoCreate}
				onSave = {onAutoCreate}
				isDisplay = {showFormAutoCreate}
				titlePopup = {"Bạn cần tạo ghế cho xe"}
			></PopUpAutoCreateChair>
			<Dialog
				open={props.open}
				onClose={props.onClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				maxWidth={false}
			>
				<DialogTitle id="alert-dialog-title">
					Sơ đồ ghế của xe {props.Car.name}
				</DialogTitle>
				<DialogContent>
					{diagramChair.dataListChar?.length !==0 ? (
						<DiagramChair
							onEdit={onCreateOrUpdate}
							listChairDiagram={diagramChair}
							onAddRows={onAddRows}
						></DiagramChair>
					) : (
						<Grid>
							<CircularProgress />
						</Grid>
					)}
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
