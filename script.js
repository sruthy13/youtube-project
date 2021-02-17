const CLIENT_ID = "458129265833-u4adqn1ke3rp0f1vmbtavadj17odkgsa.apps.googleusercontent.com";
const DISCOVERY_DOCS =["https://www.goofleapis.com/discovery/v1/apis/youtube/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/youtube.readonly";

const authorizebutton = document.getElementById('authorize-button');
const signoutbutton = document.getElementById('signout-button');
const content = document.getElementById('content');
const channelform = document.getElementById('channel-form');
const channelinput = document.getElementById('channel-input');
const videocontainer = document.getElementById('video-container');
const defaultchannel ='edureka!'

function handleClientLoad(){
    gapi.load('client:auth2',initClient);
}
function initClient(){
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId:CLIENT_ID,
        scope:SCOPES
    }).then(()=> {
        gapi.authh2.getAuthInstance().issignedIn.listen(updatesigninStatus);
        updatesigninStatus(gapi.auth2.getAuthInstance().issignedIn.get());
        authorizebutton.onclick= handleAuthclick;
        signoutbutton.onclick = handlesignoutclick;
    });
}
function updatesigninStatus(issignedIn){
    if(issignedIn){
        authorizebutton.style.display = 'none';
        signoutbutton.style.display = 'block';
        contentbutton.style.display = 'block';
        videocontainerbutton.style.display = 'block';
    }else{
        authorizebutton.style.display = 'block';
        signoutbutton.style.display = 'none';
        contentbutton.style.display = 'none';
        videocontainerbutton.style.display = 'none';

    }
}
function handleAuthclick(){
    gapi.auth2.getAuthInstance().signIn();
}
function handlesignoutclick(){
    gapi.auth2.getAuthInstance().signout();
}

function getchannel(channel){
    gapi.client.youtube.channels.list({
        part:'snippet,contentdetails,statistics',
        forUsername:channel
    })
    .then(response=>{
        console.log(response);
    })
    .catch(err=> alert('no channel'))
}






