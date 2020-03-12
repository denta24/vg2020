import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SingleItem extends Component {
  state = {
    item: [],
    isLoaded: false
  };

  loadItem = () => {
    console.log(this.props.id);
    fetch(`/api/product/${this.props.id}`)
      .then(res => res.json())
      .then(res => {
        const item = res;
        console.log(this.props.id);
        this.setState({ item, isLoaded: true });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.loadItem();
  }

  render() {
    const { item } = this.state;
    // console.log(item.id);

    const path = `/product/${item.id}`;
    const linkProps = {
      pathname: path,
      state: {
        item
      }
    };
    if (this.state.isLoaded) {
      return (
        <>
          <div key={item.id} className="item item--moreproducts">
            <div className="item__picture">
              <a href={path}>
                <img
                  className="item__imgPicture"
                  src={item.imgSrc[0]}
                  onMouseOver={e => {
                    e.target.src = `${item.imgSrc[1] || item.imgSrc[0]}`;
                  }}
                  onMouseLeave={e => {
                    e.target.src = item.imgSrc[0];
                  }}
                  alt=""
                />
              </a>
            </div>
            <p className="item__product-name">{item.name}</p>
            <p className="product__prize">{item.prize} PLN</p>
          </div>
        </>
      );
    } else
      return (
        <>
          <div key={"Loading"} className="item">
            <div className="item__picture item__imgPicture--loading">
              <div className="single_item-center">VG</div>
            </div>
          </div>
        </>
      );
  }
}
