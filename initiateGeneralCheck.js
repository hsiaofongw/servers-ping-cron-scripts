#!/usr/local/bin/node

const got = require('got').default;

async function main() {
    const endPoint = "https://servers-ping.vercel.app/api/check";
    let url = new URL(endPoint);
    url.searchParams.append("rangeLengthInput", `${60*60*1000}`);
    console.log(url.toString());

    const resp = await got(url.toString()).json();
    console.log(resp);
}

main();
