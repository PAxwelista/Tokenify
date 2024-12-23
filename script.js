// Code goes here...

document.querySelector("#searchButton").addEventListener("click", () => {
    //récupérer l'id de l'artist

    let searchArtist = document.querySelector("#searchBar").value.toLowerCase();
    let token =
        "BQBIbELu6N7pndmBj0-ZxlwfNimSSsMQ2nUsf2fARrulsTvQ4QHRJpzG-uioow5lIMZoSF85rZ1J0fuV9dwyg0zxuyCtc0OAT3mmVfPlm6HDuimUJH8";
    const divsArtists = document.querySelector("#artistsList").children;
    if (divsArtists) {
        for (const divArtists of divsArtists) {
            divArtists.remove();
        }
    }
    fetch(`https://api.spotify.com/v1/search?q=${searchArtist}&type=artist&limit=1&offset=0`, {
        headers: new Headers({ Authorization: `Bearer ${token}` }),
    })
        .then(response => response.json())
        .then(data => {
            let artistId = data.artists.items[0].id;
            document.querySelector("#artistsList").innerHTML += `
        <div class ="bg-[rgb(30,38,54)] rounded-lg w-3/12">
            <img class = "rounded-t-lg" src = "${data.artists.items[0].images[0].url}" alt = "${
                data.artists.items[0].name
            }">
            <div class ="p-5 flex flex-col">
                <span class = "text-white font-semibold text-lg">${data.artists.items[0].name}</span>
                <span class = "text-[rgb(47,56,75)]">${data.artists.items[0].genres.join(", ")}</span>
                <span class = "text-[rgb(134,92,37)]">${data.artists.items[0].followers.total} followers</span>
                <span class = "text-[rgb(70,141,200)]">Top 10 tracks</span>
                <ul id = "topTenTracks">
                </ul>
            </div>
            </img>
        </div>`;

            fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=fr`, {
                headers: new Headers({ Authorization: `Bearer ${token}` }),
            })
                .then(response => response.json())
                .then(data => {
                    for (let i = 0; i < 10 || i < data.tracks.length; i++) {
                        document.querySelector("#topTenTracks").innerHTML += `
                    <li class = "music bg-[rgb(140,200,60)] rounded-lg p-2 m-2">&#9658 ${data.tracks[i].name}</li>`;
                    }
                });
        })
        .catch(error => {
            document.querySelector("#artistsList").innerHTML += `<div id="error">Artist not found</div>`;
        });
});
