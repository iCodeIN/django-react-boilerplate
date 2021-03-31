import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Typography } from "@material-ui/core";

import { navigation } from "../../components/Navigation/constants";
import { updatePageTitle } from "../../components/Navigation/navigationSlice";
import { useStyles } from "./styles";

export function Error404Page() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updatePageTitle(navigation.Error.title));
  });

  return (
    <Container maxWidth="sm" className={classes.offset}>
      <h1 style={{ textAlign: "center" }}>
        <span
          aria-label="Diamond"
          role="img"
          style={{ fontSize: "80px", display: "block", textAlign: "center" }}
        >
          🙀
        </span>
      </h1>
      <Typography variant="h6" component="h1">
        {navigation.Error.title}
      </Typography>
    </Container>
  );
}
