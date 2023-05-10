import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import "./ServingsInput.css";

export default function ServingsInput({ startingValue, errorMessage }) {
  const minServingsQuantity = 1;
  const maxServingsQuantity = 99;

  return (
    <div className="servings-input-wrapper">
      <TextField
        name="servings-quantity"
        type="number"
        defaultValue={startingValue || ""}
        label="Servings"
        variant="outlined"
        size="small"
        fullWidth
        error={Boolean(errorMessage)}
        helperText={errorMessage}
        required
        InputProps={{
          inputProps: {
            min: minServingsQuantity,
            max: maxServingsQuantity,
          },
        }}
      />
    </div>
  );
}

ServingsInput.propTypes = {
  startingValue: PropTypes.number,
  errorMessage: PropTypes.string,
};

ServingsInput.defaultProps = {
  startingValue: 0,
  errorMessage: "",
};