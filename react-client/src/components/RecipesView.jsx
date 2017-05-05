import React from 'react';
import Slider from 'react-slick';
import RecipeItem from './RecipeItem.jsx';

//display all the recipes retrieved from API
class RecipesView extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    var settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1
    };

    return (
      <div className="col-md-12">
        <Slider {...settings}>
          <div><img className="img-rounded" src ={this.props.recipeList[0].image} width="280"/></div>
          <div><img className="img-rounded" src ={this.props.recipeList[1].image} width="280"/></div>
          <div><img className="img-rounded" src ={this.props.recipeList[2].image} width="280"/></div>
          <div><img className="img-rounded" src ={this.props.recipeList[4].image} width="280"/></div>
          <div><img className="img-rounded" src ={this.props.recipeList[5].image} width="280"/></div>
          <div><img className="img-rounded" src ={this.props.recipeList[6].image} width="280"/></div>
          <div><img className="img-rounded" src ={this.props.recipeList[7].image} width="280"/></div>
          <div><img className="img-rounded" src ={this.props.recipeList[8].image} width="280"/></div>
          <div><img className="img-rounded" src ={this.props.recipeList[9].image} width="280"/></div>
        </Slider>
      </div>
    );
  } 
}

export default RecipesView;
          

// Previously used code
          // {this.props.recipeList ?
          //   Object.keys(this.props.recipeList).map((key, index) =>
          //   <RecipeItem key={this.props.recipeList[index].id} recipe={this.props.recipeList[index]}/>
          //   ) : <p>No recipes</p>
          // }
          

