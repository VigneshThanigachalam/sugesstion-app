import React from "react";

export const Container = (props) => {
  return (
    <section className={props.class1}>
      <div className={`container-xxl ${props.class2}`}>{props.children}</div>
    </section>
  );
};
