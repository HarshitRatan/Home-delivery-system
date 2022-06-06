import React, { useEffect, useState } from 'react'
import hello from '../img/dashboard_hello.gif'
import data from './shopData.json'


function Dashboard() {

    const [phone, setPhone] = useState();
    
    const getUserNumber = () => {
        var launch = document.getElementById('launchModal3');
        launch.click();
    }
    useEffect(() => {
        getUserNumber();
    }, []);


    const ratan = (e) =>{
        e.preventDefault();
       var pho =  document.getElementById('phone').value
       setPhone(pho);
    }



    // POSTING DATA IN FIREBASE START
    const [user, setUser] = useState({
        hNo: "",
        add: "",
        city: "",
        state: "",
        pinCode: "",
        country: "",
        timeSlot: "",
        tipAmount: "",
        orderId: "",
        date: "",
        time: ""
    })

    //Taking Value From User
    let name, value;
    const getUserData = (event) => {
        name = event.target.name;
        value = event.target.value;

        setUser({ ...user, [name]: value });
        console.log(user);

    }
    //Posting Value To server
    const postData = async (e) => {
        var submitSpine = document.getElementById('submitSpin');
        e.preventDefault();

        const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
        const d = new Date();

        var { hNo, add, city, state, pinCode, country, timeSlot, tipAmount, orderId, date, time } = user;
        orderId = Ad;
        date = d.getDate() + " - " + months[d.getMonth()] + " - " + d.getFullYear();
        time = d.getHours() + " : " + d.getMinutes();

        var dbName = phone;
        var db = "https://home-delivery-applicatio-43f28-default-rtdb.firebaseio.com/" + dbName + ".json";
        // console.log("value of db = "+ db);

        if (hNo && add && city && state && pinCode && country && timeSlot && orderId) {
            submitSpine.style.display = 'inline';

            const res = await fetch(
                db,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        hNo,
                        add,
                        city,
                        state,
                        pinCode,
                        country,
                        timeSlot,
                        tipAmount,
                        orderId,
                        date,
                        time
                    })
                }
            );

            if (res) {
                document.getElementById('formReset').click();
                submitSpine.style.display = 'none';
                setUser({
                    hNo: "",
                    add: "",
                    city: "",
                    state: "",
                    pinCode: "",
                    country: "",
                    timeSlot: "",
                    tipAmount: "",
                    orderId: "",
                    date: "",
                    time: ""
                });

                alert("Thanks you for Order Your Order Number is " + Math.floor(Math.random() * 99999) + 10000);
            }
        }
        else {
            alert("Please Fill The All Required Fields");
        }
    }
    // POSTING DATA IN FIREBASE END




    //Tip Box Logic
    const displayTipbox = () => {

        if (document.getElementById('checkBox').checked) {
            document.getElementById('tipBox').style.display = "block";

        }
        else {
            document.getElementById('tipBox').style.display = "none";
        }
    }


    // Adding and Removing Cards

    const [Ad, setAd] = useState(0);

    //Adding Cards
    const addToCart = (a) => {
        setAd(a);
        var but = document.getElementById(a);
        but.innerText = "Added To Cart";
        but.disabled = true;
        var checkout = document.getElementById('checkout');
        checkout.style.display = "inline";
    }
    //Removing Cards
    const removeToCart = (a) => {
        setAd(0);
        var but = document.getElementById(a);
        but.innerText = "Add To Cart";
        but.disabled = false;
        var checkout = document.getElementById('checkout');
        checkout.style.display = "none";
    }

    //Checkout Button Logic
    const pCheckout = (a) => {
        document.getElementById('checkBox').checked = true;
        var launch = document.getElementById('launchModal1');
        launch.click();
    }
    return (
        <>
            {/* Navbar Element  */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <div className="container-fluid">
                    <img src={hello} style={{ "height": "100px", "width": "100px", "marginRight": "10px" }} />
                    <h3 className="" style={{ "color": "yellowgreen" }}>User Dashboard</h3>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-lg-flex justify-content-lg-end" id="navbarNav">
                        <ul className="navbar-nav">
                            {/* <li className="nav-item">
                                <h5 className="nav-link active">User Name : <span style={{ "color": "orange" }}>User</span></h5>
                            </li> */}
                            <li className="nav-item">
                                <h5 className="nav-link active">Phone Number : <span style={{ "color": "orange" }}>{phone}</span></h5>
                            </li>
                            <li className="nav-item">
                                <button className='btn btn-success' type='button' onClick={() => {
                                    var launch = document.getElementById('launchModal2');
                                    launch.click();
                                }}><i className='fa fa-briefcase' style={{ "color": "white", "marginRight": "5px" }}></i>Your Order</button>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="#"><i className="fa fa-sign-out" style={{ "color": "white", "marginRight": "5px" }} aria-hidden="true"></i>Sign Out</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className='container' style={{ "marginTop": "20px" }}>
                {/* Your Card */}
                <div className="card" style={{ "minHeight": "300px", "width": "100%" }}>
                    <div className="card-header" style={{ "fontSize": "36px" }}>
                        <b>Your Cart__</b><i className="fa fa-shopping-cart"></i><br></br>
                        <div>
                            <button onClick={() => pCheckout(Ad)} id='checkout' type='button' className="btn btn-success" style={{ "display": "none", "marginTop": "15px" }}>Proceed To CheckOut</button>
                        </div>
                    </div>
                    <div id='shopCard'>
                        {
                            data.filter((value) => {
                                if (value.id == Ad) {
                                    return value;
                                }
                            }).map((value) => (
                                <>
                                    <div className="card" key={value.toString()}>
                                        <img src={value.icon} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{value.pName}</h5>
                                            <h5 className="card-title">Order_ID = {value.id}</h5>
                                            <p className="card-text"><i className="fa fa-rupee"></i>{value.prize}</p>
                                            <button type='button' onClick={() => removeToCart(value.id)} className="btn btn-danger">Remove Item</button>
                                        </div>
                                    </div>
                                </>

                            ))
                        }
                    </div>
                </div>

                {/* Shop Card */}
                <div className="card" style={{ "marginTop": "20px" }}>
                    <div className="card-header" style={{ "fontSize": "36px" }}>
                        <b>Shop Now__</b><i className="fa fa-shopping-basket"></i>
                    </div>
                    <div id='shopCard'>
                        {
                            data.map((value) => (
                                <>
                                    <div className="card" key={value.toString()}>
                                        <img src={value.icon} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{value.pName}</h5>
                                            <h5 className="card-title">Order_ID = {value.id}</h5>
                                            <p className="card-text"><i className="fa fa-rupee"></i>{value.prize}</p>
                                            <button id={value.id} type='button' onClick={() => addToCart(value.id)} className="btn btn-warning">Add To Cart</button>
                                        </div>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* footer */}
            <footer className="text-center text-white" style={{ "background": "black", "marginTop": "100px" }}>
                <div className="text-center p-3" style={{ "background": "rgba(0, 0, 0, 0.2)" }}>
                    © 2022 Copyright:<br></br>
                    <a className="text-white" href="#">Home Delivery Application </a>
                </div>
                <button style={{"display" : "none"}} type='button' id='afterPhone'></button>
            </footer>






            {/* <!-- Button trigger Address modal --> */}
            <button id='launchModal' style={{ "display": "none" }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>

            {/* <!-- Address Modal --> */}
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Enter Delivery Address</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form method='POST'>
                                <div className="mb-3">
                                    <label className="form-label"><b>House Number :</b> </label>
                                    <input name='hNo' onChange={getUserData} type="text" className="form-control" placeholder="House Number" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label"><b>Address Line 1 :</b></label>
                                    <input name='add' onChange={getUserData} type="text" className="form-control" placeholder="Street Address/ PO/ Company Name" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label"><b>City : </b></label>
                                    <input name='city' onChange={getUserData} type="text" className="form-control" placeholder="City" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label"><b>State : </b></label>
                                    <input name='state' onChange={getUserData} type="text" className="form-control" placeholder="State" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label"><b>Pin code : </b></label>
                                    <input name='pinCode' onChange={getUserData} type="text" className="form-control" placeholder="Pincode" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label"><b>Country : </b></label>
                                    <input name='country' onChange={getUserData} type="text" className="form-control" placeholder="Country" required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label"><b>Suitable Time Slot For Delivery : </b></label>
                                    <select name='timeSlot' onChange={getUserData} className="form-select" aria-label="Default select example" required>
                                        <option defaultValue>Select  :</option>
                                        <option value="9:00 AM To 10.00 PM (IST)">9:00 AM To 10.00 PM(IST)</option>
                                        <option value="10:00 AM To 11.00 PM (IST)">10:00 AM To 11.00 PM(IST)</option>
                                        <option value="11:00 AM To 12.00 PM (IST)">11:00 AM To 12.00 PM(IST)</option>
                                        <option value="12:00 PM To 1.00 PM (IST)">12:00 PM To 1.00 PM(IST)</option>
                                        <option value="1:00 PM To 2.00 PM (IST)">1:00 PM To 2.00 PM(IST)</option>
                                        <option value="2:00 PM To 3.00 PM (IST)">2:00 PM To 3.00 PM(IST)</option>
                                        <option value="3:00 PM To 4.00 PM (IST)">3:00 PM To 4.00 PM(IST)</option>
                                        <option value="4:00 PM To 5.00 PM (IST)">4:00 PM To 5.00 PM(IST)</option>
                                        <option value="5:00 PM To 6.00 PM (IST)">5:00 PM To 6.00 PM(IST)</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <input id='checkBox' onClick={displayTipbox} onChange={getUserData} type="checkbox" className="form-check-box" />
                                    <label className="form-label"><b style={{ "color": "orange" }}>Want To Give Tip To The Delivery Person? </b></label>
                                </div>
                                <div className="mb-3" id='tipBox'>
                                    <label className="form-label"><b style={{ "color": "orange" }}>Enter Tip Amount : </b></label>
                                    <input name='tipAmount' onChange={getUserData} type="text" className="form-control" placeholder="Amount" />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <span id='submitSpin' style={{ "display": "none" }}>
                                        <div className="spinner-grow text-success" role="status">
                                        </div>
                                        <div className="spinner-grow text-danger" role="status">
                                        </div>
                                    </span>
                                    <button type="submit" onClick={postData} onFocusCapture={getUserData} className="btn btn-success">
                                        Place Your Order</button>
                                </div>
                                <button id='formReset' type="reset" style={{ "display": "none" }} ></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>






            {/* <!-- Button trigger Order Summary Modal --> */}
            <button id='launchModal1' style={{ "display": "none" }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1"></button>

            {/* <!-- Order Summary Modal--> */}
            <div className="modal fade" id="exampleModal1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Order Summary</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div id='shopCard'>
                                {
                                    data.filter((value) => {
                                        if (value.id == Ad) {
                                            return value;
                                        }
                                    }).map((value) => (
                                        <>
                                            <h5 className="card-title">Product Name : {value.pName}</h5>
                                            <p className="card-text">Product Cost : <i className="fa fa-rupee"></i>{value.prize}</p>
                                            <div className="card" key={value.toString()}>
                                                <img src={value.icon} className="card-img-top" alt="..." />
                                                <div className="card-body">
                                                    <h5 className="card-title">{value.pName}</h5>
                                                    <h5 className="card-title">Order_ID = {value.id}</h5>
                                                    <p className="card-text"><i className="fa fa-rupee"></i>{value.prize}</p>
                                                </div>
                                            </div>
                                        </>

                                    ))
                                }
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button id='closeModal' type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={() => {
                                var launch = document.getElementById('launchModal');
                                launch.click();
                                var close = document.getElementById('closeModal');
                                close.click();
                            }} type="button" className="btn btn-success">Next</button>
                        </div>
                    </div>
                </div>
            </div>




            {/* <!-- Button trigger Your Order Cart Modal --> */}
            <button id='launchModal2' style={{ "display": "none" }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2"></button>

            {/* <!-- Your Order Cart Modal--> */}
            <div className="modal fade" id="exampleModal2" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Your Order</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div id='shopCard'>
                                <h5 className="card-title">Your Orders And Delivery Address Has Been Stored In Our DataBase.</h5>
                                <a href={"https://home-delivery-applicatio-43f28-default-rtdb.firebaseio.com/" + phone + ".json"} target='_blank'>Click Here To See Your All Orders</a>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button id='closeModal' type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>




            {/* <!-- Button trigger Input Number Cart Modal --> */}
            <button id='launchModal3' style={{ "display": "none" }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal3"></button>

            {/* <!-- Your Order Cart Modal--> */}
            <div className="modal fade" id="exampleModal3" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Please Verify Your Number : </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={ratan}>
                                <input id ='phone' type="tel" className="form-control" placeholder="Enter Your Phone Number" required/>
                                <div className="modal-footer">
                                    <button  type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export default Dashboard
