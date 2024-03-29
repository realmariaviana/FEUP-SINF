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
import { element } from "prop-types";

function getModalStyle() {
  const top = 50;
  const left = 50;

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
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function MasterData() {
  const [data, setData] = useState();
  const [selected1, setSelected1] = useState();
  const [selected2, setSelected2] = useState();
  const [selected3, setSelected3] = useState();
  const [selected4, setSelected4] = useState();

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

  const handleClickUp = () => {
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

  const handleClickDown = () => {
    fetch('/api/companies/map', { method: 'POST',
                                  headers: {
                                            "Content-Type": "application/json",
                                            "Accept": "application/json",
                                            "product1": selected4,
                                            "product2": selected3
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
    return (
    <div>

      <Button onClick={handleClickUp} /*tenant={tenant} tenant2={tenant2} */ color="info">
        Map Products
      </Button>

    <GridContainer>
      <GridItem xs={12} sm={6} md={5}>
        {data ? (
        <Card>
          <CardHeader color="info">
            <p className={classes.cardCategoryWhite}>
             {data[0]} Product Mapping
            </p>
          </CardHeader>
          <CardBody>
            <TableMapping
              setSelected={setSelected1}
              selected={selected1}
              tableHeaderColor="black"
              tableHead={["", "ID", "Description", "Type"]}
              tableData={
                data[1][0]
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
             {data[2]} Product Mapping
            </p>
          </CardHeader>
          <CardBody>
            <TableMapping
              setSelected={setSelected2}
              selected={selected2}
              tableHeaderColor="black"
              tableHead={["", "ID" ,"Description", "Type"]}
              tableData={
                data[3][1]
              }
            />
          </CardBody>
        </Card>) : ''}
      </GridItem>
      </GridContainer>

      <Button onClick={handleClickDown} /*tenant={tenant} tenant2={tenant2} */ color="info">
        Map Products
      </Button>

      <GridContainer>
      <GridItem xs={12} sm={6} md={5}>
        {data ? (<Card>
          <CardHeader color="info">
            <p className={classes.cardCategoryWhite}>
             {data[0]} Product Mapping
            </p>
          </CardHeader>
          <CardBody>
            <TableMapping
              setSelected={setSelected3}
              selected={selected3}
              tableHeaderColor="black"
              tableHead={["", "ID", "Description", "Type"]}
              tableData={
                data[1][1]
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
             {data[2]} Product Mapping
            </p>
          </CardHeader>
          <CardBody>
            <TableMapping
              setSelected={setSelected4}
              selected={selected4}
              tableHeaderColor="black"
              tableHead={["", "ID" ,"Description", "Type"]}
              tableData={
                data[3][0]
              }
            />
          </CardBody>
        </Card>) : ''}
      </GridItem>
      </GridContainer>
    </div>
    );
}
