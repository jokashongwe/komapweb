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

import PriceChangeIcon from "@mui/icons-material/PriceChange";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import UserIcon from "@mui/icons-material/Groups";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import LocationCityIcon from "@mui/icons-material/LocationCity";

import Dashboard from "./Dashboard";
import { i18nProvider } from "./i18nProvider";

/**
 * Installed Modules
 */
import { PriceCreate, PriceEdit, PriceList, PriceShow } from "./modules/Price";
import {
  PostCreate,
  ProductEdit,
  ProductList,
  ProductShow,
} from "./modules/Product";
import {
  BasketList,
  CreateBasket,
  EditBasket,
  ShowBasket,
} from "./modules/Basket";
import { CreateUser, EditUser, ListUser, ShowUser } from "./modules/User";
import {
  ProvinceCreate,
  ProvinceEdit,
  ProvinceList,
  ProvinceShow,
} from "./modules/Province";
import { CityCreate, CityEdit, CityList, CityShow } from "./modules/City";

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
    <Resource
      icon={HolidayVillageIcon}
      options={{ label: "Provinces" }}
      name="provinces"
      list={ProvinceList}
      show={ProvinceShow}
      edit={ProvinceEdit}
      create={ProvinceCreate}
    />

    <Resource
      icon={LocationCityIcon}
      options={{ label: "Villes" }}
      name="cities"
      list={CityList}
      show={CityShow}
      edit={CityEdit}
      create={CityCreate}
    />
  </Admin>
);
