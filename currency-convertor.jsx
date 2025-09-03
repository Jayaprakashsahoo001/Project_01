import React, { useState, useEffect } from "react";


const CurrencyConvertor = () => {

    const [currencies, setCurrencies] = useState([])
    const [fromCurrency, setFromCurrency] = useState()
    const [toCurrency, setToCurrency] = useState()
    const [amount, setAmount] = useState()
    const [result, setResult] = useState()



    const getCurrency = async () => {
        const res = await fetch(`https://api.frankfurter.dev/v1/currencies`);
        const data = await res.json();
        setCurrencies(Object.keys(data));

    }

    useEffect(() => {
        getCurrency();
    }, [])

    const handelFromCurrencies = (e) => {
        console.log(e.target.value);
        setFromCurrency(e.target.value)
    }

    const handelToCurrencies = (e) => {
        setToCurrency(e.target.value)
        console.log(e.target.value);

    }

    const handelAmount = (e) => {
        console.log(e.target.value);
        setAmount(e.target.value)
    }

    const convertCurrency = async () => {

        const res = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&base=${fromCurrency}&symbols=${toCurrency}`);
        const data = await res.json()
        console.log(data.rates[toCurrency]);
        setResult("Converted Amount is:  " + data.rates[toCurrency] + " ")

    }


    return (
        <div className="head">
            <img src="https://cdn.pixabay.com/photo/2018/07/29/10/16/crypto-3569795_1280.jpg" alt="" />
            <div className="container">
                <h2 className="name">Currency Converter</h2>
                <div className="select">
                    <div>
                        <p>From</p>
                        <select className="sel"
                            value={fromCurrency}
                            onChange={handelFromCurrencies}
                        >
                            {currencies.map((curVal, index) => {
                                return (
                                    <option value={curVal}>{curVal}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div>
                        <p>To</p>
                        <select className="sel"
                            onChange={handelToCurrencies}
                            value={toCurrency}
                        >
                            {currencies.map((curVal, index) => {
                                return (
                                    <option>{curVal}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>

                <div className="amount">
                    <p>Amount</p>
                    <input type="text" placeholder="Enter Your Amount" onChange={handelAmount} />
                </div>

                <div >
                    <button
                        className="convertor"
                        onClick={convertCurrency} >
                        Convertor</button>
                </div>

                <div className="result">
                    <h3>{result}</h3>
                </div>

            </div>
        </div>
    )
}

export default CurrencyConvertor;

