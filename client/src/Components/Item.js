import React, { Component } from "react";
import "./css/Item.css";
import MoreItems from "./MoreItems.js";
import { Link } from "react-router-dom";
import CategoriesMain from "./CategoriesMain.js";

export default class Item extends Component {
  state = {
    item: { id: "", name: "", prize: 0, imgSrc: [] },
    items: [{ id: "", name: "", prize: 0, imgSrc: [] }],
    selectedSize: []
  };

  isLoaded = false;
  handleScrollClick = side => {
    const slider = document.querySelector(".product__mini .product__mini");
    const x = slider.scrollLeft;

    const category = document.querySelector(".product__mini-image");
    const categoryWidth = category.offsetWidth;

    const scrollInX = side * categoryWidth + x;
    slider.scroll({
      top: 0,
      left: scrollInX,
      behavior: "smooth"
    });
  };
  componentWillMount() {
    window.scrollTo(0, 0);
  }

  handleMiniImgClick = e => {
    console.log(e.target.src);
    document.querySelector(".product__image").src = e.target.src;
  };

  loadItem = () => {
    console.log("eeeeeeeeee");
    const href = `/api${window.location.pathname}`;
    fetch(href)
      .then(res => res.json())
      .then(data => {
        this.isLoaded = true;
        this.setState({ item: data }, () => {
          if (window.screen.width < 426) {
            // this.handleScroll();
          }
        });

        // window.location.pathname = `${window.location.pathname}/${data.name}`
        // console.log(data);
      });
  };

  async componentDidMount() {
    this.loadItem();
  }

  handleAddingToCart = () => {
    const { selectedSize, item } = this.state;

    if (item.size[0] !== "") {
      console.log("in");
      if (selectedSize.length) {
        const choosedItem = {
          ...this.state.item,
          size: [this.state.selectedSize]
        };
        this.props.addItemToCart(choosedItem);

        const popup = document.querySelector(".popup");
        popup.style.display = "block";
      } else alert("Wybierz rozmiar");
    } else {
      const choosedItem = {
        ...this.state.item,
        size: ["brak"]
      };
      this.props.addItemToCart(choosedItem);
    }
  };

  handleScroll = () => {
    const slider = document.querySelector(".product__mini");
    console.log(slider);
    let lastCategory = null;
    // console.log(lastCategory);
    let isClicked = false;
    let startPosition = null;
    let diff;
    let transformX = 0;
    let width = 0;
    let target = null;
    const down = e => {
      isClicked = true;
      startPosition = e.clientX;
      lastCategory = document.querySelector(".product__mini-image:last-child");
      const matrixPos = window
        .getComputedStyle(slider)
        .getPropertyValue("transform");
      if (matrixPos !== "none") {
        transformX = parseInt(matrixPos.split(",")[4]);
      }
      target = e.target;
      e.preventDefault();
    };

    const move = e => {
      if (isClicked && lastCategory.getBoundingClientRect) {
        const x = lastCategory.getBoundingClientRect().x.toFixed(2);
        diff = e.clientX - startPosition;
        diff = diff * 1.5;
        if (transformX + diff > 0) return;
        if (x <= window.innerWidth * 0.99 - lastCategory.offsetWidth) {
          if (diff > 0) {
            slider.style.transform = `translateX(${transformX + diff}px)`;
          }
          return;
        }

        slider.style.transform = `translateX(${transformX + diff}px)`;
        target.style.pointerEvents = "none";
      }
    };

    const up = e => {
      isClicked = false;
      if (target) target.style.pointerEvents = "auto";
      e.preventDefault();
    };

    slider.addEventListener("mousedown", down);
    slider.addEventListener("mousemove", move);
    slider.addEventListener("mouseleave", up);
    slider.addEventListener("mouseup", up);
    window.scrollTo(0, 0);
  };

  render() {
    if (this.isLoaded) {
      const { item, items } = this.state;
      // console.log(this.props, "propsyyy");

      // console.log(item);
      const mini_items = item.imgSrc.map(item => (
        <>
          <div className="product__mini-image">
            <img
              src={item}
              alt=""
              className="product__src"
              onMouseOver={this.handleMiniImgClick}
            />
          </div>
        </>
      ));

      const allSizes = item.size.map(size => (
        <button
          id={`${size}`}
          className="product__button"
          onClick={e => this.setState({ selectedSize: [size] })}
        >
          {size}
        </button>
      ));

      const moreProducts = items.map(item => {
        return (
          <>
            <div key={item.id} className="item item--more-products">
              <div className="item__picture item__picture--more-products">
                <a href={`/product/${item.id}`}>
                  <img
                    className="item__imgPicture"
                    src={item.imgSrc[0]}
                    onMouseOver={e => {
                      e.target.src = item.imgSrc[1];
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
            </div>{" "}
          </>
        );
      });

      const popup = [
        <div className="popup">
          <div
            onClick={e => {
              document.querySelector(".popup").style.display = "none";
            }}
            className="popup__background"
          ></div>
          <div className="popup__content">
            <div className="popup__contentText">
              <div className="popup__title">Produkt dodany do koszyka</div>
              <div className="singleCartItem">
                <div className="singleCartItem__img">
                  <a href={`/product/${item.id}`}>
                    <img src={item.imgSrc[0]} alt="" />
                  </a>
                </div>
                <div className="singleCartItem__info">
                  <div
                    style={{
                      color: "black",
                      marginBottom: "2vh",
                      border: "none"
                    }}
                    className="singleCartItem__infoSingle"
                  >
                    <a href={`/product/${item.id}`}>{item.name}</a>
                  </div>
                  <div className="singleCartItem__infoSingle">
                    Rozmiar {this.state.selectedSize}
                  </div>
                  <div className="singleCartItem__infoSingle">
                    Cena {item.prize}
                  </div>
                </div>
              </div>
            </div>
            <div className="buttons">
              <button
                onClick={() => {
                  document.querySelector(".popup").style.display = "none";
                }}
                class="sendOrder"
              >
                Wyjdź
              </button>
              <a href="/koszyk">
                <button
                  onClick={() => {
                    document.querySelector(".popup").style.display = "none";
                  }}
                  class="sendOrder"
                >
                  Przejdź do kasy
                </button>
              </a>
            </div>
          </div>
        </div>
      ];

      return (
        <>
          {popup}
          {/* <div className="routeItem ">
            <a className="routeText" href="/">
              Wstecz
            </a>
          </div> */}
          <div className="product__header">
            <div className="product ">
              <div className="product__mini">
                <div className="product__mini">{mini_items}</div>
                <div
                  onClick={() => this.handleScrollClick(-1)}
                  className="main-categories__arrow main-categories__arrow--left "
                >
                  <i class="fas fa-chevron-left"></i>
                </div>
                <div
                  onClick={() => this.handleScrollClick(1)}
                  className="main-categories__arrow main-categories__arrow--right "
                >
                  <i class="fas fa-chevron-right"></i>
                </div>
              </div>
              <div className="product__photos">
                <div className="product__imgContainer">
                  <img src={item.imgSrc[0]} alt="" className="product__image" />
                </div>
              </div>
              <div className="product__info ">
                <div className="companyName">Velluto Giorno</div>
                <div className="product__name-prize-container">
                  <h1 className="product__name product__name--item">
                    {item.name}
                  </h1>
                  <h1 className="product__prize product__prize--item">
                    {item.prize} PLN
                  </h1>
                  <h2 className="product__color">Kolor: {item.color}</h2>

                  {item.size[0] === "" ? null : (
                    <>
                      <h2 className="product__size">Rozmiar: </h2>
                      <div className="product__buttons">{allSizes}</div>
                    </>
                  )}
                  <div
                    className="product__addContainer"
                    onClick={this.handleAddingToCart}
                  >
                    <div className="product__add">
                      <div className="product__addText">Dodaj do koszyka</div>
                      <span className="i">
                        <i class="fas fa-cart-plus"></i>
                      </span>
                    </div>
                  </div>

                  <div className="product__description">
                    <div
                      onClick={e => {
                        e.target.nextSibling.classList.toggle(
                          "product__expanding--open"
                        );
                      }}
                      className="product__clickToInfo "
                    >
                      Informacje o produkcie
                    </div>
                    <div className="product__expanding ">
                      {item.description}
                    </div>
                  </div>

                  <div className="product__description">
                    <div
                      onClick={e => {
                        e.target.nextSibling.classList.toggle(
                          "product__expanding--open"
                        );
                      }}
                      className="product__clickToInfo "
                    >
                      Dostawa
                    </div>
                    <div className="product__expanding ">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Nisi explicabo earum voluptatem laudantium sapiente soluta
                      fuga repellendus repudiandae, nam non ad, minus labore
                      tenetur veniam, numquam ullam officia esse corrupti!Fuga,
                      iusto. Reprehenderit at veritatis cumque voluptatum ab
                      quaerat nihil reiciendis et quos rerum consectetur minus
                      excepturi perferendis in optio totam maiores corporis,
                      distinctio nesciunt voluptatibus ipsam velit odio.
                      Explicabo!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ height: "5vh" }}></div>
          <div className="container">
            <MoreItems />
          </div>
          <div style={{ height: "2vh" }}></div>
        </>
      );
    } else
      return (
        <div className="product__header">
          <div className="loading">VELLUTO GIORNO</div>
        </div>
      );
  }
}
