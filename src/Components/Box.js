import React from 'react';
import RecipeList from './Recipe-List';
import AddRecipe from './Add-Recipe-Module';

//console.log(localStorage);

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addVisible: false,
      recipes: [
        // Example data for initial load. Then recipes is loaded from localStorage
        {
          title: 'french toast',
          ingredients: 'bread, eggs, milk, cinnamon'
        }, {
          title: 'watermelon',
          ingredients: 'watermelon'
        }, {
          title: 'stir-fry',
          ingredients: 'tofu, vegetables, rice'
        }, {
          title: 'Pie',
          ingredients: 'crust, fruit, sugar'
        }
      ]
    };

    this.addRecipe = this.addRecipe.bind(this);
    this.delete = this.delete.bind(this);
  };

  // Make changes to existing recipe
  editRecipe = (index, newTitle, newIngredients) => {
    let object = this.state;
    object.recipes[index].title = newTitle;
    object.recipes[index].ingredients = newIngredients;
    this.setState({object});

    // Resize afte edit
    setTimeout(function() {
      let panel = document.getElementsByClassName('ingredient-container');
      panel[index].style.maxHeight = panel[index].scrollHeight + 'px';
    }, 500);
  };

  // Load recipes from localStorage if present
  componentWillMount() {
    if (localStorage.recipeBoxState !== undefined) {
      let local = JSON.parse(localStorage.recipeBoxState);
      this.setState({recipes: local});
    }
  }

  // Copy recipes to localStorage after change
  componentDidUpdate() {
    localStorage.setItem('recipeBoxState', JSON.stringify(this.state.recipes));
  }

  // Toggle modal visibility
  handleClick = () => {
    window.scroll({top: 0, left: 0, behavior: 'smooth'});
    this.setState({
      addVisible: !this.state.addVisible
    });
  };

  // Add a new recipe
  addRecipe(newTitle, newIngredients) {
    let object = this.state;
    object.recipes.push({title: newTitle, ingredients: newIngredients});
    object.addVisible = false;
    this.setState(object);
  }

  // Delete a recipe
  delete = (index) => {
    let object = this.state.recipes;
    // Removes recipe object according to index assigned when mapped in RecipeList (in case of multiple deletes)
    delete object[index];
    // Removes resulting NULL object
    for (var i = 0; i < object.length; i++) {
      if (object[i] == null)
        object.splice(i, 1);
     }
    this.setState(object);
  };

  render() {

    return (
      <div className='app'>
        <div className="box">
          <h1>Recipe Box</h1>
          <RecipeList recipes={this.state.recipes} edit={this.editRecipe} delete={this.delete}/></div>
        <div className='add-recipe-btn container'>
          <button className='btn btn-add-recipe' onClick={this.handleClick}>Add a Recipe</button>
          {/* Hide the add-recipe module conditionally */}
          {this.state.addVisible && <AddRecipe visibility={this.handleClick} addRecipe={this.addRecipe}/>}
        </div>
        <div className='sig-container'>
        <small id='signature'>
          <a href='mailto:graham@upexam.ru'>Graham Kerr</a>
        </small>
      </div>
      </div>
    );
  }
}
export default Box;
