import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  radiantLightTheme,
  radiantDarkTheme,
  nanoDarkTheme,
  nanoLightTheme,
} from "react-admin";
import { Route } from "react-router-dom";
import { dataProvider } from "./dataProvider";
import { PostCreate, ProductEdit, ProductList, ProductShow } from "./Product";

import PriceChangeIcon from "@mui/icons-material/PriceChange";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import { NestedPriceList, PriceCreate, PriceEdit, PriceList, PriceShow } from "./Price";
import Dashboard from "./Dashboard";
import { i18nProvider } from "./i18nProvider";
import { BasketList, CreateBasket, EditBasket, ShowBasket } from "./Basket";
import UserIcon from "@mui/icons-material/Groups";
import { CreateUser, EditUser, ListUser, ShowUser } from "./User";

export const App = () => (
  <Admin
    dashboard={Dashboard}
    i18nProvider={i18nProvider}
    dataProvider={dataProvider}
    theme={radiantLightTheme}
    darkTheme={radiantDarkTheme}
  >
    <Resource
      icon={InventoryIcon}
      options={{ label: "Produits" }}
      show={ProductShow}
      name="products"
      list={ProductList}
      edit={ProductEdit}
      create={PostCreate}
      recordRepresentation="name"
    />
    <Resource
      icon={PriceChangeIcon}
      options={{ label: "Prix" }}
      name="prices"
      list={PriceList}
      show={PriceShow}
      edit={PriceEdit}
      create={PriceCreate}
    />
    <Resource
      icon={ShoppingBasketIcon}
      options={{ label: "Paniers" }}
      name="baskets"
      list={BasketList}
      show={ShowBasket}
      edit={EditBasket}
      create={CreateBasket}
    />
    <Resource
      icon={UserIcon}
      options={{ label: "Utilisateurs" }}
      name="users"
      list={ListUser}
      show={ShowUser}
      edit={EditUser}
      create={CreateUser}
    />
  </Admin>
);
