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
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const MarketPlaceList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.ville}
          tertiaryText={(record) => record.commune}
        />
      ) : (
        <>
          <Datagrid rowClick="show">
            <TextField source="name" label="Nom" />
            <ReferenceField source="province" reference="provinces">
              <TextField source="name" />
            </ReferenceField>
            <TextField source="ville" />
            <TextField source="commune" />
            <DateField source="createdAt" label="Date de création" />
          </Datagrid>
        </>
      )}
    </List>
  );
};

export const MarketPlaceShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" label="Nom" />
      <ReferenceField source="province" reference="provinces">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="ville" />
      <TextField source="commune" />
      <DateField source="createdAt" label="Date de création" />
    </SimpleShowLayout>
  </Show>
);

const optionRenderer = (choice: any) =>
  `${choice.conteneur} ${choice.name} ${choice.model ? choice.model : ""}`;

export const MarketPlaceCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Nom" />
      <ReferenceInput label="Province" source="province" reference="provinces">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="ville" />
      <TextInput source="commune" />
    </SimpleForm>
  </Create>
);

export const MarketPlaceEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <TextInput source="name" label="Nom" />
      <ReferenceInput label="Province" source="province" reference="provinces">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="ville" label="Ville" />
      <TextInput source="commune" label="Commune" />
    </SimpleForm>
  </Edit>
);
