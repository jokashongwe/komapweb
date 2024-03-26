import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Title } from "react-admin";
import CardWithIcon from "./CardWithIcon";

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "0.5em" },
  rightCol: { flex: 1, marginLeft: "0.5em" },
  singleCol: { marginTop: "1em", marginBottom: "1em" },
};

import PriceChangeIcon from "@mui/icons-material/PriceChange";
import InventoryIcon from "@mui/icons-material/Inventory";
import UserIcon from "@mui/icons-material/Groups";
import StoreIcon from "@mui/icons-material/Store";

export default () => (
  <div style={{ marginTop: "1rem" }}>
    <Title title="Kompar Admin" />
    <div style={styles.flex}>
      <div style={styles.leftCol}>
        <div style={styles.flex}>
          <CardWithIcon
            to="/products"
            icon={InventoryIcon}
            title={"Produits"}
            subtitle={100}
          />
          <div style={{ width: "0.8rem" }} />
          <CardWithIcon
            to="/prices"
            icon={PriceChangeIcon}
            title={"Prix"}
            subtitle={50}
          />
        </div>
      </div>
      <div style={styles.rightCol}>
        <div style={styles.flex}>
          <CardWithIcon
            to="#"
            icon={StoreIcon}
            title={"Lieux"}
            subtitle={10}
          />
          <div style={{ width: "0.8rem" }} />
          <CardWithIcon
            to="#"
            icon={UserIcon}
            title={"Utilisateur"}
            subtitle={2}
          />
        </div>
      </div>
    </div>
  </div>
);
