import {
  List,
  Datagrid,
  TextField,
  Create,
  SimpleForm,
  NumberField,
  DateField,
  TextInput,
  NumberInput,
  DateInput,
  ReferenceInput,
  SimpleList,
  WithListContext,
  SimpleShowLayout,
  ReferenceManyField,
  Show,
  Edit,
} from "react-admin";
import Card from "@mui/material/Card";
import { useMediaQuery, Theme } from "@mui/material";

const listStyle: any = {
  upper: { textTransform: "uppercase" },
};

export const ProvinceList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

  const postFilters = [<TextInput source="query" label="Recherche" alwaysOn />];
  const get_text = (progress: string) => {
    switch (progress) {
      case "1":
        return "En Hausse";
      case "2":
        return "En Baisse";
      default:
        return "Stable";
    }
  };
  return (
    <List filters={postFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.population}
          //   tertiaryText={(record) => get_text("" + record.progress)}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField
            source="name"
            label="Nom"
            style={listStyle.upper}
          />
          <TextField source="population" style={listStyle.upper} />
          <DateField source="createdAt" label="Date de création" />
        </Datagrid>
      )}
    </List>
  );
};

export const ProvinceCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Nom" />
      <TextInput source="population" />
      <TextInput source="lat" label="Latitude" />
      <TextInput source="lng" label="Longitude" />
    </SimpleForm>
  </Create>
);

export const ProvinceShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="name" label="Nom" />
        <TextField source="population" />
      </SimpleShowLayout>
    </Show>
  );
};

export const ProvinceEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <TextInput source="name" label="Nom" />
      <TextInput source="lat" label="Latitude" />
      <TextInput source="lng" label="Longitude" />
      <TextInput source="population" />
    </SimpleForm>
  </Edit>
);
