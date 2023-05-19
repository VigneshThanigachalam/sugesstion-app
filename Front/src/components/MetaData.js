import React from "react";
import { Helmet } from "react-helmet";

export const MetaData = (props) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{props.title}</title>
    </Helmet>
  );
};
