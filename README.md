# sIndicator
## What is sIndicator?
sIndicator is a web extension distributed individually to syndication partners (i.e. not available through the store) to allow them to determine whether a given piece of content that they are viewing is syndicatable or not.
In this context, we define syndicatable as
`rights.syndicable=="true"`
in CAPI, for a given CAPI id
The tool does not provide client-specific, contract-specific knowledge of what content is available: it only provides a generic indication of whether a piece of content is syndicatable.

## Testing the web extension
To be completed
Either use `web-ext run`
Or install manually into your browser using debug mode

## Building and signing the web extension
You will need to update the version in `manifest.json` as part of your PR
Repository secrets have been added for WEB_EXT_API_KEY and WEB_EXT_API_SECRET
If these need to be updated, [create](https://accounts.firefox.com/) a mozilla account and request an API key
A GitHub action is activated on merging a PR and uses [web-ext](https://github.com/mozilla/web-ext) to build and sign the web extension
A zip file containing the signed xpi can be accessed from the Artifacts for the action


## Installation Process for Syndication Partners
1. Save the xpi file to your computer
2. Open Mozilla Firefox
3. Select the three lines in the top right corner and select 'Add-ons and themes'
4. Select the gearbox to the right of Manage Your Extensions and select 'Install Add-on From File...'
5. Select the xpi file you saved earlier and click Add | Okay to confirm
6. sIndicator should now appear in your list of Enabled extensions
7. Click on ... to the right of sIndicator and select 'Manage'
8. Click Preferences
9. Add your api key
10. Now when you navigate to a page on www.theguardian.com a bubble will appear indicating whether or not the page is syndicatable

Note that more sophisticated installation methods are possible and may be considered in the future.
