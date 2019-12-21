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
  const [tenant2, setTenant2] = useState("");
  const [organization, setOrganization] = useState("");
  const [organization2, setOrganization2] = useState("");


  const classes = useStyles();
  return (
    <div>
      <GridContainer className="col align-self-center">
        <GridItem md={8}>
          <Card>
            <CardHeader color="info">
              <p className={classes.cardTitleWhite}>Edit Company</p>
            </CardHeader>
            <CardBody  id="inputs">
              
              <GridContainer className="row">

                <GridItem xs={6} md={6} >
                  <CustomInput
                    labelText="tenant"
                    id="tenant"
                    formControlProps={{
                      fullWidth: true
                    }}
                    updateLocalState={(t) => setTenant(t)}
                  />
                </GridItem>

                <GridItem xs={6} md={6}>
                  <CustomInput
                    labelText="tenant2"
                    id="tenant2"
                    formControlProps={{
                      fullWidth: true
                    }}
                    updateLocalState={(t2) => setTenant2(t2)}
                  />
                </GridItem>

              </GridContainer>

              <GridContainer className="col align-self-center">

              <GridItem xs={6} md={6}>
                  <CustomInput
                    labelText="organization"
                    id="organization"
                    formControlProps={{
                      fullWidth: true
                    }}
                    updateLocalState={(o) => setOrganization(o)}
                  />
                </GridItem>

                <GridItem xs={6} md={6}>
                  <CustomInput
                    labelText="organization2"
                    id="organization2"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={tenant}
                    updateLocalState={(o2) => setOrganization2(o2)}
                  />
                </GridItem>
                
              </GridContainer>

            </CardBody>
            <CardFooter >
              <SettingsButton tenant={tenant} organization={organization} tenant2={tenant2} organization2={organization2} color="info">Save</SettingsButton>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
