import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useInput } from "react-admin";

const ProvinceInput = (props: any) => {
  const {
    field,
    fieldState: { isTouched, invalid, error },
    formState: { isSubmitted },
  } = useInput(props);

  return (
    <Select defaultChecked={true} label="Province" {...field}>
      <MenuItem selected value="Kinshasa">Kinshasa</MenuItem>
      <MenuItem value="Kongo Central">Kongo Centrale</MenuItem>
      <MenuItem value="Kwilu">Kwilu</MenuItem>
      <MenuItem value="Kwango">Kwango</MenuItem>
      <MenuItem value="Mai Ndombe">Mai Ndombe</MenuItem>
      <MenuItem value="Equateur">Equateur</MenuItem>
      <MenuItem value="Kasai">Kasai</MenuItem>
      <MenuItem value="Kasai Centrale">Kasai Centrale</MenuItem>
      <MenuItem value="Kasai Orientale">Kasai Orientale</MenuItem>
      <MenuItem value="Lomami">Lomami</MenuItem>
      <MenuItem value="Haut Lomami">Haut Lomami</MenuItem>
      <MenuItem value="Sankuru">Sankuru</MenuItem>
      <MenuItem value="Tanganyika">Tanganyika</MenuItem>
      <MenuItem value="Haut Katanga">Haut Katanga</MenuItem>
      <MenuItem value="Lualaba">Lualaba</MenuItem>
      <MenuItem value="Sud-Kivu">Sud-Kivu</MenuItem>
      <MenuItem value="Nord-Kivu">Nord-Kivu</MenuItem>
      <MenuItem value="Maniema">Maniema</MenuItem>
      <MenuItem value="Haut-Huele">Haut-Huele</MenuItem>
      <MenuItem value="Bas-Huele">Bas-Huele</MenuItem>
      <MenuItem value="Ituri">Ituri</MenuItem>
      <MenuItem value="Nord-Ubangi">Nord-Ubangi</MenuItem>
      <MenuItem value="Sud-Ubangi">Sud-Ubangi</MenuItem>
      <MenuItem value="Mongala">Mongala</MenuItem>
      <MenuItem value="Tshopo">Tshopo</MenuItem>
      <MenuItem value="Tshuapa">Tshuapa</MenuItem>
    </Select>
  );
};
export default ProvinceInput;
