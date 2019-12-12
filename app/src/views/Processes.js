import React, { useState }  from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Dropdown from 'react-bootstrap/Dropdown';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgb(0,0,0)",
      margin: "0",
      fontSize: "18px",
      marginTop: "0",
      marginBottom: "0"
    }
  }
};
const useStyles = makeStyles(styles);

export default function MasterData() {
  const classes = useStyles();
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);
  return (
<div>
 <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        Button Dropdown
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Header</DropdownItem>
        <DropdownItem disabled>Action</DropdownItem>
        <DropdownItem>Another Action</DropdownItem>
        { <DropdownItem divider /> }
        <DropdownItem>Another Action</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>

    <ButtonDropdown isOpen={isOpen} toggle={toggle}>
  <DropdownToggle caret color="primary">
    Text
  </DropdownToggle>
  <DropdownMenu>
    <DropdownItem header>Header</DropdownItem>
    <DropdownItem disabled>Action</DropdownItem>
    <DropdownItem>Another Action</DropdownItem>
    <DropdownItem divider/>
    <DropdownItem>Another Action</DropdownItem>
  </DropdownMenu>
</ButtonDropdown>

    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardCategoryWhite}>
             List of Processes
            </h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="#000"
              tableHead={["Process ID", "Name" ,"TIMSTAMP", "Status" ,"Descritption"]}
              tableData={[
                ["22", "oi", "2019/03/23 23:44:32", "345" ,"Niger"],
                ["43","meu", "2019/03/23 23:44:32", "433", "Curaçao"],
                ["45", "nome", "2019/03/23 23:44:32", "567", "Netherlands"],
                ["4567","é", "2019/03/23 23:44:32", "657", "South"],
                ["568", "miro", "2019/03/23 23:44:32", "3434", "Malawi"],
                ["567 ","osvaldo", "2019/03/23 23:44:32", "245", "Chile"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    </div>
  );
}
