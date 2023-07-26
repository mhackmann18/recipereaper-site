import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Fade } from "@mui/material";
import Recipe from "../../../utils/Recipe";
import RecipeDisplay from "../../RecipeItem/Display";
import RecipeItemButtons from "../../RecipeItem/Buttons";
import SignupForm from "../Signup/Form";
import "./RecipeItem.css";

// Component is intended to be used when no user is logged in
export default function HomeRecipeItem({ recipe, onBackClick }) {
  const [signupModalMessage, setSignupModalMessage] = useState(null);
  const navigate = useNavigate();

  const buttonActions = {
    onBackClick,
    onEditClick: () =>
      setSignupModalMessage("Create an account to edit recipes."),
    onSaveRecipeClick: () =>
      setSignupModalMessage("Create an account to save recipes."),
  };

  const handleSignupFormSubmitSuccess = () => {
    navigate("/dashboard/import-recipe/search", { state: { data: recipe } });
  };

  return (
    <>
      <RecipeDisplay
        rootRecipe={recipe}
        buttonsComponent={<RecipeItemButtons buttonActions={buttonActions} />}
        onServingsClick={() =>
          setSignupModalMessage("Create an account to adjust recipe servings.")
        }
      />
      <Modal
        id="recipe-item-signup-modal"
        open={!!signupModalMessage}
        onClose={() => setSignupModalMessage(null)}
      >
        <Fade in={!!signupModalMessage}>
          <div className="signup-form-wrapper">
            <SignupForm
              headerElement={<p id="signup-msg">{signupModalMessage}</p>}
              onSubmitSuccess={handleSignupFormSubmitSuccess}
            />
          </div>
        </Fade>
      </Modal>
    </>
  );
}

HomeRecipeItem.propTypes = {
  recipe: PropTypes.instanceOf(Recipe).isRequired,
  onBackClick: PropTypes.func.isRequired,
};