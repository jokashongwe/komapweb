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
  SingleFieldList,
  ChipField,
  useGetList,
  SelectInput,
} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ProvinceInput from "../components/ProvinceInput";
import { CustomArrayList } from "../components/CustomArrayList";

export const CityList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.tarification + "$ /mois"}
          tertiaryText={(record) => record.population}
        />
      ) : (
        <>
          <Datagrid rowClick="show">
            <TextField source="name" style={{ textTransform: "uppercase" }} />
            <ReferenceField
              label="Province"
              source="province"
              reference="provinces"
            >
              <TextField source="name" style={{ textTransform: "uppercase" }} />
            </ReferenceField>
            <NumberField source="tarification" />
            <TextField source="population" />
            <CustomArrayList source="communes">
              <ChipField source="name" />
            </CustomArrayList>
            <DateField source="createdAt" label="Date de création" />
          </Datagrid>
        </>
      )}
    </List>
  );
};

export const CityShow = () => (
  <Show>
    <SimpleShowLayout>
      <NumberField source="name" />
      <ReferenceField label="Province" source="province" reference="provinces">
        <TextField source="name" style={{ textTransform: "uppercase" }} />
      </ReferenceField>
      <TextField source="communes" />
      <TextField source="tarificaition" />
    </SimpleShowLayout>
  </Show>
);

export const CityCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Nom" />
      <TextInput source="population" label="Population" />
      <TextInput source="lat" label="Latitude" />
      <TextInput source="lng" label="Longitude" />
      <TextInput source="communes" label="Communes" />
      <ReferenceInput label="Province" source="province" reference="provinces">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const CityEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="Nom" />
      <TextInput source="population" label="Population" />
      <TextInput source="lat" label="Latitude" />
      <TextInput source="lng" label="Longitude" />
      <TextInput source="communes" label="Communes" />
      <ReferenceInput label="Province" source="province" reference="provinces">
        <TextField source="name" style={{ textTransform: "uppercase" }} />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
