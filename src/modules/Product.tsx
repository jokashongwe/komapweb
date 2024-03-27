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
  Edit
} from "react-admin";
import Card from "@mui/material/Card";
import { useMediaQuery, Theme } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Tooltip,
  Legend,
  Bar,
  ComposedChart,
  Area,
} from "recharts";

import { DateTime } from "luxon";

const listStyle: any = {
  upper: { textTransform: "uppercase" },
};

export const ProductList = () => {
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
          primaryText={(record) => record.name + " " + record.marque}
          secondaryText={(record) => record.model}
          tertiaryText={(record) => get_text("" + record.progress)}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField
            source="name"
            label="Nom du Produit"
            style={listStyle.upper}
          />
          <TextField source="marque" style={listStyle.upper} />
          <TextField source="model" label="Modèle" style={listStyle.upper} />
          <TextField source="conteneur" style={listStyle.upper} />
          <DateField source="createdAt" label="Date de création" />
        </Datagrid>
      )}
    </List>
  );
};

export const PostCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Nom du produit" />
      <TextInput source="marque" />
      <TextInput source="model" label="Modèle" />
      <TextField source="marque" />
    </SimpleForm>
  </Create>
);

const prepare_monthly = (data: any[]) => {
  let monthly: any[] = [];
  let add_to_monthly: string[] = [];
  let month_count: any = {};
  if (!data) {
    return data;
  }
  data.forEach((dt) => {
    const currentDate = DateTime.fromISO(dt.createdAt);
    const month = currentDate.setLocale("fr").toFormat("MMM");
    const index = add_to_monthly.indexOf(month);
    if (index >= 0) {
      monthly[index].amount += dt.amount;
      month_count[month] += 1;
    } else {
      monthly.push({
        month: month,
        amount: dt.amount,
      });
      add_to_monthly.push(month);
      month_count[month] = 1;
    }
  });
  for (let index = 0; index < monthly.length; index++) {
    monthly[index].amount = Math.round(
      monthly[index].amount / month_count[monthly[index].month]
    );
  }
  return monthly;
};

let localisations: string[] = [];

const prepare_dayly = (data: any[]) => {
  let localized_dayly: any[] = [];
  let dayly_price: any = {};
  if (!data) {
    return data;
  }

  data.forEach((dt) => {
    var new_item: any = {};
    const short_date = DateTime.fromISO(dt.createdAt)
      .setLocale("fr")
      .toFormat("dd-LL-yyyy");
    if (dayly_price[short_date]) {
      for (let index = 0; index < localized_dayly.length; index++) {
        if (localized_dayly[index].short_date == short_date) {
          localized_dayly[index][dt.location_name] = dt.amount;
          break;
        }
      }
      dayly_price[short_date] += dt.amount;
    } else {
      new_item["short_date"] = short_date;
      new_item[dt.location_name] = dt.amount;
      localized_dayly.push(new_item);
      dayly_price[short_date] = dt.amount;
    }

    if (!localisations.includes(dt.location_name)) {
      localisations.push(dt.location_name);
    }
  });

  console.log("dayly_price: ", dayly_price);
  console.log("localized_dayly: ", localized_dayly);
  return localized_dayly;
};

const colors = [
  "#8BC1F7",
  "#BDE2B9",
  "#A2D9D9",
  "#EF9234",
  "#5752D1",
  "#C9190B",
  "#6A6E73",
];

const styles: any = {
  flex: { display: "flex", backgroundColor: "#FAFAFA" },
  flexRow: { display: "flex", flexDirection: "row", padding: "0.4rem" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "0.5em" },
  rightCol: { flex: 1, marginLeft: "0.5em" },
  singleCol: { marginTop: "1em", marginBottom: "1em" },
};

export const ProductShow = () => {
  const isMid = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="name" label="Nom du produit" />
        <TextField source="marque" />
        <TextField source="model" label="Modèle" />
        <TextField source="conteneur" label="Modèle" />
        <ReferenceManyField
          label="Prix sur le marché"
          reference="prices"
          target="product"
          perPage={5}
        >
          <Datagrid>
            <TextField source="amount" label="Montant" />
            <TextField source="currency" label="Devise" />
            <TextField source="location_name" label="Lieu" />
            <TextField source="createdAt" label="Date création" />
          </Datagrid>

          <WithListContext
            render={({ data }) => (
              <div style={isMid ? styles.flexColumn : styles.flexRow}>
                <Card>
                  <ComposedChart
                    width={590}
                    height={300}
                    data={prepare_monthly(data)}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      barSize={80}
                      dataKey="amount"
                      label="Prix"
                      fill="#8884d8"
                    />
                  </ComposedChart>
                </Card>
                <Card>
                  <ComposedChart
                    width={590}
                    height={300}
                    data={prepare_dayly(data)}
                  >
                    <XAxis dataKey="short_date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    {localisations &&
                      localisations.map((loc, index) => (
                        <Line
                          type="monotone"
                          key={loc}
                          dataKey={loc}
                          stroke={colors[index]}
                        />
                      ))}
                  </ComposedChart>
                </Card>
              </div>
            )}
          />
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};

export const ProductEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <TextInput source="name" label="Nom du produit" />
      <TextInput source="marque" />
      <TextInput source="model" label="Modèle" />
      <TextInput source="conteneur" />
    </SimpleForm>
  </Edit>
);
