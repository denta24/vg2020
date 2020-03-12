import React, { Component } from "react";
import "./css/Cart.css";
import Cookies from "js-cookie";

export default class Cart extends Component {
  state = {
    cart: [],
    customerInfo: {},
    isClicked: false
  };

  componentDidMount() {
    if (Cookies.get("shoppingCartVellutoGiorno")) {
      const cookiesLog = JSON.parse(Cookies.get("shoppingCartVellutoGiorno"));
      console.log(cookiesLog);
      this.setState({
        cart: cookiesLog
      });
    }
  }
  handleDelete = (e, index) => {
    this.props.cookiesDeleteItem(index);
  };
  sendOrder = () => {
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const street = document.getElementById("street").value;
    const city = document.getElementById("city").value;
    const numberStreet = document.getElementById("numberStreet").value;
    const adressCode = document.getElementById("adressCode").value;
    const telephone = document.getElementById("telephone").value;
    const email = document.getElementById("email").value;
    const delivery = document.querySelector(".delivery");

    const divName = document.getElementById("name");
    const divSurname = document.getElementById("surname");
    const divTelephone = document.getElementById("telephone");
    const divEmail = document.getElementById("email");

    var text = delivery.options[delivery.selectedIndex].text;
    const orderMove = document.querySelector(".form-containers");
    const orderForm = document.querySelector(".orderForm");

    if (name === "") {
      divName.classList.add("validForm");
    } else divName.classList.remove("validForm");

    if (surname === "") {
      divSurname.classList.add("validForm");
    } else divSurname.classList.remove("validForm");

    if (telephone === "") {
      divTelephone.classList.add("validForm");
    } else divTelephone.classList.remove("validForm");

    if (email === "") {
      divEmail.classList.add("validForm");
    } else divEmail.classList.remove("validForm");

    const isformValid =
      name !== "" && surname !== "" && telephone !== "" && email !== "";

    if (isformValid) {
      var style = window.getComputedStyle(orderForm);
      var marginRight = style.getPropertyValue("margin-right");
      let marginRight1 = marginRight.split(""); // or newStr = [...str];
      marginRight1.splice(-2, 2);
      marginRight1 = marginRight1.join("");

      console.log({ marginRight1 });

      const translate = orderForm.offsetWidth + marginRight1 * 1;
      orderMove.style.transform = `translateX(${-translate}px)`;

      const customerInfo = {
        name,
        surname,
        city,
        adressCode,
        street,
        numberStreet,
        telephone,
        email,
        deliveryMethod: text
      };
      this.setState({
        customerInfo,
        isClicked: true
      });
    }
    const form = document.querySelector(".orderForm");
    const formPosition =
      document.body.scrollTop +
      form.getBoundingClientRect().top -
      window.innerHeight * 0.1;
    console.log(formPosition);

    document.body.scrollTo({
      top: formPosition,
      behavior: "smooth"
    });
  };
  sendToBackEnd = () => {
    const { cart, customerInfo } = this.state;
    const now = new Date();
    const dat1 = now.toString();
    const date = dat1.slice(0, 24);

    const data = {
      cart,
      customerInfo,
      date
    };
    console.log(data);

    if (cart.length !== "") {
      fetch("/api/newOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => {
          console.log("Dodałem użytkownika:");
          console.log(res);
        });
    } else alert("Popraw dane");
    this.props.clearCart();

    const popup = document.querySelector(".popup");
    popup.style.display = "block";
  };

  resetCart = () => {};
  render() {
    const items = this.state.cart;
    let suma = 0;
    items.forEach(item => (suma += item.prize));

    let info = [];
    if (this.state.isClicked) {
      const {
        name,
        surname,
        city,
        adressCode,
        telephone,
        email,
        street,
        numberStreet,
        deliveryMethod
      } = this.state.customerInfo;
      info = [
        <div className="orderForm">
          <div className="orderForm__personalInfo">
            <span className="Text text__delivery">
              Sprawdź poprawność danych
            </span>
            {`${name}`}
            {`${surname}`}
            <br />
            {street} {numberStreet}
            <br />
            {`${adressCode}`}
            {`${city}`}
            <br />
            {`${telephone}`}
            <br />
            {`${email}`}
            <br />
            {`${deliveryMethod}`}
            <br />
            <button
              onClick={() => {
                const orderMove = document.querySelector(".form-containers");
                orderMove.style.transform = "translateX(0)";
              }}
              class="sendOrder"
            >
              wróć
            </button>
          </div>
          <div className="orderForm__delivery">
            <span className="deliveryInfo">
              Dostawę zamówionych produktów realizujemy za pośrednictwem firmy
              kurierskiej DPD <br />
              <br />
              Koszt przesyłki naliczamy zgodnie z taryfikatorem: <br />
              <br />
              <b>13,99 zł</b> przesyłka za wcześniejszym przelewem na konto
              <br /> <b>21,99 zł</b> przesyłka pobraniowa
              <br />
              <br /> W przypadku wysyłki za granicę koszt zgodnie z cennikiem
              Poczty Polskiej.
            </span>
            <button onClick={this.sendToBackEnd} class="sendOrder">
              Potwierdź zamówienie
            </button>
          </div>
        </div>
      ];
    }

    console.log(info);
    const listOfProducts = items.map((item, index) => {
      return (
        <div className="singleProduct">
          <div className="singleProduct__image">
            <a href={`/product/${item.id}`}>
              <img src={item.imgSrc[0]} width="100" alt="" />
            </a>
          </div>
          <div className="singleProduct__name">
            <a href={`/product/${item.id}`}>{item.name}</a>

            <div className="sizes">
              <div className="singleProduct__info">
                <div className="singleProduct__info-des">ROZMIAR:</div>
                <div className="singleProduct__info-des">Kolor:</div>
                <div className="singleProduct__info-des">Liczba sztuk:</div>
              </div>
              <div className="singleProduct__info">
                <div className="singleProduct__info-des">{item.size}</div>
                <div className="singleProduct__info-des">{item.color}</div>
                <div className="singleProduct__info-des"> 1</div>
              </div>
            </div>
            <button onClick={e => this.handleDelete(e, index)}>USUŃ</button>
          </div>

          <div className="singleProduct__prize"> {item.prize} PLN</div>
        </div>
      );
    });

    const orderInfo = [
      <div className="orderForm">
        <div className="orderForm__personalInfo">
          <span className="Text text__delivery"> Wprowadz swoje dane</span>
          <form action="">
            <input id="name" type="text" placeholder="Imię*" />
            <input id="surname" type="text" placeholder="Nazwisko*" />
            <input id="street" type="text" placeholder="Ulica" />
            <input
              id="numberStreet"
              type="text"
              placeholder="Numer mieszkania/lokalu"
            />
            <input id="city" type="text" placeholder="Miejscowość" />
            <input id="adressCode" type="text" placeholder="Kod Pocztowy" />
            <input
              id="telephone"
              type="tel"
              placeholder="Numer Telefonu*"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              required
            ></input>
            <input id="email" type="text" placeholder="E-mail*" />
          </form>
          <div style={{ color: "gray", fontSize: "11px", margin: "2vh 2vw 0" }}>
            * - pola wymagane
          </div>
        </div>
        <div className="orderForm__delivery">
          <span className="Text text__delivery"> Wybierz metodę płatności</span>
          <select className="delivery" name="delivery">
            <option id="option" value="courier">
              Płatność przy odbiorze
            </option>
            <option id="option" value="account">
              Przelew na konto
            </option>
          </select>
          <span className="deliveryInfo">
            Dostawę zamówionych produktów realizujemy za pośrednictwem firmy
            kurierskiej DPD <br />
            <br />
            Koszt przesyłki naliczamy zgodnie z taryfikatorem: <br />
            <br />
            <b>13,99 zł</b> przesyłka za wcześniejszym przelewem na konto
            <br /> <b>21,99 zł</b> przesyłka pobraniowa
            <br />
            <br /> W przypadku wysyłki za granicę koszt zgodnie z cennikiem
            Poczty Polskiej.
          </span>
          <button onClick={this.sendOrder} class="sendOrder">
            Przejdź dalej
          </button>
        </div>
      </div>
    ];

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
            <div className="popup__title">Zamówienie zaakceptowane</div>
            Zamówienie zostało pomyślnie wysłane. Prosimy sprawdzić dane
            płatności na Państwa adresie mailowym.
            <br />
            <br />
            Jeżeli nie widzą Państwo mail'a prosimy o sprawdzenie zakładki -
            SPAM.{" "}
          </div>
          <button
            onClick={() => {
              window.location.href = "/";
              document.querySelector(".popup").style.display = "none";
            }}
            class="sendOrder"
          >
            Zakończ
          </button>
        </div>
      </div>
    ];

    return (
      <>
        <div className="productSiteWrapper">
          <div class="orderHeader">
            <div class="orderHeaderMask">
              <div className="orderHeaderMask__your-order">
                <span class="Text">Twoje zamówienie</span>
              </div>
            </div>
          </div>
          <div className="orderWrapper">
            <div className="orderedProducts">
              <div className="allProducts">
                {listOfProducts}

                <div className="singleProduct singleProduct--suma">
                  <div className="singleProduct--suma__des">SUMA</div>
                  <div className="singleProduct--suma__des">
                    {suma.toFixed(2)} PLN
                  </div>
                </div>
              </div>
            </div>

            <div className="form-containers">
              {orderInfo}
              {info}
            </div>
          </div>
        </div>
        {popup}
      </>
    );
  }
}
