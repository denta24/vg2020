import "./css/Productpage.css";
import "./css/slider.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
let isMouseOver = false;

export default class Productpage extends Component {
  state = {
    items: [],
    params: {},
    filters: {
      minprize: 0,
      maxprize: 100,
      sizes: [],
      subcategories: [],
      colors: []
    },
    allSubCat: [],
    allSizes: [],
    allColors: [],
    allPrizes: { minprize: 0, maxprize: 0 },
    linkProps: {
      pathname: "",
      state: {
        pathName: { mainCat: "", category: "" },
        pathLink: { mainCat: "", category: "" }
      }
    },
    sort: "time",
    page: 1,

    isLoaded: false
  };
  handleURLSearch = () => {
    const URL = window.location.pathname;
    const { filters } = this.state;

    let stateFilters = {};

    if (Object.keys(filters.sizes).length !== 0)
      stateFilters = { ...stateFilters, sizes: filters.sizes };

    if (Object.keys(filters.subcategories).length !== 0)
      stateFilters = { ...stateFilters, subcategories: filters.subcategories };

    if (Object.keys(filters.colors).length !== 0)
      stateFilters = { ...stateFilters, colors: filters.colors };

    if (filters.minprize * 1 !== this.state.allPrizes.minprize) {
      stateFilters = { ...stateFilters, minprize: filters.minprize };
    }
    if (filters.maxprize * 1 !== this.state.allPrizes.maxprize) {
      stateFilters = { ...stateFilters, maxprize: filters.maxprize };
    }

    // stateFilters = {
    //   ...stateFilters,
    //   minprize: filters.minprize,
    //   maxprize: filters.maxprize
    // };
    if (
      // Object.keys(stateFilters).length !== 0
      stateFilters !== {}
    ) {
      const params = new URLSearchParams(stateFilters);
      window.history.pushState(null, null, `?${params}`);

      ///////////////////////////////////// ???????????????
      ///////////////////////////////////// ???????????????
      ///////////////////////////////////// ???????????????
      if (Object.keys(params).length !== 0) {
        window.location.href = this.state.linkProps.state.pathLink.category;
      }
    }

    // const queryLink = stateFilters !== {} ? `?${params}` : '';
    // console.log(queryLink);

    this.callApi()
      .then(res => {
        this.setState({ items: res.kobiety.items, params: res.params });
      })
      .catch(err => console.log(err));
  };

  handleULRstate = () => {
    const url = new URL(window.location.href);
    const args = new URLSearchParams(url.search);
    let filters = this.state.filters;
    let actualFilters = [];
    if (args.has("minprize")) {
      const minprize = args.get("minprize");
      filters = { ...filters, minprize };
      actualFilters = [...actualFilters, minprize];
    }
    if (args.has("maxprize")) {
      const maxprize = args.get("maxprize");
      filters = { ...filters, maxprize };
      actualFilters = [...actualFilters, maxprize];
    }
    if (args.has("sizes")) {
      const sizes = args.get("sizes").split(",");
      filters = { ...filters, sizes };
      actualFilters = [...actualFilters, sizes];
    }
    if (args.has("subcategories")) {
      const subcategories = args.get("subcategories").split(",");
      filters = { ...filters, subcategories };
      actualFilters = [...actualFilters, subcategories];
    }

    if (args.has("colors")) {
      const colors = args.get("colors").split(",");
      filters = { ...filters, colors };
      actualFilters = [...actualFilters, colors];
    }
    console.log(filters, "filterrrrrrrr");
    this.setState({
      filters
    });
  };

  handleMinSlider = e => {
    e.preventDefault();
    const minprize = e.target.value * 1;

    if (minprize * 1 <= this.state.filters.maxprize) {
      this.setState({
        filters: { ...this.state.filters, minprize },
        page: 1
      });
    }
  };

  handleMaxSlider = e => {
    e.preventDefault();
    const maxprize = e.target.value * 1;

    if (maxprize >= this.state.filters.minprize) {
      this.setState({
        filters: { ...this.state.filters, maxprize },
        page: 1
      });
    }
  };

  toggleChangeCheckBox = e => {
    const toggle = (arr, item) =>
      arr.includes(item)
        ? arr.filter(i => i !== item) // remove item
        : [...arr, item]; // add item
    const element = e.target.id;
    let { sizes } = this.state.filters;

    const array = toggle(sizes, element);
    this.setState(
      {
        filters: { ...this.state.filters, sizes: array },
        page: 1
      },
      this.handleURLSearch
    );
  };
  toggleChangeCheckBoxSub = e => {
    const toggle = (arr, item) =>
      arr.includes(item)
        ? arr.filter(i => i !== item) // remove item
        : [...arr, item]; // add item
    const element = e.target.id;
    let { subcategories } = this.state.filters;

    const array = toggle(subcategories, element);
    this.setState(
      {
        filters: { ...this.state.filters, subcategories: array },

        page: 1
      },
      this.handleURLSearch
    );
  };

  toggleChangeCheckBoxColor = e => {
    const toggle = (arr, item) =>
      arr.includes(item)
        ? arr.filter(i => i !== item) // remove item
        : [...arr, item]; // add item
    const element = e.target.id;
    let { colors } = this.state.filters;

    const array = toggle(colors, element);
    this.setState(
      {
        filters: { ...this.state.filters, colors: array },
        page: 1
      },
      this.handleURLSearch
    );
  };
  callApi = async () => {
    const url = `/api/categories${window.location.pathname}`;
    const response = await fetch(url);
    console.log({ url });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  menuFixed = () => {
    const checkIfOver = menu => {
      if (menu) {
        menu.addEventListener("mouseover", () => {
          isMouseOver = true;
        });
        menu.addEventListener("mouseout", () => {
          isMouseOver = false;
        });
        return isMouseOver;
      }
    };
    window.addEventListener("scroll", e => {
      if (document.querySelector("header")) {
        const nav = document.querySelector("nav");
        const menu = document.querySelector("header");
      }

      if (document.querySelector(".catalog__filterFixed")) {
        let actualOffset = window.pageYOffset;
        const menu = document.querySelector(".catalog__filterFixed");
        const nav = document.querySelector("nav");
        let isMouseOver = checkIfOver(menu);
        const menuOffset =
          menu.parentElement.offsetTop - window.innerHeight * 0.06;

        if (
          menu &&
          !isMouseOver &&
          actualOffset - menuOffset + menu.offsetHeight <
            menu.parentElement.offsetHeight
        ) {
          if (actualOffset > menuOffset) {
            menu.style.marginTop = `${actualOffset - menuOffset}px`;
          } else if (actualOffset < menuOffset) {
            menu.style.marginTop = `0px`;
          }
        }
      }
    });
  };
  handleBackgroundImg = () => {
    const { mainCat } = this.state.linkProps.state.pathName;
    const bg = document.querySelector(".productSiteWrapper");
    // bg.style.backgroundImage = `url("/photos/men.jpg")`;

    if (document.body.clientWidth > 425) {
      switch (mainCat) {
        case "Kobiety":
          return {
            backgroundImage: `url('/photos/zaj.jpg')`
          };
          break;
        case "Mężczyźni":
          return {
            backgroundImage: `url('/photos/men.jpg')`
          };
          break;
        case "Suknie ślubne":
          return {
            backgroundImage: `url('/photos/sssss.jpg')`
          };
          break;
        default:
          return {};
      }
    } else {
      switch (mainCat) {
        case "Kobiety":
          return {
            backgroundImage: `url('/photos/women425.jpg')`
          };
          break;
        case "Mężczyźni":
          return {
            backgroundImage: `url('/photos/men425.jpg')`
          };
          break;
        case "Suknie ślubne":
          return {
            backgroundImage: `url('/photos/bride425.jpg')`
          };
          break;
        default:
          return {};
      }
    }
  };

  handleAnimations = () => {
    const titles = document.querySelector(".productSelectedName").childNodes;
    console.log(titles);
    const wrapper = document.querySelector(".productSiteWrapper").childNodes;
    const items = document.querySelector(".catalog__product-display")
      .childNodes;

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    tl.from(titles, 2, { x: -300, opacity: 0, stagger: 0.2 }).from(
      items,
      {
        y: 200,
        opacity: 0,
        stagger: 0.2,
        ease: "power0"
      },
      "-=1"
    );
  };
  componentDidMount() {
    this.handleULRstate();
    this.callApi()
      .then(res => {
        //////////READ ITEMS
        const items = res.kobiety.items;
        //////////SORT

        //////////////READ ROUTES
        const linkProps = res.linkProps;
        ////////////READ SIZE, SUBCATEGORIES
        const allSub = res.kobiety.items.map(item => {
          return item.subcategory;
        });
        const allS = res.kobiety.items.map(item => {
          return item.size;
        });
        const allC = res.kobiety.items.map(item => {
          return item.color;
        });
        let allSubCat = [];
        let allSizes = [];
        let allColors = [];

        allSub.forEach(item => {
          if (!allSubCat.includes(item)) {
            allSubCat.push(item);
          }
        });
        allS.forEach(arraySizes => {
          arraySizes.forEach(size => {
            if (!allSizes.includes(size)) {
              allSizes.push(size);
            }
          });
        });
        allC.forEach(item => {
          if (!allColors.includes(item)) {
            allColors.push(item);
          }
        });
        ///////////////////////READ MIN MAX
        const url = new URL(window.location.href);
        const args = new URLSearchParams(url.search);

        let maxprize = items[0].prize;
        let minprize = items[0].prize;

        items.forEach(item => {
          if (item.prize < minprize) minprize = item.prize;
          if (item.prize > maxprize) maxprize = item.prize;
        });

        if (!args.has("maxprize")) {
          this.setState({
            filters: {
              ...this.state.filters,
              maxprize
            }
          });
        }

        if (!args.has("minprize")) {
          this.setState({
            filters: {
              ...this.state.filters,
              minprize
            }
          });
        }

        if (!args.has("minprize") && !args.has("maxprize")) {
          this.setState({
            filters: {
              ...this.state.filters,
              minprize,
              maxprize
            }
          });
        }

        this.setState(
          {
            items,
            params: res.params,
            allSubCat,
            allSizes,
            allColors,
            allPrizes: { minprize, maxprize },
            filters: {
              ...this.state.filters
              // , maxprize, minprize
            },
            linkProps,
            isLoaded: true
          },
          () => {
            this.handleAnimations();
          }
        );
      })
      .catch(err => console.log(err));
  }

  handleFilters(items, filters) {
    const arrayOfItems = items;
    let afterItems = items;

    if (filters.sizes.length) {
      afterItems = arrayOfItems.filter(item => {
        let hasFilterProperty = false;

        item.size.forEach(itemSize => {
          filters.sizes.forEach(filter => {
            if (itemSize === filter) {
              hasFilterProperty = true;
            }
          });
        });

        return hasFilterProperty;
      });
    }

    if (filters.subcategories.length) {
      afterItems = afterItems.filter(item => {
        let hasFilterProperty = false;

        filters.subcategories.forEach(filter => {
          if (item.subcategory === filter) {
            hasFilterProperty = true;
          }
        });

        return hasFilterProperty;
      });
    }

    if (filters.colors.length) {
      afterItems = afterItems.filter(item => {
        let hasFilterProperty = false;

        filters.colors.forEach(filter => {
          if (item.color === filter) {
            hasFilterProperty = true;
          }
        });

        return hasFilterProperty;
      });
    }

    if (filters.maxprize * 1 !== this.state.allPrizes.maxprize) {
      afterItems = afterItems.filter(
        item => item.prize <= filters.maxprize * 1
      );
    }

    if (filters.minprize * 1 !== this.state.allPrizes.minprize) {
      afterItems = afterItems.filter(
        item => item.prize >= filters.minprize * 1
      );
    }

    switch (this.state.sort) {
      case "time":
        afterItems = afterItems.sort((a, b) => b.id - a.id);
        break;
      case "time-":
        afterItems = afterItems.sort((a, b) => a.id - b.id);
        break;
      case "prize":
        afterItems = afterItems.sort((a, b) => a.prize - b.prize);
        break;
      case "prize-":
        afterItems = afterItems.sort((a, b) => b.prize - a.prize);
        break;
      default:
        return;
    }

    return afterItems;
  }

  handleSort = e => {
    const sort = e.target.dataset.value;
    this.setState({
      sort,
      page: 1
    });
  };
  render() {
    const activeFilters = [<button className="activeFilters"></button>];
    const { allSubCat, allSizes, allColors, filters } = this.state;

    let items = this.handleFilters(this.state.items, filters);

    const numberOfItemsOnPage = 12;
    const numberOfPages = Math.ceil(items.length / numberOfItemsOnPage);
    const firstIndex = numberOfItemsOnPage * (this.state.page - 1);
    const lastIndex = numberOfItemsOnPage * this.state.page;
    const itemsLenght = items.length;
    items = items.slice(firstIndex, lastIndex);

    const sizes = [...allSizes];
    const selectSize = sizes.map(item => {
      const checked = this.state.filters.sizes.includes(item);

      return (
        <label className="noselect" htmlFor={item}>
          <li className="expanditem expanditem--selecting">
            <input
              type="checkbox"
              id={item}
              checked={checked}
              onChange={this.toggleChangeCheckBox}
            />
            {item}
          </li>
        </label>
      );
    });
    const arrayProducts = items;

    const listSub = allSubCat.map(item => {
      const checked = this.state.filters.subcategories.includes(item);

      return (
        <label className="noselect" htmlFor={item}>
          <li className="expanditem expanditem--selecting">
            <input
              type="checkbox"
              id={item}
              checked={checked}
              onChange={this.toggleChangeCheckBoxSub}
              // onClick= {console.log(this.state.filters.subcategories)}
            />
            {item}
          </li>
        </label>
      );
    });

    const listColors = allColors.map(item => {
      const checked = this.state.filters.colors.includes(item);

      return (
        <label className="noselect" htmlFor={item}>
          <li className="expanditem expanditem--selecting">
            <input
              type="checkbox"
              id={item}
              checked={checked}
              onChange={this.toggleChangeCheckBoxColor}
              // onClick= {console.log(this.state.filters.subcategories)}
            />
            {item}
          </li>
        </label>
      );
    });

    const listOfSorts = [
      ["time", "Od najnowszych"],
      ["time-", "Od najstarszych"],
      ["prize", "Od najtańszych"],
      ["prize-", "Od najdroższych"]
    ];
    const sortList = listOfSorts.map(elmnt => {
      return (
        <li
          onClick={this.handleSort}
          data-value={elmnt[0]}
          className="expanditem expanditem--selecting expanditem--sort"
        >
          {elmnt[1]}
        </li>
      );
    });

    const products = arrayProducts.map(item => {
      const path = `/product/${item.id}`;
      const linkProps = {
        pathname: path,
        state: {
          item
        }
      };

      return (
        <div key={item.id} className="item">
          <div className="item__picture">
            <Link to={linkProps}>
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
            </Link>
          </div>
          <p className="item__product-name">{item.name}</p>
          <p className="product__prize">{item.prize} PLN</p>
        </div>
      );
    });

    const prizeSlider = [<></>];
    const filtersJSX = [
      <>
        <div className="filterwg">Filtruj według</div>
        <li className="catalog__mainFilter">
          <div
            onClick={e => {
              e.target.nextSibling.classList.toggle(
                "catalog__exapandFilter--open"
              );
            }}
            className="catalog__mainText"
          >
            Kategoria
          </div>
          <div className="catalog__exapandFilter ">{listSub}</div>
        </li>
      </>,
      <>
        <li className="catalog__mainFilter">
          <div
            onClick={e => {
              e.target.nextSibling.classList.toggle(
                "catalog__exapandFilter--open"
              );
            }}
            className="catalog__mainText "
          >
            CENA
          </div>
          <div className="catalog__exapandFilter">
            <div id="rangeFilter"></div>
            <div className="catalog__filterRange">
              <div className="catalog__min">
                MIN: {this.state.filters.minprize}
                <input
                  className="catalog__minslider"
                  onChange={this.handleMinSlider}
                  onMouseUp={e => {
                    e.preventDefault();
                    return this.handleURLSearch();
                  }}
                  onPointerUp={e => {
                    e.preventDefault();
                    return this.handleURLSearch();
                  }}
                  onTouchUp={e => {
                    e.preventDefault();
                    return this.handleURLSearch();
                  }}
                  value={this.state.filters.minprize}
                  step="0.01"
                  type="range"
                  max={this.state.allPrizes.maxprize}
                  min={this.state.allPrizes.minprize}
                />
              </div>
              <div className="catalog__max">
                MAX: {this.state.filters.maxprize}
                <input
                  className="catalog__maxslider"
                  onChange={this.handleMaxSlider}
                  onMouseUp={e => {
                    e.preventDefault();
                    return this.handleURLSearch();
                  }}
                  onPointerUp={e => {
                    e.preventDefault();
                    return this.handleURLSearch();
                  }}
                  onTouchUp={e => {
                    e.preventDefault();
                    return this.handleURLSearch();
                  }}
                  value={this.state.filters.maxprize}
                  type="range"
                  step="0.01"
                  max={this.state.allPrizes.maxprize}
                  min={this.state.allPrizes.minprize}
                />
                {prizeSlider}
              </div>
            </div>
          </div>
        </li>
      </>,
      <>
        <li className="catalog__mainFilter">
          <div
            onClick={e => {
              e.target.nextSibling.classList.toggle(
                "catalog__exapandFilter--open"
              );
            }}
            className="catalog__mainText"
          >
            Rozmiar
          </div>
          <div className="catalog__exapandFilter">{selectSize}</div>
        </li>
      </>,
      <>
        <li className="catalog__mainFilter">
          <div
            onClick={e => {
              e.target.nextSibling.classList.toggle(
                "catalog__exapandFilter--open"
              );
            }}
            className="catalog__mainText"
          >
            Kolory
          </div>
          <div className="catalog__exapandFilter ">{listColors}</div>
        </li>
        <li className="catalog__mainFilter">
          <div
            onClick={e => {
              e.target.nextSibling.classList.toggle(
                "catalog__exapandFilter--open"
              );
            }}
            className="catalog__mainText"
          >
            Sortuj
          </div>
          <div className="catalog__exapandFilter ">{sortList}</div>
        </li>
        <li className="catalog__mainFilter ">
          <div
            onClick={e => {
              this.setState(
                {
                  filters: {
                    minprize: this.state.allPrizes.minprize,
                    maxprize: this.state.allPrizes.maxprize,
                    sizes: [],
                    subcategories: [],
                    colors: []
                  }
                },
                this.handleURLSearch
              );
              document
                .querySelector(".catalog__filterList")
                .classList.toggle("catalog__filterList--open");
              this.setState({
                page: 1
              });
            }}
            className="catalog__mainText catalog__mainFilter--BTNS"
          >
            WYCZYŚĆ ({this.state.items.length})
          </div>
        </li>
        <li className="catalog__mainFilter ">
          <div
            onClick={e => {
              document
                .querySelector(".catalog__filterList")
                .classList.toggle("catalog__filterList--open");
              this.setState({
                page: 1
              });
            }}
            className="catalog__mainText catalog__mainFilter--BTNS"
          >
            POTWIERDŹ ({itemsLenght})
          </div>
        </li>
      </>
    ];
    let pathLink;
    let pathName;
    if (typeof this.state.linkProps.state !== "undefined") {
      pathLink = this.state.linkProps.state.pathLink;
      pathName = this.state.linkProps.state.pathName;
    } else {
      pathLink = "";
      pathName = "";
    }

    const routeInProducts = [
      <div className="RouteText__text">
        <a className="routeText" href="/">
          Strona głowna
        </a>
        /
        <a className="routeText" href={`${pathLink.mainCat}`}>
          {pathName.mainCat}
        </a>
        /<a className="routeText routeText--selected">{pathName.category}</a>
      </div>
    ];

    if (this.state.isLoaded) {
      return (
        <>
          <div
            style={{ backgroundImage: "none" }}
            className="productSiteWrapper"
          >
            <div
              style={this.handleBackgroundImg()}
              className="headerProductsSite"
            >
              <div className="absoluteHeader"></div>
              <div className="productSelectedName">
                <h2 className="productSelectedName__typeInfo">
                  {pathName.category}
                </h2>
                <h1 className="productSelectedName__type">
                  {pathName.mainCat}
                </h1>
              </div>
            </div>

            <div className="route">
              <div className="routeText">
                {routeInProducts}
                <div className="numberOfItems">
                  {numberOfItemsOnPage * (this.state.page - 1) + 1}-
                  {numberOfItemsOnPage * this.state.page - 1 < itemsLenght
                    ? numberOfItemsOnPage * this.state.page - 1
                    : itemsLenght}{" "}
                  z {itemsLenght} produktów
                </div>
              </div>
            </div>

            <div className="mobile">
              <div
                className="btnFilter"
                onClick={e => {
                  document
                    .querySelector(".catalog__filterList")
                    .classList.toggle("catalog__filterList--open");
                }}
              >
                Filtruj
              </div>
            </div>
            <div className="catalog">
              <div className="catalog__filter catalog__filter--fixed">
                <div className="catalog__filterFixed">
                  <ul className="catalog__filterList">{filtersJSX}</ul>
                </div>
              </div>
              <div className="catalog__product-display">
                {itemsLenght ? (
                  products
                ) : (
                  <div className="noItems">Brak Wyników</div>
                )}
              </div>
            </div>
            <div className="number-page">
              <div
                onClick={e => {
                  if (this.state.page > 1) {
                    const page = this.state.page - 1;
                    this.setState({ page });
                    document.body.scrollTo(0, 0);
                  }
                }}
                className="number-page__container"
              >
                {"<"}
              </div>
              <div className="number-page__container">
                {this.state.page} z {numberOfPages}
              </div>
              <div
                onClick={e => {
                  if (this.state.page < numberOfPages) {
                    const page = this.state.page + 1;
                    this.setState({ page });
                    document.body.scrollTo(0, 0);
                  }
                }}
                className="number-page__container"
              >
                >
              </div>
            </div>
          </div>
        </>
      );
    } else
      return (
        <div className="loadingSite">
          <div class="loading" style={{ position: "absoulte", margin: "auto" }}>
            Ładowanie strony...
          </div>
        </div>
      );
  }
}
