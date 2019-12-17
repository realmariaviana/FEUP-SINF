import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import TableMapping from "components/Table/TableMapping.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Modal from '@material-ui/core/Modal';
import CustomInput from "components/CustomInput/CustomInput.js";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CardFooter from "components/Card/CardFooter.js";
import MapButton from "components/CustomButtons/MapButton.js";
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
  const [data, setData] = useState();
  const [selected1, setSelected1] = useState();
  const [selected2, setSelected2] = useState();

  useEffect(() => {
    fetch('/api/companies/company_itens')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
      });
  }, []);


  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [org] = React.useState('');

  const handleClick = () => {
    fetch('/api/companies/map', { method: 'POST',
                                  headers: {
                                            "Content-Type": "application/json",
                                            "Accept": "application/json",
                                            "product1": selected1,
                                            "product2": selected2
                                          },
                                  mode: 'cors',
                                  cache: 'default'
    })
      .then(response => response.json())
      .then(data => {
        console.log("data");
        console.log(data);
      });
  };

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

      <Button onClick={handleClick} /*tenant={tenant} tenant2={tenant2} */ color="info">
        Map Products
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
               value={org}
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
        {data ? (<Card>
          <CardHeader color="info">
            <p className={classes.cardCategoryWhite}>
             SINFtech Product Mapping
            </p>
          </CardHeader>
          <CardBody>
            <TableMapping
              setSelected={setSelected1}
              selected={selected1}
              tableHeaderColor="black"
              tableHead={["ID", "Description", "Type"]}
              tableData={
                data[0]
              }
            />
    
          </CardBody>
        </Card>) : ''}
        </GridItem>

        <h3>	&#60; = &#62;</h3>

        <GridItem xs={12} sm={6} md={5}>
        {data ? (<Card>
          <CardHeader color="info">
            <p className={classes.cardCategoryWhite}>
             SINFrent Product Mapping
            </p>
          </CardHeader>
          <CardBody>
            <TableMapping
              setSelected={setSelected2}
              selected={selected2}
              tableHeaderColor="black"
              tableHead={["ID" ,"Description", "Type"]}
              tableData={
                data[1]
              }
            />
          </CardBody>
        </Card>) : ''}
      </GridItem>
      </GridContainer>
    </div>
  );
}
