import React, { Component } from "react";

export default class AdminAdd extends Component {
  state = {
    item: {
      id: "1",
      name: "Sukienka z otwartym krojem na studniówkę",
      mainCategory: "Kobiety",
      category: "",
      subcategory: "Sukienka wieczorowa",
      prize: 1219.99,
      size: [""],
      color: "Biały",
      description: "Opis produktu",
      imgSrc: ["/photos/sukniaslubna.JPG", "/photos/sukniaslubna.JPG"]
    },
    test: {
      color: "black"
    },
    files: [],
    preview: ["/photos/sukniaslubna.JPG", "/photos/sukniaslubna.JPG"],
    measure: [""],
    measureFiles: [],
    isProductAdded: false,
    messageBackend: ""
  };

  isLoaded = true;
  categoriesNav = [
    {
      name: ["Kobiety", "kobiety"],
      titles: [
        ["Sukienki", "sukienki"],
        ["Suknie na studniówkę", "sukienki-na-studniowke"],
        ["Kurtki & Płaszcze", "kurtki-plaszcze"],
        ["Spodnie", "spodnie"],
        ["Koszule", "koszule"],
        ["Obuwie", "obuwie"],
        ["Biżuteria", "bizuteria"],
        ["Torebki", "torebki"]
      ]
    },
    {
      name: ["Mężczyźni", "mezczyzni"],
      titles: [
        ["Garnitury", "garnitury"],
        ["Marynarki", "marynarki"],
        ["Koszule", "koszule"],
        ["Spodnie", "spodnie"],
        ["Płaszcze", "plaszcze"],
        ["Obuwie", "obuwie"],
        ["Akcesoria", "akcesoria"]
      ]
    },
    {
      name: ["Suknie ślubne", "suknie-slubne"],
      titles: [
        ["Suknie", "suknie"],
        ["Obuwie", "obuwie"],
        ["Dodatki", "dodatki"]
      ]
    }
  ];

  sendToBackEnd = e => {
    const data = this.state.item;
    const { files, measureFiles } = this.state;
    function getFormData(object) {
      const formData = new FormData();
      Object.keys(object).forEach(key => formData.append(key, object[key]));
      return formData;
    }
    const productBody = getFormData(data);
    if (files) {
      files.forEach((file, index) => {
        productBody.append(`images`, file, file.name);
      });
      productBody.append("imageLenght", files.length);
    }
    if (files) {
      measureFiles.forEach((file, index) => {
        productBody.append(`images`, file, file.name);
      });
      productBody.append("measureLength", measureFiles.length);
    }

    for (var pair of productBody.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    if (
      data.mainCategory !== "" &&
      data.category !== "" &&
      data.subcategory != ""
    ) {
      fetch("/api/newProduct", {
        method: "POST",
        headers: {
          Accept: "application/json"
          // "Content-Type": "multipart/form-data"
        },
        body: productBody
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          this.setState({ isProductAdded: true, messageBackend: res.message });
        });
    } else alert("Coś zle, popraw dane");
  };

  handleNameInput = e => {
    const name = e.target.value;
    this.setState({
      item: {
        ...this.state.item,
        name
      }
    });
  };
  handleSubcategoryInput = e => {
    const subcategory = e.target.value;
    this.setState({
      item: {
        ...this.state.item,
        subcategory
      }
    });
  };

  handlePrizeInput = e => {
    const prize = e.target.value * 1;
    this.setState({
      item: {
        ...this.state.item,
        prize
      }
    });
  };
  handleColorInput = e => {
    const color = e.target.value;
    this.setState({
      item: {
        ...this.state.item,
        color
      }
    });
  };

  handleGenderInput = e => {
    const mainCategory = e.target.value;
    this.setState({
      item: {
        ...this.state.item,
        mainCategory
      }
    });
  };

  handleTypeInput = e => {
    const category = e.target.value;
    this.setState({
      item: {
        ...this.state.item,
        category
      }
    });
  };

  handleSizeInput = e => {
    const size = e.target.value.split(",");
    this.setState({
      item: {
        ...this.state.item,
        size
      }
    });
  };

  handleDescriptionInput = e => {
    const description = e.target.value;
    this.setState({
      item: {
        ...this.state.item,
        description
      }
    });
  };

  handleMiniImgClick = e => {
    document.querySelector(".product__image").src = e.target.src;
  };

  handleLoadImg = e => {
    if (e.target.files.length) {
      const { files } = this.state;
      const [file] = e.target.files;
      files.push(file);

      this.setState({
        image: files,
        files
      });
      // };
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        this.setState({
          preview: []
        });
        reader.addEventListener(
          "load",
          () => {
            this.setState(prevState => ({
              preview: [...prevState.preview, reader.result]
            }));
          },
          false
        );

        if (files[i]) {
          reader.readAsDataURL(files[i]);
        }
      }
    }
  };
  handleLoadImgMeasure = e => {
    if (e.target.files.length) {
      const { measureFiles } = this.state;
      const [file] = e.target.files;
      measureFiles.push(file);

      this.setState({
        measureFiles
      });
      // };
      for (let i = 0; i < measureFiles.length; i++) {
        const reader = new FileReader();
        this.setState({
          measure: []
        });
        reader.addEventListener(
          "load",
          () => {
            this.setState(prevState => ({
              measure: [...prevState.measure, reader.result]
            }));
          },
          false
        );

        if (measureFiles[i]) {
          reader.readAsDataURL(measureFiles[i]);
        }
      }
    }
  };

  render() {
    const { item, preview, measure, measureFiles } = this.state;
    console.log({ measure, measureFiles });
    const [categories] = this.categoriesNav.filter(
      item => item.name[0] === this.state.item.mainCategory
    );

    const categoriesList = categories.titles.map(item => {
      return <option value={item[0]}>{item[0]}</option>;
    });

    const mini_items = preview.map(item => (
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

    const allSizes = item.size.map(item => (
      <button className="product__button">{item}</button>
    ));

    const popup = [
      <div style={{ display: "block" }} className="popup">
        <div
          onClick={e => {
            this.setState({ isProductAdded: false });
          }}
          className="popup__background"
        ></div>
        <div className="popup__content">
          <div className="popup__contentText">
            <div className="popup__title">Produkt dodano</div>
            {this.state.messageBackend}
          </div>
          <button
            onClick={() => {
              this.setState({ isProductAdded: false });
            }}
            class="sendOrder"
          >
            Zakończ
          </button>
        </div>
      </div>
    ];

    if (this.isLoaded) {
      return (
        <>
          <div className="forms">
            <label htmlFor="category" onChange={this.handleGenderInput}>
              Pozycja w menu
            </label>
            <select onChange={this.handleGenderInput} id="category">
              <option selected value=""></option>
              <option value="Kobiety">Kobiety</option>
              <option value="Mężczyźni">Mężczyźni</option>
              <option value="Suknie ślubne">Suknie ślubne</option>
            </select>

            <label htmlFor="type">Podkategoria</label>
            <select onChange={this.handleTypeInput} id="type">
              <option selected value=""></option>

              {categoriesList}
            </select>
            <label htmlFor="name">Nazwa</label>

            <input
              id="name"
              className="forms__text"
              type="text"
              onChange={this.handleNameInput}
            />
            <label htmlFor="prize">Cena</label>
            <input
              id="prize"
              className="forms__text"
              type="number"
              onChange={this.handlePrizeInput}
            />
            <label htmlFor="sub">Kategoria w filtrach (np. Krótki rękaw)</label>
            <input
              id="sub"
              className="forms__text"
              type="text"
              onChange={this.handleSubcategoryInput}
            />
            <label htmlFor="color">Kolor</label>
            <input
              id="color"
              className="forms__text"
              type="text"
              onChange={this.handleColorInput}
            />

            <label htmlFor="size">Rozmiary(po przecinku np: XLL,S,L)</label>
            <input
              id="size"
              className="forms__text"
              type="text"
              onChange={this.handleSizeInput}
            />

            {/* ///////////////////////// */}
            <label for="picture">Zdjęcia:</label>

            <input
              onChange={this.handleLoadImg}
              type="file"
              id="picture"
              name="picture"
              accept="image/jpeg"
            />
            <button
              style={{ width: "40px" }}
              onClick={() => {
                this.setState({
                  preview: [
                    "/photos/sukniaslubna.JPG",
                    "/photos/sukniaslubna.JPG"
                  ],
                  files: []
                });
              }}
            >
              X
            </button>

            {/* ///////////////////////// */}
            <label for="picture">Tabela rozmiarow:</label>

            <input
              onChange={this.handleLoadImgMeasure}
              type="file"
              id="measure"
              name="measure"
              accept="image/jpeg"
            />
            <button
              style={{ width: "40px" }}
              onClick={() => {
                this.setState({
                  measure: [],
                  measureFiles: []
                });
              }}
            >
              X
            </button>
            {/* ///////////////////////// */}

            <label for="description">Opis:</label>
            <textarea
              onChange={this.handleDescriptionInput}
              id="description"
              rows="4"
              cols="50"
            >
              Opis produktu
            </textarea>
          </div>

          <div className="product ">
            <div className="product__mini">{mini_items}</div>
            <div className="product__photos">
              <div className="product__imgContainer">
                <img src={preview[0]} alt="" className="product__image" />
              </div>
            </div>
            <div className="product__info ">
              <div className="companyName">Velluto Giorno</div>
              <div className="product__name-prize-container">
                <h1 className="product__name product__name--item">
                  {item.name}
                </h1>
                <h1 className="product__prize product__prize--item">
                  {item.prize} <span className="product__name">PLN</span>
                </h1>
                <h2 className="product__color">Kolor: {item.color}</h2>
                {item.size[0] === "" ? null : (
                  <>
                    <h2 className="product__size">Rozmiar: </h2>
                    <div className="product__buttons">{allSizes}</div>
                  </>
                )}
                <div className="product__addContainer">
                  <div
                    className="product__add product__addText--accept"
                    onClick={this.sendToBackEnd}
                  >
                    <div className="product__addText ">Zatwierdź</div>
                  </div>
                </div>

                <div className="product__description product__expanding--open">
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
                  <div className="product__expanding product__expanding--open">
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

                <div className="product__description product__expanding--open">
                  <div
                    onClick={e => {
                      e.target.nextSibling.classList.toggle(
                        "product__expanding--open"
                      );
                    }}
                    className="product__clickToInfo "
                  >
                    Tabela rozmiarów
                  </div>
                  <div className="product__expanding product__expanding--open">
                    <div className="product__imgContainer">
                      <img src={measure[0]} alt="" className="product__image" />
                    </div>
                  </div>
                </div>

                <h2 className="product__color product__color--bold">
                  Kategoria w menu: <span>{item.mainCategory}</span>
                  <br /> Kategoria w submenu: <span> {item.category}</span>
                  <br /> Kategoria w filtrach: <span>{item.subcategory}</span>
                </h2>
                <h2 className="product__color"></h2>
              </div>
            </div>{" "}
          </div>
          {this.state.isProductAdded ? popup : null}
        </>
      );
    } else return <h2 className="product__name">Loading...</h2>;
  }
}
