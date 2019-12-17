import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Modal from '@material-ui/core/Modal';
import CustomInput from "components/CustomInput/CustomInput.js";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function MasterData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/companies/company_itens')
      .then(response => response.json())
      .then(dataa => {
        console.log(dataa);
        setData(dataa);
      });

  }, []);

  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    return (
    <div>
      <Button type="button" style={{backgroundColor:'green'}} onClick={handleOpen}>
       + New Product
      </Button>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h4 id="simple-modal-title">Create a New Product</h4>

          <FormControl variant="outlined" className={classes.formControl} style={{paddingRight:'2rem'}}>
            Organization
            <Select
              style={{width: 100}}
            >
              <MenuItem value={1}>SINFtech</MenuItem>
              <MenuItem value={2}>SINFrent</MenuItem>
            </Select>
          </FormControl>

          <CustomInput
                    labelText="Product ID"
                    id="id"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
          <CustomInput
                    labelText="Product Name"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />

            <CardFooter >
              <Button  color="info">Save</Button>
            </CardFooter>
        </div>
      </Modal>

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
