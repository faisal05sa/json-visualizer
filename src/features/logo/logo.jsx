import React from "react";
import * as css from "./logo.module.css";

function MyLogo() {
  return (
    <span className={css.logoFont}>
      <span className={css.openingCurly}>&#123;</span>
      <span className={css.semiColon}>;</span>
      <span className={css.closingCurly}>&#125;</span>
    </span>
  );
}

export default MyLogo;
