type CapiRights = {
    syndicatable: boolean
    subscriptionDatabases: boolean
    developerCommunity: boolean
}

type CapiData = {
    id: string
    rights: CapiRights
}

let textIndicators: Record<string, string> = {
    "not-syndicatable": "Not syndicatable",
    "syndicatable": "Syndicatable"
}

// type CapiData = Record<string, any>

function get_capi_id(): string {
    return window.location.pathname;
}

async function get_api_key_setting(): Promise<String> {
    let res = await globalThis.browser.storage.local.get("capi-key")
    return typeof(res["capi-key"]) == "string" ? res["capi-key"] : ""
}

async function get_capi_response(id: string) {
    let api_key = await get_api_key_setting()
    return fetch(`https://content.guardianapis.com/${id}?show-rights=all&api-key=${api_key}`)
}

async function is_syndicatable(): Promise<string> {
    let capi_id = get_capi_id()
    let res = await get_capi_response(capi_id)
    console.log(`sIndicator: response = ${res.status} txt=${res.statusText}`)
    if(!res.ok) {
	if(res.status === 403) {
	    console.log("sIndicator: item is not available at this tier (403 response)")
	    return "not-syndicatable"
	} else {
	    throw new Error(`error accessing capi ${res.status}`)
	}
    }
    let json = await res.json()
    console.log("sIndicator", json)
    let data = json.response.content
    if(!data) {
	console.log(`${capi_id} does not contain a property content in response`)
	return "unknown"
    } else {
	return data.rights.syndicatable == "true" ? "syndicatable" : "not-syndicatable"
    }
}

function make_bubble(): HTMLDivElement {
    let indicationBubble = document.createElement("div")
    indicationBubble.id = "gu--sindicator-bubble"
    indicationBubble.classList.add("bubble-unknown")
    indicationBubble.textContent = "S"
    return indicationBubble
}

console.log("sIndicator running ...")

let bubble = make_bubble()
document.body.appendChild(bubble)

is_syndicatable()
    .then(
	(isSyndicatable) => {
	    console.log("sIndicator", isSyndicatable)
	    let resultClass = "bubble-" + isSyndicatable
	    bubble.classList.remove("bubble-unknown")
	    bubble.classList.add(resultClass)
	    if(textIndicators[isSyndicatable]) {
		bubble.textContent = textIndicators[isSyndicatable]
	    }
	    console.log("PMR textContent = ", bubble.textContent)
	},
	(err) => {
	    console.error(`sIndicator: error: ${err}`)
	    bubble.classList.remove("bubble-unknown")
	    bubble.classList.add("bubble-error")
	    bubble.textContent = "error"
	}
    )
