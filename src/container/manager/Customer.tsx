import React, { useEffect, useState } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import SearchAndAdd from "../../components/genaral-component/SearchAndAdd";
import { customerController } from "../../service";
import { ActionHelper } from "../../comon/ActionHelper";
import BaseDialogs from "../../components/dialogs/PopUpEditPositionStaff";
import { IList } from "../../submodules/base-ticket-team/query/IList";
import { Paging } from "../../submodules/base-ticket-team/query/Paging";
import { Customer } from "../../submodules/base-ticket-team/base-carOwner/Customer";
import moment from "moment";
import BaseTable, { IBaseTable } from "../../components/genaral-component/BaseTable";
import PopUpConfirm from "../../components/dialogs/DialogConfirm";

// import Page from 'src/components/Page';

export default function Customers() {
  const [object, setObject] = useState<Paging<Customer>>({
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
  const [selected, setSelected] = useState<Customer>({} as Customer);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  function onCreateOrUpdate(position: Customer) {
    setSelected(position);
    setShowForm(true);
  }

  function onCloseForm() {
    setShowForm(false);
  }

  function onSave(customer: Customer) {
    customerController.create(customer).then(() => {
      setQuery({ ...query });
      setShowForm(false);
    });
  }

  function onDelete() {
    customerController.delete(selected._id|| "").then(() => {
      setQuery({ ...query });
    });
    setShowConfirm(false)
  }

  function onQuery(query: IList) {
    setQuery(query);
  }

  function onSearch(search: string) {
    setQuery({ ...query, search: search });
  }

  function onConfirm(item : Customer){
    setSelected(item);
    setShowConfirm(true)
	}

  function onCancelConfirm(){
		setShowConfirm(false)
	}

  useEffect(() => {
    customerController.list(query).then((res: Paging<Customer>) => {
      setObject(res);
    });
  }, [query]);

  function convertDataToTable(data: Customer[]): IBaseTable<Customer> {
    const createValue = data.map((item: Customer) => {
      var value: any[] = [];
      value.push(item.name || "");
      value.push(moment(item.birthAt).format("l"));
      value.push(item.description || "");
      value.push(
        ActionHelper.getActionUpdateAndDelete(item, onCreateOrUpdate, onConfirm)
      );
      return value;
    });

    const getTable: IBaseTable<Customer> = {
      header: [
        { id: "name", label: "Họ tên" },
        { id: "birthAt", label: "Ngày sinh" },
        { id: "description", label: "Mô tả" },
        { id: "", label: "Thao tác" },
      ],
      paging: { ...object, rows: [] },
      value: createValue,
    };
    return getTable;
  }

  return (
    // <Page className={classes.root} title="Customers">
    <Container maxWidth={false}>
      <PopUpConfirm
			isDisplay = {showConfirm}
			onCancel ={onCancelConfirm}
			onDelete = {onDelete}
			/>

      <BaseDialogs
        obj={selected}
        onSave={onSave}
        onCancel={onCloseForm}
        isDisplay={showForm}
      ></BaseDialogs>

      <SearchAndAdd<Customer> onCreate={onCreateOrUpdate} onSearch={onSearch} />

      <Box mt={3}>
        <BaseTable
          data={object}
          query={query}
          onQuery={onQuery}
          iTable={convertDataToTable}
        ></BaseTable>
      </Box>
    </Container>
    // </Page>
  );
}
