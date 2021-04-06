#!/usr/local/bin/node

const got = require('got').default;

require('dotenv').config();

async function main() {
    const endPoint = "https://servers-ping.vercel.app/api/lastcheck";
    let url = new URL(endPoint);
    // url.searchParams.append("rangeLengthInput", `${60*60*1000}`);
    console.log(url.toString());

    const resp = await got(url.toString()).json();
    console.log(resp);

    const { result: { positive } } = resp;
    console.log(`Should send Email? ${positive}`);

    if (positive) {
        console.log("Sending Email ...");

        const mailSenderEndPoint = "https://mailsender-five.vercel.app/api/hello";
        const mailSendTo = "i@beyondstars.xyz";
        const mailSubject=  "状态监测告警";
        const mailText = "请访问状态监测页面查看具体情况．";
        const mailAuthKey = process.env['MAIL_SENDER_KEY'] || "noKey";
        const mailPayload = {
            to: mailSendTo,
            subject: mailSubject,
            text: mailText
        };

        const { body } = await got.post(mailSenderEndPoint, {
            json: mailPayload,
            responseType: 'json',
            headers: {
                "x-auth-secret": mailAuthKey,
                "Content-Type": "application/json"
            }
        });

        const receipts = body;
        console.log(receipts);
    }
}

main();
