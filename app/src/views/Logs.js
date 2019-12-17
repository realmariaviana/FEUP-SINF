import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import '../assets/css/material-dashboard-react.css';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "100",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
    
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  }
};

const useStyles = makeStyles(styles);

const Logs = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/logs/logs')
      .then(response => response.json())
      .then(dataa => {
        console.log(dataa);
        setData(dataa);
      });

  }, []);
  const classes = useStyles();


  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        {data ? (<Card>
          <CardHeader color="info">
            <p className={classes.cardCategoryWhite}>
              Mapeamento de Produtos
              </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="black"
              tableHead={["CompanyID", "DESCRIPTION", "TIMESTAMP"]}
              tableData={
                data
              }
            />
          </CardBody>
        </Card>) : ''} 
      </GridItem>
    </GridContainer>
  );
}

export default Logs