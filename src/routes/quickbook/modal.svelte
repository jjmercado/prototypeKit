<script>
    import { onMount, afterUpdate, beforeUpdate } from "svelte";
    import { Client } from "@microsoft/microsoft-graph-client";
    import { PublicClientApplication } from "@azure/msal-browser";
    import {AuthCodeMSALBrowserAuthenticationProvider} from  "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";

    export let showModal;
    let dialog;
    $: if (dialog && showModal) dialog.showModal();

    const getURL = async () => {
        let getURLPath = window.location.href;
        let url = new URL(getURLPath);
        return url;
    }

    const setEvent = async () => 
    {
        const pca = new PublicClientApplication({
            auth: {
                clientId: "0426853a-440c-46ea-a168-2c573eacc496",
                // authority: `https://login.microsoft.online/${"2dbdec17-eed4-4f75-a818-699c956064f5"}`,
                redirectUri: "http://localhost:5173",
            },
            });
    
            pca.initialize();
    
            // Authenticate to get the user's account
            const authResult = await pca.acquireTokenPopup({
            scopes: ['User.Read'],
            });
    
            if (!authResult.account) {
            throw new Error('Could not authenticate');
            }
    
            // @microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser
            const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(pca, {
            account: authResult.account,
            // interactionType: InteractionType.Popup,
            scopes: ['User.Read'],
            });
    
            //------------------------------------------------------------------------
    
            const graphClient = Client.initWithMiddleware({ authProvider: authProvider });
            const url = await getURL();
            console.log(url.searchParams.get("title"));
            if (url.searchParams.get("title")) 
            {
                let event = 
                {
                    subject: url.searchParams.get("title"),
                    // body: {
                    //     contentType: 'HTML',
                    //     content: url.searchParams.get("description")
                    // },
                    start: {
                        dateTime: url.searchParams.get("start"),
                        timeZone: 'UTC'
                    },
                    end: {
                        dateTime: url.searchParams.get("end"),
                        timeZone: 'UTC'
                    },
                    // location: {
                    //     displayName: url.searchParams.get("location")
                    // },
                    // attendees: [
                    //     {
                    //     emailAddress: {
                    //         address: 'jery19@live.de',
                    //         name: 'Jeremy Mercado'
                    //     },
                    //     type: 'required'
                    //     }
                    // ],
                    // allowNewTimeProposals: true,
                    // transactionId: '7E163156-7762-4BEB-A1C6-729EA81755A7'
                };
    
                await graphClient.api('/me/events')
                    .post(event);    
            } else 
            {
                console.error("No URL found");    
            }
            
    };


</script>
<dialog bind:this={dialog} on:close={() => showModal = false}>
    <form on:submit={setEvent}>
        <div>
            <div>
                <label for="title">Titel</label>
                <input name="title" id="title" type="text" />
            </div>

            <div>
                <label for="required">Erforderlich</label>
                <input name="required" id="required" type="text"/>
            </div>

            <div>
                <label for="optional">Optional</label>
                <input name="optional" id="optional" type="text"/>
            </div>

            <div>
                <label for="start">Beginn</label>
                <input name="start" id="start" type="datetime-local" />
            </div>

            <div>
                <label for="end">Ende</label>
                <input name="end" id="end" type="datetime-local" />
            </div>

            <div>
                <label>Ganztägig
                    <input name="allDay" type="checkbox"/>
                </label>
            </div>

            <div>
                <label for="location">Ort</label>
                <input name="location" id="location" type="text"/>
            </div>

            <div>
                <label for="description">Beschreibung</label>
                <textarea name="description" id="description"></textarea>
            </div>

            <div>
                <button formmethod="dialog" type="submit" on:click={dialog.close()}>Cancel</button>
                <button type="submit" on:click={dialog.close()}>Submit</button>
            </div>
        </div>
    </form>
</dialog>