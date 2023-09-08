import { PublicClientApplication, InteractionRequiredAuthError } from "@azure/msal-browser";
import { configDotenv } from "dotenv";
import { DateTime } from "luxon";
import { readable } from "svelte/store";

const msalConfig = {
    auth: {
        clientId: "0426853a-440c-46ea-a168-2c573eacc496",
        redirectUri: configDotenv.OAUTH_REDIRECT_URI,
    }
    };

var loginRequest = 
{
    scopes: ["user.read", "mail.send"] // optional Array<string>
};

const msalInstance = new PublicClientApplication(msalConfig);
await msalInstance.initialize();

export const getResponse = async (accessToken, startTime, endTime) => 
{
    var headers = new Headers();
    var bearer = "Bearer " + accessToken;
    headers.append("Authorization", bearer);
    var options = {
            method: "GET",
            headers: headers
    };
    // var graphEndpoint = "https://graph.microsoft.com/v1.0/me";
    var graphEndpoint = `https://graph.microsoft.com/v1.0/me/calendarview?startdatetime=${startTime}&enddatetime=${endTime}`;
    
    let response = await fetch(graphEndpoint, options)
    let body = await response.json();
    return body;
}

export let signIn = async () =>
{
    const loginResponse = await msalInstance.loginPopup(loginRequest);
    sessionStorage.setItem("msalAccount", loginResponse.account.username);
}

export let getToken = async () =>
{
    let account = sessionStorage.getItem('msalAccount');
    if (!account) {
        throw new Error(
            'User info cleared from session. Please sign out and sign in again.');
    }
    try {
        // First, attempt to get the token silently
        const silentRequest = {
            scopes: loginRequest.scopes,
            account: msalInstance.getAccountByUsername(account)
        };

        const silentResult = await msalInstance.acquireTokenSilent(silentRequest);
        return silentResult.accessToken;
    } catch (silentError) {
        // If silent requests fails with InteractionRequiredAuthError,
        // attempt to get the token interactively
        if (silentError instanceof InteractionRequiredAuthError) {
            const interactiveResult = await msalInstance.acquireTokenPopup(msalRequest);
            return interactiveResult.accessToken;
        } else {
            throw silentError;
        }
    }
}

export let getCurrentElement = (graphData) => {
    let currentTime = DateTime.now();
    let startTime;
    let endTime;

    let sortedGraph = graphData.value.sort((a,b) => a.start.dateTime.localeCompare(b.start.dateTime));

    for (let index = 0; index < graphData.value.length; index++) 
    {
        startTime = DateTime.fromISO(sortedGraph[index].start.dateTime).plus({ hours: 2 });
        endTime = DateTime.fromISO(sortedGraph[index].end.dateTime).plus({ hours: 2 });

        if(startTime <= currentTime && endTime <= currentTime)
        {
            sortedGraph.splice(index, 1);
            index--;
        }
    }
    return sortedGraph;
}

export let time = readable(DateTime.now(), (set) => {
    const interval = setInterval(() => {
        set(DateTime.now());
    }, 1000);
    
    return () => {
        clearInterval(interval);
    };
})





