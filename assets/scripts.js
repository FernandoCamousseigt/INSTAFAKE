$('#js-form').submit(async (event) => {
    event.preventDefault();
    const email = document.getElementById('txtEmail').value;  
    const password = $('#txtPass').val();
    const JWT = await postData(email,password);
    const photo = await getImage(JWT);

    console.log(email, password);
    console.log(photo ['data']); //filtro por subindice data
    console.log(photo ['data'].download_url);
    //console.log(album ['data'][4].download_url); [4]si quisiera en ese especifico
    
})

const postData = async (email, password) => {
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method:'POST',
            body: JSON.stringify({
                email: email, 
                password: password
            })
        })
        const {token} = await response.json()

        localStorage.setItem('jwt-token', token)
        return token
    } catch (err) {
        console.error(`Error: ${err}`);
    }
}

const getImage = async (token) => {
    try {
        const response = await fetch('http://localhost:3000/api/photos', {
            method:'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const photo = await response.json()
        return photo
    } catch (err) {
        console.error(`Error: ${err}`);
    }
}
