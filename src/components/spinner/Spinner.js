import React from "react"
import styles from "../../styles/Spinner.module.scss"

class ComponentSpinner extends React.Component {
  render() {
    return (
      <div className={styles.fallbackLogo}>
        <div className={`${styles.loading} ${styles.componentLoader}`}>
          <div className={`${styles.effect1} ${styles.effects}`}></div>
          <div className={`${styles.effect2} ${styles.effects}`}></div>
          <div className={`${styles.effect3} ${styles.effects}`}></div>
        </div>
      </div>
    )
  }
}

export default ComponentSpinner