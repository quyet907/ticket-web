import React, { useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
}));

type Props<T> = {
  className?: string;
  onCreate(object: T): void;
  onSearch(search: string): void;
};

function SearchAndAdd<T> (props: Props<T>) {
  const classes = useStyles();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearch = useCallback(
    _.debounce((search: string) => {
      props.onSearch(search);
    }, 300),
    []
  );

  return (
    <div className={clsx(classes.root, props.className)}>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search customer"
                variant="outlined"
                onChange={(e) => {
                  onSearch(e.target.value);
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box mt={3} display="flex" justifyContent="flex-end">
        <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton}>Export</Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => props.onCreate({}as T)}
        >
          Thêm mới
        </Button>
      </Box>
    </div>
  );
};

export default SearchAndAdd;
