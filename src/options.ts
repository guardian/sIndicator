let storage = globalThis.browser.storage.local

let elm = document.querySelector("#capi-api-key") as HTMLInputElement
elm.value = "<loading>"

storage.get("capi-key")
    .then((res) => {
	if(typeof(res["capi-key"]) == "string") {
	    elm.value = res["capi-key"]
	} else {
	    elm.value = ""
	}
	elm.disabled = false
	elm.addEventListener("change", (ev) => {
	    storage.set({ "capi-key": elm.value })
	})
    })
