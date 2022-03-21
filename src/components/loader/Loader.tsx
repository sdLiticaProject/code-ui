import React, { FunctionComponent } from "react";
import styles from "./Loader.module.css";

export const Loader: FunctionComponent = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}>
        <div className={styles.loaderBar} />
        <div className={styles.loaderBar} />
        <div className={styles.loaderBar} />
        <div className={styles.loaderBar} />
        <div className={styles.loaderBar} />
        <div className={styles.loaderBall} />
      </div>
    </div>
  );
};
