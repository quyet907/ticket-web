import { Grid, IconButton } from "@material-ui/core";
import { DeleteRounded, EditRounded } from "@material-ui/icons";
import React from "react";
import EventSeatIcon from '@material-ui/icons/EventSeat';
import { BaseModel } from "../submodules/base-ticket-team/query/BaseModel";

export class ActionHelper {
  public static getActionDelete<T extends BaseModel>(
    item: T,
    onDelete: (item: T) => void
  ): React.ReactElement {
    return (
      <IconButton
        onClick={() => onDelete(item)}
      >
        <DeleteRounded fontSize="small"/>
      </IconButton>
    );
  }

  public static getActionUpdate<T extends BaseModel>(
    item: T,
    createOrEdit: (id: T) => void
  ): React.ReactElement {
    return (
      <IconButton
        onClick={() => createOrEdit(item)}
      >
        <EditRounded fontSize="small"/>
      </IconButton>
    );
  }

  public static getActionUpdateAndDelete<T extends BaseModel>(
    item: T,
    createOrEdit: (item: T) => void,
    Delete: (item: T) => void
  ): React.ReactElement {
    return (
      <Grid>
        {ActionHelper.getActionUpdate<T>(item , createOrEdit)}
        {ActionHelper.getActionDelete<T>(item , Delete)}
      </Grid>
    );
  }

  public static getAllActionForCar<T extends BaseModel>(
    item: T,
    createOrEdit: (id: T) => void,
    Delete: (item : T) => void,
    OpenChair:(item :T)=> void,
  ): React.ReactElement {
    return (
      <Grid>
        {ActionHelper.getActionUpdate<T>(item , createOrEdit)}
        {ActionHelper.getActionDelete<T>(item , Delete)}
        <IconButton
        onClick={() => OpenChair(item)}
      >
        <EventSeatIcon fontSize="small"/>
      </IconButton>
      </Grid>
    );
  }
  


}
