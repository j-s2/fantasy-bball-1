import React, { useEffect, useState } from 'react'
import './styles.css'
import axios from 'axios';
import fantasyIcon from "../images/espnbball.png"
import trashIcon from "../images/trash.svg"
import cancelIcon from "../images/cancel2.svg"
import checkIcon from "../images/check.svg"

export default function Start() {

    const [players, setPlayers] = useState([]);
    //state variable to keep track of what player is being edited
    const [editPlayer, setEditPlayer] = useState(null);
    //for dependency array, state variable for the useEffect 
    const [reloadPlayers, setReloadPlayers] = useState(false); 
    //state variable to keep track if player needs to be added
    const [addPlayer, setAddPlayer] = useState(false);
    //state variable for updating player team and ftps
    const [inputValues, setInputValues] = useState({
        team: '',
        ftps: 0,
      });
    //state variable for posting a new player to database
    const [newPlayer, setNewPlayer] = useState({
        team: '',
        ftps: 0,
        position: '',
        name: ''
    });


    const onEdit=(e)=>{
        //creates new object with previous inputValues and updates specific property with new value
        setInputValues({...inputValues, [e.target.name]: e.target.value,});
    
    }

    const onAdd=(e) =>{
        //creates a new object player and updates specific property with new value
        setNewPlayer({...newPlayer, [e.target.name]: e.target.value,});
    
    }
     
    const onSubmitEdit=async(player)=>{
        
        //if empty team or empty ftps passed in, make sure to reinitialize it with the right 
        //team name or ftps before updating 

        if(inputValues.team === ""){
            inputValues.team = player.team
        }

        if(inputValues.ftps === 0){
            inputValues.ftps = player.ftps
        }

        //update player by id
        await axios.put(`http://localhost:8080/player/${player.id}`, inputValues)
        setReloadPlayers(!reloadPlayers) //reload players with updated information
        setInputValues({
            team: '',
            ftps: 0,
        })
    }

    const onSubmitAdd=async()=>{
        
        //post player
        await axios.post("http://localhost:8080/player", newPlayer)
        setReloadPlayers(!reloadPlayers) //reload players with new player
        setNewPlayer({
            team: '',
            ftps: 0,
            position: '',
            name: ''
        })
        setAddPlayer(false); //set state variable to false to avoid another empty row showing up
    }
    

    useEffect(() => {
        getPlayers();
    }, [reloadPlayers])

    const getPlayers=async() =>{
        const response = await axios.get("http://localhost:8080/players")
        setPlayers(response.data);
    }

    const handleDeleteButton =async(player) =>{
        //delete player from db
        await axios.delete(`http://localhost:8080/player/${player.id}`) 
        setReloadPlayers(!reloadPlayers); //refresh players that output
    }

  return (
    <div className='start'>
      <img src={fantasyIcon} alt="/"/>
      <div style={{fontWeight: "bold", fontSize: "50px", fontFamily: "Arial, Helvetica, sans-serif"}}>Your 2023-2024 Fantasy Basketball Team</div>
      <div className="container">
        <div className="py-1">
          <table
            className="table table-dark"
          >
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Position</th>
                <th scope="col">Name</th>
                <th scope="col">Team</th>
                <th scope="col">FTPS</th>
                <th scope="col">Update/Delete</th>
              </tr>
            </thead>
            <tbody>
                {
                    
                    players.map((p, index) => (
                        <>
                        <tr>
                            <th scope="row" key={index}>{p.id}</th>
                            {/*  if player is edit player, change inside of <td  to <input tag*/}
                            <td>{p.position}</td>
                            <td>{p.name}</td>
                            <td>
                                { editPlayer === p ? (
                                    <input
                                        type = {"text"}
                                        size = {5}
                                        name = 'team'
                                        className='input'
                                        value={inputValues.team}
                                        onChange = {(e) => onEdit(e)}
                                    />
                                ) :
                                    p.team
                                }
                            </td>
                            <td>
                            { editPlayer === p ? (
                                    <input
                                        type = {"text"}
                                        size = {5}
                                        className='input'
                                        name = 'ftps'
                                        value = {inputValues.ftps}
                                        onChange = {(e) => onEdit(e)}
                                    />
                                ) :
                                    p.ftps
                                }
                            </td>
                            <td>
                                { editPlayer === p ? ( 
                                    <>
                                        <button className='edit-button' onClick={() => onSubmitEdit(p)}>
                                            <img src={checkIcon} style={{width: "50px", height: "52px"}}/>
                                        </button>
                                        <button className='delete-button' onClick={() => setEditPlayer(null)}>
                                            <img src={cancelIcon} style={{width: "45px", height: "47px"}}/>
                                        </button>
                                    </>
                                    )
                                    :
                                    <>
                                        <button className='edit-button' onClick={() => setEditPlayer(p)}>Edit</button>
                                        <button className='delete-button' onClick={() => handleDeleteButton(p)}>
                                            <img src={trashIcon} style={{width: "50px", height: "52px"}}/>
                                        </button>
                                    </>
                                }
                            </td>
                        </tr>    
                        </>
                    ))
                }
                {
                    addPlayer === true && (
                        
                        <tr>
                            <td>ID</td>
                            <td>                             
                                <input
                                    type = {"text"}
                                    size = {5}
                                    name = 'position'
                                    className='input'
                                    value={newPlayer.position}
                                    onChange = {(e) => onAdd(e)}
                                />
                            </td>
                            <td>                                    
                                <input
                                    type = {"text"}
                                    size = {5}
                                    name = 'name'
                                    className='input'
                                    value={newPlayer.name}
                                    onChange = {(e) => onAdd(e)}
                                />
                            </td>
                            <td>
                                <input
                                    type = {"text"}
                                    size = {5}
                                    name = 'team'
                                    className='input'
                                    value={newPlayer.team}
                                    onChange = {(e) => onAdd(e)}
                                />
                    
                            </td>
                            <td>
                            <input
                                type = {"text"}
                                size = {5}
                                name = 'ftps'
                                className='input'
                                value={newPlayer.ftps}
                                onChange = {(e) => onAdd(e)}
                            />
                            </td>
                            <td>
                                { 
                                    <>
                                        <button className='edit-button' onClick={() => onSubmitAdd()}>
                                            <img src={checkIcon} style={{width: "50px", height: "52px"}}/>
                                        </button>
                                        <button className='delete-button' onClick={() => setAddPlayer(false)}>
                                            <img src={cancelIcon} style={{width: "45px", height: "47px"}}/>
                                        </button>
                                    </>
                                }
                            </td>
                        </tr>
                        
                    )
                }
            </tbody>
            <div className='add-button-div'>
                <button className='add-button' onClick={() => setAddPlayer(true)}>Add</button>
            </div>
          </table>
        </div>
      </div>
    </div>
  );
}
