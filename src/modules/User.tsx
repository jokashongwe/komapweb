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
  PasswordInput,
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

export const CreateUser = () => (
  <Create>
    <SimpleForm>
      <TextInput source="first_name" label="Prénom" />
      <TextInput source="last_name" label="Nom" />
      <TextInput source="username" label="Utilisateur" />
      <PasswordInput source="password" label="Mot de passe" />
      <TextInput source="email" label="Email" />
      <TextInput source="phone" label="Téléphone" />
      <TextInput source="address" label="Adresse" />
      <ReferenceInput label="Province" source="province" reference="provinces">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <div style={{ height: "0.4rem" }} />
      <TextInput source="ville" label="Ville" />
      <ReferenceArrayInput reference="roles" source="roles">
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
);

export const EditUser = (props: any) => {
  return (
    <Edit {...props} title={"Utilisateurs "}>
      <SimpleForm>
        <TextInput disabled label="Id" source="id" />
        <TextInput source="first_name" label="Prénom" />
        <TextInput source="last_name" label="Nom" />
        <TextInput source="username" label="Utilisateur" />
        <PasswordInput source="password" label="Mot de passe" />
        <TextInput source="email" label="Email" />
        <TextInput source="phone" label="Téléphone" />
        <TextInput source="address" label="Adresse" />
        <ReferenceInput
          label="Province"
          source="province"
          reference="provinces"
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <div style={{ height: "0.4rem" }} />
        <TextInput source="ville" label="Ville" />
        <ReferenceArrayInput reference="roles" source="roles">
          <SelectArrayInput optionText="name" />
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  );
};

export const ListUser = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.username}
          secondaryText={(record) => record.first_name + " " + record.last_name}
          tertiaryText={(record) => record.address}
        />
      ) : (
        <>
          <Datagrid rowClick="show">
            <TextField source="first_name" label="Prénom" />
            <TextField source="last_name" label="Nom" />
            <TextField source="username" label="Utilisateur" />
            <TextField source="email" label="Email" />
            <TextField source="phone" label="Téléphone" />
            <TextField source="address" label="Adresse" />
            <ReferenceArrayField label="Roles" source="roles" reference="roles">
              <SingleFieldList>
                <ChipField source="name" />
              </SingleFieldList>
            </ReferenceArrayField>
            <ReferenceField
              label="Province"
              source="province"
              reference="provinces"
            >
              <TextField source="name" style={{ textTransform: "uppercase" }} />
            </ReferenceField>
            <TextField source="ville" label="Ville" defaultValue={"Kinshasa"} />
            <DateField source="createdAt" label="Date de création" />
          </Datagrid>
        </>
      )}
    </List>
  );
};

export const ShowUser = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="first_name" label="Prénom" />
      <TextField source="last_name" label="Nom" />
      <TextField source="username" label="Utilisateur" />
      <TextField source="email" label="Email" />
      <TextField source="phone" label="Téléphone" />
      <TextField source="address" label="Adresse" />
      <ReferenceArrayField label="Roles" source="roles" reference="roles">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <ReferenceField label="Province" source="province" reference="provinces">
        <TextField source="name" style={{ textTransform: "uppercase" }} />
      </ReferenceField>
      <TextField source="ville" label="Ville" defaultValue={"Kinshasa"} />
      <DateField source="createdAt" label="Date de création" />
    </SimpleShowLayout>
  </Show>
);
