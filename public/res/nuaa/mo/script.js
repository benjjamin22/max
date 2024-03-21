const search = document.getElementById('search');
const main = document.getElementById('main');
const form = document.getElementById('form')
url = '/api'

const listItems = []

getData()

search.addEventListener('input', (e) => filterData(e.target.value));

async function getData() {
    const res = await fetch(url)
    const { nuasa } = await res.json()

    // Clear result
    main.innerHTML = ''

    nuasa.forEach(user => {
        const div = document.createElement('div')
        listItems.push(div)
        div.innerHTML = `<a style="text-decoration:none;" onclick="movieselected('${user.id}')"href="#">
        <div class="movie">
        <img src="${user.picturepath}">
        <div class="movie-info">
      <h3>${user.Name}</h3>
      <span>${user.validity}</span>
        </div></div> </a>
        `
        main.appendChild(div)

    })
}

function filterData(searchTerm) {
    listItems.forEach(item => {
        if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
            item.classList.remove('hide')
        } else {
            item.classList.add('hide')
        }
    })
}
getmovieee();
async function getmovieee() {
    let objects = document.getElementById("objects");
    const res = await fetch(url)
    const { nuasa } = await res.json()
    let allObject = nuasa.filter((val) => {
        if (typeof val == 'object') {
            return true;
        } else { return false; }
    });
    let objectsLen = allObject.length;
    objects.innerHTML += "" + objectsLen
}


function movieselected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'samplepreview.html';
    return false;

}


async function getmovie() {
    let movieId = sessionStorage.getItem('movieId');
    console.log(movieId)
    const res = await fetch(url)
    const { nuasa } = await res.json()
    let id = nuasa.filter(ids => ids.id === movieId);
    console.log(id)

    const html = id.map(user => {
        const li = document.createElement('li')
        li.innerHTML = `
            <div class="user-profile">
                <div class="profile-top">
                    <img src="${user.picturepath}">
                    <div class="profile-info">
                        <h2 style="color:white;text-align:center;margin-bottom:0px;line-height:2rem;">${user.Name}</h2>  
                        <h1 style="margin-top:3px;margin-bottom:0px;line-height:1rem;">>>>${user.reg}
                        <<<</h1>
                    </div>
                
                </div>
                <div class="profile-bottom">
                    <div style="flex-direction:column;margin:-11px 0px;" class="profile-info"> 
                        <h1>- IMO STATE UNIVERSITY -</h1>
                            <h1 style="margin-top:-3px;color:red;font-size:12px;">- MICROBIOLOGY STUDENTS ASSOCIATION -</h1>
                        </div>
                    </div>
                    <div class="profile-bottom">
                        <div style="display:flex;">
                            <div style="width:25%;margin:0 1px;">
                                <h1 style="font-size:12px;margin-top:-5px;text-align:center;padding:0 1.5rem;">B/G</h1>
                                <div class="profile-info">
                                <h1 style="color:black;padding:0 .8rem;">${user.bloodgroup}</h1>
                                </div>
                            </div>
                            <div style="width:45%;margin:0 1px;">
                            <h1 style="font-size:12px;margin-top:-5px;text-align:center;padding:0 1rem;">STATUS/VALIDITY</h1>
                                <div style="flex-direction:column;"class="profile-info">
                                <h1 style="color:black;padding:0 .8rem;margin-top:-5px;">${user.Status}</h1>
                                <h1 style="margin:0px;color:red;font-size:12px;margin-bottom:0px;line-height:.5rem;">- ${user.Validity} -</h1>
                                </div>
                            </div>
                            <div style="width:25%;margin:0 1px;">
                                <h1 style="font-size:12px;margin-top:-5px;text-align:center;padding:0 1.5rem;">SEX</h1>
                                <div class="profile-info">
                                <h1 style="color:black;padding:0 .8rem;">${user.sex}</h1>
                                </div>
                            </div>
                        </div>
                        
                        <h1 style="font-size:12px;margin-top:-8px;text-align:center;padding:0 0rem;">LGA/STATE OF ORIGIN</h1>
                            <div style="flex-direction:column;"class="profile-info"> 
                                <h1 style="margin-top:-1px;">- ${user.state} -</h1>
                                <h1 style="margin:-5px;color:red;font-size:12px;">- ${user.localgovt} -</h1>
                            </div>
                                                    
                            <div class="social">
                            <a href=""><i class="fab fa-facebook "></i></a>
                            <a href=""><i class="fab fa-instagram "></i></a>
                            <a href="https://wa.me/${user.state}"><i class="fab fa-tiktok "></i></a>
                            <a href=""><i class="fab fa-twitter "></i></a>
                        </div>
                        </div>
                    </div>       
                </div>
            </div>`
        facttext.appendChild(li)

    });
}