import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import TableProcesses from "components/Table/TableProcesses.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
  
  console.log("Rendered page");
  const [tableData, setTableData] = useState([]);
  const [info_org1, setInfoOrg1] = useState([]);
  const [info_org2, setInfoOrg2] = useState([]);
  const [org, setOrg] = React.useState('');
  
  const handleChange = event => {
    console.log("info_org1");
    console.log(info_org1);
    setOrg(event.target.value);
    if(event.target.value === 1){
      setTableData(info_org1);
    } else {
      setTableData(info_org2);
    }
  };

  function parsePurchaseOrders(data) {
    let info1 = [];
    data.forEach((entry) => {
      console.log("entry");
      console.log(entry);
      info1.push([entry.documentLines[0].purchasesItem, entry.documentLines[0].orderId, entry.company]);
      //addTableEntry(entry.documentLines[0].purchasesItem, "company");
    });
    console.log("info");
    console.log(info1);
    setInfoOrg1(info1);
    //setTableData(info1);
  }

  function parsePurchaseOrders2(data) {
    let info2 = [];
    data.forEach((entry) => {
      console.log("entry");
      console.log(entry);
      info2.push([entry.documentLines[0].purchasesItem, entry.documentLines[0].orderId, entry.company]);
      //addTableEntry(entry.documentLines[0].purchasesItem, "company");
    });
    console.log("info2");
    console.log(info2);
    setInfoOrg2(info2);
    //setTableData(info2);
  }

  useEffect(() => {

    console.log( global["tenant1"]);

    //  Fetch POs
    fetch('/api/companies/purchase_orders',{headers: {tenant: global["tenant1"], organization: global["organization1"]}})
    .then(response => response.json())
    .then(data=>{
        console.log("Data received from /api/companies/purchase_orders");
        parsePurchaseOrders(data);
    })

    //  Fetch POs company 2
    fetch('/api/companies/purchase_orders',{headers: {tenant: global["tenant2"], organization: global["organization2"]}})
    .then(response => response.json())
    .then(data=>{
        console.log("Data received from /api/companies/purchase_orders");
        parsePurchaseOrders2(data);
    }) 
  },[])
  
  const classes = useStyles();

  return (
    <GridContainer>
      <GridItem xs={12} sm={10} md={10}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardCategoryWhite}>
             Purchase Orders
            </h4>
          </CardHeader>
          <CardBody>
          <FormControl variant="outlined" className={classes.formControl}>
            Organization:
            <Select
              value={org}
              onChange={handleChange}
              style={{width: 100}}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
            </Select>
          </FormControl>
            <TableProcesses
              tableHeaderColor="primary"
              tableHead={["Artigo", "Order ID", "Company"]}
              tableData={tableData}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
