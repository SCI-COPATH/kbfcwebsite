let toggle_button=document.getElementById('toggle-button')
let toggle_button_2=document.getElementById('navbarSupportedContent')
let pageList=['#home','#playres','#about','#manjappada-fans']
let current='null'
let shortname={
    'Goa':'G F C',
    'ATK Mohun Bagan':'A T F C',
    'Kerala Blasters':"K B F C",
    'Mumbai City':"M B F C",
    'Odisha':"O F C",
    'NorthEast United':'N E F C',
    'Chennaiyin':'C F C',
    'Bengaluru':"B F C",
    'Jamshedpur':'J F C',
    'East Bengal':'E F C',
    'Hyderabad':"H F C",
    'Minerva Punjab':'P F C'
}

window.onload = function() {
    current= JSON.parse(localStorage.getItem('allData'))
    
    if(current==null){
        current='#home'
    }
    console.log(current)
    for (ids in pageList){
        // console.log(pageList[ids])
        let ele=document.getElementById(pageList[ids].split('#')[1])
        // console.log(ele)
        if (pageList[ids]==current){
            ele.classList.remove('hidden')
        }else{
            
            ele.classList.add('hidden')
        }
    }
}

function navivateLocation(loc){
    
    // console.log()
    // let pt=document.getElementById(loc.split('#')[1])
    // pt.classList.add('pt')
    // setTimeout(function(){
    //     //do what you need here
    //     pt.classList.remove('pt')
    // }, 2000);
    for (ids in pageList){
        // console.log(pageList[ids])
        let ele=document.getElementById(pageList[ids].split('#')[1])
        // console.log(ele)
        if (pageList[ids]==loc){
            current=pageList[ids]
            ele.classList.remove('hidden')

            localStorage.setItem('allData', JSON.stringify(current))
        }else{
            
            ele.classList.add('hidden')
        }
    }
    location = loc;
    // 
    collapsData=document.querySelectorAll('.nav-item')
    for(let local=0;local<collapsData.length;local++){
        collapsData[local].setAttribute("data-bs-toggle", "collapsed")
    }
   
}
function collapsMode(){
    collapsData=document.querySelectorAll('.nav-item')
    for(let local=0;local<collapsData.length;local++){
        collapsData[local].setAttribute("data-bs-toggle", "collapse")
    }
    
}

const url = 'https://api-football-v1.p.rapidapi.com/v3/standings?season=2023&league=323';
async function getStandil(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6f9a59ac66msh0d7d9b21010b14fp173b95jsn4d32e323080d',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    
    try {
        // const response = await fetch(url, options);
        const response = await fetch("./data.json");
        let result = await response.json();
        showTable(result.response[0].league.standings[0])
        // console.log(result.response[0].league.standings[0]);
    } catch (error) {
        console.error(error);
    }
}
function showTable(data){
    // data
    let teable=document.getElementById('headdinngRow')
    let c , st
    for (team in data){
        if (team%2==0)
            st="zero"
        else
            st='one'
        if (data[team].team.name=='Kerala Blasters')
            c='id="myteam"'
        else 
            c=''
        let message=`
        <tr class="${st}" ${c} >
        <td>${data[team].rank}</td>
        <td class='team-row'><img src=${data[team].team.logo}> <span>${shortname[data[team].team.name]}</span></td>
        <td>${data[team].all.played}</td>
        <td>${data[team].all.win}</td>
        <td>${data[team].all.draw}</td>
        <td>${data[team].all.lose}</td>
        <td>${data[team].all.goals.for}</td>
        <td>${data[team].all.goals.against}</td>
        <td>${data[team].goalsDiff}</td>
        <td>${data[team].points}</td>
        <tr>
        `
        
        
     teable.insertAdjacentHTML("beforeend",message)
    //  console.log(data[team])
    }
}
async function getNextGame(){
    const url = 'https://api-football-v1.p.rapidapi.com/v2/fixtures/team/3477/next/1?timezone=Asia%2FKolkata';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6f9a59ac66msh0d7d9b21010b14fp173b95jsn4d32e323080d',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };

    try {
        // const response = await fetch(url, options);
        const response = await fetch('./next.json');
        const result = await response.json();
        showNextMatch(result.api.fixtures[0])
        // console.log(result);
    } catch (error) {
        console.error(error);
    }
}
function showNextMatch(data){
    let home=document.querySelector('.home-team')
    let away=document.querySelector('.away-team')
    let right=document.querySelector('.right')
    let message=`<div><img src="${data.homeTeam.logo}"></div> <h4>${data.homeTeam.team_name}</h4>`
    home.innerHTML=message
    message=`<div><img src="${data.awayTeam.logo}"></div> <h4>${data.awayTeam.team_name}</h4>`
    away.innerHTML=message
    message=`<h4>${data.venue}</h4><h5>${data.event_date.split('T')[0]}</h5> <h5>${data.event_date.split('T')[1].split('+')[0]}</h5>`
    right.innerHTML=message
//  console.log(data)
}
function showPlayre(data){
    let div=document.querySelector('.row')
    for( key in data){
        // console.log(data[key])
        let message=
        `<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 pb-5 pt-5  px-0 mx-0 colums">
            <div class="work-card shadow">
                <img src='${data[key].player.photo}'>
                <div>
                    <h3>${data[key].player.name}</h3>
                    <h5>${data[key].player.nationality}</h5>
                </div>    
            </div>
        </div>`
        div.insertAdjacentHTML("afterbegin",message)
    }
}
async function playereFeatch(){
    const url = 'https://api-football-v1.p.rapidapi.com/v3/players?team=3477&season=2023';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6f9a59ac66msh0d7d9b21010b14fp173b95jsn4d32e323080d',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };

    try {
        // 
        const response = await fetch('./playre.json');
        const result = await response.json();
        // console.log(result.response);
        showPlayre(result.response)
    } catch (error) {
        console.error(error);
    }
}
//  team id 3477
// isl id 323
playereFeatch()
getNextGame()
getStandil()