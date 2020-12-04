import { Button, Typography } from "@material-ui/core";
import React from "react";
import { BaseModel } from "../base-ticket-team/query/BaseModel";

export class ActionHelper {
  public static getActionDelete<T extends BaseModel>(
    item: T,
    onDelete: (id: string) => void
  ): React.ReactElement {
    return (
      <Button
        color="inherit"
        size="small"
        variant="contained"
        onClick={() => onDelete(item._id || "")}
      >
        {/* <DeleteIcon /> */}
        <Typography variant="h6">Xóa</Typography>
      </Button>
    );
  }

  public static getActionUpdate<T extends BaseModel>(
    item: T,
    createOrEdit: (id: T) => void
  ): React.ReactElement {
    return (
      <Button
        color="inherit"
        size="small"
        variant="contained"
        onClick={() => createOrEdit(item)}
      >
        {/* <DeleteIcon /> */}
        <Typography variant="h6">Edit</Typography>
      </Button>
    );
  }
}
