import React from 'react';

class AddModule extends React.Component {
  constructor(props) {
    super(props);
    this.addRecipe = this.addRecipe.bind(this);
    this.disappear = this.disappear.bind(this);
  }

  addRecipe() {
    let title = this.refs.newTitle.value;
    let ingredients = this.refs.newIngredients.value;

    if (title && ingredients) {
      this.props.addRecipe(title, ingredients);
      this.refs.newTitle.value = '';
      this.refs.newIngredients.value = '';
    }
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  disappear() {
    this.props.visibility();
  }

  render() {

    return (
      <div className={'background'} onClick={this.disappear}>
        <div className='add-container' onClick={this.stopPropagation}>
          <h3>Add a Recipe</h3>
          <input type="text" ref='newTitle' placeholder='e.g. Cheese Toast' className='title-input'/>
          <input type="text" ref='newIngredients' placeholder='e.g. bread, cheese' className='ingredients-input'/>
          <div>
            <button className='btn add-btn' onClick={this.addRecipe}>add</button>
            <button className='btn cancel-add-btn' onClick={this.disappear}>cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddModule;
