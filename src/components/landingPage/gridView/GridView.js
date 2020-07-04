import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Pagination from "@material-ui/lab/Pagination";
import EmailIcon from "@material-ui/icons/Email";
import SkeltonView from "../loadingView/loadingView";

const dummyArray = [1, 2, 3, 4, 5, 6];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(1),
    },

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    "&:hover": {
      background: "#E0E0E0",
      zIndex: 10,
      color: "black",
      transition: ["all 3.5s ease", "padding 0.8s linear"],
      transform: "translate3d(0,0,0)",
      cursor: " pointer",
    },
  },
}));

export default function NestedGrid(props) {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [layout, setLayout] = useState(4);
  const classes = useStyles();

  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });

  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    if (window.innerWidth < 750) {
      setLayout(12);
    } else {
      setLayout(4);
    }
  };

  function FormRow(user) {
    return (
      <React.Fragment>
        <Grid item xs={layout}>
          <Paper className={classes.paper}>
            <Avatar alt="Remy Sharp" src={user.avatar} style={styles.img} />
            <span style={styles.name}>
              {user.first_name} {user.last_name}
            </span>
            <span style={styles.email}>
              <EmailIcon /> {user.email}
            </span>
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3} style={{ justifyContent: "center" }}>
        <Grid container item xs={12} spacing={3}>
          {props.data && props.data.map((user, index) => <FormRow {...user} />)}
        </Grid>
        <Grid>
          <SkeltonView />
        </Grid>
      </Grid>
      <Pagination
        count={props.totalPage}
        page={props.page}
        shape="rounded"
        size="large"
        onChange={(e, value) => props.handlePagination(value)}
      />
    </div>
  );
}

const styles = {
  img: {
    height: "90px",
    width: "90px",
  },
  name: { fontSize: "22px", margin: "5px" },
  email: { display: "flex", alignItems: "center" },
};
