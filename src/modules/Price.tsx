import {
  List,
  Datagrid,
  TextField,
  WithListContext,
  Show,
  SimpleShowLayout,
  NumberField,
  DateField,
  SimpleList,
  ReferenceField,
  useRecordContext,
  Create,
  TextInput,
  DateInput,
  NumberInput,
  SimpleForm,
  ReferenceInput,
  Edit,
  SelectInput,
} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ProvinceInput from "../components/ProvinceInput";

export const PriceList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.amount}
          secondaryText={(record) => record.currency}
          tertiaryText={(record) => record.location_name}
        />
      ) : (
        <>
          <Datagrid rowClick="show">
            <ReferenceField
              link="show"
              label="Produits"
              source="product"
              reference="products"
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  source="name"
                  style={{ textTransform: "uppercase" }}
                />
                <div style={{ width: "0.8rem" }} />
                <TextField
                  source="marque"
                  style={{ textTransform: "uppercase" }}
                />
                <div style={{ width: "0.8rem" }} />
                <TextField
                  source="model"
                  style={{ textTransform: "uppercase" }}
                />
              </div>
            </ReferenceField>
            <NumberField source="amount" label="Prix" />
            <TextField source="currency" label="Devise" />
            <TextField source="location_name" label="Lieu" />
            <TextField source="commune" label="Commune" defaultValue={"-"} />
            <TextField source="ville" label="Ville" defaultValue={"Kinshasa"} />
            <ReferenceField
              label="Province"
              source="province"
              reference="provinces"
            >
              <TextField source="name" style={{ textTransform: "uppercase" }} />
            </ReferenceField>
            <DateField source="createdAt" label="Date de création" />
          </Datagrid>
        </>
      )}
    </List>
  );
};

export const PriceShow = () => (
  <Show>
    <SimpleShowLayout>
      <NumberField source="amount" />
      <TextField source="currency" />
      <TextField source="location_name" />
      <TextField source="commune" />
      <TextField source="ville" />
      <ReferenceField label="Province" source="province" reference="provinces">
        <TextField source="name" style={{ textTransform: "uppercase" }} />
      </ReferenceField>
      <ReferenceField link="show" source="product" reference="products" />
    </SimpleShowLayout>
  </Show>
);

export const NestedPriceList = () => {
  const { id } = useParams();
  return (
    <List resource="prices" filter={{ product: id }}>
      <Datagrid rowClick="edit">
        <NumberField source="amount" />
        <TextField source="currency" />
        <TextField source="location_name" />
        <EditPriceButton />
      </Datagrid>
    </List>
  );
};

const EditPriceButton = () => {
  const price = useRecordContext();
  return (
    <Button
      component={Link}
      to={`/products/${price?.product}/prices/${price?.id}`}
      startIcon={<EditIcon />}
    >
      Edit
    </Button>
  );
};

export const PriceCreate = () => (
  <Create>
    <SimpleForm>
      <NumberInput source="amount" label="Prix" />
      <TextInput source="currency" label="Devise" />
      <TextInput source="location_name" label="Lieu" />
      <TextInput source="commune" label="commune" />
      <TextInput source="ville" label="ville" />
      <ReferenceInput label="Province" source="province" reference="provinces">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="product" reference="products" />
    </SimpleForm>
  </Create>
);

export const PriceEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <NumberInput source="amount" label="Prix" />
      <TextInput source="currency" label="Devise" />
      <TextInput source="location_name" label="Lieu" />
      <ReferenceInput label="Province" source="province" reference="provinces">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <div style={{ height: "0.4rem" }} />
      <TextInput source="ville" label="Ville" />
      <TextInput source="commune" label="Commune" />
    </SimpleForm>
  </Edit>
);


