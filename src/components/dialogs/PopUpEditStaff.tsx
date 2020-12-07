import { Dialog, DialogContent, Grid, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import { Staff } from "../../submodules/base-ticket-team/base-carOwner/Staff";
import { BaseDialogActions, BaseDialogTitle } from "./BaseDialogs";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ErrorValidate, ValidateHelper } from "../../helper/ValidateHelper";
import { isError } from "@deckchair-technicians/vice";

interface Props {
  titlePopup?: string;
  obj: Staff;
  onSave(item: Staff): void;
  isDisplay: boolean;
  onCancel(): void;
}

export default function PopUpEditStaff(props: Props) {
  const globalStyles = useGlobalStyles();
  const { isDisplay, onCancel, titlePopup } = props;
  const [data, setData] = useState<Staff>({} as Staff);
  const [error, setError] = useState<ErrorValidate<Staff>[]>([])

  function onSave(obj : Staff){
    // const getErr =  ValidateHelper.validateTechnicians<Staff>(Staff,obj);
    // if(getErr){
    //   setError(getErr|| []);
    // }
    //  props.onSave(data)
  }

  useEffect(() => {
    setData(props.obj);
  }, [props.obj]);

  return (
    <Dialog open={isDisplay} fullWidth maxWidth="xs">
      <BaseDialogTitle title={titlePopup || "Them"} onCancel={onCancel} />
      <DialogContent>
        <Grid container xs={12} direction="column" className={globalStyles.mt1}>
          <Grid className={globalStyles.mb3} item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label={"Ho ten"}
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              helperText = {ValidateHelper.getMessenger<Staff>("name",error)}
              error = {ValidateHelper.isError<Staff>("name", error)}
            />
          </Grid>
          <Grid className={globalStyles.mb3} item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label={"So dien thoai"}
              value={data.phoneNumber}
              onChange={(e) =>
                setData({ ...data, phoneNumber: e.target.value })
              }
              helperText = {ValidateHelper.getMessenger<Staff>("phoneNumber",error)}
              error = {ValidateHelper.isError<Staff>("phoneNumber", error)}
            />
          </Grid>
          <Grid className={globalStyles.mb3} item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label={"CMND"}
              value={data.identityCard}
              onChange={(e) =>
                setData({ ...data, identityCard: e.target.value })
              }
            />
          </Grid>
          <Grid className={globalStyles.mb3} item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label={"Dia chi"}
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
            />
          </Grid>
          <Grid className={globalStyles.mb3} item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label={"Ngay sinh"}
              type="date"
              value={data.birthAt}
              onChange={(e) =>
                setData({ ...data, birthAt: new Date(e.target.value) })
              }
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid className={globalStyles.mb3} item xs={12}>
            <Autocomplete
              fullWidth
              options={[
                { title: "The Shawshank Redemption", year: 1994 },
                { title: "The Godfather", year: 1972 },
              ]}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField {...params} label="Chuc vu" variant="outlined" />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <BaseDialogActions onCancel={onCancel} onSave={() => onSave(data)} />
    </Dialog>
  );
}
