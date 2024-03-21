const filter = document.getElementById('filter');
const result = document.getElementById('result');
const searchFILTER = async searchText => {
    const res = await fetch('https://benjjamin22.github.io/filter/NUASA(IMSU)/mydata.json')
    const { user } = await res.json()
    let matches = user.filter(user => {
        const regex = new RegExp(`${searchText}`, 'gi');
        return user.id.match(regex) || user.inName.match(regex) || user.inSchool.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        result.innerHTML = '';
    }

    outputHtml(matches);

};

const outputHtml = matches => {
    if (matches) {
        const html = matches.map(user => `
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
        </div></li>`)
            .join('');
        result.innerHTML = html;
    }
};
filter.addEventListener('input', () => searchFILTER(filter.value));

getmovieee();
async function getmovieee() {
    let objects = document.getElementById("objects");
    const res = await fetch('https://benjjamin22.github.io/filter/NUASA(IMSU)/mydata.json')
    const { user } = await res.json()
    let allObject = user.filter((val) => {
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
    const res = await fetch('https://benjjamin22.github.io/filter/NUASA(IMSU)/mydata.json')
    const { user } = await res.json()
    let id = user.filter(ids => ids.id === movieId);
    console.log(id)

    const html = id.map(user => {
        const li = document.createElement('li')
        li.innerHTML = `
        <div class="user-profile">
        <div class="profile-top">
            <img src="${user.picturepath}">
            <div class="profile-info">
                <h1 style="margin-top:143px;margin-left:70px;line-height:1rem;"></h1>${user.reg}
                </h1>
            </div>
        </div>
    </div>`
        facttext.appendChild(li)

    });
}