import React, {useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
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
  const [tenant, setTenant] = useState("");
  const [organization, setOrganization] = useState("");

  console.log(setOrganization);

  const classes = useStyles();
  return (
    <div>
      <GridContainer class="col align-self-center">
        <GridItem md={8}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Edit Company</h4>
            </CardHeader>
            <CardBody  id="inputs">
              
              <GridContainer class="col align-self-center">
                <GridItem >
                  <CustomInput
                    labelText="tenant"
                    id="tenant"
                    formControlProps={{
                      fullWidth: true
                    }}
                    updateLocalState={(t) => setTenant(t)}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer class="col align-self-center">
                <GridItem >
                  <CustomInput
                    labelText="organization"
                    id="organization"
                    formControlProps={{
                      fullWidth: true
                    }}
                    updateLocalState={(o) => setOrganization(o)}
                  />
                </GridItem>
              </GridContainer>

            </CardBody>
            <CardFooter >
              <SettingsButton tenant={tenant} organization={organization} color="info">Save</SettingsButton>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
