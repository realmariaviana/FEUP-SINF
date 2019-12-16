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

const styles = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

const TypographyPage = () => {

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
              tableHeaderColor="primary"
              tableHead={["ID", "DRESCRIPTION", "TIMESTAMP"]}
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

export default TypographyPage