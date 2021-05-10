import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Container, Typography } from "@material-ui/core";

import { updatePageTitle } from "../../components/Navigation/navigationSlice";
import { getCustomPage } from "../../components/CustomPage/customPageSlice";

import { useStyles } from "./styles";

export function CustomPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { page } = useParams();
  let currentPage = useSelector((state) => state.customPage.pages[page]);

  if (!currentPage) {
    dispatch(getCustomPage(page));
  }

  useEffect(() => {
    currentPage && dispatch(updatePageTitle(currentPage.title));
  }, [dispatch, currentPage]);

  return currentPage ? (
    <Container maxWidth="sm" className={classes.offset}>
      <Typography
        dangerouslySetInnerHTML={{ __html: currentPage.content }}
        component="div"
      />
    </Container>
  ) : (
    <Container maxWidth="sm" className={classes.offset}>
      <h1 style={{ textAlign: "center" }}>
        <span
          aria-label="Diamond"
          role="img"
          style={{ fontSize: "80px", display: "block", textAlign: "center" }}
        >
          😿
        </span>
      </h1>
      <Typography variant="h6" component="h1">
        404 not found
      </Typography>
    </Container>
  );
}
