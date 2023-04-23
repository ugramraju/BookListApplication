import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./BooksData.css"
const DisplayData = ()=>{
    const[booksData,setBooksData] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const[editMode, setEditMode] = useState("");
   
    useEffect(()=>{
        fetch("http://localhost:8000/api/booksget")
        .then(res=>res.json())
        .then((data)=>setBooksData(data.data))
        .catch((err)=>console.log(err))
    })
  //delete Handler
    const deleteHandler= async(id)=>{
        try{
            const confirmed = window.confirm("Sure You Want To Delete It!");
            if(confirmed){
                await axios.delete(`http://localhost:8000/api/bookdelete/${id}`);
                setBooksData(booksData.filter((eachData)=>eachData._id !== id))
            }
        }
        catch(err){
            console.log(err)
        }
    }
    //Edit Handler
    const editHandler=(book)=>{
        setSelectedBook(book);
        setEditMode(true)
    };
    const handleSave=async(id)=>{
        try{
            const updateBook = await axios.put(`http://localhost:8000/api/booksEdit/${id}`,selectedBook);
            setBooksData(booksData.map((eachData)=>{
                if(eachData._id === updateBook.data._id){
                    return updateBook.data;
                }
                return eachData;
            }));
            setEditMode(false);
            setSelectedBook(null);


        }
        catch(err){
            console.log(err)
        }
    }
    const changeHandler=(e)=>{
        const{name,value} = e.target;
        setSelectedBook({...selectedBook,[name]:value})
    }
    return(
        <>
        {
            editMode && selectedBook &&(
                <div>
                    <button>Sow Book List</button>
                    <div>
                        <h1>Edit Book</h1>
                        <p>Update Book's Info</p>
                    </div>
                    <input type="text"
                id="title_of_the_book"
                placeholder="Title Of The Book"
                name="title_of_the_book"
                value={selectedBook.title_of_the_book}
                onChange={changeHandler}
                />
                <br/>
                <input type="text"
                id="isbn"
                placeholder="ISBN"
                name="isbn"
                value={selectedBook.isbn}
                onChange={changeHandler}
                />
                <br/>
                <input type="text"
                id="author"
                placeholder="Author"
                name="author"
                value={selectedBook.author}
                onChange={changeHandler}
                />
                <br/>
                <input type="text"
                id="describe_this_book"
                placeholder="Describe This Book"
                name="describe_this_book"
                value={selectedBook.describe_this_book}
                onChange={changeHandler}
                />
                <br/>
                <input type="date"
                id="published_date"
                placeholder="Published Date"
                name="published_date"
                value={selectedBook.published_date}
                onChange={changeHandler}
                />
                <br/>
                 <input type="text"
                id="publisher_of_this_book"
                placeholder="Publisher Of This Book"
                name="publisher_of_this_book"
                value={selectedBook.publisher_of_this_book}
                onChange={changeHandler}
                />
                <br/>
                <button onClick={()=>handleSave(selectedBook._id)}>Update Book</button>
                </div>
            )
        }

        <div className="maincontainer">
        <h1 className="books_heading">Books List</h1>
        <button type="submit"><Link to="/booksform">+ Add New Book</Link></button>
        
        <div className="container">
        
        {
            booksData.map((each)=>{
                return(
                        <div key={each._id} className="card">
                        <div><span>Title:</span> {each.title_of_the_book}</div>
                        <div><span>ISBN:</span> {each.isbn}</div>
                        <div><span>Author:</span> {each.author}</div>
                        <div><span>Publisher:</span> {each.publisher_of_this_book}</div>
                        <div><span>Published Date: </span>{each.published_date}</div> 
                        <div><span>Description:</span> {each.describe_this_book}</div>
                        <div className="btns">
                            <button onClick={()=>deleteHandler(each._id)}>Delete Book</button>
                            <button onClick={()=>editHandler(each)}>Edit Book</button>
                        </div>

                    </div>
                )
            })
        }
        </div>
        </div>
        </>
    )
}
export default DisplayData;