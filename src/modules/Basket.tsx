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
  Create,
  TextInput,
  DateInput,
  NumberInput,
  SimpleForm,
  ReferenceInput,
  Edit,
  ReferenceArrayInput,
  ReferenceArrayField,
  EditButton,
  SingleFieldList,
  ChipField,
  SelectArrayInput,
  SelectInput,
} from "react-admin";
import { useRecordContext } from "ra-core";
import { useMediaQuery, Theme } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ProvinceInput from "../components/ProvinceInput";

export const CreateBasket = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Nom" />
      <ReferenceInput label="Province" source="province" reference="provinces">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <div style={{ height: "0.4rem" }} />
      <TextInput source="ville" label="Ville" />
      <TextInput source="commune" label="Commune" />
      <ReferenceArrayInput reference="products" source="products">
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
);

export const EditBasket = (props: any) => {
  return (
    <Edit {...props} title={"Paniers "}>
      <SimpleForm>
        <TextInput disabled label="Id" source="id" />
        <TextInput source="name" label="Nom" />
        <ReferenceInput
          label="Province"
          source="province"
          reference="provinces"
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <div style={{ height: "0.4rem" }} />
        <TextInput source="ville" label="Ville" />
        <TextInput source="commune" label="Commune" />
        <ReferenceArrayInput reference="products" source="products">
          <SelectArrayInput optionText="name" />
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  );
};

export const ShowBasket = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" label="Titre" />
      <ReferenceArrayField
        label="Produits"
        source="products"
        reference="products"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <NumberField source="amount" label="Prix Total" />
      <TextField source="province" label="Province" defaultValue={"Kinshasa"} />
      <TextField source="commune" label="Commune" defaultValue={"-"} />
      <TextField source="ville" label="Ville" defaultValue={"Kinshasa"} />
      <DateField source="createdAt" label="Date de création" />
    </SimpleShowLayout>
  </Show>
);

export const BasketList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.province + " " + record.ville}
          tertiaryText={(record) => record.amount}
        />
      ) : (
        <>
          <Datagrid rowClick="show">
            <TextField source="name" label="Titre" />
            <ReferenceArrayField
              label="Produits"
              source="products"
              reference="products"
            >
              {/* <div style={{ display: "flex", flexDirection: "row" }}>
                <Datagrid>
                  <TextField
                    source="name"
                    label="Nom"
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
                </Datagrid>
              </div> */}
              <SingleFieldList>
                <ChipField source="name" />
              </SingleFieldList>
            </ReferenceArrayField>
            <NumberField source="amount" label="Prix Total" />
            <TextField
              source="province"
              label="Province"
              defaultValue={"Kinshasa"}
            />
            <TextField source="commune" label="Commune" defaultValue={"-"} />
            <TextField source="ville" label="Ville" defaultValue={"Kinshasa"} />
            <DateField source="createdAt" label="Date de création" />
          </Datagrid>
        </>
      )}
    </List>
  );
};
