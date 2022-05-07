const chatListControlPanel = $('#chatsListControlPanel')

const iconOnSearch = $('.icon')

for (let il = 0; il < iconOnSearch.length; il++) {
    const element = iconOnSearch[il];
    element.addEventListener('mouseover', ()=> {
        const icon = $('.icon i')
        icon[il].classList.toggle('fas')
    })
    element.addEventListener('mouseout', ()=> {
        const icon = $('.icon i')
        icon[il].classList.toggle('fas')
    })
}



const chatControl = () => {
    return `<li class="chatList">
    <div class="userProfileImage">
        <img src="" alt="dp">
    </div>
    <div class="userProfileNameandLastChat dflex-col">
        <div class="userProfileNamewithEmoji dflex-row">
            <div class="userProfileName">Ragul</div>
            <div class="userEmoji">&#x1F600</div>
        </div>
        <div class="userLastChat">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, nulla.</div>
    </div>
    <div class="userLastchatTime">03-04-2021</div>
</li>`
}

for (let cl = 0; cl < 20; cl++) {
chatListControlPanel.append(chatControl)
}
const chatList = document.querySelectorAll('.chatList')

chatList.forEach(chat => {
    chat.addEventListener('click', () => {
        const welcomeScreen = $('#welcomeScreen')
        if (welcomeScreen) {
            welcomeScreen.remove()
        }
    })
})
const profileDetails = (profile) => {
    console.log(profile.firstName);
    $('#profileName').text(profile.firstName + ' ' + profile.lastName)
};
const getUser = () => {
    const header = new Headers()
    header.append('Authorization', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjUwMzcwNjg3fQ.WXpejy1qu0HuQXKV2jZztoxY2VVuvRiclRYu970OqCM")
    fetch('http://localhost:5000/api/users/detail', {
        method: 'get',
        headers: header,
        redirect: 'follow'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        profileDetails(data.data)
    })
}


$(document).ready(() => {
    getUser()
})