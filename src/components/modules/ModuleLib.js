function getCrewNumber(crew_arr) {
    let crews = {
        "Gunner": 0,
        "Driver": 0,
        "Commander": 0,
        "Loader": 0
    }

    crew_arr.forEach(element => {
        for (var key of Object.keys(crews)) {
            if (element.includes(key)) {
                crews[key] += 1;
            }
        }
    });

    return crews;
}