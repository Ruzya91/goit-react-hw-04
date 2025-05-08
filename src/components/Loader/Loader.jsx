import React from "react";
import { Puff } from "react-loader-spinner";
import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.loader}>
      <Puff height={60} width={60} ariaLabel="loading" />
    </div>
  );
}

export default Loader;
