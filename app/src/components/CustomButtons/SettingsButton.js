import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import styles from "assets/jss/material-dashboard-react/components/buttonStyle.js";

const useStyles = makeStyles(styles);

export default function SettingsButton(props) {
  const classes = useStyles();
  const {
    color,
    round,
    children,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    muiClasses,
    tenant,
    organization,
    tenant2,
    organization2,
    ...rest
  } = props;

  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className
  });

  function handleButton() {
      console.log("BUTTON CLICKED");

      console.log(tenant);
      console.log(organization);

      console.log(tenant2);
      console.log(organization2);
      
      var myInit = { method: 'POST',
                     headers: { tenant: tenant,
                                organization: organization,
                                tenant2: tenant2,
                                organization2: organization2
                              },
                     mode: 'cors',
                     cache: 'default' };
                     
      fetch('/api/companies/company', myInit)
      .then(response => response.json())
      .then(data=>{
          console.log("Data received from /api/companies/company");
          console.log(data)
      })
  };

  return (
    <Button {...rest} onClick={handleButton} classes={muiClasses} className={btnClasses}>
      {children}
    </Button>
  );
}

SettingsButton.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
    "white",
    "transparent"
  ]),
  size: PropTypes.oneOf(["sm", "lg"]),
  simple: PropTypes.bool,
  round: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  link: PropTypes.bool,
  justIcon: PropTypes.bool,
  className: PropTypes.string,
  // use this to pass the classes props from Material-UI
  muiClasses: PropTypes.object,
  children: PropTypes.node
};
