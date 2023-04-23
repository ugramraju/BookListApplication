import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const BooksForm=()=>{
    const navigate = useNavigate()
    const [data, setData] = useState({
        title_of_the_book:"",
        isbn:"",
        author:"",
        describe_this_book:"",
        published_date:"",
        publisher_of_this_book:""

    })
    const[msg,setErrormsg] = useState("");

    const changeHandler=(e)=>{
        e.preventDefault();
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler=async(e)=>{
        e.preventDefault();
        if(!data.title_of_the_book || !data.isbn || !data.author || !data.describe_this_book || !data.published_date ||!data.publisher_of_this_book){
            setErrormsg("Kindly Fill All The Data");
            return;
        }
        try{
            const res = await axios.post("http://localhost:8000/api/bookspost",data);
            console.log(res.data)
            setData({title_of_the_book:"",
            isbn:"",
            author:"",
            describe_this_book:"",
            published_date:"",
            publisher_of_this_book:""})
            navigate("/displaydata")
        }
        catch(err){
            console.log(err)
        }
    }
    return(
        <div className="container">
            <button type="submit">
                <Link to="/displaydata">Show Book List</Link>
            </button>
            <div>
                <h1>Add Book</h1>
                <p>Create new book</p>
            </div>
            <form onSubmit={submitHandler}>
                <span id="err_msg">{msg}</span>
                <br/>
                <input type="text"
                id="title_of_the_book"
                placeholder="Title Of The Book"
                name="title_of_the_book"
                onChange={changeHandler}
                />
                <br/>
                <input type="text"
                id="isbn"
                placeholder="ISBN"
                name="isbn"
                onChange={changeHandler}
                />
                <br/>
                <input type="text"
                id="author"
                placeholder="Author"
                name="author"
                onChange={changeHandler}
                />
                <br/>
                <input type="text"
                id="describe_this_book"
                placeholder="Describe This Book"
                name="describe_this_book"
                onChange={changeHandler}
                />
                <br/>
                <input type="date"
                id="published_date"
                placeholder="Published Date"
                name="published_date"
                onChange={changeHandler}
                />
                <br/>
                 <input type="text"
                id="publisher_of_this_book"
                placeholder="Publisher Of This Book"
                name="publisher_of_this_book"
                onChange={changeHandler}
                />
                <br/>
                <input type="submit" id="submit_btn" value="Submit"/>
            </form>
        </div>
    )
}
export default BooksForm;