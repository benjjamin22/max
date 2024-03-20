filterInput.addEventListener("keyup", filterNames);

function filterNames() {
    let filterValue = document.getElementById('filterInput').value.toLowerCase();
    let ul = document.getElementById('images');
    let li = ul.querySelectorAll('div.img');
    for (let i = 0; i < li.length; i++) {
        let a = li[i].getElementsByTagName('a')[0];
        if (a.innerHTML.toLocaleLowerCase().indexOf(filterValue) >
            -1) {
            li[i].style.display = '';

        } else {
            li[i].style.display = 'none';

        }

    }
}