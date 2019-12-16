import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Divider from "@material-ui/core/Divider";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function MasterData() {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={6} md={5}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardCategoryWhite}>
             SINFtech Product Mapping
            </h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Description"]}
              tableData={[
                ["22","Dakota Rice"],
                ["43","Minerva Hooper"],
                ["45", "Sage Rodriguez"],
                ["4567","Philip Chaney"],
                ["568", "Doris Greene"],
                ["567 ","Mason Porter"]
              ]}
            />
          </CardBody>
        </Card>
        </GridItem>

        <h1>	&#60; = &#62;</h1>

        <GridItem xs={12} sm={6} md={5}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardCategoryWhite}>
             SINFrent Product Mapping
            </h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID" ,"Description"]}
              tableData={[
                ["27","Niger"],
                ["49","CURACAO"],
                ["23", "Netherlands"],
                ["4322","South"],
                ["789", "Malawi"],
                ["498 ","Portugal"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>

      <Divider middle />

      <GridItem xs={12} sm={12} md={5}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardCategoryWhite}>
             Company Mapping
            </h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Costumer ID", "Costumer Name"]}
              tableData={[
                ["22","Dakota Rice"],
                ["43","Minerva Hooper"],
                ["45", "Sage Rodriguez"],
                ["4567","Philip Chaney"],
                ["568", "Doris Greene"],
                ["567 ","Mason Porter"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
      <h1>	&#60; = &#62;</h1>
      <GridItem xs={12} sm={12} md={5}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardCategoryWhite}>
             Company Mapping
            </h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Supplier ID", "Supplier Name"]}
              tableData={[
                ["345" ,"Niger"],
                ["433", "Curaçao"],
                ["567", "Netherlands"],
                ["4567","Philip Chaney"],
                ["568", "Doris Greene"],
                ["567 ","Mason Porter"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
