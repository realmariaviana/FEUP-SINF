import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import SettingsButton from "components/CustomButtons/SettingsButton.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

const styles = {
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

export default function Settings() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer class="col align-self-center">
        <GridItem md={8}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Edit Company</h4>
            </CardHeader>
            <CardBody  >
              
              <GridContainer class="col align-self-center">
                <GridItem >
                  <CustomInput
                    labelText="grant_type"
                    id="grant_type"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer class="col align-self-center">
                <GridItem>
                  <CustomInput
                    labelText="client_id"
                    id="client_id"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer class="col align-self-center">
                <GridItem>
                  <CustomInput
                    labelText="client_secret"
                    id="client_secret"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer class="col align-self-center">
                <GridItem >
                  <CustomInput
                    labelText="scope"
                    id="scope"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>

            </CardBody>
            <CardFooter >
              <SettingsButton  color="info"></SettingsButton>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
