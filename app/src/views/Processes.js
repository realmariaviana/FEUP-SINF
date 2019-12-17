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
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "100",
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

const Processes = () => {
  
  console.log("Rendered page");
  const [tableData, setTableData] = useState([]);
  const [name_org1, setNameOrg1] = useState([]);
  const [name_org2, setNameOrg2] = useState([]);
  const [info_org1, setInfoOrg1] = useState([]);
  const [info_org2, setInfoOrg2] = useState([]);
  const [tenant, setTenant] = useState("");
  const [tenant2, setTenant2] = useState("");
  const [org, setOrg] = React.useState('');
  
  const handleChange = event => {
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
      console.log("entry1");
      console.log(entry);
      info1.push([entry.naturalKey, entry.company]);
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
      console.log("entry2");
      console.log(entry);
      info2.push([entry.naturalKey, entry.company]);
      //addTableEntry(entry.documentLines[0].purchasesItem, "company");
    });
    console.log("info2");
    console.log(info2);
    setInfoOrg2(info2);
    //setTableData(info2);
  }

  useEffect(() => {

    fetch('/api/companies/company')
    .then(response => response.json())
    .then(data => {
      console.log("data");
      console.log(data);

      setNameOrg1(data[0][2]);
      setNameOrg2(data[1][2]);

      setTenant(data[0][0]);
      setTenant2(data[1][0]);

      //  Fetch POs
      fetch('/api/companies/purchase_orders',{headers: {tenant: data[0][0], organization: data[0][1]}})
      .then(response => response.json())
      .then(data=>{
          console.log("Data received from /api/companies/purchase_orders");
          parsePurchaseOrders(data);
      })

      //  Fetch POs company 2
      fetch('/api/companies/purchase_orders',{headers: {tenant: data[1][0], organization: data[1][1]}})
      .then(response => response.json())
      .then(data=>{
          console.log("Data received from /api/companies/purchase_orders");
          parsePurchaseOrders2(data);
      }) 
    })

    }, [])
  
  const classes = useStyles();

  return (
    <GridContainer>
      <GridItem xs={12} sm={10} md={10}>
        <Card>
          <CardHeader color="info">
            <p className={classes.cardCategoryWhite}>
             Processes
            </p>
          </CardHeader>
          <CardBody>
          <FormControl variant="outlined" className={classes.formControl} style={{paddingRight:'2rem'}}>
            Organization
            <Select
              value={org}
              onChange={handleChange}
              style={{width: 100}}
            >
              <MenuItem value={1}>{name_org1}</MenuItem>
              <MenuItem value={2}>{name_org2}</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" className={classes.formControl}>
            Process
            <Select
              value={org}
              onChange={handleChange}
              style={{width: 100}}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={2}>3</MenuItem>
              <MenuItem value={2}>4</MenuItem>
            </Select>
          </FormControl>

            <TableProcesses
              tableHeaderColor="black"
              tableHead={["OrderKey", "Company"]}
              tableData={tableData}
              tenant={tenant}
              tenant2={tenant2}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );

}

export default Processes
