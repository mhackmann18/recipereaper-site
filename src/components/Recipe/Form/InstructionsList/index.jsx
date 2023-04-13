import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import "./index.css";

export default function InstructionsList({ instructions }) {
  return (
    <ul id="instructions-list">
      {instructions.map((el, index) => (
        <li key={uuidv4()}>
          <FontAwesomeIcon
            icon={faTrashCan}
            size="lg"
            className="btn remove"
            title="Remove Step"
          />
          <span className="instruction-number">{index + 1}. </span>
          <textarea type="text" defaultValue={el} />
        </li>
      ))}
    </ul>
  );
}

InstructionsList.propTypes = {
  instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
};