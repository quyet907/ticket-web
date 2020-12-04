import { yellow } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export const useGlobalStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(12),
  },
  highlightSearchText: {
    background: "yellow",
  },
  content: {
    minHeight: "100vh",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  borderLeft: {
    borderLeft: "1px solid",
    borderColor: theme.palette.grey[100],
  },

  contentItem: {
    padding: theme.spacing(3),
    border: theme.spacing(1),
    borderWidth: "1px",
    borderColor: theme.palette.grey[100],
    borderStyle: "solid",
    borderRadius: theme.spacing(1),
  },

  buttonAlert: {
    color: "#fff",
    backgroundColor: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
      borderColor: theme.palette.error.dark,
    },
  },
  iconButtonAlert: {
    color: theme.palette.error.main,
    // "&:hover": {
    //     color: theme.palette.error.dark,
    // }
    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.error.main,
      borderColor: theme.palette.error.main,
      border: "1px solid",
    },
  },
  mb1: {
    marginBottom: theme.spacing(1),
  },
  mb2: {
    marginBottom: theme.spacing(2),
  },
  mb3: {
    marginBottom: theme.spacing(3),
  },
  mb4: {
    marginBottom: theme.spacing(4),
  },
  mb5: {
    marginBottom: theme.spacing(5),
  },
  mb6: {
    marginBottom: theme.spacing(6),
  },
  mb7: {
    marginBottom: theme.spacing(7),
  },
  mb8: {
    marginBottom: theme.spacing(8),
  },
  mr1: {
    marginRight: theme.spacing(1),
  },
  mr2: {
    marginRight: theme.spacing(2),
  },
  mr3: {
    marginRight: theme.spacing(3),
  },
  mr4: {
    marginRight: theme.spacing(4),
  },
  mr5: {
    marginRight: theme.spacing(5),
  },
  mt1: {
    marginTop: theme.spacing(1),
  },
  mt2: {
    marginTop: theme.spacing(2),
  },
  mt3: {
    marginTop: theme.spacing(3),
  },
  mt4: {
    marginTop: theme.spacing(4),
  },
  mt5: {
    marginTop: theme.spacing(5),
  },
  mt6: {
    marginTop: theme.spacing(5),
  },
  mt7: {
    marginTop: theme.spacing(5),
  },
  mt8: {
    marginTop: theme.spacing(5),
  },
  ml1: {
    marginLeft: theme.spacing(1),
  },
  ml2: {
    marginLeft: theme.spacing(2),
  },
  ml3: {
    marginLeft: theme.spacing(3),
  },
  ml4: {
    marginLeft: theme.spacing(4),
  },
  ml5: {
    marginLeft: theme.spacing(5),
  },
  pb1: {
    paddingBottom: theme.spacing(1),
  },
  pb2: {
    paddingBottom: theme.spacing(2),
  },
  pb3: {
    paddingBottom: theme.spacing(3),
  },
  pb4: {
    paddingBottom: theme.spacing(4),
  },
  pb5: {
    paddingBottom: theme.spacing(5),
  },
  pb6: {
    paddingBottom: theme.spacing(6),
  },
  pb7: {
    paddingBottom: theme.spacing(7),
  },
  pb8: {
    paddingBottom: theme.spacing(8),
  },

  pr1: {
    paddingRight: theme.spacing(1),
  },
  pr2: {
    paddingRight: theme.spacing(2),
  },
  pr3: {
    paddingRight: theme.spacing(3),
  },
  pr4: {
    paddingRight: theme.spacing(4),
  },
  pr5: {
    paddingRight: theme.spacing(5),
  },
  pt1: {
    paddingTop: theme.spacing(1),
  },
  pt2: {
    paddingTop: theme.spacing(2),
  },
  pt3: {
    paddingTop: theme.spacing(3),
  },
  pt4: {
    paddingTop: theme.spacing(4),
  },
  pt5: {
    paddingTop: theme.spacing(5),
  },
  pl1: {
    paddingLeft: theme.spacing(1),
  },
  pl2: {
    paddingLeft: theme.spacing(2),
  },
  pl3: {
    paddingLeft: theme.spacing(3),
  },
  pl4: {
    paddingLeft: theme.spacing(4),
  },
  pl5: {
    paddingLeft: theme.spacing(5),
  },
}));
