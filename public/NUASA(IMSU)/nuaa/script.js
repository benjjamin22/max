const filter = document.getElementById('filter');
const result = document.getElementById('result');
url = 'https://benjjamin22.github.io/filter/css/data.json'
const listItems = []

getData()

filter.addEventListener('input', (e) => filterData(e.target.value))

async function getData() {
    const res = await fetch(url)

    const { nuasa } = await res.json()

    // Clear result
    result.innerHTML = ''

    nuasa.forEach(user => {
        const li = document.createElement('li')
        listItems.push(li)
        li.innerHTML = `
        <a style="text-decoration:none;" onclick="movieselected('${user.id}')"href="#"><li><div class="hov">
        <img style="object-fit:cover;"src="${user.picturepath}">
        <div class="user_info" >
        <h3>${user.inName}</h3> 
        <p  style="color:black;">${user.inSchool}</p> 
        <div style="display:flex">
        <p2 style="boarder-radius:30px;display:flex;margin-top:3px;font-size:.7rem;">
        <div style="opacity:1.9px;margin-left:2px;text-align:center;height:18px;width:
        40px;letter-spacing:1px;color:green;">${user.Status}</div>
        </p2><p3b style="margin-top:3px;margin-left:1.5rem;font-size:12px;font-weight:bold;color:green;">( ${user.validity} )</p3> </div>
        <p3>>>>${user.reg}<<<</p3></a>
        </div>
        </div></li>
        `
        result.appendChild(li)
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
                        <h2 style="color:white;text-align:center;margin-bottom:0px;line-height:2rem;">${user.inName}</h2>  
                        <h1 style="margin-top:3px;margin-bottom:0px;line-height:1rem;">>>>${user.reg}
                        <<<</h1>
                    </div>
                
                </div>
                <div class="profile-bottom">
                    <div style="flex-direction:column;margin:-11px 0px;" class="profile-info"> 
                        <h1>- IMO STATE UNIVERSITY -</h1>
                            <h1 style="margin-top:-3px;color:red;font-size:12px;">- ACCOUNTANCY DEPARTMENT -</h1>
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
                                <h1 style="margin:0px;color:red;font-size:12px;margin-bottom:0px;line-height:.5rem;">- ${user.validity} -</h1>
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
                        
                        <div style="display:flex;margin:-9px 0px;;justify-content:center;">
                            <div>
                                <h1 style="font-size:12px;margin:0px;text-align:center;">CONTACT:</h1>
                                <div class="profile-info">
                                    <a style="text-decoration: none;" href="Tel:${user.inparentno}">
                                        <div style="margin-left: 0px;"class="p1">
                                            <p2 style="margin-left: 0px;">${user.inparentno}</p2>
                                        </div>
                                    </a>                   
                                </div>
                            </div>
                            <div>
                                <h1 style="font-size:12px;margin:0px;text-align:center;">EMERGENCY CONTACT:</h1>
                                <div class="profile-info">
                                    <a style="text-decoration: none;" href="Tel:${user.inparentno2}">
                                        <div style="margin-left: 0px;"class="p2">
                                            <p2 style="margin-left: 0px;">${user.inparentno2}</p2>
                                        </div>
                                    </a>                   
                                </div>                           
                            </div>
                        </div>
                    </div>       
                </div>
            </div>`
        facttext.appendChild(li)

    });
}