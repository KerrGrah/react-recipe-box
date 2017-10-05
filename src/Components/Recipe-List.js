import React from 'react';
import Edit from './Edit-Recipe-Module';

class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    // State is used here to control edit modal
    this.state = {
      visible: false,
      title: "",
      ingredients: "",
      index: 0
    }
  }

  // Puts the clicked recipe in state to be passed to the edit modal
  handleClick(index, props) {
    var object = this.props.recipes[index];
    this.setState({
      visible: !this.state.visible,
      title: object.title,
      ingredients: object.ingredients,
      index: index
    });
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  // Passed to edit modal to hide modal when necessary
  disappear = () => {
    this.setState({
      visible: !this.state.visible
    });
  }

  // Expands recipe ingredients list on recipe title click
  accClick(e) {
    let panel = e.target.nextSibling;
    panel.classList.toggle('display');
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  }

  recipeList = (props) => {
    const recipesToDiv = this.props.recipes.map((recipe, index) => <div className='single-recipe-container' key={index}>
      <button ref={index} className='accordion' onClick={this.accClick.bind(this)}>
        {recipe.title}
      </button>
      <div className='ingredient-container hidden'>
      {/* <h3 className='ingredients-header'>Ingredients</h3>*/}
        <p ref='myIngredients' className="ingredients">{recipe.ingredients.replace(/\s/g, '').replace(/,/g, '\n')}</p>
        <button key={index} id='edit-btn' className='btn btn-edit' onClick={this.handleClick.bind(this, index)}>
          Edit</button>
      </div>
    </div>);
    return (
      <div>
        <ul>{recipesToDiv}</ul>
        {this.state.visible && <Edit title={this.state.title} ingredients={this.state.ingredients} index={this.state.index} visibility={this.disappear} edit={this.props.edit} delete={this.props.delete}/>}
      </div>
    );
  };
  render() {

    return this.recipeList();
  }
}
export default RecipeList
