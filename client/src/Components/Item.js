import React, { Component } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import "./css/Item.css";
import MoreItems from "./MoreItems.js";
import "lightgallery.js/dist/css/lightgallery.css";

export default class Item extends Component {
  state = {
    item: { id: "", name: "", prize: 0, imgSrc: [], measureSrc: [] },
    items: [{ id: "", name: "", prize: 0, imgSrc: [""] }],
    selectedSize: []
  };

  measures = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTpAZ9Fyv8ea0HK_vunNMt-ghH1KElHfoYlzw__82iLx0GyzJw9",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTdmVMHqhtNqcI-Jn7TWqDMJ89djbtfGpc_T5QMJKG8B2ceRonn",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSgw37lWeKW15pAoXpS3600hvcJ8BISxMSzoteLiA9tIK0AlmTp"
  ];

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
    document.querySelector(".product__image").src = e.target.src;
  };

  loadItem = () => {
    console.log("eeeeeeeeee");
    const href = `/api${window.location.pathname}`;
    fetch(href)
      .then(res => res.json())
      .then(data => {
        this.isLoaded = true;
        if (
          typeof data.measureSrc === "undefined" ||
          data.measureSrc.length === 0
        ) {
          console.log("wchodzii");
          data.measureSrc = this.measures;
        }
        console.log(data);
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
      const { item } = this.state;
      // console.log(this.props, "propsyyy");

      // console.log(item);
      const mini_items = item.imgSrc.map(item => (
        <>
          <div className="product__mini-image">
            <LightgalleryItem src={item}>
              <img
                src={item}
                alt=""
                className="product__src"
                onMouseOver={this.handleMiniImgClick}
              />
            </LightgalleryItem>
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
                <div className="product__mini">
                  <LightgalleryProvider>{mini_items}</LightgalleryProvider>
                </div>
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
                  <LightgalleryProvider>
                    <LightgalleryItem src={item.imgSrc[0]} group="images">
                      <img
                        src={item.imgSrc[0]}
                        alt=""
                        className="product__image"
                      />
                    </LightgalleryItem>
                    {item.imgSrc.map((source, idx) => {
                      if (idx !== 0)
                        return <LightgalleryItem group="images" src={source} />;
                    })}
                  </LightgalleryProvider>
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
                      <br></br>
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
                    <div className="product__expanding product__expanding--delivery ">
                      <p style={{ textAlign: "center" }}>
                        Dostawę zamówionych produktów realizujemy za
                        pośrednictwem firmy kurierskiej DPD
                      </p>
                      <p>Koszt przesyłki naliczamy zgodnie z taryfikatorem:</p>
                      <p>
                        <b>13,99 zł</b> przesyłka za wcześniejszym przelewem na
                        konto
                      </p>
                      <p>
                        <b>21,99 zł</b> przesyłka pobraniowa
                      </p>
                      <p style={{ textAlign: "center" }}>
                        W przypadku wysyłki za granicę koszt zgodnie z cennikiem
                        Poczty Polskiej.
                      </p>
                    </div>
                  </div>

                  <div className="product__description">
                    <div className="product__clickToInfo ">
                      <LightgalleryProvider>
                        <LightgalleryItem
                          src={item.measureSrc[0]}
                          group="measures"
                        >
                          Jak się dobrze mierzyć?
                        </LightgalleryItem>

                        {item.measureSrc.map((src, idx) => {
                          if (idx !== 0)
                            return (
                              <LightgalleryItem group="measures" src={src} />
                            );
                        })}
                      </LightgalleryProvider>
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
