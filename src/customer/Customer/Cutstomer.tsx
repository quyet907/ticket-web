import React, { useEffect, useState } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import Results from "./Results";
import SearchAndAdd from "./SearchAndAdd";
import AddOrEditDialog from "../../components/dialogs/AddOrEditDialog";
import { positionStaffController } from "../../service";
import { PositionStaff } from "../../base-ticket-team/base-carOwner/PositionStaff";
import { IList } from "../../base-ticket-team/query/IList";
import { object } from "yup";
import { Paging } from "../../base-ticket-team/query/Paging";
// import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		minHeight: "100%",
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
}));



export default function PositionStaffContainer() {
  const [object, setObject] = useState<Paging<PositionStaff>>({
    page: 1,
    pageSize: 5,
    rows: [],
    total: 0,
    totalPages: 0,
  });
  const [query, setQuery] = useState<IList>({
    page: 1,
    pageSize: 5,
    search: "",
    // sort : ["-createAt"]
  });
  const [selected, setSelected] = useState<PositionStaff>({});
  const [showForm, setShowForm] = useState<boolean>(false);

  function onCreateOrUpdate(position: PositionStaff) {
    setSelected(position);
    setShowForm(true);
  }

  function onCloseForm() {
    setShowForm(false);
  }

  function onSave(position: PositionStaff) {
    positionStaffController.create(position).then((res) => {
      setQuery({ ...query });
      setShowForm(false);
    });
  }

  function onDelete(id: string) {
    positionStaffController.delete(id).then((res) => {
      setQuery({ ...query });
    });
  }

  function onQuery(query: IList) {
    setQuery({ ...query });
  }

  function onSearch(search: string) {
    setQuery({ ...query, search: search });
  }

// 	function onFilter(nameField: string, type: "up" | "down") {
// 		var sort: string[] = query.sort || [];
// 
// 		if (type === "up") {
// 			sort.push(nameField);
// 		}
// 		if (type === "down") {
// 			sort.push(`-${nameField}`);
// 		}
// 		setQuery({ ...query, sort });
// 	}

    function onFilter(nameField: string, type: "up" | "down") {
      var sort: string[] = query.sort || [];

      if (type === "up") {
        sort.push(nameField);
      }
      if (type === "down") {
        sort.push(`-${nameField}`);
      }
      setQuery({ ...query, sort });
    }

    return (
      // <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <AddOrEditDialog
          data={selected}
          onSave={onSave}
          onClose={onCloseForm}
          isDisplay={showForm}
        ></AddOrEditDialog>

        <SearchAndAdd<PositionStaff>
          onCreate={onCreateOrUpdate}
          onSearch={onSearch}
        />
        <Box mt={3}>
          <Results
            position={object}
            query={query}
            onCreateOrUpdate={onCreateOrUpdate}
            onDelete={onDelete}
            onQuery={onQuery}
          />
        </Box>
      </Container>
      // </Page>
    );
  }

