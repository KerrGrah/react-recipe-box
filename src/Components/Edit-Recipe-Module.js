import React from 'react';

class EditMod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      ingredients: this.props.ingredients
    }
  }

  editRecipe = () => {
    let index = this.props.index;
    this.props.edit(index, this.state.title, this.state.ingredients);
    this.disappear();
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  disappear = () => {
    this.props.visibility();
  }

  handleTitleChange = (e) => {
    let newTitle = e.target.value;
    this.setState({title: newTitle});
  }

  handleIngredientChange = (e) => {
    let newIngredients = e.target.value;
    this.setState({ingredients: newIngredients});
  }

  deleteRecipe = () => {
    this.props.delete(this.props.index);
    this.disappear();
  }

  render() {

    return (
      <div className='edit-background background' onClick={this.disappear}>
        <div className='edit-container' onClick={this.stopPropagation}>
          <h3>Change Recipe</h3>
          <input type="text" ref='editTitle' value={this.state.title} onChange={this.handleTitleChange} className='title-edit'/>
          <input type="text" ref='editIngredients' value={this.state.ingredients} onChange={this.handleIngredientChange} className='ingredients-edit'/>
          <div>
            <button className='btn makeEdit-btn' onClick={this.editRecipe}>save</button>
            <button className='btn cancel-edit-btn' onClick={this.disappear}>cancel</button>
          </div>
          <button className='btn btn-delete' onClick={this.deleteRecipe}>Delete</button>
        </div>
      </div>

    );
  }
}

export default EditMod;
