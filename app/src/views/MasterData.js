import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
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

export default function MasterData() {
  const classes = useStyles();
  return (
    <div>
    <GridContainer>
      <GridItem xs={12} sm={6} md={5}>
        <Card>
          <CardHeader color="info">
            <p className={classes.cardCategoryWhite}>
             SINFtech Product Mapping
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="black"
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

        <h3>	&#60; = &#62;</h3>

        <GridItem xs={12} sm={6} md={5}>
        <Card>
          <CardHeader color="info">
            <p className={classes.cardCategoryWhite}>
             SINFrent Product Mapping
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="black"
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
      </GridContainer>



      <GridContainer>
      <GridItem xs={12} sm={12} md={5}>
        <Card>
          <CardHeader color="info">
            <p className={classes.cardCategoryWhite}>
             Company Mapping
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="black"
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
      <h3>	&#60; = &#62;</h3>
      <GridItem xs={12} sm={12} md={5}>
        <Card>
          <CardHeader color="info">
            <p className={classes.cardCategoryWhite}>
             Company Mapping
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="black"
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
    </div>
  );
}
