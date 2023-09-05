import { PublicClientApplication, InteractionRequiredAuthError } from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: '0426853a-440c-46ea-a168-2c573eacc496',
        redirectUri: 'http://localhost:5173',
    }
    };

var loginRequest = 
{
    scopes: ["user.read", "mail.send"] // optional Array<string>
};

const msalInstance = new PublicClientApplication(msalConfig);
await msalInstance.initialize();

export const getResponse = async (accessToken) => 
{
    var headers = new Headers();
    var bearer = "Bearer " + accessToken;
    headers.append("Authorization", bearer);
    var options = {
            method: "GET",
            headers: headers
    };
    // var graphEndpoint = "https://graph.microsoft.com/v1.0/me";
    var graphEndpoint = "https://graph.microsoft.com/v1.0/me/calendarview?startdatetime=2023-09-01T05:27:53.758Z&enddatetime=2023-09-08T05:27:53.758Z";
    
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
