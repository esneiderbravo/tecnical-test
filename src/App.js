import { Component } from 'react';
import ReactDOM from 'react-dom'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import logoLeading from './images/logo_white.svg';
import "./font-awesome/css/font-awesome.min.css";
import axios from "axios";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentWillMount() {
        fetch('https://demo9283427.mockable.io/products ')
            .then((response) => {
                return response.json()
            })
            .then((prod) => {
                this.setState({ products: prod })
            })
    }
  render(){
    return (
        <div className="App bg-dark style-app">
            <div className="style-body-app">
                <nav className="navbar navbar-expand-lg w-75 mr-auto text-light ml-auto style-nav">
                    <img src={logoLeading} alt="" width="150px"/>
                    <a className="navbar-brand ml-3 text-muted" href="#">Application</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-muted" href="#" id="navbarDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Search
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </li>
                        </ul>
                        <ul className="navbar-nav align-content-center mr-auto">
                            <li className="nav-item dropdown">
                                <h1 className="text-muted">QA</h1>
                            </li>
                        </ul>
                        <ul className="navbar-nav align-content-end">
                            <li className="nav-item dropdown">
                                <a className="navbar-brand ml-3 text-muted" href="#">USER ADMIN</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="navbar-brand ml-3 text-muted" href="#">DASHBOARD</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-muted" href="#" id="navbarDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    ADMIN
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="style-div-content w-75 mr-auto ml-auto">
                    <div className="style-div-title1">
                        <h2 className="style-title1">Advances for Syndication</h2>
                    </div>
                    <div className="style-div-content-data mr-auto ml-auto mt-5">
                        <div className="row mr-auto ml-auto">
                            <div className="style-section-products mr-auto ml-auto">
                                <div className="style-title2">
                                    <small>Select a product for syndicate </small>
                                </div>

                                <div className="row style-row-product mr-auto ml-auto">
                                    {this.state.products.map(product => {
                                        return (
                                        <button key={product.product_id} id={product.product_id} className="btn-product row mr-auto ml-auto" onClick={(e) => selectProduct(product)}>
                                            <div className="col">
                                                <p className="text-left">Product ID</p>
                                                <h6>{product.product_id}</h6>
                                            </div>
                                            <div className="col">
                                                <p className="m-0">{product.type}</p>
                                                <p className="m-0">{product.date}</p>
                                                <h6 className="m-0">${new Intl.NumberFormat().format(product.price)}</h6>
                                            </div>
                                        </button>
                                    );
                                    })}
                                </div>
                            </div>
                            <div id="section-details" className="style-section-details">

                            </div>
                        </div>

                        <div id="footer-details" className="footer-details justify-content-end d-none">
                            <span>% Remaining <h5 id="remaining"></h5></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
export default App;

function calcRemaning(product) {
    let suma = 0;
    for (let i = 0; i < product.purchases.length; i++){
        suma += product.purchases[i].sold;
    }
    let remaining = (suma/product.price) * 100;
    remaining = Math.round(remaining);

    document.getElementById('remaining').textContent = remaining + '%';
}

function selectProduct(product) {
    calcRemaning(product);
    console.log(product);
    var els = document.querySelectorAll('.bg-product-selected')
    _removeClasses(els)
    document.getElementById(product.product_id).classList.add("bg-product-selected");
    document.getElementById('footer-details').classList.remove("d-none");

    if (product.purchases.length > 0){
        const  htmlDetails =<div className="style-section-details1">
                                <div className="style-title3">
                                    <p className="text-left ml-3 border-bottom w-50 font-weight-bold">Product ID {product.product_id}</p>
                                    <button type="button" className="style-button-add-more" onClick={(e) => add_purchase(product)}>
                                        <h1>+</h1>
                                    </button>
                                </div>
                                <div className="table-details-investors">
                                    <table className="w-100">
                                        <thead className="thead-investors">
                                        <tr>
                                            <td>Investor name</td>
                                            <td>Sold</td>
                                            <td>% Purchased</td>
                                            <td>Left amount</td>
                                            <td>% Remaining</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {product.purchases.map(purchase => {
                                            return ( purchase.only_read ?
                                                    <tr className="style-row-investor">
                                                        <td>{purchase.name}</td>
                                                        <td>${new Intl.NumberFormat().format(purchase.sold)}</td>
                                                        <td>{purchase.purchased}</td>
                                                        <td>${new Intl.NumberFormat().format(purchase.left_amount)}</td>
                                                        <td>{purchase.remaining}</td>
                                                        <td>

                                                            <button className="style-button-edit" onClick={(e) => delete_purchase(product, purchase)}>
                                                                <i className="fa fa-times-circle"
                                                                   aria-hidden="true"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    :
                                                    <tr className="style-row-investor">
                                                        <td>{purchase.name}</td>
                                                        <td>${new Intl.NumberFormat().format(purchase.sold)}</td>
                                                        <td>{purchase.purchased}</td>
                                                        <td>${new Intl.NumberFormat().format(purchase.left_amount)}</td>
                                                        <td>{purchase.remaining}</td>
                                                        <td>
                                                            <button className="style-button-edit mr-1" onClick={(e) => edit_purchase(product, purchase)}>
                                                                <i className="fa fa-pencil" aria-hidden="true"></i>
                                                            </button>
                                                            <button className="style-button-edit" onClick={(e) => delete_purchase(product, purchase)}>
                                                                <i className="fa fa-times-circle"
                                                                   aria-hidden="true"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                            );
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>;
        ReactDOM.render(htmlDetails, document.getElementById('section-details'));
    } else {
        const  htmlDetails =<div>
            <div className="style-title3">
                <p className="text-left ml-3 border-bottom w-50 font-weight-bold">Product ID {product.product_id}</p>
                <button type="button" className="style-button-add-more" onClick={(e) => add_purchase(product)}>
                    <h1>+</h1>
                </button>
            </div>
            <div className="table-details-investors">
                <table className="w-100">
                    <thead className="thead-investors">
                    <tr>
                        <td>Investor name</td>
                        <td>Sold</td>
                        <td>% Purchased</td>
                        <td>Left amount</td>
                        <td>% Remaining</td>
                        <td></td>
                        <td></td>
                    </tr>
                    </thead>
                </table>
                <h6 className="mr-auto ml-auto mt-5 text-muted">Add a new purchase clicking <i className="fa fa-plus text-dark text-muted" aria-hidden="true"></i> button</h6>
            </div>
        </div>;
        ReactDOM.render(htmlDetails, document.getElementById('section-details'));
    }
}

function _removeClasses(els) {
    for (var i = 0; i < els.length; i++) {
        els[i].classList.remove('bg-product-selected')
    }
}

function add_purchase(product) {
    let investors = [];
    axios.get('https://demo9283427.mockable.io/investors')
        .then(function (response) {
            console.log(response);
            if (response.status == 200) {
                investors = response.data;
                console.log(investors);
                const  htmlDetails =
                    <div>
                        <div className="style-title3">
                            <p className="text-left ml-3 border-bottom w-50 font-weight-bold">Product ID {product.product_id}</p>
                            <button type="button" className="style-button-add-more">
                                <h1>+</h1>
                            </button>
                        </div>
                        <div className="style-title4">
                            <p className="text-left ml-3">Add new purchase</p>
                        </div>
                        <div className="row form-inline style-row-new-investor">
                            <div className="col">
                                <label className="text-color" htmlFor="">Investor</label>
                                <select key={product.product_id} className="form-control ml-3" name="" id={'sel-investor-'+product.product_id}>
                                    <option value="" selected>Select investor</option>
                                    {
                                        investors.map((investor) =>
                                            <option value={investor.investor_id}>{investor.name}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className="col">
                                <label className="text-color" htmlFor="">Amount to sell</label>
                                <input type="number" className="form-control" id={'amount-investor-'+product.product_id} placeholder="$0"/>
                            </div>
                            <div className="col">
                                <button type="button" className="style-button-save mt-4 mr-1" onClick={(e) => savePurchase(product)}>
                                    <i className="fa fa-save fa-2x" aria-hidden="true"></i>
                                </button>
                                <button type="button" className="style-button-save mt-4" onClick={(e) => selectProduct(product)}>
                                    <i className="fa fa-undo fa-2x" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                ReactDOM.render(htmlDetails, document.getElementById('section-details'));
            } else {
                const  htmlDetails =
                    <div>
                        <div className="style-title3">
                            <p className="text-left ml-3 border-bottom w-50 font-weight-bold">Product ID {product.product_id}</p>
                            <button type="button" className="style-button-add-more">
                                <h1>+</h1>
                            </button>
                        </div>
                        <div className="style-title4">
                            <p className="text-left ml-3">Add new purchase</p>
                        </div>
                        <div className="row form-inline style-row-new-investor">
                            <div className="col">
                                <label className="text-color" htmlFor="">Investor</label>
                                <select key={product.product_id} className="form-control ml-3" id={'sel-investor-'+product.product_id}>
                                    <option value="" selected>Select investor</option>
                                </select>
                            </div>
                            <div className="col">
                                <label className="text-color" htmlFor="">Amount to sell</label>
                                <input type="number" className="form-control" id={'amount-investor-'+product.product_id} placeholder="$0"/>
                            </div>
                            <div className="col">
                                <button type="button" className="style-button-save mt-4 mr-1">
                                    <i className="fa fa-save fa-2x" aria-hidden="true"></i>
                                </button>
                                <button type="button" className="style-button-save mt-4" onClick={(e) => selectProduct(product)}>
                                    <i className="fa fa-undo fa-2x" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                ReactDOM.render(htmlDetails, document.getElementById('section-details'));
            }
        })
    console.log(investors);

}

function savePurchase(product) {
    let purchase = {
        "investor_id": document.getElementById('sel-investor-'+product.product_id).value,
        "name": document.getElementById('sel-investor-'+product.product_id).options[document.getElementById('sel-investor-'+product.product_id).selectedIndex].textContent,
        "sold": Number.parseInt(document.getElementById('amount-investor-'+product.product_id).value),
        "left_amount": 230800,
        "purchased": 10.7,
        "remaining": 89.3,
        "only_read": false
    };
    console.log(purchase);
    product.purchases.push(purchase);
    selectProduct(product);
}

function edit_purchase(product, purchase) {
    console.log(product);
    console.log(purchase);
    let investors = [];
    axios.get('https://demo9283427.mockable.io/investors')
        .then(function (response) {
            console.log(response);
            if (response.status == 200) {
                investors = response.data;
                console.log(investors);
                const  htmlDetails =
                    <div>
                        <div className="style-title3">
                            <p className="text-left ml-3 border-bottom w-50 font-weight-bold">Product ID {product.product_id}</p>
                            <button type="button" className="style-button-add-more">
                                <h1>+</h1>
                            </button>
                        </div>
                        <div className="style-title4">
                            <p className="text-left ml-3">Edit purchase</p>
                        </div>
                        <div className="row form-inline style-row-new-investor">
                            <div className="col">
                                <label className="text-color" htmlFor="">Investor</label>
                                <select key={product.product_id} className="form-control ml-3" name="" id={'sel-investor-edit-'+product.product_id}>
                                    <option value="" selected>Select investor</option>
                                    {investors.map(investor => {
                                        return ( investor.investor_id == purchase.investor_id ?
                                                <option value={investor.investor_id} selected>{investor.name}</option>
                                                :
                                                <option value={investor.investor_id}>{investor.name}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="col">
                                <label className="text-color" htmlFor="">Amount to sell</label>
                                <input type="number" className="form-control" id={'amount-investor-edit-'+product.product_id} defaultValue={purchase.sold} placeholder="$0"/>
                            </div>
                            <div className="col">
                                <button type="button" className="style-button-save mt-4 mr-1" onClick={(e) => saveEditPurchase(product, purchase)}>
                                    <i className="fa fa-save fa-2x" aria-hidden="true"></i>
                                </button>
                                <button type="button" className="style-button-save mt-4" onClick={(e) => selectProduct(product)}>
                                    <i className="fa fa-undo fa-2x" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                ReactDOM.render(htmlDetails, document.getElementById('section-details'));
            } else {
                const  htmlDetails =
                    <div>
                        <div className="style-title3">
                            <p className="text-left ml-3 border-bottom w-50 font-weight-bold">Product ID {product.product_id}</p>
                            <button type="button" className="style-button-add-more">
                                <h1>+</h1>
                            </button>
                        </div>
                        <div className="style-title4">
                            <p className="text-left ml-3">Edit purchase</p>
                        </div>
                        <div className="row form-inline style-row-new-investor">
                            <div className="col">
                                <label className="text-color" htmlFor="">Investor</label>
                                <select key={product.product_id} className="form-control ml-3" id={'sel-investor-'+product.product_id}>
                                    <option value="" selected>Select investor</option>
                                </select>
                            </div>
                            <div className="col">
                                <label className="text-color" htmlFor="">Amount to sell</label>
                                <input type="number" className="form-control" id={'amount-investor-'+product.product_id} placeholder="$0"/>
                            </div>
                            <div className="col">
                                <button type="button" className="style-button-save mt-4 mr-1">
                                    <i className="fa fa-save fa-2x" aria-hidden="true"></i>
                                </button>
                                <button type="button" className="style-button-save mt-4" onClick={(e) => selectProduct(product)}>
                                    <i className="fa fa-undo fa-2x" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                ReactDOM.render(htmlDetails, document.getElementById('section-details'));
            }
        })
    console.log(investors);
}

function saveEditPurchase(product, purchase) {
    let i = 0, x = 0;
    product.purchases.filter(item => {
        return (
            item == purchase ?
                x = i
                :
                i++
        );
    });
    product.purchases[x].investor_id = document.getElementById('sel-investor-edit-'+product.product_id).value
    product.purchases[x].name = document.getElementById('sel-investor-edit-'+product.product_id).options[document.getElementById('sel-investor-edit-'+product.product_id).selectedIndex].textContent
    product.purchases[x].sold =  document.getElementById('amount-investor-edit-'+product.product_id).value
    selectProduct(product);
}

function delete_purchase(product, purchase) {
    let i = 0, x = 0;
    product.purchases.filter(item => {
        return (
            item == purchase ?
                x = i
                :
                i++
        );
    });
    product.purchases.splice(x, 1);
    selectProduct(product);
}