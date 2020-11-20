const twilio_id = process.env.TWILIO_ID;
const twilio_token = process.env.TWILIO_TOKEN;
const twilio_number = process.env.TWILIO_NUMBER;

const twilio_client = require('twilio')(twilio_id, twilio_token);

class ServicioSMS {
    constructor() {}
    async enviarSMS (info){
        twilio_client.messages.create({
            to:`${info.to}`,
            from:twilio_number,
            body: `${info.body}`
        }).then(message => {console.log(message)})
        .catch(error => {console.log(error)});
    }
}
module.exports = ServicioSMS;

