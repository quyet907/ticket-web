import { Button, Grid, IconButton, Typography } from "@material-ui/core";
import { Delete, DeleteRounded, Edit, EditRounded, Save } from "@material-ui/icons";
import React from "react";
import { BaseModel } from "../submodules/base-ticket-team/query/BaseModel";

export class ActionHelper {
  public static getActionDelete<T extends BaseModel>(
    item: T,
    onDelete: (id: string) => void
  ): React.ReactElement {
    return (
      <IconButton
        // size="small"
        onClick={() => onDelete(item._id || "")}
      >
        <DeleteRounded fontSize="small"/>
        {/* <Typography variant="h6">Xóa</Typography> */}
      </IconButton>
    );
  }

  public static getActionUpdate<T extends BaseModel>(
    item: T,
    createOrEdit: (id: T) => void
  ): React.ReactElement {
    return (
      <IconButton
        // size="small"
        onClick={() => createOrEdit(item)}
      >
        <EditRounded fontSize="small"/>
        {/* <Typography variant="h6">Edit</Typography> */}
      </IconButton>
    );
  }

  public static getActionUpdateAndDelete<T extends BaseModel>(
    item: T,
    createOrEdit: (id: T) => void,
    Delete: (id: string) => void
  ): React.ReactElement {
    return (
      <Grid>
        {ActionHelper.getActionUpdate<T>(item , createOrEdit)}
        {ActionHelper.getActionDelete<T>(item , Delete)}
      </Grid>
    );
  }


}
