import * as React from "react";
import { Card, Box, Typography } from "@mui/material";
import { Title } from "react-admin";
import CardWithIcon from "./CardWithIcon";

const styles = {
  flex: { display: "flex" },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "0.5em" },
  rightCol: { flex: 1, marginLeft: "0.5em" },
  singleCol: { marginTop: "1em", marginBottom: "1em" },
};

import PriceChangeIcon from "@mui/icons-material/PriceChange";
import InventoryIcon from "@mui/icons-material/Inventory";
import UserIcon from "@mui/icons-material/Groups";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { getDashboardData } from "./api";
import { createElement } from "react";

interface ICounts {
  products: number;
  baskets: number;
  users: number;
  prices: number;
}

export default () => {
  const initCounts: ICounts = {
    products: 0,
    baskets: 0,
    users: 0,
    prices: 0,
  };
  const [counts, setCounts] = React.useState(initCounts);
  const [baskets, setBaskets] = React.useState([]);

  React.useEffect(() => {
    getDashboardData()
      .then((data: any) => {
        if (data) {
          setCounts(data.counts);
          setBaskets(data.baskets);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const BasketCard = (props: any) => {
    const { basket } = props;
    return (
      <div style={{ ...styles.flex, marginRight: "0.8rem" }}>
        <Card
          sx={{
            minHeight: "10rem",
            position: "relative",
            overflow: "hidden",
            padding: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "& .icon": {
              color: "secondary.main",
            },
            "&:before": {
              position: "absolute",
              top: "50%",
              left: 0,
              display: "block",
              content: `''`,
              height: "150%",
              aspectRatio: "1",
              transform: "translate(-30%, -60%)",
              borderRadius: "50%",
              backgroundColor: "secondary.main",
              opacity: 0.15,
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              padding: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              "& .icon": {
                color: "secondary.main",
              },
            }}
          >
            <Box width="3em" className="icon">
              {createElement(ShoppingBasketIcon, { fontSize: "large" })}
            </Box>
            
            <Box sx={{maxWidth: "5rem", marginRight: "4rem"}} textAlign="left">
              <Typography variant="h6" color="textPrimary">
                {basket.name}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ padding: "1rem", paddingTop: 0 }}>
            <Typography color="textPrimary">Produits</Typography>
            {basket.products
              ? basket.products.map((prod: any, index: number) => (
                  <Typography key={"prod_" + index} color="textSecondary">
                    {prod.name}
                  </Typography>
                ))
              : null}
            <div style={{ height: "0.8rem" }} />
            <Typography color="textPrimary">
              <b>Total: {basket.total} Fc</b>
            </Typography>
          </Box>
        </Card>
      </div>
    );
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <Title title="Comparateur" />
      <div style={styles.flex}>
        <div style={styles.leftCol}>
          <div style={styles.flex}>
            <CardWithIcon
              to="/products"
              icon={InventoryIcon}
              title={"Produits"}
              subtitle={counts ? counts.products : 0}
            />
            <div style={{ width: "0.8rem" }} />
            <CardWithIcon
              to="/prices"
              icon={PriceChangeIcon}
              title={"Prix"}
              subtitle={counts ? counts.prices : 0}
            />
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.flex}>
            <CardWithIcon
              to="/baskets"
              icon={StoreIcon}
              title={"Paniers"}
              subtitle={counts ? counts.baskets : 0}
            />
            <div style={{ width: "0.8rem" }} />
            <CardWithIcon
              to="/users"
              icon={UserIcon}
              title={"Utilisateurs"}
              subtitle={counts ? counts.users : 0}
            />
          </div>
        </div>
      </div>
      <div style={{ height: "1.2rem" }} />
      <div style={styles.flex}>
        {baskets
          ? baskets.map((basket: any, index: number) => (
              <BasketCard key={"basket_" + index} basket={basket} />
            ))
          : null}
      </div>
    </div>
  );
};
